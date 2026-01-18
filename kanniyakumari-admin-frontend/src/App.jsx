import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminProblems from "./pages/AdminProblems";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/problems" />} />
      <Route path="/admin/problems" element={<AdminProblems />} />
    </Routes>
  );
}
