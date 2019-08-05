const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

const User = require('../models/User');
const config = require('../config');


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({username: username})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'User is not registered'})
                }

                bcrypt.compare(password, user.hash, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user, {message: 'Logged in successfully'});
                    } else {
                        return done(null, false, {message: 'Password incorrect'})
                    }
                })
            })
    })
);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('jwt:secret')
    }, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.user._id}, (err, user) => {
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