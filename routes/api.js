const Router = require('express').Router;

const endpoints = Router();

endpoints.get('/api/appointments', (req, res) => {
    const { db } = req.app.locals;
    db.collection('timetable').find().toArray((err, result) => {
        res.json(result);
    });
});

endpoints.get('/api/contacts', (req, res) => {
  const { db } = req.app.locals;
  db.collection('contacts').find().toArray((err, result) => {
      res.json(result);
  });
});

module.exports = endpoints;