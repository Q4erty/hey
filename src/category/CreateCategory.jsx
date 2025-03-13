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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h1 className="mb-4 text-white">Create Category</h1>
                <div className="form-group">
                    <input 
                        className="form-control"
                        id="create-category" 
                        value={categoryName} 
                        onChange={(e) => setCategoryName(e.target.value)} 
                        placeholder="Enter name of category" 
                    />
                </div>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={handleCreateCategory}
                >
                    Create Category
                </button>
            </div>
        </div>
    );
}