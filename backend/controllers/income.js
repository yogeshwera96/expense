const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        user_id: req.user._id  // Associate income with the authenticated user
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount < 0 ) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await income.save();
        res.status(200).json({ message: 'Income Added', income });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(income);
};

exports.getIncomes = async (req, res) => {
    try {
        // Fetch only incomes for the logged-in user
        const incomes = await IncomeSchema.find({ user_id: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        // Make sure to check if the income belongs to the user before deleting
        const income = await IncomeSchema.findOneAndDelete({ _id: id, user_id: req.user._id });

        if (!income) {
            return res.status(404).json({ message: 'Income not found or not authorized' });
        }

        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
