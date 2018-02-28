const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const onymous = require('./onymous');

const menteeSchema = new Schema({
    meetingAddress: {type: String, required: true},
    mentor: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    phone: {type: String, required: true},
}, {discriminatorKey: 'kind'});

module.exports = onymous.discriminator('Mentee', menteeSchema);
