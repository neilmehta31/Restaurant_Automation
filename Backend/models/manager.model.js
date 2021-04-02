const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        default: "admin123@restaurant.com",
        required: false,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        default: "admin@123",
        required: false,
        trim: true,
        minlength: 6
    }
}, {
    timestamps: true,
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;