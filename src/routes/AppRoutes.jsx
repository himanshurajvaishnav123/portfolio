import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

import PortfolioHome from '../pages/PortfolioHome';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import StudentList from '../pages/StudentList';
import AddStudent from '../pages/AddStudent';

// Guard Component for Admin
const AdminGuard = ({ children }) => {
  const { isAdminLoggedIn } = useStudents();
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" replace />;
};

// Guard Component for Student
const StudentGuard = ({ children }) => {
  const { currentStudent } = useStudents();
  return currentStudent ? children : <Navigate to="/admin-login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin-dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
      <Route path="/student-list" element={<AdminGuard><StudentList /></AdminGuard>} />
      <Route path="/add-student" element={<AdminGuard><AddStudent /></AdminGuard>} />
      
      {/* Protected Student Route */}
      <Route path="/student-dashboard" element={<StudentGuard><StudentDashboard /></StudentGuard>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;