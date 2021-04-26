const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    mId: {
        type: String,
        required: true,
    },
    txnID: {
        type: String,
        required: true,
    },
    txnAmount: {
        type: String,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    txnDate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    respcode: {
        type: String,
        required: true,
    },
    respMsg: {
        type: String,
        required: true,
    },
    gatewayName: {
        type: String,
        required: true,
    },
    bankTxnID: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Transactions = mongoose.model('transactions', transactionSchema);

module.exports = Transactions;