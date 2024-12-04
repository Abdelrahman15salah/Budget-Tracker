// models/Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  categories: [
    {
      category: { type: String, required: true },
      limit: { type: Number, required: true },
      spent: { type: Number, default: 0 }, // Track how much has been spent
    },
  ],
});

module.exports = mongoose.model('Budget', budgetSchema);
