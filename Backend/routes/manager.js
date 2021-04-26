const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const {
    createJWT,
} = require('../Utility/authJWT');

let meals = require('../models/manager.meals.model');
let Employee = require('../models/employee.model');
let Manager = require('../models/manager.model');
let Tables = require('../models/tables.model');
let Customer = require('../models/customer.model');
let Transaction = require('../models/transaction.model');



//Meals database access to the manager
router.route('/meals/all').get((req, res) => {
    meals.find({},{"_id":false,"mealName":true,"price":true})
        .then(manager => res.json(manager))
        .catch(err => res.status(400).json('Error :' + err))
});

router.route('/meals/add').post((req, res) => {
    const mealName = req.body.mealName;
    const price = req.body.price;
    const preptime = req.body.preptime;
    const mealId = req.body.mealId;

    const newMeal = new meals({ mealName, price, preptime, mealId });

    newMeal.save()
        .then(() => res.json({ MESSAGE: 'Meal added to the database', Result: newMeal }))
        .catch(error => res.status(400).json('Error :' + error));
});

router.route('/meals/:id').get((req, res) => {
    meals.findById(req.params.id)
        .then(meal => {
            res.json({ meal: meal, meal_timer: meal.preptime * 60 });
            let timerId = setTimeout(() => { res.status(400).json("Please wait while the food is being prepared!") }, meal.preptime * 60);
            alert(timerId);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/meals/delete/:id').delete((req, res) => {
    meals.findByIdAndDelete(req.params.id)
        .then(() => res.json('meal deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/meals/update/:id').post((req, res) => {

    meals.findById(req.params.id)
        .then(meals => {
            meals.mealName = req.body.mealName;
            meals.price = req.body.price;
            meals.preptime = req.body.preptime;
            meals.mealId = req.body.mealId;

            meals.save()
                .then(() => res.json({ MESSAGE: 'The meals database is updated.', Result: meals }))
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error :' + err));
});








//Employee database access to the manager
router.route('/employee/all').get((req, res) => {
    Employee.find()
        .then(employee => res.json(employee))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/employee/delete/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee fired and data deleted. '))
        .catch(err => res.status(400).json('Error : ' + err));
});

//DONE : Password encryption and email regex and other constrains to be added as in customer.js

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

router.route('/employee/add').post((req, res) => {
    let { empId, firstname, surname, email, phoneNo, salary, designation } = req.body;
    let errors = [];
    if (!empId) {
        errors.push({ empId: "required" });
    }
    if (!firstname) {
        errors.push({ firstname: "required" });
    }
    if (!surname) {
        errors.push({ surname: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    // if (!password) {
    //     errors.push({ password: "required" });
    // }
    if (!phoneNo) {
        errors.push({ phoneNo: "required" });
    }
    if (!salary) {
        errors.push({ salary: "required" });
    }
    if (!designation) {
        errors.push({ designation: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Employee.findOne({ email: email })
        .then(employee => {
            if (employee) {
                return res.status(422).json({ errors: [{ employee: "email already exists for another employee" }] });
            } else {
                const employee = new Employee({
                    empId: empId,
                    firstname: firstname,
                    surname: surname,
                    email: email,
                    // password: password,
                    phoneNo: phoneNo,
                    salary: salary,
                    designation: designation,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        employee.password = hash;
                        employee.save()
                            .then(response => {
                                res.status(200).json({
                                    MESSAGE: 'Employee is HIRED up and in the database',
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


router.route('/employee/update/:id').post((req, res) => {

    Employee.findById(req.params.id)
        .then(employee => {
            employee.empId = req.body.empId;
            employee.firstname = req.body.firstname;
            employee.surname = req.body.surname;
            employee.email = req.body.email;
            employee.password = req.body.password;
            employee.phoneNo = req.body.phoneNo;
            employee.salary = req.body.salary;
            employee.designation = req.body.designation;

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(employee.password, salt, function (err, hash) {
                    if (err) throw err;
                    employee.password = hash;
                    employee.save()
                        .then(response => {
                            res.status(200).json({
                                MESSAGE: 'Employee is UPDATED in the database',
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


router.route('/employee/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});





// Manager can see customer Info
router.route('/customer/all').get((req, res) => {
    Customer.find()
        .then(customer => res.json(customer))
        .catch(error => res.status(400).json('Error: ' + error));
});






//Manager tables seating updation

router.route('/tables/add').post((req, res) => {
    const tableId = req.body.tableId;
    const available = req.body.available;
    const reserved = req.body.reserved;

    const newTable = new Tables({ tableId, available, reserved });

    newTable.save()
        .then(() => res.json({ MESSAGE: 'Table added to the database', Result: newTable }))
        .catch(error => res.status(400).json('Error :' + error));
});


router.route('/tablesUpdation/reserve/:id').post((req, res) => {

    const available = false;
    const reserved = true;
    let errors = [];
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Tables.findById(req.params.id)
        .then(table => {
            if (table.available && !table.reserve) {
                table.tableId = table.tableId;
                table.available = available;
                table.reserved = reserved;
                table.save()
                    .then(response => res.json({
                        result: response,
                        table: table,
                        MESSAGE: 'Seat Reserved',
                        success: true,
                    })).catch(err => res.status(500).json({
                        table_tableId: table.tableId,
                        errors: [{ error: err }],
                        MESSAGE: 'Unable to reserve the selected seat',
                        success: false,
                        table: table
                    }))
            }

        }).catch(err => {
            res.status(400).json({
                errors: [{
                    error: 'Something went wrong',
                    listOfErrors: [{ error: err }]
                }]
            });
        })
});


router.route('/tablesUpdation/unreserve/:id').post((req, res) => {

    const available = true;
    const unreserve = false;
    let errors = [];
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Tables.findById(req.params.id)
        .then(table => {
            if (!table.available && table.reserved) {
                table.tableId = table.tableId;
                // res.json({ available: table.available, reserve: table.reserved });
                table.available = available;
                table.reserved = unreserve;
                table.save()
                    .then(response => res.json({
                        result: response,
                        MESSAGE: 'Seat Reservation removed. Seat available for booking for public',
                        success: true,
                    })).catch(err => res.status(500).json({
                        table_tableId: table.tableId,
                        errors: [{ error: err }],
                        MESSAGE: 'UNABLE TO REMOVE the reserved tag from the selected seat',
                        success: false,
                        table: table
                    }));
            } else {

                res.json({ MESSAGE: 'table is not reservd in the first place to unreserve it ' });
            }

        }).catch(err => {
            res.status(400).json({
                errors: [{
                    error: 'Something went wrong',
                    listOfErrors: [{ error: err }]
                }]
            });
        })
})







//Manager transaction details view report
router.route('/transaction/report').get((req, res) => {
    Transaction.find()
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json('Error: ' + error));
});






//Manager login and forgot password

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
    Manager.findOne({ email: email }).then(manager => {
        if (!manager) {
            return res.status(404).json({
                errors: [{ manager: "not found" }],
            });
        } else {
            bcrypt.compare(password, manager.password)
                .then((isMatch) => {
                    if (isMatch) {
                        let access_token = createJWT(
                            manager.email,
                            manager._id,
                            3600
                        );
                        jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                            decoded) => {
                            if (err) {
                                res.status(500).json({ MESSAGE: 'Error at line 128 of manager.js', erros: err });
                            }
                            if (decoded) {
                                return res.status(200).json({
                                    MESSAGE: 'manager is logged in.',
                                    success: true,
                                    token: access_token,
                                    message: manager
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
                    console.log({ MESSAGE: 'Error at line 315 of manager.js', MSG_pass_req: password, MSG_data: manager.password, erros: err });
                });
        }
    }).catch(err => {
        res.status(500).json({ MESSAGE: 'Error at line 319 of manager.js', erros: err });
    });
});


// ! there is no forgot password for the manager right?
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
    Manager.findOne({ email: email })
        .then(manager => {
            if (!manager) {
                return res.status(404).json({
                    errors: [{ manager: "not found" }],
                });
            } else {
                manager.empId = manager.empId,
                    manager.firstname = manager.firstname,
                    manager.surname = manager.surname,
                    manager.email = manager.email,
                    manager.password = password,
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
                            manager.password = hash;
                            manager.save()
                                .then(response => {
                                    res.status(200).json({
                                        MESSAGE: 'manager password is updated in the database. Now Sign in to the manager dashboard using new password!!',
                                        success: true,
                                        result: response
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        errors: [{ error: err }],
                                        MESSAGE: [{ firstname: manager.firstname, lastname: manager.surname, email: manager.email, newpassword: passowrd }]
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

    Manager.findById(req.params.id)
        .then(manager => {
            manager.phoneNo = req.body.phoneNo;
            manager.empId = req.body.empId;
            manager.firstname = req.body.firstname;
            manager.surname = req.body.surname;
            manager.email = req.body.email;
            manager.password = req.body.password;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(manager.password, salt, function (err, hash) {
                    if (err) throw err;
                    manager.password = hash;
                    manager.save()
                        .then(response => {
                            res.status(200).json({
                                MESSAGE: 'Manager is UPDATED in the database',
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


router.route('/signup').post((req, res, next) => {
    let { firstname, surname, phoneNo, email, password } = req.body;
    let errors = [];
    if (!firstname) {
        errors.push({ firstname: "required" });
    }
    if (!surname) {
        errors.push({ surname: "required" });
    }
    if (!phoneNo) {
        errors.push({ email: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Manager.findOne({ email: email })
        .then(manager => {
            if (manager) {
                return res.status(422).json({ errors: [{ manager: "email already exists" }] });
            } else {
                const manager = new Manager({

                    firstname: firstname,
                    surname: surname,
                    phoneNo: phoneNo,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        manager.password = hash;
                        manager.save()
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



module.exports = router;