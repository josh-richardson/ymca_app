var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET users listing. */

router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/register',
    failureFlash: true
}));


module.exports = router;
