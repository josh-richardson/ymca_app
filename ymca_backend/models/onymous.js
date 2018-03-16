/**
 * @module models/mentee
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Onymous is a base schema for anything with a name.
 * @type {Schema}
 */
const onymousSchema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
});


module.exports = mongoose.model('Onymous', onymousSchema);
