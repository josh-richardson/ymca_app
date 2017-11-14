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

module.exports = {objectExistsByKey, deleteObjectByKey, findObjectByKey};