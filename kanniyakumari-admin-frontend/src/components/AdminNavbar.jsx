import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const link = "px-3 py-2 rounded hover:bg-white/10";

  return (
    <nav className="bg-black border-b border-white/10 px-4 py-3 flex justify-between items-center">
      <h1 className="text-white font-bold">Admin Panel</h1>

      <div className="flex gap-2 text-sm text-gray-300 overflow-x-auto">
        <NavLink to="/" className={link}>Dashboard</NavLink>
        <NavLink to="/problems" className={link}>Problems</NavLink>
        <NavLink to="/businesses" className={link}>Businesses</NavLink>
        <NavLink to="/hospitals" className={link}>Hospitals</NavLink>
        <NavLink to="/schools" className={link}>Schools</NavLink>
        <NavLink to="/tourist" className={link}>Tourist</NavLink>
      </div>

      <button onClick={logout} className="text-red-400 text-sm">
        Logout
      </button>
    </nav>
  );
}
