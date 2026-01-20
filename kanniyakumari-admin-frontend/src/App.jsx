import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminProblems from "./pages/AdminProblems";
import AdminBusinesses from "./pages/AdminBusinesses";
import AdminHospitals from "./pages/AdminHospitals";
import AdminSchools from "./pages/AdminSchools";
import AdminTourist from "./pages/AdminTourist";
import AdminNavbar from "./components/AdminNavbar";

const Protected = ({ children }) => {
  const key = localStorage.getItem("admin");
  return key ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <Protected>
            <AdminNavbar />
            <Dashboard />
          </Protected>
        }
      />

      <Route path="/problems" element={<Protected><AdminNavbar /><AdminProblems /></Protected>} />
      <Route path="/businesses" element={<Protected><AdminNavbar /><AdminBusinesses /></Protected>} />
      <Route path="/hospitals" element={<Protected><AdminNavbar /><AdminHospitals /></Protected>} />
      <Route path="/schools" element={<Protected><AdminNavbar /><AdminSchools /></Protected>} />
      <Route path="/tourist" element={<Protected><AdminNavbar /><AdminTourist /></Protected>} />
    </Routes>
  );
}
