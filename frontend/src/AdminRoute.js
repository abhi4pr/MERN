import {Route, Navigate} from 'react-router-dom';

export default function AdminRoute({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem('adminToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
}