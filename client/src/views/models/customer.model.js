const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: false,
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
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
}, {
    timestamps: true,
});

const Customer = mongoose.model('Customers', customerSchema);

module.exports = Customer;