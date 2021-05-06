const { model, Schema } = require('mongoose');

const formSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
    applicant: {
        name: { type: String, required: true, trim: true, minlength: 2 },
        gender: { type: String },
        birthday: { type: Date },
        email: { type: String, trim: true },
        phone: { type: String, required: true, trim: true },
        studentID: { type: String, trim: true },
        department: { type: String, trim: true },
        notableResult: { type: String, trim: true },
        lastFiveDigit: { type: String, trim: true },
        transactionTime: { type: String, trim: true },
        transactionName: { type: String, trim: true },
        information: { type: String, trim: true },
        otherInformation: { type: String, trim: true },
        paid: { type: Boolean }
    },
    emergency_contact: {
        name: { type: String, trim: true },
        relationship: { type: String },
        phone: { type: String, trim: true },
    },
    event_option: {
        category: { type: String },
        partner: { type: String },
        group: { type: String },
    }
}, {
    timestamps: true
});

const Form = model('Form', formSchema);

module.exports = Form;