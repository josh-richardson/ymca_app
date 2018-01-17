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
const mentee = require('../../models/mentee');
const meeting = require('../../models/meeting');

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


router.post('/meetings/create', passport.authenticate('jwt', {session: false}), [
        check('mentee').escape(),
        check('meetingAddress').exists().escape(),
        check('startTime').isNumeric().escape(),
        check('endTime').isNumeric().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        api_utils.findObjectByKey(mentee, '_id', data.mentee).then(result_mentee => {
            const newMeeting = new meeting();
            newMeeting.mentor = req.user;
            newMeeting.mentee = result_mentee;
            newMeeting.meetingAddress = data.meetingAddress;
            newMeeting.startTime = new Date(data.startTime * 1000);
            newMeeting.endTime = new Date(data.endTime * 1000);
            newMeeting.save(function (err, result) {
                if (!err) {
                    res.json({success: true})
                }
            });
        });
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
        meeting.find({mentor: req.user}).then(result_meetings => {
            console.log(result_meetings.paths);
            res.json(result_meetings);
        });
    }
);


router.post('/mentees/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        console.log(req.user);
        mentee.find({mentor: req.user}).then(result_mentees => {
            res.json(result_mentees);
        });
    }
);

module.exports = router;