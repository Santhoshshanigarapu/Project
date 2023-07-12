const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
 email: {
  type: String,
  unique: true,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'user',
  enum: ["user", "supervisor", "admin"]
 },
 accessToken: {
  type: String
 }
});
 
module.exports = mongoose.model('User',UserSchema, 'User');
 