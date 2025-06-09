import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'manager' | 'employee';
}

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'admin' ? '/admin-dashboard' 
                        : user.role === 'manager' ? '/manager-dashboard'
                        : '/learner-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}