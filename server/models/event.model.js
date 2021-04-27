const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    host_id: { type: Schema.Types.ObjectId, ref: 'Host' },
    title: { type: String, required: true, trim: true, minlength: 3 },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, trim: true, minlength: 3 },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;