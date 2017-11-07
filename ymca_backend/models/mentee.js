const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menteeSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    phone: {type: String, required: true},
    meetingAddress: {type: String, required: true},
    mentor: {type: Schema.Types.ObjectId, ref: 'Mentor', required: false},

});

module.exports = mongoose.model('Mentee', menteeSchema);
