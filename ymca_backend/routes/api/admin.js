const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const user = require('../../models/user');
const mentee = require('../../models/mentee');
const manager = require('../../models/user');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');
const api_utils = require('../../utils/db_utils');


function isAdmin(req, res, next) {
    if (req.user.admin)
        return next();
    res.status(403).json({error: "Access Denied"})
}


router.post('/mentors', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {
        user.find().then(users => {
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
        user.findByIdAndRemove(data.id, function (err, user) {
            if (err) res.json(err);
            res.json({success: true});
        });
    }
);

router.post('/mentors/edit', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {

    }
);


router.post('/mentees', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {
        mentee.find().then(mentees => {
            res.json(mentees);
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
    ],
    function (req, res) {

    }
);


router.post('/mentees/delete', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {

    }
);


router.post('/mentees/edit', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {

    }
);


router.post('/managers', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {
        manager.find().then(managers => {
            res.json(managers);
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
        check('firstName').exists().isAlphanumeric().escape(),
        check('secondName').exists().isAlphanumeric().escape(),
        check('phone').exists().isMobilePhone("en-GB").escape(),
    ],
    function (req, res) {

    }
);


router.post('/managers/delete', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {

    }
);


router.post('/managers/edit', passport.authenticate('jwt', {session: false}), isAdmin,
    function (req, res) {

    }
);


module.exports = router;