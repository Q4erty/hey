import CreateCategory from "./category/CreateCategory";
import UpdateCategory from "./category/UpdateCategory";
import ReadCategory from "./category/ReadCategory";
import DeleteCategory from "./category/DeleteCategory";
import CreateExpense from "./expenses/CreateExpense";
import ReadExpense from "./expenses/ReadExpense";
import DeleteExpense from "./expenses/DeleteExpense";
import UpdateExpense from "./expenses/UpdateExpense";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";

export default function App() {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark fixed-top">
                <div className="container-fluid">

                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                                <ul className="dropdown-menu bg-dark text-white">
                                    <li className="nav-item"><Link className="nav-link" to="/create-category">Create Category</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/read-category">Read Category</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/update-category">Update Category</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/delete-category">Delete Category</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Expenses</a>
                                <ul className="dropdown-menu bg-dark text-white">
                                    <li className="nav-item"><Link className="nav-link" to="/create-expense">Create Expense</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/read-expense">Read Expense</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/update-expense">Update Expense</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/delete-expense">Delete Expense</Link></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                    
                </div>
            </nav>

            <Routes>
                <Route path="/create-category" element={<CreateCategory />} />
                <Route path="/update-category" element={<UpdateCategory />} />
                <Route path="/read-category" element={<ReadCategory />} />
                <Route path="/delete-category" element={<DeleteCategory />} />
                <Route path="/create-expense" element={<CreateExpense />} />
                <Route path="/read-expense" element={<ReadExpense />} />
                <Route path="/delete-expense" element={<DeleteExpense />} />
                <Route path="/update-expense" element={<UpdateExpense />} />
            </Routes>
        </div>
    );
}
