const mongoose = require('mongoose');

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

const deleteObjectByKey = function (model, key, value) {
    return new Promise(function (resolve, reject) {
        model.findOne({key: value}, function (err, result) {

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



module.exports = {objectExistsByKey, deleteObjectByKey, findObjectByKey, updateSchemaField};