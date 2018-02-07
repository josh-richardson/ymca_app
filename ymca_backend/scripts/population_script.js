const mongoose = require('mongoose');
const user = require('../models/user');
const mentee = require('../models/mentee');
const manager = require('../models/manager');
const config = require('../config/config');
process.env.NODE_ENV = 'test';


mongoose.Promise = Promise;

mongoose.connect(config.db_path, {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true
    },
    function (err) {
        if (err) {
            console.log("Failed to connect to mongo: " + err);
        } else {
            console.log('Dropping database: ' + config.db_path);
            mongoose.connection.db.dropDatabase();
        }
    });


const userDetails = {
    'email': "test@gmail.com",
    'password': "password123",
    'firstName': 'Jack',
    'secondName': 'Jones',
    'phone': '07450760208'
};

const menteeDetails = {
    'email': "mentee@gmail.com",
    'firstName': "Javeth",
    'secondName': "Jared",
    'phone': '07450760408',
    'meetingAddress': 'Some scottish road somewhere'
}


const newUser = new user();
newUser.email = userDetails.email;
newUser.password = newUser.hashPassword(userDetails.password);
newUser.firstName = userDetails.firstName;
newUser.secondName = userDetails.secondName;
newUser.admin = true;
newUser.phone = userDetails.phone;
newUser.save(function (err, result) {
    if (err) {
        console.log(Error)
    } else {
        console.log("Created new user");
        const newMentee = new mentee();
        newMentee.email = menteeDetails.email;
        newMentee.firstName = menteeDetails.firstName;
        newMentee.secondName = menteeDetails.secondName;
        newMentee.phone = menteeDetails.phone;
        newMentee.meetingAddress = menteeDetails.meetingAddress;
        newMentee.mentor = newUser;
        newMentee.save(function (err, result) {
            if (!err) {
                console.log("Created new mentee");
                process.exit();
            }
        });
    }
});


