import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-bg overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
