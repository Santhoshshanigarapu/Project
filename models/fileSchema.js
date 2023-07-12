// fileSchema.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  updatedFiles: [String],
  version: [String],
});

module.exports = mongoose.model('file', fileSchema);
