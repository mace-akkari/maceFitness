const Router = require('express').Router;
const getHours = require('../helper/getHours');
const pages = Router();

pages.get('/book', function(req, res) {
  const { days, hours } = req.app.locals;
  const businesshours = getHours(hours.opening, hours.closing)
  const options = {
      hours: businesshours,
      days
  } 
  res.render('book', options);
});

pages.get('/contacts', function (req, res) {
  const { db } = req.app.locals;
  db.collection('contacts').find().toArray((err, result) => {
      const contacts = result.map((result) => ({
          name: result.name,
          lastName: result.surname,
          phone: +result.number
      }));
      res.render('contacts', { contacts });
  });
});

pages.get('/contactsajax', function (req, res) {
    res.render('contactsajax'); 
});

pages.post('/appointment/create', (req, res) => {
  const { db } = req.app.locals;
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

pages.post('/appointment/delete', (req, res) => {
  const { db } = req.app.locals;
  db.collection('timetable').deleteMany({
      hour: req.body.hour,
      day: req.body.day
  }, () => res.redirect(301, '/timetable'))
});

pages.get('/timetable', function (req, res) {
  const { db, days, hours } = req.app.locals;
  const businesshours = getHours(hours.opening, hours.closing);
  db.collection('timetable').find().toArray((err, result) => {
      const appointments = result.map((result) => ({
          name: result.firstname,
          time: +result.hour,
          day: +result.day
      }))
      const timetableOptions = {
          days,
          hours: businesshours,
          appointments
      };
      res.render('timeTable', timetableOptions);
  });
});

module.exports = pages;