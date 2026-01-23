import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineExclamationTriangle,
  HiOutlineBuildingOffice2,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineCamera,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
  HiOutlineMegaphone,
} from "react-icons/hi2"; // Heroicons v2

import { HiOutlineLogout } from "react-icons/hi"; // Heroicons v1 (LOGOUT)

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const navItems = [
    { path: "/", icon: HiOutlineSquares2X2, color: "text-sky-400" },
    { path: "/problems", icon: HiOutlineExclamationTriangle, color: "text-rose-400" },
    { path: "/businesses", icon: HiOutlineBuildingOffice2, color: "text-amber-400" },
    { path: "/hospitals", icon: HiOutlineHeart, color: "text-emerald-400" },
    { path: "/schools", icon: HiOutlineAcademicCap, color: "text-violet-400" },
    { path: "/tourist", icon: HiOutlineCamera, color: "text-cyan-400" },
    { path: "/support", icon: HiOutlineChatBubbleLeftRight, color: "text-pink-400" },
    { path: "/volunteers", icon: HiOutlineUserGroup, color: "text-orange-400" },
    { path: "/sponsors", icon: HiOutlineCurrencyDollar, color: "text-yellow-400" },
    { path: "/updates", icon: HiOutlineMegaphone, color: "text-teal-400" },
  ];

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="px-4 h-14 flex items-center justify-between">
          <h1 className="text-base font-semibold text-white">
            Admin Panel
          </h1>

          <button
            onClick={logout}
            className="text-rose-400 hover:text-rose-300 transition"
          >
            <HiOutlineLogout className="text-xl" />
          </button>
        </div>
      </header>

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl px-4 py-2 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center justify-center
                  w-12 h-12 rounded-xl
                  transition-all
                  ${
                    isActive
                      ? `${item.color} bg-slate-800`
                      : "text-slate-400 hover:text-white"
                  }
                  `
                }
              >
                <Icon className="text-xl" />
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ================= MOBILE APPLE DOCK ================= */}
      <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className="
            flex items-center gap-2 px-4 py-3
            rounded-3xl
            bg-slate-900/90
            backdrop-blur-xl
            border border-slate-800
            shadow-2xl
            overflow-x-auto
            max-w-full
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex-shrink-0
                  flex items-center justify-center
                  w-12 h-12 rounded-2xl
                  transition-all duration-300
                  ${
                    isActive
                      ? `bg-slate-800 scale-110 ${item.color}`
                      : "text-slate-400 hover:bg-slate-800"
                  }
                  `
                }
              >
                <Icon className="text-2xl" />
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
