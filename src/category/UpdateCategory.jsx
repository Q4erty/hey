import { useEffect, useState } from "react";

export default function App() {
    const [newName, setNewName] = useState("");
    const [index, setIndex] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/categories")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return setCategories(data);
            });
    }, []);

    const updateCategory = async () => {
        try {
            const response = await fetch(`http://localhost:3001/categories/${index}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });

            if (response.ok) {
                updateArray();
                alert("Category updated successfully!");
            } else {
                alert("Failed to update category");
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }

    const updateArray = () => {
        setCategories(element => (
            element.map(category => category.id === index ? { ...category, name: newName } : category)
        ))
    }
    

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card mt-5 p-5 text-white">
                <h1 className="mb-4">Update Category</h1>
                
                <div className="form-group">
                    <label htmlFor="category-select" className="form-label">Select category</label>
                    <select 
                        id="category-select" 
                        className="form-select bg-dark text-white" 
                        onChange={(e) => setIndex(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
        
                <div className="form-group mt-3">
                    <label htmlFor="new-name" className="form-label">New name</label>
                    <input 
                        id="new-name"
                        className="form-control bg-dark text-white"
                        onChange={(e) => setNewName(e.target.value)} 
                        value={newName} 
                        placeholder="Enter new name for category"
                    />
                </div>
        
                <button className="btn btn-primary mt-3" onClick={updateCategory}>
                    Update
                </button>
            </div>
        </div>
    );
    
}