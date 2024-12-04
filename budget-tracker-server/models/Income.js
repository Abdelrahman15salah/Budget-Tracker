const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Income', incomeSchema);