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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert(`Expense with id ${id} deleted successfully!`);
                setExpenses(expenses.filter((expense) => expense.id !== id));
            } else {
                alert("Failed to delete expense");
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    return (
        <div>
            <h1>Expenses</h1>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((expense) => (
                    <option key={expense.id} value={expense.id}>{expense.name}</option>
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
                            <button onClick={() => handleDelete(expense.id)}>
                                Delete
                            </button>
                        </li>
                ))}
            </ul>
        </div>
    );
}