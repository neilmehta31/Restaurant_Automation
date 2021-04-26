const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const busboynotifSchema = new Schema({
    email: {
        type: Number,
        required: true,
        trim: true,
    },
    
    callbusboy: {
        type: boolean,
        default: false,
        trim: true,
        unique:true
    }
}, {
    timestamps: true,
});

const BusboyNotif = mongoose.model('Busboy', busboynotifSchema);

module.exports = BusboyNotif;