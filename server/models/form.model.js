const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    applicant: {
        name: { type: String, required: true, trim: true, minlength: 2 },
        gender: { type: String, required: true },
        email: { type: String, required: true, trim: true, minlength: 5 },
        phone: { type: String, required: true, trim: true, minlength: 8 },
    },
    emergency_contact: {
        name: { type: String, required: true, trim: true, minlength: 2 },
        relationship: { type: String, required: true },
        phone: { type: String, required: true, trim: true, minlength: 8 },
    },
}, {
    timestamps: true
});