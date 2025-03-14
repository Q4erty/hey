import { useState, useEffect } from 'react';

export default function CreateExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/expenses')
            .then((response) => response.json())
            .then((data) => setExpenses(data));
    }, []);

    const updateExpenses = () => {
        setExpenses((prevExpenses) =>
            prevExpenses.map((expense) => (expense.id === editData.id ? { ...expense, ...editData } : expense))
        );
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });

            if (response.ok) {
                updateExpenses();
                setEditData(null);
            } else {
                alert('Failed to update expense');
            }
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <div className="container p-4 rounded mt-5">
            <h1 className="text-center mb-4">Expenses</h1>
            <div className="mb-3">
                <select
                    className="form-select bg-dark text-white"
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
            <ul className="list-unstyled">
                {expenses
                    .filter((expense) => {
                        if (selectedCategory === '') return true;
                        return expense.categoryId === selectedCategory;
                    })
                    .map((expense) =>
                        editData?.id !== expense.id ? (
                            <li key={expense.id} className="mb-3 p-3 bg-dark rounded">
                                <h3 className="text-danger">{expense.amount}</h3>
                                <p>{expense.comment}</p>
                                <p className="text-secondary">{expense.date}</p>
                                <button className="btn btn-primary" onClick={() => setEditData(expense)}>
                                    Edit
                                </button>
                            </li>
                        ) : (
                            <li key={expense.id} className="mb-3 p-3 bg-dark rounded">
                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    value={editData.amount}
                                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                                />
                                <br />
                                <input
                                    className="form-control mb-3"
                                    value={editData.comment}
                                    onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
                                />
                                <br />
                                <input
                                    type="date"
                                    className="form-control mb-3"
                                    value={editData.date}
                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                />
                                <br />
                                <button className="btn btn-success me-2" onClick={() => handleSave(expense.id)}>
                                    Save
                                </button>
                                <button className="btn btn-danger" onClick={() => setEditData(null)}>
                                    Cancel
                                </button>
                            </li>
                        )
                    )}
            </ul>
        </div>
    );
}
