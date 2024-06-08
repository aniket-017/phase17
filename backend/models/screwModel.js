// screw.js

const mongoose = require("mongoose");

const screwSchema = new mongoose.Schema({
  screwType: {
    type: String,
    required: true,
  },
  partNo: String,
  standard: String,
  certification: String,
  surfaceFinish: String,
  brand: String,
  industryStandard: String,
  material: String,
  threadSize: String,
  length: String,
  rating: String,
  description: String,
});

const Screw = mongoose.model("Screw", screwSchema);

module.exports = Screw;
