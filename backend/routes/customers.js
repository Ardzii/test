const express = require('express');
const Customer = require('../models/customer');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/docs');
  }
});

router.post('', (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    vat: req.body.vat
  });
  customer.save().then(result => {
    res.status(201).json({
      message: 'Customer added successfully!',
      customerId: result.id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const customer = new Customer({
    _id: req.body.id,
    name: req.body.name,
    vat: req.body.vat
  });
  Customer.updateOne({_id: req.params.id}, customer)
    .then(result => {
      res.status(200).json({ message: "Update successfull!" });
    });
});

router.get('', (req, res, next) => {
  Customer.find()
    .then(documents => {
      res.status(200).json({
        message: 'Customers fetched successfully!',
        customers: documents
      });
    }).catch(err => console.log(err));
});

router.get('/:id', (req, res, next) => {
  Customer.findById(req.params.id).then(customer =>{
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found!"});
    }
  });
});

router.delete("/:id", (req, res, next) => {
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

module.exports = router;
