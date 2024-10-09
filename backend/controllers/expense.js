const nodemailer = require('nodemailer');
const ExpenseSchema = require("../models/ExpenseModel");
const User = require('../models/UserModel');  // Assuming you have a User model to track budgets

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user_id: req.user._id  // Associating the expense with the logged-in user
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Save the new expense
        await expense.save();

        // Calculate total expenses for the user
        const totalExpenses = await ExpenseSchema.aggregate([
            { $match: { user_id: req.user._id } },
            { $group: { _id: "$user_id", total: { $sum: "$amount" } } }
        ]);

        const totalAmountSpent = totalExpenses[0]?.total || 0;

        // Fetch the user's budget (assuming the user model contains a budget field)
        const user = await User.findById(req.user._id);
        const budget = user.budget;

        // Check if total expenses exceed 75% of the budget
        const threshold = budget * 0.75;
        if (totalAmountSpent > threshold) {
            // Send alert email if the 75% threshold is exceeded
            await sendAlertEmail(user.email, totalAmountSpent, budget);
        }

        res.status(200).json({ message: 'Expense Added', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(expense);
};

// Function to send alert email
const sendAlertEmail = async (email, totalExpenses, budget) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',  // Use any email service provider
        auth: {
            user: process.env.EMAIL_USER,  // Use environment variables for sensitive info
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Expense Alert: 75% of Your Budget Exceeded',
        text: `Hello,\n\nYour total expenses have exceeded 75% of your budget.\n\nTotal Expenses: $${totalExpenses}\nBudget: $${budget}\n\nPlease take action to control your spending.\n\nBest regards,\nExpenses Tracker Team`
    };

    await transporter.sendMail(mailOptions);
};


exports.getExpense = async (req, res) => {
    try {
        // Fetch only expenses for the logged-in user
        const expenses = await ExpenseSchema.find({ user_id: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Make sure to check if the expense belongs to the user before deleting
        const expense = await ExpenseSchema.findOneAndDelete({ _id: id, user_id: req.user._id });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or not authorized' });
        }

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
