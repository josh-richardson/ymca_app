/**
 * @module models/users/mentor
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onymous = require('../onymous');

/**
 * Define mentor schema, mentors have all properties of onymous plus phone, first name, second name, and manager.
 * @type {Schema}
 */
const mentorSchema = new Schema({
    phone: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    manager: {type: Schema.Types.ObjectId, ref: 'User', required: false},
}, {discriminatorKey: 'kind'});


module.exports = onymous.discriminator('Mentor', mentorSchema);
