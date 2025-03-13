import { useState, useEffect } from "react";

export default function App() {
    const [categoryName, setCategoryName] = useState("");

    const handleCreateCategory = async () => {
        try {
            const response = await fetch(`http://localhost:3001/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryName }),
            });

            if (response.ok) {
                alert("Category created successfully!");
            } else {
                alert("Failed to create category");
            }
        } catch (error) {
            console.error("Error creating category:", error);
        }
    }

    return (
        <div>
            <h1>Create Category</h1>
            <input id="create-category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter name of category" /><br/><br/>
            <button onClick={handleCreateCategory}>Create</button>
        </div>
    );
}