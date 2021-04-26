//Employee SIGNIN option IS handeled in this file with password encryption checking.
const router = require('express').Router();
let Employee = require('../models/employee.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employee_Hours = require('../models/employee.hours.model')

require('dotenv').config();
const {
    createJWT,
} = require('../Utility/authJWT');
const Orders = require('../models/orders.model');
const BusboyNotif = require('../models/busboynotif.model');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

router.route('/signin').post((req, res) => {
    let { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Employee.findOne({ email: email }).then(employee => {
        if (!employee) {
            return res.status(404).json({
                errors: [{ employee: "not found" }],
            });
        } else {
            bcrypt.compare(password, employee.password)
                .then((isMatch) => {
                    if (isMatch) {
                        let access_token = createJWT(
                            employee.email,
                            employee._id,
                            3600
                        );
                        jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                            decoded) => {
                            if (err) {
                                res.status(500).json({ MESSAGE: 'Error at line 128 of employee.js', erros: err });
                            }
                            if (decoded) {
                                let empId = employee.empId;
                                let entryTime = new Date();
                                let employee_hrs = new Employee_Hours({ empId, entryTime });
                                employee_hrs.updateOne()
                                    .then(response => {
                                        console.log(
                                            'MESSAGE: Employee Clocked IN success: true\nResponse : ' + response
                                        )
                                    })
                                    .catch(err => {
                                        console.log(
                                            'error : ' + err);
                                    });
                                return res.status(200).json({
                                    MESSAGE: 'employee is logged in.',
                                    success: true,
                                    token: access_token,
                                    employee: employee,
                                    employeeHrs: employee_hrs

                                });
                            }
                        });
                    } else {
                        return res.status(400).json({
                            errors: [{
                                password:
                                    "incorrect",
                            }]
                        });
                    }

                }).catch(err => {
                    console.log({ MESSAGE: 'Error at line 140 of employee.js', MSG_pass_req: password, MSG_data: employee.password, erros: err });
                });
        }
    }).catch(err => {
        res.status(500).json({ MESSAGE: 'Error at line 144 of employee.js', erros: err });
    });
});



router.route('/forgotPassword').post((req, res) => {
    let { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Employee.findOne({ email: email })
        .then(employee => {
            if (!employee) {
                return res.status(404).json({
                    errors: [{ employee: "not found" }],
                });
            } else {
                employee.empId = employee.empId,
                    employee.firstname = employee.firstname,
                    employee.surname = employee.surname,
                    employee.email = employee.email,
                    employee.password = password,
                    // customer.save()
                    //     .then(response => {
                    //         res.status(200).json({
                    //             MESSAGE: 'User password is updated in the database. Now Sign in using new password!!',
                    //             success: true,
                    //             result: response
                    //         })
                    //     })
                    //     .catch(err => {
                    //         res.status(500).json({
                    //             errors: [{ error: err }],
                    //             MESSAGE: [{ firstname: customer.firstname, lastname: customer.surname, email: customer.email, newpassword: passowrd }]
                    //         });
                    //     });
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) throw err;
                            employee.password = hash;
                            employee.save()
                                .then(response => {
                                    res.status(200).json({
                                        MESSAGE: 'Employee password is updated in the database. Now Sign in to the employee dashboard using new password!!',
                                        success: true,
                                        result: response
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        errors: [{ error: err }],
                                        MESSAGE: [{ firstname: employee.firstname, lastname: employee.surname, email: employee.email, newpassword: passowrd }]
                                    });
                                });
                        });
                    });

            }

        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
});





router.route('/updateinfo').put((req, res) => {

    let { email ,phoneNo, firstname, surname} = req.body;

    Employee.findOne({ email: email })
        .then(employee => {
            employee.phoneNo = req.body.phoneNo!=null ? req.body.phoneNo : employee.phoneNo;
            employee.firstname = req.body.firstname!=null ? req.body.firstname :employee.firstname;
            employee.surname = req.body.surname!=null ? req.body.surname : employee.surname;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(employee.password, salt, function (err, hash) {
                    if (err) throw err;
                    employee.password = hash;
                    employee.save()
                        .then(response => {
                            res.status(200).json({
                                MESSAGE: 'Customer info is UPDATED in the database',
                                success: true,
                                result: response
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                errors: [{ error: err }]
                            });
                        });
                });
            });
        }).catch(err => res.status(400).json('Error :' + err));
});







router.route('/getProfieInfo').get((req,res)=>{
    const {email} = req.body;
    Employee.findOne({email:email})
    .then(response=>res.status(200).json({success:true,result: response}))
    .catch(err => {
        res.status(500).json({success:false,error:err})
    })
});


// get order status for chef and waiter
router.route('/getOrderStatus').get((req,res)=>{
    Orders.find()
    .then(response=>res.status(200).json({response:response}))
    .catch(err => {
        res.status(500).json({success:false,error:err})
    })
});

router.route('/OrderFinished').put((req,res)=>{
    let {mealId} = req.body;
    Orders.findOne({mealId:mealId})
    .then(order=>{
    var orderFinished = true;
    order.orderFinished = orderFinished;
    order.save()
    .then(order=>res.status(200).json({order :order}))
    .catch(err => {
        res.status(500).json({success:false,error:err})
    }
    ) 
    }
    )
    .catch(error => res.status(400).json('Error: ' + error));    
});





// busboyo get request
router.route('/getBusboyStatus').get((req,res)=>{
    BusboyNotif.find()
    .then(response=>res.status(200).json({response:response}))
    .catch(err => {
        res.status(500).json({success:false,error:err})
    })
});



module.exports = router;