const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId:{
        type:Number,
        required:true,
        unique:true,
        },
    mealId: {
        type: Number,
        required: true,
        trim: true,
    },
    mealName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    tableId: {
        type: Number,
        required: true,
        trim: true,
    },
    orderFinished:{
        type:Boolean,
        required:true,
        trim:true,
        default:false
    }
}, {
    timestamps: true,
});

const orders = mongoose.model('Order', orderSchema);

module.exports = orders;