const router = require('express').Router();

const bcrypt = require('bcrypt');
require('dotenv').config();

let meals = require('../models/manager.meals.model');
let Employee = require('../models/employee.model');


//Meals database access to the manager
router.route('/meals/all').get((req, res) => {
    meals.find()
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
    let { empId, firstname, surname, email, password } = req.body;
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
    if (!password) {
        errors.push({ password: "required" });
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
                    password: password,
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


module.exports = router;