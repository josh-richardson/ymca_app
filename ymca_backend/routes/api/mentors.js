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
const manager = require('../../models/users/manager');
const mentee = require('../../models/mentee');
const meeting = require('../../models/meeting');


/*
* Documentation for this section of the code is within Postman, located at:
* https://documenter.getpostman.com/view/3091732/ymca/77o3fiZ#5121651f-1cf6-9bf1-faeb-3c634ccccf73
* */

router.post('/profile', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json(req.user);
    }
);


router.post('/emergency', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        api_utils.findObjectByKey(manager, '_id', req.user.manager).then(result_manager => {
            twilio.sendSms(result_manager.phone, "An emergency happened, send help!");
            sendgrid.sendEmail(result_manager.email, "YMCA Emergency", "An enmergency happaned, send help!");
            res.json({success: true});
        }).catch((err) => {
            res.json(err);
        })
    }
);


router.post('/meetings/add', passport.authenticate('jwt', {session: false}), [
        check('id').escape(),
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
        api_utils.findObjectByKey(mentee, '_id', data.id).then(result_mentee => {
            const newMeeting = new meeting();
            newMeeting.mentor = req.user;
            newMeeting.mentee = result_mentee;
            newMeeting.meetingAddress = data.meetingAddress;
            newMeeting.startTime = new Date(parseInt(data.startTime));
            newMeeting.endTime = new Date(parseInt(data.endTime));
            newMeeting.save(function (err, result) {
                if (err) res.json(err);
                res.json({success: true, result: result})
            });
        }).catch((err) => {
            res.json(err);
        });
    }
);


router.post('/meetings/edit', passport.authenticate('jwt', {session: false}), [
        check('id').exists().escape(),
        check('json').exists().isJSON(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        const newObj = JSON.parse(data.json);
        meeting.findOneAndUpdate({_id: data.id}, {$set: newObj}, {new: true}, function (err, doc) {
            if (err) return res.json(err);
            res.json({success: true, result: doc})
        });

    }
);


router.post('/meetings/extend', passport.authenticate('jwt', {session: false}), [
        check('id').exists().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        meeting.findOne({_id: data.id, mentor: req.user}, (err, meeting) => {
            if (err) {
                res.json({error: "Failed to find", success: false});
            }
            if (meeting.number_of_extensions === undefined || meeting.number_of_extensions === null) {
                meeting.number_of_extensions = 0;
            }
            if (meeting.number_of_extensions < 6) {
                meeting.number_of_extensions += 1;
                meeting.endTime = new Date(Date.parse(meeting.endTime) + 0.25 * 60 * 60 * 1000);
                meeting.save(function (err, result) {
                    if (err) res.json(err);
                    res.json({success: true, result: result})
                });
            } else {
                res.json({error: "maximum number reached", success: false})
            }
        });

    }
);


router.post('/meetings/delete', passport.authenticate('jwt', {session: false}), [
        check('id').exists().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        meeting.deleteOne({_id: data.id, mentor: req.user}, function (err, user) {
            if (err) res.json(err);
            res.json({success: true});
        });
    }
);


router.post('/meetings/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        meeting.find({mentor: req.user}).then(result_meetings => {
            res.json(result_meetings);
        }).catch((err) => {
            res.json(err);
        })
    }
);


router.post('/mentees/', passport.authenticate('jwt', {session: false}),
    function (req, res) {
        mentee.find({mentor: req.user.linkedModel}).then(result_mentees => {
            res.json(result_mentees);
        }).catch((err) => {
            res.json(err);
        })
    }
);

module.exports = router;
