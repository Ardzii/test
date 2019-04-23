const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const customersRoutes = require('./routes/customers');

const app = express();

// psswd yM9yiySH2k4n1N91
mongoose.connect('mongodb+srv://admin:yM9yiySH2k4n1N91@cluster0-43bjp.mongodb.net/central-test?retryWrites=true', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to mongo...');
  }).catch(
    err => console.log(err)
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requiested-With, Content-type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/customers', customersRoutes);

module.exports = app;
