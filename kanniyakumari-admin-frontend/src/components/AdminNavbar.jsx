import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="flex gap-3 overflow-x-auto py-3 px-4 bg-black border-b border-white/10 text-sm">
      <Link to="/" className="text-white">Dashboard</Link>
      <Link to="/problems" className="text-white">Problems</Link>
      <Link to="/businesses" className="text-white">Businesses</Link>
      <Link to="/tourist" className="text-white">Tourist</Link>
      <Link to="/hospitals" className="text-white">Hospitals</Link>
      <Link to="/schools" className="text-white">Schools</Link>
    </nav>
  );
}
