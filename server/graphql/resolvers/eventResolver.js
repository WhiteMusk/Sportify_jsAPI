const Event = require('../../models/event.model');
const Host = require('../../models/host.model');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    Query: {
        async getEvents() {
            try {
                return await Event.find();
            } catch (err) {
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
            } catch (err) {
                throw new Error(err);
            }
        },
        async hostEvents(parent, args) {
            return await Event.find({ host_id: ObjectId(args.host_id) });
        },
        async getEventHost(_, { event_id }) {
            try {
                const event = await Event.findOne({ _id: ObjectId(event_id) });
                const host = await Host.findOne({ _id: event.host_id });
                if (host) {
                    return host;
                } else {
                    throw new Error("Host not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async newEvent(parent, args, { EventDB }, info) {
            const newEvent = new Event({
                host_id: ObjectId(args.data.host_id),
                title: args.data.title,
                public: args.data.public,
                release: args.data.release,
            });
            await
                newEvent.save();

            return true;
        },
        async editEvent(parent, args, { EventDB }, info) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err) {
                    if (event) {
                        event.title = args.data.title;
                        event.date = args.data.date;
                        event.dateEnd = args.data.dateEnd;
                        event.location = args.data.location;
                        event.description = args.data.description;
                        event.highlight = args.data.highlight;
                        event.fee = args.data.fee;
                        event.save();
                    }
                }
            });

            return true;
        },
        async saveRichEditor(parent, args, { EventDB }, info) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err) {
                    if (event) {
                        if (args.data.description !== undefined)
                            event.description = args.data.description;
                        if (args.data.registrationInfo !== undefined)
                            event.registrationInfo = args.data.registrationInfo;
                        if (args.data.trafficInfo !== undefined)
                            event.trafficInfo = args.data.trafficInfo;
                        if (args.data.prize !== undefined)
                            event.prize = args.data.prize;
                        event.save();
                    }
                }
            });

            return true;
        },
        async editEventForm(_, args) {
            await Event.findOne({ _id: ObjectId(args.data._id) }, function (err, event) {
                if (!err && event) {
                    if (args.data.description !== undefined)
                        event.form.description = args.data.description;
                    if (args.data.blocks !== undefined)
                        event.form.blocks = args.data.blocks;
                    event.save();                  
                }
            });

            return true;
        },
    }
}