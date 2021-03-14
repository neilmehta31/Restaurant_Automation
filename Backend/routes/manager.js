const router = require('express').Router();

let meals = require('../models/manager.model');

router.route('/').get((req, res) => {
    meals.find()
        .then(manager => res.json(manager))
        .catch(err => res.status(400).json('Error :' + err))
});

router.route('/add').post((req, res) => {
    const mealName = req.body.mealName;
    const price = req.body.price;
    const preptime = req.body.preptime;
    const mealId = req.body.mealId;

    const newMeal = new meals({ mealName, price, preptime, mealId });

    newMeal.save()
        .then(() => res.json('Meal added to the database'))
        .catch(error => res.status(400).json('Error :' + error));
});

router.route('/:id').get((req, res) => {
    meals.findById(req.params.id)
        .then(meal => res.json(meal))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    meals.findByIdAndDelete(req.params.id)
        .then(() => res.json('meal deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

    meals.findById(req.params.id)
        .then(meals => {
            meals.mealName = req.body.mealName;
            meals.price = req.body.price;
            meals.preptime = req.body.preptime;
            meals.mealId = req.body.mealId;

            meals.save()
                .then(() => res.json('The meals database is updated.'))
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error :' + err));
});

module.exports = router;