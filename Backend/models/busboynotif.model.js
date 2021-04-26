const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busboynotifSchema = new Schema({
    tableId: {
        type: Number,
        required: true
    },
    callbusboy: {
        type: Boolean,
        required:true
    }
}, {
    timestamps: true,
});

const BusboyNotif = mongoose.model('Busboynotif', busboynotifSchema);

module.exports = BusboyNotif;