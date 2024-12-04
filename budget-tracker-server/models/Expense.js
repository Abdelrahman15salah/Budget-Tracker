// Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now } // Timestamp for the expense
});

module.exports = mongoose.model('Expense', ExpenseSchema);
