const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const user = require('../../models/user');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');
const api_utils = require('../../utils/api_utils');
const mentor = require('../../models/users/mentor');

/*
* Documentation for this section of the code is within Postman, located at:
* https://documenter.getpostman.com/view/3091732/ymca/77o3fiZ#5121651f-1cf6-9bf1-faeb-3c634ccccf73
* */

router.post('/register', [
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
    const user = matchedData(req);
    api_utils.createMentor(user).then(user => res.json(user)).catch(err => {
        res.status(500).json(config.debug ? err : {error: 'Server error occurred'});
    });
});


router.post('/authenticate', [
    check('email').isEmail().withMessage('Invalid email').trim().normalizeEmail().escape(),
    check('password', 'Invalid password').isLength({min: 5}),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
    }
    const authReq = matchedData(req);

    user.findOne({email: authReq.email}).then(foundUser => {

        if (!foundUser || !foundUser.validPassword(authReq.password)) {
            res.status(403).json({error: "Invalid username or password"});
        } else {
            const encodedToken = jwt.encode(foundUser, config.jwt_secret);
            res.json({token: encodedToken});
        }
    }).catch(err => {
        res.status(500).json(config.debug ? err : {error: 'Server error occurred'});
    });
});


module.exports = router;
