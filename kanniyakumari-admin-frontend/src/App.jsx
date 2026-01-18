import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminProblems from "./pages/AdminProblems";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/problems" element={<AdminProblems />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>

      <ToastContainer position="bottom-center" theme="dark" />
    </>
  );
}
