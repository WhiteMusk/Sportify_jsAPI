const Event = require('../../models/event.model');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        async AllEvents() {
            try {
                return await Event.find();
            } catch(err) {
                throw new Error(err);
            }
        },
        async event(_, { eventId }) {
            try {
                return await Event.findOne({ _id: ObjectId(eventId) });
            } catch(err) {
                throw new Error(err);
            }
        },
    }
}