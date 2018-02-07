const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');


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


module.exports = {objectExistsByKey, updateObject, findObjectByKey, updateSchemaField};