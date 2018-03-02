const mongoose = require('mongoose');
const user = require('../models/user');
const mentee = require('../models/mentee');
const manager = require('../models/users/manager');
const meeting = require('../models/meeting');
const admin = require('../models/users/admin');
const mentor = require('../models/users/mentor');
var faker = require('faker');

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


const basePassword = "password";
let passCounter = 0;

const createAdmin = (details) => {
    return new Promise((resolve, reject) => {
        const adminUser = new user();
        adminUser.email = details.email;
        console.log(details.password);
        adminUser.password = adminUser.hashPassword(details.password);
        const newAdmin = new admin();
        newAdmin.firstName = details.firstName;
        newAdmin.secondName = details.secondName;
        newAdmin.phone = details.phone;
        newAdmin.save((err, userResult) => {
            if (err) {
                console.log(err)
            } else {
                adminUser.linkedModel = newAdmin;
                adminUser.save(function (err, result) {
                    resolve(userResult);
                });
            }
        });

    });
};


const createManager = (details) => {
    return new Promise((resolve, reject) => {
        const managerUser = new user();
        managerUser.email = details.email;
        managerUser.password = managerUser.hashPassword(details.password);
        const newManager = new manager();
        newManager.firstName = details.firstName;
        newManager.secondName = details.secondName;
        newManager.phone = details.phone;
        newManager.save((err, userResult) => {
            if (err) {
                console.log(err)
            } else {
                managerUser.linkedModel = newManager;
                managerUser.save(function (err, result) {
                    resolve(userResult);
                });
            }
        });
    });
};


const createMentor = (details, manager) => {
    return new Promise((resolve, reject) => {
        const newMentor = new mentor();
        newMentor.firstName = details.firstName;
        newMentor.secondName = details.secondName;
        newMentor.phone = details.phone;
        newMentor.manager = manager;
        const mentorUser = new user();
        mentorUser.email = details.email;
        mentorUser.password = mentorUser.hashPassword(details.password);
        newMentor.save((err, userResult) => {
            if (err) {
                console.log("Error:" + err)
            } else {
                mentorUser.linkedModel = newMentor;
                mentorUser.save((err, result) => {
                    resolve(userResult)
                });
            }
        });
    });
};


const createMentee = (details, mentor) => {
    return new Promise((resolve, reject) => {
        const newMentee = new mentee();
        newMentee.firstName = details.firstName;
        newMentee.secondName = details.secondName;
        newMentee.phone = details.phone;
        newMentee.meetingAddress = details.meetingAddress;
        newMentee.mentor = mentor;
        newMentee.save((err, result) => {
            if (err) {
                console.log(err);
            } else {
                resolve(result);
            }
        });
    });
};


const createMeeting = (mentorUser, menteeUser) => {
    return new Promise((resolve, reject) => {
        const newMeeting = new meeting();
        newMeeting.mentor = mentorUser;
        newMeeting.mentee = menteeUser;
        newMeeting.meetingAddress = menteeUser.meetingAddress;
        newMeeting.startTime = new Date();
        newMeeting.endTime = new Date();
        newMeeting.save(function (err, result) {
            if (err) {
                console.log(err)
            } else {
                resolve(result);
            }
        });
    });
};


for (let i = 0; i < 3; i++) {
    let adminEmail = faker.internet.email().toLowerCase();
    createAdmin({
        firstName: faker.name.firstName(),
        secondName: faker.name.lastName(),
        email: adminEmail,
        phone: faker.phone.phoneNumber().replace("-", ""),
        password: adminEmail
    }).then((admin) => {
    });

    let managerEmail = faker.internet.email().toLowerCase();
    createManager({
        firstName: faker.name.firstName(),
        secondName: faker.name.lastName(),
        email: managerEmail,
        phone: faker.phone.phoneNumber().replace("-", ""),
        password: managerEmail
    }).then((manager) => {

        for (let j = 0; j < 3; j++) {
            let mentorEmail = faker.internet.email().toLowerCase();
            createMentor({
                firstName: faker.name.firstName(),
                secondName: faker.name.lastName(),
                email: mentorEmail,
                phone: faker.phone.phoneNumber().replace("-", ""),
                password: mentorEmail
            }, manager).then((mentor) => {
                for (let k = 0; k < 3; k++) {
                    createMentee({
                        firstName: faker.name.firstName(),
                        secondName: faker.name.lastName(),
                        meetingAddress: faker.address.streetAddress(),
                        phone: faker.phone.phoneNumber().replace("-", ""),
                    }, mentor).then((mentee) => {
                        createMeeting(mentor, mentee).then((meeting) => {
                        });
                    });

                }
            })
        }
    });
}



