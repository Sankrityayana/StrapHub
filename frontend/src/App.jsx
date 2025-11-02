import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Learn from './pages/Learn.jsx';
import Practice from './pages/Practice.jsx';
import Projects from './pages/Projects.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LessonDetail from './pages/LessonDetail.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AdminLessons from './pages/AdminLessons.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<LessonDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/lessons" element={<AdminRoute><AdminLessons /></AdminRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
