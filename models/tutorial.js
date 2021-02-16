const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  name: String,
  link: String
}, {
  timestamps: true
});

const Tutorial = mongoose.model("Tutorial", tutorialSchema);
module.exports = Tutorial;
