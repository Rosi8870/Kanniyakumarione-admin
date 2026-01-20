import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (!key) return toast.error("Enter admin key");
    localStorage.setItem("admin", key);
    toast.success("Logged in");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      
      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Enter your admin access key
        </p>

        {/* Input */}
        <input
          type="password"
          placeholder="Admin Secret"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="
            w-full px-4 py-3 mb-4
            rounded-xl
            bg-slate-900
            border border-slate-800
            text-white
            placeholder-slate-500
            focus:outline-none
            focus:border-slate-600
          "
        />

        {/* Button */}
        <button
          onClick={login}
          className="
            w-full py-3 rounded-xl
            bg-blue-600 hover:bg-blue-500
            text-white font-semibold
            transition
          "
        >
          Login
        </button>

      </div>
    </div>
  );
}
