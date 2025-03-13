import { useState, useEffect } from "react";

export default function CreateExpenses() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState("");
    const [expenseDesription, setExpenseDescription] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/categories")
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
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    { 
                        categoryId: categoryId,
                        amount: expenseAmount,
                        date: expenseDate,
                        comment: expenseDesription }),
            });

            if (response.ok) {
                alert("Expense created successfully!");
            } else {
                alert("Failed to create expense");
            }
        } catch (error) {
            console.error("Error creating expense:", error);
        }
    }

    useEffect(() => {
        if(categories.length > 0) setCategoryId(categories[0].id);
    }, [categories]);

    return (
        <div>
            <h1>Create Expense</h1>
            <input onChange={(e) => setExpenseDescription(e.target.value)} placeholder="Enter description of expense" required /><br /><br />
            <input type="number" onChange={(e) => setExpenseAmount(e.target.value)} placeholder="Enter summ of expense" required /><br /><br />
            <input type="date" onChange={(e) => setExpenseDate(e.target.value)} required /><br /><br />
            <select onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select><br /><br />
            <button onClick={createExpense}>Create</button>
        </div>
    );
}