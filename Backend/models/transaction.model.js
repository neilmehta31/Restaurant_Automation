const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transaction: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Transactions = mongoose.model('transactions', transactionSchema);

module.exports = Transactions;