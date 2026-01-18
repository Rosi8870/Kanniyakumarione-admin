import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("adminSecret");
  if (!token) return <Navigate to="/" replace />;
  return children;
}
