import { useState, useEffect } from 'react';

export default function CreateExpenses() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseDesription, setExpenseDescription] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/categories')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return setCategories(data);
            });
    }, []);

    const createExpense = async () => {
        try {
            const response = await fetch(`http://localhost:3001/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoryId: categoryId,
                    amount: expenseAmount,
                    date: expenseDate,
                    comment: expenseDesription
                })
            });

            if (response.ok) {
                alert('Expense created successfully!');
            } else {
                alert('Failed to create expense');
            }
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    };

    useEffect(() => {
        if (categories.length > 0) setCategoryId(categories[0].id);
    }, [categories]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-white">
            <div className="container bg-dark p-4 rounded">
                <h1 className="text-center">Create Expense</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setExpenseDescription(e.target.value)}
                        placeholder="Enter description of expense"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        placeholder="Enter summ of expense"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        onChange={(e) => setExpenseDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select className="form-select bg-dark text-white" onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary w-100" onClick={createExpense}>
                    Create
                </button>
            </div>
        </div>
    );
}
