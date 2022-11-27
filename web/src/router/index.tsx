import React from 'react';
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
    Navigate
} from "react-router-dom";
import { NotFound } from '../pages/notFound/index';
import { Login } from '../pages/login/index';
import { Dashboard } from '../components';
import { AuthContext } from '../contexts/auth/index';
/**
 * Router component
 * @returns {JSX.Element}
 */
export const AppRouter = () => {
    const { user } = React.useContext(AuthContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Login />} />
                {user ?
                    <Route path="/dashboard" element={<Dashboard />} /> :
                    <Route path="/dashboard" element={
                        <Navigate to="/" />
                    } />}
            </Routes >
        </BrowserRouter>
    );
};