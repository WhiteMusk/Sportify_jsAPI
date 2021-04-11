const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // const title = req.body.title;
    // const date = Date.parse(req.body.date);
    // const location = req.body.location;
    // const description = req.body.description;

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