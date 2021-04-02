const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empId: {
        type: Number,
        require: true,
        unique: true
    },
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
        default: "employee@123",
        trim: true,
        minlength: 6
    },
    salary: {
        type: Number,
        required: true,
        trim: true,
    },
    designation: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Employee = mongoose.model('Employees', employeeSchema);

module.exports = Employee;