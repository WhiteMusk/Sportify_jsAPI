const ObjectId = require('mongodb').ObjectID;

const Query = {
    async getAllEvents(parent, args, { Event }, info) {
        try {
            return await Event.find();
        } catch(err) {
            throw new Error(err);
        }
    },
    async getEvent(parent, args, { Event }, info) {
        try {
            return await Event.findOne({ _id: ObjectId(args.id) });
        } catch(err) {
            throw new Error(err);
        }
    },
}

module.exports = Query;