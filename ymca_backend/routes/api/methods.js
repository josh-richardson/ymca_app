const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const user = require('../../models/user');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');
const twilio = require('../../utils/twilio');
const sendgrid = require('../../utils/sendgrid');
const api_utils = require('../../utils/api_utils');
const manager = require('../../models/manager');


router.post('/profile', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.send(req.user);
    }
);

router.post('/emergency', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        api_utils.findObjectByKey(manager, '_id', req.user.manager).then(result_manager => {
            twilio.sendSms(result_manager.phone, "An emergency happened, send help!");
            // twilio.sendEmergencyCall(managerPhone);
            sendgrid.sendEmail(result_manager.email, "YMCA Emergency", "An enmergency happaned, send help!");
            res.json({success: true});
        }).catch((err) => {
            console.log(err);
        })
    }
);


router.post('/meetings/create', passport.authenticate('jwt', {session: false}),
    function (req, res) {

    }
);


router.post('/meetings/edit', passport.authenticate('jwt', {session: false}),
    function (req, res) {

    }
);


router.post('/meetings/delete', passport.authenticate('jwt', {session: false}),
    function (req, res) {

    }
);

router.post('/meetings/', passport.authenticate('jwt', {session: false}),
    function (req, res) {

    }
);


router.post('/mentees/', passport.authenticate('jwt', {session: false}),
    function (req, res) {

    }
);

module.exports = router;