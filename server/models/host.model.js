const { model, Schema } = require('mongoose');

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

const Host = model('Host', hostSchema);

module.exports = Host;