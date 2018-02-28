const mongoose = require('mongoose');
const user = require('../models/user');
const mentee = require('../models/mentee');
const manager = require('../models/users/manager');
const meeting = require('../models/meeting');
const admin = require('../models/users/admin');
const mentor = require('../models/users/mentor');

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


const adminDetails = {
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
};

const mentee2Details = {
    'email': "mentee2@gmail.com",
    'firstName': "Jeff",
    'secondName': "Bezos",
    'phone': '07450760408',
    'meetingAddress': '12 Scotland St.'
};

const newUser = new user();
newUser.email = adminDetails.email;
newUser.password = newUser.hashPassword(adminDetails.password);
const newAdmin = new admin();
newAdmin.firstName = adminDetails.firstName;
newAdmin.secondName = adminDetails.secondName;
newAdmin.phone = adminDetails.phone;
newAdmin.save((err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Saved admin");
        newUser.linkedModel = newAdmin;
        newUser.save(function (err, result) {
            if (err) {
                console.log(Error)
            } else {
                console.log("Created new user");
                const newMentee = new mentee();
                newMentee.firstName = menteeDetails.firstName;
                newMentee.secondName = menteeDetails.secondName;
                newMentee.phone = menteeDetails.phone;
                newMentee.meetingAddress = menteeDetails.meetingAddress;
                newMentee.mentor = newUser;
                newMentee.save((err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Created new mentee");
                        const newMeeting = new meeting();
                        newMeeting.mentor = newUser;
                        newMeeting.mentee = newMentee;
                        newMeeting.meetingAddress = newMentee.meetingAddress;
                        newMeeting.startTime = new Date();
                        newMeeting.endTime = new Date();
                        newMeeting.save(function (err, result) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("Created new meeting");
                                process.exit();
                            }
                        });
                    }
                });
            }
        });
    }
});


//
// newMentee.save(function (err, result) {
//     if (!err) {
//
//     }
// });
// const newMentee2 = new mentee();
// newMentee2.email = mentee2Details.email;
// newMentee2.firstName = mentee2Details.firstName;
// newMentee2.secondName = mentee2Details.secondName;
// newMentee2.phone = mentee2Details.phone;
// newMentee2.meetingAddress = mentee2Details.meetingAddress;
// newMentee2.mentor = newUser;
// newMentee2.save(function (err, result) {
// });
