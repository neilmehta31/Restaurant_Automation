const router = require('express').Router();

let Employee = require('../models/employee.model');

router.route('/all').get((req, res) => {
    Employee.find()
        .then(employee => res.json(employee))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    const newEmployee = new Employee({ firstname, surname, email, password });

    newEmployee.save()
        .then(() => res.json('New Employee added to the database!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee fired and data deleted. '))
        .catch(err => res.status(400).json('Error : ' + err));
})

module.exports = router;