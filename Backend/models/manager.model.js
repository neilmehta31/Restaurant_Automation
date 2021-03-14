const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealsSchema = new Schema({
    mealId: {
        type: Number,
        required: true,
        unique: true
    },
    mealName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    preptime: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const meals = mongoose.model('meals', mealsSchema);

module.exports = meals;