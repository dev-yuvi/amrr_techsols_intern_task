const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coverImage: String
});

module.exports = mongoose.model('Item', itemSchema);
