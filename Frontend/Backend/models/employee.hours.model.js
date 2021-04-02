const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeHours = new Schema({
    empId: {
        type: Number,
        require: true,
        unique: true
    },
    entryTime: {
        type: String,
        required: false,
        trim: true,
    },
    exitTime: {
        type: String,
        required: false,
        trim: true
    },
}, {
    timestamps: true,
});

const Employee_Hours = mongoose.model('Employee_hours', employeeHours);

module.exports = Employee_Hours;