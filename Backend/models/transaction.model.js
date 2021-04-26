const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    ORDERID: {
        type: String,
        required: true,
    },
    MID: {
        type: String,
        required: true,
    },
    TXNID: {
        type: String,
        required: true,
    },
    TXNAMOUNT: {
        type: String,
        required: true,
    },
    PAYMENTMODE: {
        type: String,
        required: true,
    },
    CURRENCY: {
        type: String,
        required: true,
    },
    TXNDATE: {
        type: String,
        required: true,
    },
    STATUS: {
        type: String,
        required: true,
    },
    RESPCODE: {
        type: String,
        required: true,
    },
    RESPMSG: {
        type: String,
        required: true,
    },
    GATEWAYNAME: {
        type: String,
        required: true,
    },
    BANKTXNID: {
        type: String,
        required: true,
    },
    BANKNAME: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Transactions = mongoose.model('transactions', transactionSchema);

module.exports = Transactions;