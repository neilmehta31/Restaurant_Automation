const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/all').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/delete/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer data deleted. '))
        .catch(err => res.status(400).json('Error : ' + err));
})

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    const newCustomer = new Customer({ firstname, surname, email, password });

    newCustomer.save()
        .then(() => res.json('New Customer added to the database!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;