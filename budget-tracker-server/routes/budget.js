const express = require('express');
const authMiddleware = require('../middleware/auth');
const Budget = require('../models/Budget');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  const { month, year, categories } = req.body;
  const userId = req.user.userId;

  try {
    const existingBudget = await Budget.findOne({ userId, month, year });
    if (existingBudget) {
      return res.status(400).json({ message: 'Budget for this month already exists' });
    }

    const newBudget = new Budget({
      userId,
      month,
      year,
      categories,
    });

    await newBudget.save();
    res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:month/:year', authMiddleware, async (req, res) => {
  const { month, year } = req.params;
  const userId = req.user.userId;

  try {
    const budget = await Budget.findOne({ userId, month, year });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
