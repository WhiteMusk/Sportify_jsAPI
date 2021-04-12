const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/eventList').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/eventInfo').get((req, res) => {
    Event.find({ _id: req.query.id })
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newEvent = new Event({
        title: req.body.title,
        date: Date.parse(req.body.date),
        location: req.body.location,
        description: req.body.description
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;