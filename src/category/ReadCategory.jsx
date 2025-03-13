import { useEffect, useState } from "react";

export default function ShowUsers() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/categories")
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
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} onClick={() => setSelectedCategory(category)}>
                        {category.name}
                    </li>
                ))}
            </ul>

            {selectedCategory && (
                <div>
                    <h2>Expenses by {selectedCategory.name}</h2>
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense.id}>
                                <h3>{expense.amount}</h3>
                                <p>{expense.comment}</p>
                                <p>{expense.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
