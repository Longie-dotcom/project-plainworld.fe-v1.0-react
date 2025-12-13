import Dashboard from "../pages/dashboard/dashboard";
import AuthPage from "../common/auth-page/auth-page";

import { Routes, Route, Navigate } from "react-router-dom";

const Auth = {
  isLoggedIn: () => !!localStorage.getItem("accessToken"),
};

function ProtectedRoute({ children }) {
  return Auth.isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
      <Route path="/reset-password" element={<AuthPage mode="reset" />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
