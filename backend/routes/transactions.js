const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const Income = require('../models/IncomeModel')

const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router();
//require auth for all transactions
router.use(requireAuth)

    
    router.post('/add-income', addIncome)
    router.get('/get-incomes', getIncomes)
    router.delete('/delete-income/:id', deleteIncome)
    router.post('/add-expense', addExpense)
    router.get('/get-expenses', getExpense)
    router.delete('/delete-expense/:id', deleteExpense)
    // Adding a new income
router.post('/incomes', (req, res) => {
    const { amount, source } = req.body;
    const newIncome = new Income({
      amount,
      source,
      user_id: req.user._id // Assuming req.user contains the logged-in user
    });
  
    newIncome.save()
      .then(income => res.json(income))
      .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router