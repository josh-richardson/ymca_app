/**
 * @module models/users/manager
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onymous = require('../onymous');

/**
 * Define manager schema, managers have all properties of onymous plus phone, first name, second name.
 * @type {Schema}
 */
const managerSchema = new Schema({
    phone: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
}, {discriminatorKey: 'kind'});



module.exports = onymous.discriminator('Manager', managerSchema);
