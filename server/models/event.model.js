const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
    host_id: { type: Schema.Types.ObjectId, ref: 'Host', required: true },
    title: { type: String, required: true, trim: true, minlength: 3 },
    date: { type: Date },
    dateEnd: { type: Date },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    registrationInfo: { type: String, trim: true },
    trafficInfo: { type: String, trim: true },
    prize: { type: String, trim: true },
    highlight: { type: String },
    fee: { type: Number },
    public: { type: Boolean },
    release: { type: Boolean }
}, {
    timestamps: true,
});

const Event = model('Event', eventSchema);

module.exports = Event;