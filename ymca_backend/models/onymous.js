const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const onymousSchema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
});


module.exports = mongoose.model('Onymous', onymousSchema);
