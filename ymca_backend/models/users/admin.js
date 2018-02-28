const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onymous = require('../onymous');


const adminSchema = new Schema({
    phone: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
}, {discriminatorKey: 'kind'});



module.exports = onymous.discriminator('Admin', adminSchema);
