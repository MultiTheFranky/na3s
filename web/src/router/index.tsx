import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Dashboard } from "../components";
import { AuthContext } from "../contexts/auth/index";
import { Login } from "../pages/login/index";
import { NotFound } from "../pages/notFound/index";

/**
 * Router component
 * @returns {JSX.Element}
 */
export const AppRouter = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      {user ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};
