const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const mentor = require('../models/users/mentor');
const admin = require('../models/users/admin');
const manager = require('../models/users/manager');
const user = require('../models/user');


const objectExistsByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({[key]: value}, function (err, result) {
            if (err) reject(false);
            if (result) resolve(false);
            resolve(true);
        });
    });
};


const findObjectByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({[key]: value}, function (err, result) {
            if (err) return reject(err);
            if (result === null) reject("Not found");
            resolve(result);
        });
    });
};


const updateSchemaField = function (schema, object, fieldName, fieldValue) {
    const obj = schema['schema']['paths'][fieldName]['instance'];
    if (obj === "String") {
        object[fieldName] = fieldValue;
    } else if (obj === "Date") {
        object[fieldName] = new Date(parseInt(fieldValue))
    } else if (obj === "ObjectID") {
        object[fieldName] = fieldValue;
    } else {
        console.log(obj);
    }
};


const updateObject = function (schema, paramName, req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    const newObject = JSON.parse(data.json);
    findObjectByKey(schema, '_id', data[paramName]).then(result_object => {
        for (const prop in newObject) {
            updateSchemaField(schema, result_object, prop, newObject[prop]);
        }
        result_object.save(function (err, result) {
            if (err) res.json(err);
            res.json({success: true, result: result})
        });
    });
};


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
    updateObject,
    findObjectByKey,
    updateSchemaField,
    createMentor,
    createAdmin,
    createManager
};