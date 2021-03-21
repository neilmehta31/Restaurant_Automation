//Employee SIGNIN option IS handeled in this file with password encryption checking.
const router = require('express').Router();
let Employee = require('../models/employee.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {
    createJWT,
} = require('../Utility/authJWT');

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
                                return res.status(200).json({
                                    MESSAGE: 'employee is logged in.',
                                    success: true,
                                    token: access_token,
                                    message: employee
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



module.exports = router;