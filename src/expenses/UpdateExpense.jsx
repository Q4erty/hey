import { useState, useEffect } from "react";

export default function CreateExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/categories")
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/expenses")
            .then(response => response.json())
            .then(data => setExpenses(data));
    }, []);

    const updateExpenses = () => {
        setExpenses(prevExpenses =>
            prevExpenses.map(expense =>
                expense.id === editData.id ? { ...expense, ...editData } : expense
            )
        );
    }

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });

            if (response.ok) {
                updateExpenses();
                setEditData(null);
            } else {
                alert("Failed to update expense");
            }
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    return (
        <div>
            <h1>Expenses</h1>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
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
                        editData?.id !== expense.id ? (
                            <li key={expense.id}>
                                <h3>{expense.amount}</h3>
                                <p>{expense.comment}</p>
                                <p>{expense.date}</p>
                                <button onClick={() => setEditData(expense)}>Edit</button>
                            </li>
                        ) : (
                            <li key={expense.id}>
                                <input
                                    type="number"
                                    value={editData.amount}
                                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                                /><br/><br/>
                                <input
                                    value={editData.comment}
                                    onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
                                /><br/><br/>
                                <input
                                    type="date"
                                    value={editData.date}
                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                /><br/><br/>
                                <button onClick={() => handleSave(expense.id)}>Save</button>
                                <button onClick={() => setEditData(null)}>Cancel</button>
                            </li>
                        )
                    ))
                }
            </ul>
        </div>
    );
}
