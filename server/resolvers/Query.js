const ObjectId = require('mongodb').ObjectID;

const Query = {
    async allEvents(parent, args, { EventDB }, info) {
        return await EventDB.find();
    },
    async event(parent, args, { EventDB }, info) {
        return await EventDB.findOne({ _id: ObjectId(args.id) });
    },
}

module.exports = Query;