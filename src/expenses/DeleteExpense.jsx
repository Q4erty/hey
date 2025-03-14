import { useState, useEffect } from 'react';

export default function DeleteExpense() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/categories')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return setCategories(data);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/expenses')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setExpenses(data);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert(`Expense with id ${id} deleted successfully!`);
                setExpenses(expenses.filter((expense) => expense.id !== id));
            } else {
                alert('Failed to delete expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div className="container p-4 rounded">
            <h1 className="text-center mb-4 mt-5">Expenses</h1>
            <div className="mb-3">
                <select
                    className="form-select bg-dark text-white"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((expense) => (
                        <option key={expense.id} value={expense.id}>
                            {expense.name}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="list-unstyled">
                {expenses
                    .filter((expense) => {
                        if (selectedCategory === '') return true;
                        return expense.categoryId === selectedCategory;
                    })
                    .map((expense) => (
                        <li key={expense.id} className="mb-3 p-3 bg-dark rounded">
                            <h3 className="text-danger">{expense.amount}</h3>
                            <p>{expense.comment}</p>
                            <p className="text-secondary">{expense.date}</p>
                            <button className="btn btn-danger" onClick={() => handleDelete(expense.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
