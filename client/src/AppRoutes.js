import { useCallback, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { createPortal } from "react-dom";
import ForgotPassword from "./pages/ForgotPassword";
import useUserStore from "./state/user";

function RequireAuth({ children, redirectTo }) {
  const currentUser = useUserStore(s => s.user)

  return !!currentUser
    ? children
    : <Navigate to={redirectTo} />;
}

const AppRoutes = () => {
  const currentUser = useUserStore(s => s.user)
  const fetchCurrentUser = useUserStore(s => s.fetchCurrentUser)

  useEffect(() => {
    fetchCurrentUser()
  }, [currentUser?.id])

  const ToastContainer = useCallback(() => createPortal(
    <Toaster containerStyle={{zIndex: "99999999999"}} />,
    document.getElementById("toasts-root")
  ), [])

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* These are all prefixed with /app */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/protected"
          element={
            <RequireAuth redirectTo="/login">
              <div>Protected page</div>
            </RequireAuth>
          }
        />

      </Routes>
    </>
  )
}

export default AppRoutes