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
        <div>
            <h1>Update Category</h1>
            <select onChange={(e) => setIndex(e.target.value)}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select><br/><br/>
            <input onChange={(e) => setNewName(e.target.value)} value={newName} placeholder="Enter new name for category"/><br/><br/>
            <button onClick={updateCategory}>Update</button>
        </div>
    );
}