const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const multer = require('multer');

//configure multer 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});

var upload = multer({ storage: storage });


//middale were th check if user  is logged in 
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
};

//login user 
router.get('/login', (req, res) => {

    res.render('user/login', {
        error: req.flash("error")
    });

});

router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })  
);



//sign up user
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash("error")
    });
});

router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signup',
        failureFlash: true
    })
);



//profile user
router.get('/profile', isAuthenticated, (req, res) => {

    // if (req.isAuthenticated()) {
    //     res.render('user/profile', {
    //         success: req.flash("success")
    //     });
    // } else {
    //     res.redirect('/users/login');
    // }

    // res.render('user/profile', {
    //     success: req.flash("success")
    // });
    res.render('user/profile', {
        success: req.flash("success")

    });
});

//upload user Avatar
router.post('/uploadAvatar', upload.single("avatar"), (req, res)  =>{
    var newFields = {
        avatar: req.file.filename
    };
    User.updateOne({ _id: req.user._id }, newFields, (err)  =>{
        if (!err) {
            res.redirect('/users/profile');
        }

    });
});



//logout user
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});



module.exports = router;