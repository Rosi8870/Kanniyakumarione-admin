import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("admin", "true");
    toast.success("Login successful");
    navigate("/admin/problems");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl w-full max-w-sm">
        <h2 className="text-white text-xl font-bold mb-4">
          Admin Login
        </h2>

        <button
          onClick={login}
          className="w-full bg-indigo-600 py-3 rounded-lg text-white font-semibold"
        >
          Enter Admin Panel
        </button>
      </div>
    </div>
  );
}
