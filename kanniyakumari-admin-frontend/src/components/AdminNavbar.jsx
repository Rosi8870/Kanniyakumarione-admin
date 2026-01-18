import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-black border-b border-white/10">
      <h1 className="text-white font-bold text-lg">
        Kanniyakumari Admin
      </h1>

      <button
        onClick={logout}
        className="text-sm bg-red-600 px-3 py-1 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
}
