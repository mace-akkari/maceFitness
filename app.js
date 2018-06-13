const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contacts', function(req, res) {
    res.render('contacts');
});

app.get('/timetable', function(req, res) {
    res.render('timetable');
});

app.use('views/stylesheets', express.static('stylesheets'));


app.listen(8080);