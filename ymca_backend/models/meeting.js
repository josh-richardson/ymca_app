const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const meetingSchema = new Schema({
    mentor: {type: Schema.Types.ObjectId, ref: 'Mentor', required: true},
    mentee: {type: Schema.Types.ObjectId, ref: 'Mentee', required: true},
    meetingAddress: {type: String, required: true},
    startTime: {type: Date},
    endTime: {type: Date},
    mentor_notes: {type: String},
    mentor_rating: {type: Number},
    mentee_notes: {type: String},
    mentee_rating: {type: Number},

});

module.exports = mongoose.model('Meeting', meetingSchema);
