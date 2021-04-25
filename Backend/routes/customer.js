const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {
    createJWT,
} = require('../Utility/authJWT');

let Customer = require('../models/customer.model');
let Tables = require('../models/tables.model');
let Orders = require('../models/orders.model');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// router.route('/all').get((req, res) => {
//     Customer.find()
//         .then(customers => res.json(customers))
//         .catch(error => res.status(400).json('Error: ' + error));
// });

// router.route('/delete/:id').delete((req, res) => {
//     Customer.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Customer data deleted. '))
//         .catch(err => res.status(400).json('Error : ' + err));
// });

router.route('/signup').post((req, res, next) => {
    let { firstname, surname, phoneNo, email, password, password_confirmation } = req.body;
    let errors = [];
    if (!firstname) {
        errors.push({ firstname: "required" });
    }
    if (!surname) {
        errors.push({ surname: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!phoneNo) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password != password_confirmation) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Customer.findOne({ email: email })
        .then(customer => {
            if (customer) {
                return res.status(422).json({ errors: [{ customer: "email already exists" }] });
            } else {
                const customer = new Customer({

                    firstname: firstname,
                    surname: surname,
                    phoneNo: phoneNo,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        customer.password = hash;
                        customer.save()
                            .then(response => {
                                res.status(200).json({
                                    MESSAGE: 'User is signd up and in the database',
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
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
});


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
    Customer.findOne({ email: email }).then(customer => {
        if (!customer) {
            return res.status(404).json({
                errors: [{ customer: "not found" }],
            });
        } else {
            bcrypt.compare(password, customer.password)
                .then((isMatch) => {
                    if (isMatch) {
                        let access_token = createJWT(
                            customer.email,
                            customer._id,
                            3600
                        );
                        jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                            decoded) => {
                            if (err) {
                                res.status(500).json({ MESSAGE: 'Error at line 128 of customer.js', erros: err });
                            }
                            if (decoded) {
                                return res.status(200).json({
                                    MESSAGE: 'customer is logged in.',
                                    success: true,
                                    token: access_token,
                                    message: customer
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
                    console.log({ MESSAGE: 'Error at line 140 of customer.js', MSG_pass_req: password, MSG_data: customer.password, erros: err });
                });
        }
    }).catch(err => {
        res.status(500).json({ MESSAGE: 'Error at line 144 of customer.js', erros: err });
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
    Customer.findOne({ email: email })
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    errors: [{ customer: "not found" }],
                });
            } else {

                customer.firstname = customer.firstname,
                    customer.surname = customer.surname,
                    customer.email = customer.email,
                    customer.password = password,
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
                            customer.password = hash;
                            customer.save()
                                .then(response => {
                                    res.status(200).json({
                                        MESSAGE: 'User password is updated in the database. Now Sign in using new password!!',
                                        success: true,
                                        result: response
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        errors: [{ error: err }],
                                        MESSAGE: [{ firstname: customer.firstname, lastname: customer.surname, email: customer.email, newpassword: passowrd }]
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


router.route('/updateinfo').post((req, res) => {
    let { email} = req.body;

    Customer.findOne({ email: email })
        .then(customer => {
            customer.phoneNo = req.body.phoneNo!=null ? req.body.phoneNo : customer.phoneNo;
            customer.firstname = req.body.firstname!=null ? req.body.firstname : customer.firstname;
            customer.surname = req.body.surname!=null ? req.body.surname : customer.surname;
            customer.password = req.body.password!=null ? req.body.password : customer.password;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(customer.password, salt, function (err, hash) {
                    if (err) throw err;
                    customer.password = hash;
                    customer.save()
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








// Customer choosing the desired table
router.route('/getTableStatus').get((req, res) => {
    Tables.find()
        .then(table => res.json(table))
        .catch(error => res.status(400).json('Error: ' + error));
});



router.route('/tableSelection/:id').post((req, res) => {
    Tables.findById(req.params.id)
        .then(table => {
            let available = table.available;
            let reserved = table.reserved;
            if (available && !reserved) {
                table.available = false;
                table.tableId = table.tableId;
                table.save()
                    .then(response => { res.json({ result: response }) })
                    .catch(err => res.status(400).json({ error: err }));
            } else {
                res.json({ result: 'unable to book the table. Please try again later!' })
            }
        }).catch(err => res.status(400).json({ errro: err }));
});







// Customers order the meals
router.route('/orderMeal').post((req,res)=>{
    let {mealId,tableId,email} = req.body;
    var orderId;
    Orders.find()
    .then(orders=>{
        orderId = orders.length+1;

        const newOrder = new Orders({ mealId,tableId,orderId,email });
    newOrder.save()
    .then(() => res.json({ MESSAGE: 'Order added to the database', Result: newOrder }))
    .catch(error => res.status(400).json('Error :' + error));

    })
    .catch(error => res.status(400).json('Error: ' + error));    
})

module.exports = router;