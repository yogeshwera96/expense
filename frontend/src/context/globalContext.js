import React, { useContext, useState } from "react";
import axios from 'axios';
import { useAuthContext } from "./AuthContext";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    // Add Income
    const addIncome = async (income) => {
        if (!user || !user.token) {
            setError("User not authenticated");
            return;
        }

        try {
            await axios.post(`${BASE_URL}add-income`, income, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            getIncomes();  // Refresh incomes after successful addition
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add income");
        }
    };

    // Get Incomes
    const getIncomes = async () => {
        if (!user || !user.token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}get-incomes`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch incomes");
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {
        if (!user || !user.token) {
            setError("User not authenticated");
            return;
        }

        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            getIncomes();  // Refresh incomes after deletion
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete income");
        }
    };

    // Add Expense
    const addExpense = async (expense) => {
        if (!user || !user.token) {
            setError("User not authenticated");
            return;
        }

        try {
            await axios.post(`${BASE_URL}add-expense`, expense, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            getExpenses();  // Refresh expenses after addition
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add expense");
        }
    };

    // Get Expenses
    const getExpenses = async () => {
        if (!user || !user.token) {
            setError("User not authenticated");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch expenses");
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        if (!user || !user.token) {
            setError("User not authenticated");
            return;
        }

        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            getExpenses();  // Refresh expenses after deletion
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete expense");
        }
    };

    // Calculate total income
    const totalIncome = () => incomes.reduce((acc, income) => acc + income.amount, 0);

    // Calculate total expenses
    const totalExpenses = () => expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Calculate total balance
    const totalBalance = () => totalIncome() - totalExpenses();

    // Get recent transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
