const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onymous = require('./onymous');


const mentorSchema = new Schema({
    phone: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    manager: {type: Schema.Types.ObjectId, ref: 'Manager', required: false},
}, {discriminatorKey: 'kind'});


module.exports = onymous.discriminator('Mentor', mentorSchema);
