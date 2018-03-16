/**
 * @module models/mentee
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const onymous = require('./onymous');

/**
 * Mentees have a meeting address, mentor, and phone number, as well as all the properties of onymous.
 * @type {Schema} 
 */
const menteeSchema = new Schema({
    meetingAddress: {type: String, required: true},
    mentor: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    phone: {type: String, required: true},
}, {discriminatorKey: 'kind'});

module.exports = onymous.discriminator('Mentee', menteeSchema);
