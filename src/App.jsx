import CreateCategory from './category/CreateCategory';
import UpdateCategory from './category/UpdateCategory'
import ReadCategory from './category/ReadCategory';
import DeleteCategory from './category/DeleteCategory';
import CreateExpense from './expenses/CreateExpense';
import ReadExpense from './expenses/ReadExpense';
import DeleteExpense from './expenses/DeleteExpense';
import UpdateExpense from './expenses/UpdateExpense';
import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/create-category">Create Category</Link></li>
                    <li><Link to="/read-category">Read Category</Link></li>
                    <li><Link to="/update-category">Update Category</Link></li>
                    <li><Link to="/delete-category">Delete Category</Link></li><br />
                    <li><Link to="/create-expense">Create Expense</Link></li>
                    <li><Link to="/read-expense">Read Expense</Link></li>
                    <li><Link to="/update-expense">Update Expense</Link></li>
                    <li><Link to="/delete-expense">Delete Expense</Link></li>
                </ul>
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