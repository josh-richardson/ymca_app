const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const mentor = require('../models/users/mentor');
const admin = require('../models/users/admin');
const manager = require('../models/users/manager');


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
        return res.status(422).json({errors: errors.mapped()});
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


const createMentor = (value) => {
    const mentorObject = new mentor();
    mentorObject.firstName = value.firstName;
    mentorObject.secondName = value.secondName;
    mentorObject.phone = value.phone;
    return createUser(value, mentorObject);
};


const createAdmin = (value) => {
    const adminObject = new admin();
    adminObject.firstName = value.firstName;
    adminObject.secondName = value.secondName;
    adminObject.phone = value.phone;
    return createUser(value, adminObject);
};


const createManager = (value) => {
    const managerObject = new manager();
    managerObject.firstName = value.firstName;
    managerObject.secondName = value.secondName;
    managerObject.phone = value.phone;
    return createUser(value, managerObject);
};


const createUser = (value, userObject) => {
    return new Promise((resolve, reject) => {
        const newUser = new user();
        newUser.email = value.email;
        newUser.password = newUser.hashPassword(value.password);
        userObject.save((err, result) => {
            if (err) {
                return reject(err);
            }
            newUser.linkedModel = userObject;
            newUser.save(function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(newUser);
            });
        });

    })
};


module.exports = {objectExistsByKey, updateObject, findObjectByKey, updateSchemaField, createMentor, createAdmin, createManager};