const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/User');





//saving user object in the session
//passport site
passport.serializeUser((user, done)  =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

//register  user
passport.use('local.signup', new localStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'password do not match'));
    } else {
        User.findOne({ email: username }, (err, user)  =>{
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('error', 'Email already used'));
            }
            if (!user) {
                //create user
                var newUser = new User();
                newUser.email = req.body.email;
                newUser.password = newUser.hashPasswords(req.body.password);
                newUser.avatar = "profile.png";
                newUser.save((err, user) => {
                    if (!err) {
                        return done(null, user, req.flash('success', 'User Added'));
                    } else {
                        console.log(err);
                    }
                });
            }
        });
    }
}));

//login strategy

passport.use('local.login', new localStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, (req, username, password, done) => {

    //find user
    User.findOne({ email: username }, (err, user) => {

        if (err) {

            return done(null, false, req.flash('error', 'something wrong happened'));
        }
        if (!user) {

            return done(null, false, req.flash('error', 'user was not found'));
        }

        if (user) {

            if (user.comparePasswords(password, user.password)) {

                return done(null, user, req.flash('success', 'welcome back'));

            } else {

                return done(null, false, req.flash('error', 'password is wrong'));

            }
        }
    });

}));