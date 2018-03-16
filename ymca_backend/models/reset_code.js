const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resetCodeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    used: {type: Date},
    created: {type: Date},
    code: {type: String},
});

module.exports = mongoose.model('ResetCode', resetCodeSchema);
