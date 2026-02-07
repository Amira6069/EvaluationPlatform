import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/auth/LoginPage';
import RegisterPage from './Pages/auth/RegisterPage';
import DashboardPage from './Pages/Organization/DashboardPage';
import EvaluationFormPage from './Pages/Organization/EvaluationFormPage';
import { ROUTES, STORAGE_KEYS, USER_ROLES } from './utils/constants';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || '{}');

  if (!token) {
    // Not logged in → go to login
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Role not allowed → go to unauthorized page (you can create this later)
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.ORG_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZATION]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/evaluation/new"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ORGANIZATION]}>
              <EvaluationFormPage />
            </ProtectedRoute>
          }
        />

        {/* Default & fallback */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
