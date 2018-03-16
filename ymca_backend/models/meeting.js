
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Define meeting schema, meetings have a mentor, mentee, address, start and end time (for when they're meant to start and stop),
actual start and end time (for when they actually start and stop), notes from the mentor, and notes from the mentee, as well as a
meeting rating from the mentee. The number of extensions is also stored as there's a maximum number of extensions.
*/
const meetingSchema = new Schema({
    mentor: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    mentee: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    meetingAddress: {type: String, required: true},
    startTime: {type: Date},
    endTime: {type: Date},
    actualStartTime: {type: Date},
    actualEndTime: {type: Date},
    mentor_notes: {type: String},
    mentee_notes: {type: String},
    mentee_rating: {type: Number},
    number_of_extensions: {type: Number, default: 0},
});



module.exports = mongoose.model('Meeting', meetingSchema);
