import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/problems", label: "Problems", icon: "🚨" },
    { path: "/businesses", label: "Businesses", icon: "🏢" },
    { path: "/hospitals", label: "Hospitals", icon: "🏥" },
    { path: "/schools", label: "Schools", icon: "🎓" },
    { path: "/tourist", label: "Tourist", icon: "✈️" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow-lg">
        <h1 className="text-lg font-bold">🎛️ Admin</h1>
        <button onClick={logout} className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors">
          Logout
        </button>
      </div>

      {/* Apple Dock Style Navbar - Desktop */}
      <nav className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl px-6 py-3 shadow-2xl border border-white/20 flex gap-1">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center group
                transition-all duration-300 ease-out
                ${isActive 
                  ? "scale-110" 
                  : hovered === idx 
                  ? "scale-105" 
                  : "scale-100"
                }
              `}
            >
              {/* Icon */}
              <div className={`
                text-2xl transition-all duration-300
                ${hovered === idx || "isActive" 
                  ? "transform scale-110" 
                  : ""}
              `}>
                {item.icon}
              </div>

              {/* Label Tooltip */}
              <div className={`
                absolute -top-12 px-3 py-2 bg-gradient-to-br from-gray-800 to-gray-900 
                text-white text-xs font-semibold rounded-lg whitespace-nowrap
                border border-white/20 shadow-lg
                transition-all duration-300 pointer-events-none
                ${hovered === idx 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-2"}
              `}>
                {item.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 transform rotate-45" />
              </div>

              {/* Active Indicator */}
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  absolute bottom-0 w-1.5 h-1.5 rounded-full
                  transition-all duration-300
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg shadow-blue-500/50" 
                    : "bg-transparent"}
                `}
              />
            </NavLink>
          ))}

          {/* Divider */}
          <div className="w-px bg-white/10 mx-2" />

          {/* Logout Button */}
          <button
            onClick={logout}
            onMouseEnter={() => setHovered("logout")}
            onMouseLeave={() => setHovered(null)}
            className={`
              relative flex flex-col items-center justify-center group
              transition-all duration-300 ease-out
              ${hovered === "logout" ? "scale-110" : "scale-100"}
            `}
          >
            <div className="text-2xl">🚪</div>

            {/* Label Tooltip */}
            <div className={`
              absolute -top-12 px-3 py-2 bg-red-600/90 backdrop-blur-xl
              text-white text-xs font-semibold rounded-lg whitespace-nowrap
              border border-red-400/20 shadow-lg
              transition-all duration-300 pointer-events-none
              ${hovered === "logout" 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-2"}
            `}>
              Logout
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 transform rotate-45" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/95 to-black/90 backdrop-blur-xl border-t border-white/20 shadow-2xl z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-2 px-3
                transition-all duration-300 flex-1
                ${isActive 
                  ? "text-blue-400" 
                  : "text-gray-400 hover:text-white"}
              `}
            >
              <div className="text-xl">{item.icon}</div>
              <div className="text-xs mt-1 font-semibold">{item.label}</div>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
