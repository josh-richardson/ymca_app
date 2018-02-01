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

const updateSchemaField = function (schema, fieldName, fieldValue) {
    const obj = schema[fieldName];
    if (typeof(obj) === "string" || obj instanceof String) {
        schema[fieldName] = fieldValue;
    } else if (obj instanceof Date) {
        schema[fieldName] = new Date(fieldValue * 1000)
    } else if (obj instanceof mongoose.Types.ObjectId) {
        schema[fieldName] = fieldValue;
    }
};


const updateObject = function (model, paramName, req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    const newObject = JSON.parse(data.json);
    findObjectByKey(model, '_id', data[paramName]).then(result_object => {
        for (const prop in newObject) {
            updateSchemaField(result_object, prop, newObject[prop]);
        }
        result_object.save(function (err, result) {
            if (err) res.json(err);
            res.json({success: true, result: result})
        });
    });
};



module.exports = {objectExistsByKey, updateObject, findObjectByKey, updateSchemaField};