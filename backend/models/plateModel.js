// plate.js

const mongoose = require("mongoose");

const plateSchema = new mongoose.Schema({
  plateType: {
    type: String,
    required: true,
  },
  partNo: String,
  material: String,
  thickness: String,
  width: String,
  length: String,
  surfaceFinish: String,
  usage: String,
  pattern: String,
  grade: String,
  certification: String,
  description: String,
});

const Plate = mongoose.model("Plate", plateSchema);

module.exports = Plate;
