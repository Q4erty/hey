import { useState, useEffect } from "react";

export default function CreateExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

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
        fetch("http://localhost:3001/expenses")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setExpenses(data);
            });
    }, []);

    return (
        <div>
            <h1>Expenses</h1>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <button onClick={() => setSelectedCategory("")}>Show All</button>
            <ul>
                {expenses
                    .filter((expense) => {
                        if (selectedCategory === "") return true;
                        return expense.categoryId === selectedCategory;
                    })
                    .map((expense) => (
                        <li key={expense.id}>
                            <h3>{expense.amount}</h3>
                            <p>{expense.comment}</p>
                            <p>{expense.date}</p>
                        </li>
                ))}
            </ul>
        </div>
    );
}