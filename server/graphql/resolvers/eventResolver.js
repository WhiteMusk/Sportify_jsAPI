const Event = require('../../models/event.model');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        async getEvents() {
            try {
                return await Event.find();
            } catch(err) {
                throw new Error(err);
            }
        },
        async getEvent(_, { eventId }) {
            try {
                const event = await Event.findOne({ _id: ObjectId(eventId) });
                if (event) {
                    return event;
                } else {
                    throw new Error("Event not found");
                }
            } catch(err) {
                throw new Error(err);
            }
        },
    }
}