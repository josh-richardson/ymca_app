/**
 * @module utils/api_utils
 */

const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const mentor = require('../models/users/mentor');
const admin = require('../models/users/admin');
const manager = require('../models/users/manager');
const user = require('../models/user');
const onymous = require('../models/onymous');

/**
 * @method objectExistsByKey - Checks if a database object exists by key and value.
 * @param {string} model - The database object type.
 * @param {string} key - The key to look by.
 * @param {string} value - The value to look by.
 * @return {boolean} Whether the object exists.
 */
const objectExistsByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({[key]: value}, function (err, result) {
            if (err) reject(false);
            if (result) resolve(false);
            resolve(true);
        });
    });
};

/**
 * @method findObjectByKey - Returns a database object if it exists by a key and value.
 * @param {string} model - The database object type.
 * @param {string} key - The key to look by.
 * @param {string} value - The value to look by.
 * @return {object} - The object if found.
 */
const findObjectByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({[key]: value}, function (err, result) {
            if (err) return reject(err);
            if (result === null) reject("Not found");
            resolve(result);
        });
    });
};

/**
 * @method createUser - Creates a user when passed a user type object for the given user.
 * @param {object} value - JS object with details of user to be created.
 * @param {object} userObject - User model type.
 * @return {user} The user object, if successfully created.
 */
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

/**
 * @method createMentor - Creates a mentor and returns it.
 * @param {object} value - JS object containing mentor details.
 * @return {mentor} The mentor object, if successfully created.
 */
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

/**
 * @method createAdmin - Creates an admin and returns it.
 * @param {object} value - JS object containing admin details.
 * @return {mentor} The admin object, if successfully created.
 */
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

/**
 * @method createManager - Creates a manager and returns it.
 * @param {object} value - JS object containing manager details.
 * @return {manager} The manager object, if successfully created.
 */
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
