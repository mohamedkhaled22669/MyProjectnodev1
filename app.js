


const express = require('express');
const app = express();
const db = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportsetup = require('./config/passport-setup');



const path = require('path')
const PORT = process.env.PORT || 5000
//bring ejs template
app.set('view engine', 'ejs');


// bring  body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//session flash config
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}));
app.use(flash());

//bring passport
app.use(passport.initialize());
app.use(passport.session());


//store user object
app.get('*', (req, res, next)=> {

    res.locals.user = req.user || null;
    next();
});

//bring static
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('node_modules'));




app.get('/', (req, res) => {

    res.redirect('/events');
});


// bring events routes
const events = require('./routes/event-routes');
app.use('/events', events);


// bring users router
const users = require('./routes/user-routes');
app.use('/users', users);


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))



//listen to port 3000
app.listen(process.env.PORT || 3000)