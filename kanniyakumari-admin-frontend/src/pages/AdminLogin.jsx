import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!email) return alert("Enter admin email");
    localStorage.setItem("adminEmail", email);
    navigate("/admin/problems");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/5 p-8 rounded-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin email"
          className="w-full p-3 rounded bg-black/40 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-indigo-600 py-3 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
