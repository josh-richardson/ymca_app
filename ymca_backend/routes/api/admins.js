const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const user = require('../../models/user');
const mentee = require('../../models/mentee');
const manager = require('../../models/users/manager');
const mentor = require('../../models/users/mentor');
const admin = require('../../models/users/admin');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');
const api_utils = require('../../utils/api_utils');


function isAdmin(req, res, next) {
    if (req.user.linkedModel.__t === "Admin")
        return next();
    res.status(403).json({error: "Access Denied"})
}


router.post('/add', passport.authenticate('jwt', {session: false}), isAdmin, [
    check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail()
        .custom(value => {
            return api_utils.objectExistsByKey(user, 'email', value).then(retVal => {
                if (!retVal) throw new Error();
                return true;
            }).catch(() => {
                return false;
            });
        }).withMessage("This email is either in use, or a server error occurred.").escape(),
    check('password', 'Passwords must be at least 5 characters').isLength({min: 5}),
    check('phone').exists().isMobilePhone("en-GB").escape(),
    check('firstName').exists().isAlphanumeric().escape(),
    check('secondName').exists().isAlphanumeric().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    api_utils.createAdmin(data).then(user => res.json(user)).catch(err => {
        res.status(500).json(config.debug ? err : {error: 'Server error occurred'});
    });
});


router.post('/mentors', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {
        user.find({'linkedModel.__t': "Mentor"}).then(users => {
            res.json(users);
        })
    }
);


router.post('/mentors/delete', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('id').exists().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        user.findOne({_id: data.id}, (err, user) => {
            if (err) res.json(err);
            else if (!user) res.json({success: false, error: 'User not found'});
            else {
                user.remove();
                res.json({success: true});
            }
        });
    }
);


router.post('/mentors/edit', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('id').escape(),
        check('json').exists(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        const newObj = JSON.parse(data.json);
        user.findOne({_id: data.id}, (err, resultUser) => {
            mentor.findOneAndUpdate({_id: resultUser.linkedModel._id}, {$set: newObj}, {new: true}, function (err, doc) {
                if (err) return res.json(err);
                res.json({success: true, result: doc})
            });
        });
    }
);


router.post('/mentors/add', passport.authenticate('jwt', {session: false}), isAdmin, [
    check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail()
        .custom(value => {
            return api_utils.objectExistsByKey(user, 'email', value).then(retVal => {
                if (!retVal) throw new Error();
                return true;
            }).catch(() => {
                return false;
            });
        }).withMessage("This email is either in use, or a server error occurred.").escape(),
    check('password', 'Passwords must be at least 5 characters').isLength({min: 5}),
    check('phone').exists().isMobilePhone("en-GB").escape(),
    check('firstName').exists().isAlphanumeric().escape(),
    check('secondName').exists().isAlphanumeric().escape(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const data = matchedData(req);
    api_utils.createMentor(data).then(user => res.json(user)).catch(err => {
        res.status(500).json(config.debug ? err : {error: 'Server error occurred'});
    });
});


router.post('/mentees', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {
        mentee.find({}).then(users => {
            res.json(users);
        })
    }
);


router.post('/mentees/add', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail()
            .custom(value => {
                return api_utils.objectExistsByKey(mentee, 'email', value).then(retVal => {
                    if (!retVal) throw new Error();
                    return true;
                }).catch(() => {
                    return false;
                });
            }).withMessage("This email is either in use, or a server error occurred.").escape(),
        check('meetingAddress').exists().escape(),
        check('firstName').exists().isAlphanumeric().escape(),
        check('secondName').exists().isAlphanumeric().escape(),
        check('phone').exists().isMobilePhone("en-GB").escape(),
        check('mentorEmail').exists().isEmail(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        const newMentee = new mentee();
        newMentee.email = data.email;
        newMentee.firstName = data.firstName;
        newMentee.secondName = data.secondName;
        newMentee.phone = data.phone;
        newMentee.meetingAddress = data.meetingAddress;
        api_utils.findObjectByKey(user, 'email', data.mentorEmail).then(result_user => {
            newMentee.mentor = result_user;
            newMentee.save(function (err, result) {
                if (!err) {
                    res.json({"success": true, "result": newMentee})
                }
            });
        });
    }
);


router.post('/mentees/delete', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('id').exists().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        mentee.findByIdAndRemove(data.id, function (err, user) {
            if (err) res.json(err);
            res.json({success: true});
        });
    }
);


router.post('/mentees/edit', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('id').escape(),
        check('json').exists(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        const newObj = JSON.parse(data.json);
        mentee.findOneAndUpdate({_id: data.id}, {$set: newObj}, {new: true}, function (err, doc) {
            if (err) return res.json(err);
            res.json({success: true, result: doc})
        });
    }
);


router.post('/managers', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {
        user.find({'linkedModel.__t': "Manager"}).then(users => {
            res.json(users);
        })
    }
);


router.post('/managers/add', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail()
            .custom(value => {
                return api_utils.objectExistsByKey(manager, 'email', value).then(retVal => {
                    if (!retVal) throw new Error();
                    return true;
                }).catch(() => {
                    return false;
                });
            }).withMessage("This email is either in use, or a server error occurred.").escape(),
        check('password', 'Passwords must be at least 5 characters').isLength({min: 5}),
        check('firstName').exists().isAlphanumeric().escape(),
        check('secondName').exists().isAlphanumeric().escape(),
        check('phone').exists().isMobilePhone("en-GB").escape(),

    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        api_utils.createManager(data).then(user => res.json(user)).catch(err => {
            res.status(500).json(config.debug ? err : {error: 'Server error occurred'});
        });
    }
);


router.post('/managers/delete', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('id').exists().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        user.findOne({_id: data.id}, (err, user) => {
            if (err) res.json(err);
            else if (!user) res.json({success: false, error: 'User not found'});
            else {
                user.remove();
                res.json({success: true});
            }
        });
    }
);


router.post('/managers/edit', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('id').escape(),
        check('json').exists(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        const newObj = JSON.parse(data.json);
        user.findOne({_id: data.id}, (err, resultUser) => {
            manager.findOneAndUpdate({_id: resultUser.linkedModel._id}, {$set: newObj}, {new: true}, function (err, doc) {
                if (err) return res.json(err);
                res.json({success: true, result: doc})
            });
        });
    }
);


router.post('/managers/assign', passport.authenticate('jwt', {session: false}), isAdmin, [
        check('mentorEmail').isEmail().withMessage('Invalid email').trim().normalizeEmail().escape(),
        check('managerEmail').isEmail().withMessage('Invalid email').trim().normalizeEmail().escape(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        const data = matchedData(req);
        api_utils.findObjectByKey(user, 'email', data.mentorEmail).then(result_user => {
            api_utils.findObjectByKey(user, 'email', data.managerEmail).then(result_manager => {
                result_user.linkedModel.manager = result_manager;
                result_user.save(function (err, result) {
                    if (!err) {
                        res.json({success: true, result: result_user})
                    } else {
                        res.json(err);
                    }
                });
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }
);


module.exports = router;
