const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  text: String
}, {
  timestamps: true
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
