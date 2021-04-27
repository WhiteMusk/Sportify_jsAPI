const ObjectId = require('mongodb').ObjectID;

const Mutation = {
    async newForm(parent, args, { FormDB }, info) {
        let Form = require('../models/form.model');
        const newForm = new Form({
            event_id: ObjectId(args.data.event_id),
            applicant: {
                name: args.data.applicant.name,
                gender: args.data.applicant.gender,
                birthday: args.data.applicant.birthday,
                email: args.data.applicant.email,
                phone: args.data.applicant.phone
            },
            emergency_contact: {
                name: args.data.emergency_contact.name,
                relationship: args.data.emergency_contact.relationship,
                phone: args.data.emergency_contact.phone
            },
            event_option: {
                category: args.data.event_option.category,
                partner: args.data.event_option.partner,
                group: args.data.event_option.group,
            }
        });

        await
            newForm.save();

        return true;
    },
}

module.exports = Mutation;