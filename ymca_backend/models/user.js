const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const onymous = require('./onymous');

//User is a base schema for all objects which can log in
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    linkedModel: {type: Schema.Types.Mixed, required: true}
});

//Method to hash passwords when user is created
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};


//Method to check a given password is valid when a user attempts to log in
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//Removes user password when user is serialized to JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};

//Removes the onymous object in the database associated with the user object when the user is deleted
userSchema.post('remove', function(item) {
    onymous.remove({_id: item.linkedModel._id}).exec();
});


module.exports = mongoose.model('User', userSchema);