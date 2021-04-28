const { model, Schema } = require('mongoose');

const hostSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    phone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, minlength: 5 },
    page: { type: String, trim: true },
    bank_code: { type: String, trim: true },
    bank_account: { type: String, trim: true },
}, {
    timestamps: true,
});

const Host = model('Host', hostSchema);

module.exports = Host;