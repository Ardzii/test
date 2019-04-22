const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requiested-With, Content-type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/customers', (req, res, next) => {
  const customer = req.body;
  console.log(customer);
  res.status(201).json({
    message: 'Customer added successfully!'
  });
});

app.get('/api/customers', (req, res, next) => {
  const customers = [
    {
      id: 'tafea124ageg23',
      name: 'Ketchup',
      vat: 'BXXXXXXXX'
    },
    {
      id: 'tafea11315asfq1',
      name: 'Danone',
      vat: 'BXXXXXXXX'
    }
  ];
  res.status(200).json({
    message: 'Customers fetched successfully!',
    customers: customers
  });
});

module.exports = app;
