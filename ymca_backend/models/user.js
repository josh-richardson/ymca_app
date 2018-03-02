const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const onymous = require('./onymous');


const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    linkedModel: {type: Schema.Types.Mixed, required: true}
});

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};

userSchema.post('remove', function(item) {
    onymous.remove({_id: item.linkedModel._id}).exec();
});


module.exports = mongoose.model('User', userSchema);