import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Navigation } from './components/Navigation';
import { Login } from './components/Login';
import { LearnerDashboard } from './components/LearnerDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState(() => {
    if (user?.role === 'admin') return 'admin';
    if (user?.role === 'manager') return 'manager';
    return 'learner';
  });

  const renderDashboard = () => {
    if (!user) return null;

    switch (currentView) {
      case 'admin':
        return user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />;
      case 'manager':
        return user.role === 'manager' ? <ManagerDashboard /> : <Navigate to="/login" />;
      case 'learner':
        return <LearnerDashboard />;
      default:
        return <LearnerDashboard />;
    }
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderDashboard()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <PrivateRoute>
                <AppContent />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;