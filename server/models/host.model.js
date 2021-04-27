const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    phone: { type: String, required: true, trim: true, minlength: 8 },
    email: { type: String, required: true, trim: true, minlength: 5 },
    page: { type: String, required: true, trim: true, minlength: 8 },
    bank_code: { type: Number, required: true, trim: true, minlength: 3 },
    bank_account: { type: Number, required: true, trim: true, minlength: 3 },
}, {
    timestamps: true,
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;