const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name: { type: String, require: true },
  vat: { type: String, require: true }
});

module.exports = mongoose.model('Customer', customerSchema);
