const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Default Name" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // You can hash the password before storing
});

const User = mongoose.model('User', userSchema);

module.exports = User;
