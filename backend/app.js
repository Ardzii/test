const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Customer = require('./models/customer');

const app = express();

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// yM9yiySH2k4n1N91

app.post('/api/customers', (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    vat: req.body.vat
  });
  customer.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Customer added successfully!',
      customerId: result.id
    });
  });
});

app.get('/api/customers', (req, res, next) => {
  Customer.find()
    .then(documents => {
      res.status(200).json({
        message: 'Customers fetched successfully!',
        customers: documents
      });
    }).catch(err => console.log(err));
});

app.delete("/api/customers/:id", (req, res, next) => {
  Customer.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({
      message: 'Customer deleted',
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  });
});

module.exports = app;
