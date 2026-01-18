import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!email) return alert("Enter admin email");
    localStorage.setItem("adminEmail", email);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
