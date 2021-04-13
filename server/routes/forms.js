const router = require('express').Router();
let Form = require('../models/form.model');

router.route('/').get((req, res) => {
    Form.find()
        .then(forms => res.json(forms))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newApplication').post((req, res) => {
    const newForm = new Form({
        event_id: req.body.application.event_id,
        applicant: {
            name: req.body.application.applicant.name,
            gender: req.body.application.applicant.gender,
            birthday: req.body.application.applicant.birthday,
            email: req.body.application.applicant.email,
            phone: req.body.application.applicant.phone
        },
        emergency_contact: {
            name: req.body.application.emergency_contact.name,
            relationship: req.body.application.emergency_contact.relationship,
            phone: req.body.application.emergency_contact.phone
        },
        event_option: {
            category: req.body.application.event_option.category,
            partner: req.body.application.event_option.partner,
            group: req.body.application.event_option.group,
        }
    });

    newForm.save()
        .then(() => res.json('Form added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;