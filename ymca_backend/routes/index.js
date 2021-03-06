/**
 * @module routes
 */

const sendgrid = require("../utils/sendgrid");

const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const api_utils = require('../utils/api_utils');
const user = require('../models/user');
const resetcode = require('../models/reset_code');
const crypto = require('crypto');
const Memcached = require('memcached');

const memcached = new Memcached('127.0.0.1:11211');


/*
* Documentation for this section of the code is within Postman, located at:
* https://documenter.getpostman.com/view/3091732/ymca/77o3fiZ#5121651f-1cf6-9bf1-faeb-3c634ccccf73
* */

/**
 * GET home page.
 * @method get_home
 */
router.get('/', function (req, res, next) {
    res.json({message: 'Welcome to our API'});
});

router.get('/reset_password', function (req, res, next) {
    res.render("reset_password", {})
});

/**
 * Sends a reset password email to a given email address.
 * @method send_reset_email
 * @param {string} email - The email address associated with the account to reset.
 */
router.post('/send_reset_email', [check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail().escape()], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    api_utils.findObjectByKey(user, 'email', data.email).then(result_user => {
        var actualCode = crypto.randomBytes(16).toString('hex').substring(0, 8);
        memcached.set(result_user.email, actualCode, 1800, function (err) {
            if (err === null || err === undefined) {
                sendgrid.sendEmail(data.email, "YMCA Password Reset", "Your YMCA password reset code is: " + actualCode + ". It will be valid for the next 30 minutes.");
                res.json({progressed: true});
            }else {
                res.json({progressed: false});
            }
        });
    }).catch(ex => {
        res.json({progressed: false});
    });
});

/**
 * Resets a password.
 * @method reset_password
 * @param {string} email - Email address associated with the account.
 * @param {string} password - New password.
 * @param {string} code - Password reset code
 */
router.post('/reset_password', [
    check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail().escape(),
    check('password', 'Passwords must be at least 5 characters').isLength({min: 5}),
    check('code', 'Reset code must be 8 characters').exists(),
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    api_utils.findObjectByKey(user, 'email', data.email).then(result_user => {
        memcached.get(result_user.email, function (err, memcached_data) {
            if (err) {
                res.json({success: false});
            } else {
                if (data.code === memcached_data) {
                    result_user.password = result_user.hashPassword(data.password);
                    result_user.save(function (err, result) {
                        if (err) res.json(err);
                        memcached.del(result_user.email, (err) => {
                            if (err !== undefined) { console.log (err) }
                        });
                        res.json({success: true, result: result})
                    });
                    } else {
                    res.json({success: false})
                }
            }
        });
    }).catch(() => {
        res.json({success: false})
    });
});



module.exports = router;
