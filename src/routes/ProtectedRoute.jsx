import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // ❌ Not logged in → login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ Admin-only route check
  if (adminOnly && profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;