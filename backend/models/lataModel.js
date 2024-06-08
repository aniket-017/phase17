// bolt.js

const mongoose = require("mongoose");

const lataSchema = new mongoose.Schema({
  boltType: {
    type: String,
    required: true,
  },
  partNo: String,
  standard: String,
  certification: String,
  surfaceFinish: String,
  brand: String,
  industryStandard: industryStandard,
  material: String,
  threadSize: String,
  length: String,
  description: String,
});

const Lata = mongoose.model("Lata", lataSchema);

module.exports = Lata;
