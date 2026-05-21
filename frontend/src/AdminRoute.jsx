import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}