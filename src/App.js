import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import UserSubmission from './pages/UserSubmission';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './pages/ProtectedRoute';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userSubmission' element={<UserSubmission/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminDashboard' element={
          <ProtectedRoute>
            <AdminDashboard/>
            </ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
