const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const user = require('../../models/user');
const config = require('../../config/config');
const jwt = require('jwt-simple');
const passport = require('passport');



router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);


module.exports = router;