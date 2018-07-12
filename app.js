const express = require('express');
const app = express();
const Router = express.Router;
const mongodb = require('mongodb').MongoClient;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let db;
mongodb.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        console.error(err);
    } 
    db = client.db('timetable');
})

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
});

app.get('/contacts', function(req, res) {
    res.render('contacts', { title: 'Contacts'});
});

app.get('/book', function(req, res) {
    const options = {
        hours,
        days: DAYS
    } 
    res.render('book', options);
});

app.post('/book', (req, res) => {
    db.collection('timetable').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

// app.post('/book', function(req, res){

// });

app.get('/timetable', function(req, res) {
    const days = DAYS;
    db.collection('appointments').find().toArray((err, result) => {
        const timetableOptions = {
            days,
            openingTime: 6,
            closingTime: 21,
            appointments: result
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