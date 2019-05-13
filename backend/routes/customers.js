const express = require('express');
const Customer = require('../models/customer');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let err = new Error('invalid mime type!');
    if (isValid) {
      err = null;
    }
    cb(err, 'backend/docs');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split('').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const upload = multer({storage: storage});

router.post('', upload.any(),
// .fields([
//   {name: 'fs'},
//   {name: 'cd'},
//   {name: 'id'},
//   {name: 'ad'},
//   ]),
  (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    vat: req.body.vat,
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
