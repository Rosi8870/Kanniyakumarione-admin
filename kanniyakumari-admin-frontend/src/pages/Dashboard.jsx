import AdminNavbar from "../components/AdminNavbar";

export default function Dashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Manage problems, businesses, tourist places, hospitals & schools
        </p>
      </div>
    </>
  );
}
