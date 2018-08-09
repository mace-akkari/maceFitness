const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('mongodb').MongoClient;

const endpoints = require('./routes/api');
const pages = require('./routes/pages');

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = {
    opening: 6,
    closing: 21
};

app.locals.days = DAYS;
app.locals.hours = HOURS;

let db;
mongodb.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        console.error(err);
    } 
    db = client.db('timetable');
    app.locals.db = db;
});

app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'pug');

// home page
app.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
});

app.get('/error', function(req, res) {
    res.render('error', { title: 'AGGGHHH'});
});

// Log in
app.get('/login', function(req, res) {
    res.render('login', {title: 'Log In'});
});

app.post('/login', function(req, res){
    if (req.body.email && req.body.password){
        return res.send('Logged In !!')
    } else {
        return res.render('error', { title: 'AGGGHHH'})
    }
});

app.use('/stylesheets', express.static('views/stylesheets'));
app.use(endpoints);
app.use(pages);

app.listen(8080);