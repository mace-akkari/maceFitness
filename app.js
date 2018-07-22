const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Router = express.Router;
const mongodb = require('mongodb').MongoClient;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = {
    opening: 6,
    closing: 21
};
const errMsg = ('All fields required.');

function getHours(opening, closing) {
    const hours = [];
    for(let i = opening; i <= closing; i++) {
        hours.push(i)
    }
    return hours;
 }

let db;
mongodb.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        console.error(err);
    } 
    db = client.db('timetable');
})

app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'pug');

// home page
app.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
});

app.get('/er-ror', function(req, res) {
    res.render('er-ror', { title: 'AGGGHHH'});
});

// Log in
app.get('/login', function(req, res) {
    res.render('login', {title: 'Log In'});
});

app.post('/login', function(req, res){
    if (req.body.email && req.body.password){
        return res.send('Logged In !!')
    } else {
        return res.send(errMsg)
    }
});

app.get('/contacts', function(req, res) {
    res.render('contacts', { title: 'Contacts'});
});

app.get('/book', function(req, res) {
    const hours = getHours(HOURS.opening, HOURS.closing)
    const options = {
        hours,
        days: DAYS
    } 
    res.render('book', options);
});

app.post('/appointment/create', (req, res) => {
    let fieldName = req.body.firstname;
    const appBooked = `Confirmed booking of ${fieldName}`;
    db.collection('timetable').update({
        hour: req.body.hour,
        day: req.body.day
    }, {
        firstname: req.body.firstname,
        hour: req.body.hour,
        day: req.body.day
    }, {
        upsert: true
    },
    () => res.redirect(301, '/timetable'));
});

app.post('/appointment/delete', (req, res) => {
    db.collection('timetable').deleteMany({
        hour: req.body.hour,
        day: req.body.day
    }, () => res.redirect(301, '/timetable'))
});

  app.get('/timetable', function(req, res) {
    const days = DAYS;
    const hours = getHours(HOURS.opening, HOURS.closing);
    db.collection('timetable').find().toArray((err, result) => {
        const appointments = result.map((result) => ({
            name: result.firstname,
            time: +result.hour,
            day: +result.day
        }))
        const timetableOptions = {
            days,
            hours,
            appointments
        };
        res.render('timeTable', timetableOptions);
    });
});

app.use('/stylesheets', express.static('views/stylesheets'));

const endpoints = Router();

endpoints.get('/api/appointments', (req, res) => {
    db.collection('timetable').find().toArray((err, result) => {;
        res.json(result);
    });
});

app.use(endpoints);
app.listen(8080);