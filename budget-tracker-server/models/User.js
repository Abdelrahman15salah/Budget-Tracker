const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add the new fields
  income: {
    type: Number,
    default: 6969,
  },
  expenses: {
    type: Number,
    default: 6969,
  },
  savingsGoal: {
    type: Number,
    default: 6969,
  },
  // Other fields like profile data, etc.
});

module.exports = mongoose.model('User', userSchema);
