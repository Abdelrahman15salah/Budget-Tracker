const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const mongoose = require('mongoose');
const router = express.Router();

// Function to aggregate income data
const getTotalIncome = async (userId) => {
  const incomeData = await Income.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalIncome: { $sum: '$amount' } } },
  ]);
  return incomeData.length > 0 ? incomeData[0].totalIncome : 0; // Return 0 if no income found
};

// Function to aggregate expense data
const getTotalExpenses = async (userId) => {
  const expensesData = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
  ]);
  return expensesData.length > 0 ? expensesData[0].totalExpenses : 0; // Return 0 if no expenses found
};

// Main route for dashboard data
router.get('/', authMiddleware, async (req, res) => {
  // console.log('User in Request:', req.user); // Log user info for debugging

  try {
    const userId = req.user.userId;

    // Log the userId to check if it's correct
    // console.log('User ID:', userId);

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the user data to verify
    // console.log('User Data:', user);

    // Fetch total income and total expenses
    const totalIncome = await getTotalIncome(userId);
    const totalExpenses = await getTotalExpenses(userId);

    // Calculate balance (income - expenses), ensuring it never goes negative
    const balance = totalIncome - totalExpenses;

    // Calculate progress towards the savings goal
    const savingsGoal = user.savingsGoal || 0;
    let progressTowardsGoal = 0;
    
    // Only calculate progress if a savings goal is set
    if (savingsGoal > 0) {
      progressTowardsGoal = ((totalIncome - totalExpenses) / savingsGoal) * 100;
    }

    // console.log('Total Income:', totalIncome);
    // console.log('Total Expenses:', totalExpenses);
    // console.log('Balance:', balance);
    // console.log('Progress Towards Goal:', progressTowardsGoal);

    // Send the response with the user's financial data
    res.json({
      income: totalIncome,
      expenses: totalExpenses,
      balance: balance,
      savingsGoal: savingsGoal,
      progressTowardsGoal: progressTowardsGoal.toFixed(2), // Display percentage progress
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
