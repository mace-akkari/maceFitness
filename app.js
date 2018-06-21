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
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timetableOptions = {
        days,
        openingTime: 6,
        closingTime: 21
    };
    res.render('timetable', timetableOptions);
});

app.use('/stylesheets', express.static('views/stylesheets'));


app.listen(8080);