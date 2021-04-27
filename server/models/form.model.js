const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    applicant: {
        name: { type: String, required: true, trim: true, minlength: 2 },
        gender: { type: String, required: true },
        birthday: { type: Date, required: true },
        email: { type: String, required: true, trim: true, minlength: 5 },
        phone: { type: String, required: true, trim: true, minlength: 8 },
    },
    emergency_contact: {
        name: { type: String, required: true, trim: true, minlength: 2 },
        relationship: { type: String, required: true },
        phone: { type: String, required: true, trim: true, minlength: 8 },
    },
    event_option: {
        category: { type: String, required: true },
        partner: { type: String },
        group: { type: String, required: true },
    }
}, {
    timestamps: true
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;