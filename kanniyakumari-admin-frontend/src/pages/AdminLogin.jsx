import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [key, setKey] = useState("");

  const login = () => {
    if (!key) return toast.error("Enter admin key");

    localStorage.setItem("admin", "true");
    toast.success("Admin logged in");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-white mb-4">
          Admin Login
        </h1>

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
