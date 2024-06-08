const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aniSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
});

const Ani = mongoose.model("User", aniSchema);
module.exports = Ani;
