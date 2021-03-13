const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealsSchema = new Schema({
    mealName: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    prepTime: {
        type: TimeRanges,
        required: true,
    }
}, {
    timestamps: true,
});

const meals = mongoose.model('Users', mealsSchema);

module.exports = meals;