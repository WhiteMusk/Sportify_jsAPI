const router = require('express').Router();
let Form = require('../models/form.model');

router.route('/').get((req, res) => {
    Form.find()
        .then(forms => res.json(forms))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newForm = new Form({ 
        applicant: {
            name: req.body.applicant.name,
            gender: req.body.applicant.gender,
            email: req.body.applicant.email,
            phone: req.body.applicant.phone
        },
        emergency_contact: {
            name: req.body.emergency_contact.name,
            relationship: req.body.emergency_contact.relationship,
            phone: req.body.emergency_contact.phone
        }
    });

    newForm.save()
        .then(() => res.json('Form added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;