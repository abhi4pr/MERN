import {Route, Navigate} from 'react-router-dom';

export default function UserRoute({ children, redirectTo }) {
    let isAuthenticated = localStorage.getItem('userToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
}