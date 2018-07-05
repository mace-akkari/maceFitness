const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
let db;
mongodb.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        console.error(err);
    } 
    db = client.db('mace');
})

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contacts', function(req, res) {
    res.render('contacts');
});

app.get('/timetable', function(req, res) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const appointments = db.collection('appointments').find().toArray((err, result) => {;
        const timetableOptions = {
            days,
            openingTime: 6,
            closingTime: 21,
            appointments: result
        };
        res.render('timetable', timetableOptions);
    });
});

app.use('/stylesheets', express.static('views/stylesheets'));

app.listen(8080);
