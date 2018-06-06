const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.send('Welcome to the home page!');
});

app.get('/timeTable', function(req, res) {
    res.send('Time table coming soon!');
});

app.get('/contacts', function(req, res) {
    res.send('Contacts page coming soon!');
});


app.listen(8080);