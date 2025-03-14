import { useEffect, useState } from 'react';

export default function ShowUsers() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expenses, setExpenses] = useState([]);

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
        if (selectedCategory) {
            fetch(`http://localhost:3001/expenses?categoryId=${selectedCategory.id}`)
                .then((response) => response.json())
                .then((data) => setExpenses(data));
        }
    }, [selectedCategory]);

    return (
        <div className="container mt-3">
            <p>.</p>
            <h1 className="mb-4 text-center">Categories</h1>
            <ul className="list-group">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="list-group-item"
                        onClick={() => setSelectedCategory(category)}
                        style={{ cursor: 'pointer' }}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>

            {selectedCategory && (
                <div className="card mt-4 p-3 bg-dark text-white">
                    <h2 className="mb-3">Expenses by {selectedCategory.name}</h2>
                    <ul className="list-group">
                        {expenses.map((expense) => (
                            <li key={expense.id} className="list-group-item">
                                <h3 className="text-danger">{expense.amount}</h3>
                                <p>{expense.comment}</p>
                                <p className="text-secondary">{expense.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
