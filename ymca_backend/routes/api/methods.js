const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const user = require('../../models/user');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');
const twilio = require('../../utils/twilio');

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);

router.post('/emergency', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        const managerPhone = req.user.manager.phone;
        const managerEmail = req.user.manager.email;
        twilio.sendSms(managerPhone, "An emergency happened, send help!");
        twilio.sendEmergencyCall(managerPhone)


    }
);




module.exports = router;