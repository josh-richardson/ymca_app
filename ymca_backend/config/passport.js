const passport = require('passport');
const user = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config');

const jwt_conf = {
    secretOrKey: config.jwt_secret,
    jwtFromRequest: ExtractJwt.fromBodyField('auth')
};


passport.use(new JwtStrategy(jwt_conf, function (jwt_payload, done) {
    user.findOne({_id: jwt_payload._id}, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));