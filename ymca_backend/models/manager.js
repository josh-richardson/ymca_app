const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const managerSchema = new Schema({
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
});






module.exports = mongoose.model('Manager', managerSchema);
