import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import FloatingShape from "./components/FloatingShape";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// protected route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

// redirect auth user
const RedirectAuthUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center relative overflow-hidden justify-center">
      <FloatingShape
        color="bg-green-500"
        top="-5%"
        left="10%"
        size="size-64"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        top="70%"
        left="80%"
        size="size-48"
        delay={5}
      />
      <FloatingShape
        color="bg-gradient-to-r from-lime-500 via-green-200 to-emerald-700"
        top="40%"
        left="-10%"
        size="size-32"
        delay={2}
      />
      <FloatingShape
        color="bg-gradient-to-r from-lime-500 via-green-200 to-emerald-700"
        top="60%"
        left="10%"
        size="size-24"
        delay={10}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard/:id"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthUser>
              <SignPage />
            </RedirectAuthUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthUser>
              <LoginPage />
            </RedirectAuthUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthUser>
              <ForgotPasswordPage />
            </RedirectAuthUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthUser>
              <ResetPasswordPage />
            </RedirectAuthUser>
          }
        />
        {/* 404 route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
