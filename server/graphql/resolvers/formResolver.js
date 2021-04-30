const Form = require('../../models/form.model');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        async eventForms(parent, args, { FormDB }, info) {
            return await Form.find({ event_id: ObjectId(args.event_id) });
        },
    },
    Mutation: {
        async addForm(_, {
            data: { event_id, applicant, emergency_contact, event_option }
        }) {
            const newForm = new Form({
                event_id: ObjectId(event_id),
                applicant: {
                    name: applicant.name,
                    gender: applicant.gender,
                    birthday: applicant.birthday,
                    email: applicant.email,
                    phone: applicant.phone,
                    studentID: applicant.studentID,
                    department: applicant.department,
                    notableResult: applicant.notableResult,
                    lastFiveDigit: applicant.lastFiveDigit,
                    transactionTime: applicant.transactionTime,
                    transactionName: applicant.transactionName,
                    information: applicant.information,
                    otherInformation: applicant.otherInformation,
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
        async setPaidStatus(parent, args) {
            await Form.findOne({ _id: ObjectId(args.data._id) }, function (err, form) {
                if (!err) {
                    if (form) {
                        form.applicant.paid = args.data.applicant.paid;
                        form.save();
                    }
                }
            });

            return true;
        }
    }
}