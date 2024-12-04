const express = require('express');
const Goal = require('../models/Goal');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Add a new goal
router.post('/add', authMiddleware, async (req, res) => {
  const  name = req.body.name;
  const targetAmount = req.body.targetAmount;
  const deadline = req.body.deadline;

  if (!name || !targetAmount || !deadline) {
    return res.status(400).json({ message: 'Name, target amount, and deadline are required' });
  }

  try {
    const goal = new Goal({
      userId: req.user.userId,
      name,
      targetAmount,
      deadline,
    });

    await goal.save();
    res.status(201).json({ message: 'Goal added successfully', goal });
  } catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Retrieve all goals
router.get('/', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (error) {
    console.error('Error retrieving goals:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit a goal
router.put('/edit/:id', authMiddleware, async (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { name, targetAmount, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal updated successfully', updatedGoal });
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a goal
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
