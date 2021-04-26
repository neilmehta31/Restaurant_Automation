const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    feedbackID: {
        type: Number,
        required: true,
        unique: true
    },
    restaurant_ambience: {
        type: Number,
        default: null,
        required: true
    },
    restaurant_service : {
        type: Number,
        default: null,
        required: true
    },
    restaurant_food : {
        type: Number,
        default: false,
        required: true
    },
    additional_comments: {
        type: String,
        required: false,
        trim: true
    }
},{
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;