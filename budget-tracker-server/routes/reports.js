const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');
const mongoose = require('mongoose');
const  verifyToken   = require('../middleware/auth');

router.get('/generate', verifyToken , async (req, res) => {
    try {
        const userId = req.user.userId;
        // console.log("User ID:", userId);
        const incomeData = await Income.find({ userId: userId });
        // console.log("Income Data:", incomeData);
        
        const expenseData = await Expense.find({ userId: userId });
        // console.log("Expense Data:", expenseData);
        // Fetching total income for the user
        const totalIncome = await Income.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } }, 
            { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
        ]);

        const totalExpenses = await Expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, totalExpenses: { $sum: '$amount' } } }
        ]);

        const goals = await Goal.find({ userId: userId });

        const goalProgress = goals.map(goal => {
            const savedAmount = goal.savedAmount || 0;
            const progress = (savedAmount / goal.targetAmount) * 100;
            return {
                goalName: goal.name,
                targetAmount: goal.targetAmount,
                savedAmount: savedAmount,
                progress: progress.toFixed(2)
            };
        });

        const report = {
            totalIncome: totalIncome[0] ? totalIncome[0].totalIncome : 0,
            totalExpenses: totalExpenses[0] ? totalExpenses[0].totalExpenses : 0,
            incomeVsExpenses: totalIncome[0] ? totalIncome[0].totalIncome - totalExpenses[0].totalExpenses : 0,
            goalProgress: goalProgress
        };
        // console.log("totalIncome, totalExpenses:", totalIncome, totalExpenses);

        return res.json(report);
    } catch (error) {
        console.error('Error generating report:', error);
        return res.status(500).json({ error: 'Error generating report' });
    }
});

module.exports = router;
