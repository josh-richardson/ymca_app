const sendgrid = require("../utils/sendgrid");

const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const api_utils = require('../utils/api_utils');
const user = require('../models/user');
const resetcode = require('../models/reset_code');
const crypto = require('crypto');
// const csrf = require('csurf');
// const csrfProtection = csrf();
// router.use(csrfProtection);


/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({message: 'Welcome to our API'});
});

router.get('/reset_password', function (req, res, next) {
    res.render("reset_password", {})
});

router.post('/send_reset_email', [check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail().escape()], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    api_utils.findObjectByKey(user, 'email', data.email).then(result_user => {
        var actualCode = crypto.randomBytes(16).toString('hex').substring(0, 8);
        const reset_code = new resetcode();
        reset_code.user = result_user;
        reset_code.created = new Date();
        reset_code.code = actualCode;
        reset_code.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                sendgrid.sendEmail(data.email, "YMCA Password Reset", "Your YMCA password reset code is: " + actualCode + ". It will be valid for the next 30 minutes.");
            }
        });
    }).catch(ex => {
        console.log(ex);
    });
    res.json({progressed: true});
});

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
        api_utils.findObjectByKey(resetcode, 'code', data.code).then(reset_code => {
            if (reset_code.user.equals(result_user._id)) {
                result_user.password = result_user.hashPassword(data.password);
                res.json({success: true})
            } else {
                res.json({success: false})
            }
        }).catch(() => {
            res.json({success: false})
        });
    }).catch(() => {
        res.json({success: false})
    });
});

module.exports = router;
