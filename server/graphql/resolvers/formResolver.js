const Form = require('../../models/form.model');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    Mutation: {
        async newForm(_, {
            data: { event_id, applicant, emergency_contact, event_option }
        }) {
            const newForm = new Form({
                event_id: ObjectId(event_id),
                applicant: {
                    name: applicant.name,
                    gender: applicant.gender,
                    birthday: applicant.birthday,
                    email: applicant.email,
                    phone: applicant.phone
                },
                emergency_contact: {
                    name: emergency_contact.name,
                    relationship: emergency_contact.relationship,
                    phone: emergency_contact.phone
                },
                event_option: {
                    category: event_option.category,
                    partner: event_option.partner,
                    group: event_option.group,
                }
            });

            try {
                await newForm.save();
            } catch (err) {
                throw new Error(err);
            }

            return true;
        },
    }
}