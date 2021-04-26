const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    tableId: {
        type: Number,
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
    available: {
        type: Boolean,
        default: true,
        required: false,
        trim: true
    },
    reserved: {
        type: Boolean,
        default: false,
        required: false,
        trim: true,
    },
}, {
    timestamps: true,
});

const Table = mongoose.model('tables', tableSchema);

module.exports = Table;