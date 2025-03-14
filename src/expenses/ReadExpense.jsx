import { useState, useEffect } from 'react';

export default function CreateExpenses() {
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

    return (
        <div className="container mt-4">
            <p>.</p>
            <h1 className="mb-4 text-center">Expenses</h1>

            <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                <select
                    className="form-select w-auto bg-dark text-white"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="list-group">
                {expenses
                    .filter((expense) => selectedCategory === '' || expense.categoryId === selectedCategory)
                    .map((expense) => (
                        <li key={expense.id} className="list-group-item bg-dark text-white">
                            <h3 className="mb-1 text-danger">{expense.amount} KZT</h3>
                            <p className="mb-1">{expense.comment}</p>
                            <p className="text-secondary">{expense.date}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
