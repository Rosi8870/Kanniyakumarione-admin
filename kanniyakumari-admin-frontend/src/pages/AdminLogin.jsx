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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/5 p-8 rounded-xl w-full max-w-sm border border-white/10">
        <h1 className="text-2xl text-white mb-4 font-bold">Admin Login</h1>
        <input
          type="password"
          placeholder="Admin Secret"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-3 rounded bg-black/40 text-white mb-4"
        />
        <button
          onClick={login}
          className="w-full bg-indigo-600 py-3 rounded text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
