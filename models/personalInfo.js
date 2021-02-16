const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalInfoSchema = new Schema({
  type: String,
  text: String
}, {
  timestamps: true
});

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);
module.exports = PersonalInfo;
