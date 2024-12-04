const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); // Import the dashboard routes
const expenseRoutes = require('./routes/expense');
const authMiddleware = require('./middleware/auth');
const incomeRoutes = require('./routes/income');
const goalRoutes = require('./routes/goal');
const reportRoutes = require('./routes/reports');
// In your app.js or server.js file
const budgetRoutes = require('./routes/budget');

require('dotenv').config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200'  // Angular frontend URL
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);   // Authentication routes
app.use('/api/dashboard', dashboardRoutes);   // Dashboard routes (for financial data)
app.use('/api/expenses', authMiddleware, expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/budget', budgetRoutes);
// Connect to MongoDB (you can change the URL to your MongoDB Compass connection string)
mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Budget Tracker API!');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
