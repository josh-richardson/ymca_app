const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const mentor = require('../models/users/mentor');
const admin = require('../models/users/admin');
const manager = require('../models/users/manager');
const user = require('../models/user');
const onymous = require('../models/onymous');

//Checks if a database object exists by key and value
const objectExistsByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({[key]: value}, function (err, result) {
            if (err) reject(false);
            if (result) resolve(false);
            resolve(true);
        });
    });
};

//Returns a database object if it exists by a key and value
const findObjectByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({[key]: value}, function (err, result) {
            if (err) return reject(err);
            if (result === null) reject("Not found");
            resolve(result);
        });
    });
};

//Creates a user when passed a user type object for the given user.
const createUser = (value, userObject) => {
    return new Promise((resolve, reject) => {
        const newUser = new user();
        newUser.email = value.email;
        newUser.password = newUser.hashPassword(value.password);
        userObject.save((err, result) => {
            if (err) {
                reject(err);
            }
            newUser.linkedModel = userObject;
            newUser.save(function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve({success: true, result: newUser});
            });
        });

    })
};

//Creates a mentor & returns it
const createMentor = (value) => {
    return new Promise((resolve, reject) => {
        const mentorObject = new mentor();
        mentorObject.firstName = value.firstName;
        mentorObject.secondName = value.secondName;
        mentorObject.phone = value.phone;
        createUser(value, mentorObject).then(user => {
            resolve(user)
        }).catch(err => {
            reject(err);
        });
    });
};

//Creates an admin and returns it
const createAdmin = (value) => {
    return new Promise((resolve, reject) => {
        const adminObject = new admin();
        adminObject.firstName = value.firstName;
        adminObject.secondName = value.secondName;
        adminObject.phone = value.phone;
        createUser(value, adminObject).then(user => {
            resolve(user)
        }).catch(err => {
            reject(err);
        });
    });
};

//Creates a manager and returns it
const createManager = (value) => {
    return new Promise((resolve, reject) => {
        const managerObject = new manager();
        managerObject.firstName = value.firstName;
        managerObject.secondName = value.secondName;
        managerObject.phone = value.phone;
        createUser(value, managerObject).then(user => {
            resolve(user)
        }).catch(err => {
            reject(err);
        });
    });
};


module.exports = {
    objectExistsByKey,
    findObjectByKey,
    createMentor,
    createAdmin,
    createManager
};