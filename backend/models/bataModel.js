// plate.js

const mongoose = require('mongoose');

const BataSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Phone: String
});

const Bata = mongoose.model('Bata', BataSchema);

module.exports = Bata;
