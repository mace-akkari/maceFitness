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

// CRUD 

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

app.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
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

app.post('/book', (req, res) => {
    console.log(req.body);
    db.collection('timetable').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

// app.post('/book', function(req, res){

// });

app.get('/timetable', function(req, res) {
    const days = DAYS;
    const hours = getHours(HOURS.opening, HOURS.closing);
    db.collection('appointments').find().toArray((err, result) => {
        const timetableOptions = {
            days,
            hours,
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
