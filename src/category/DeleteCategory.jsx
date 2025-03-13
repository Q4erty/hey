import { useState, useEffect } from "react";

export default function DeleteUser() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3001/categories");
                if (response.ok) {
                    const data = await response.json();
                    setCategory(data);
                } else {
                    alert("Failed to fetch category");
                }
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/categories/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert(`Category with id ${id} deleted successfully!`);
                setCategory(category.filter((category) => category.id !== id));
            } else {
                alert("Failed to delete category");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="card p-2 mt-5">
            <h2 className="card-title text-center text-white">Categories List</h2>
            <ul className="list-group list-group-flush">
                {category.map((category) => (
                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {category.name}
                        <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}