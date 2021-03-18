const router = require('express').Router();

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
        .then(meal => res.json(meal))
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

//Password encryption and email regex and other constrains to be added as in customer.js
router.route('/employee/add').post((req, res) => {
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    const newEmployee = new Employee({ firstname, surname, email, password });

    newEmployee.save()
        .then(() => res.json({ MESSAGE: 'New Employee added to the database!', Result: newEmployee }))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/employee/update/:id').post((req, res) => {

    Employee.findById(req.params.id)
        .then(employee => {
            employee.empId = req.body.empId;
            employee.firstname = req.body.firstname;
            employee.surname = req.body.surname;
            employee.email = req.body.email;
            employee.password = req.body.password;

            employee.save()
                .then(() => res.json({ MESSAGE: 'The employee database is updated.', Result: employee }))
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error :' + err));
});


router.route('/employee/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;