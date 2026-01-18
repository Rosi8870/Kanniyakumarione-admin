import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../components/AdminNavbar";
import { adminFetch } from "../services/adminApi";

export default function AdminHospitals() {
  const [list, setList] = useState([]);

  useEffect(() => {
    adminFetch("/api/admin/hospitals").then(setList);
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4 space-y-3">
        {list.map((h) => (
          <div
            key={h.id}
            className="bg-white/5 border border-white/10 rounded p-3 flex justify-between"
          >
            <span className="text-white">{h.name}</span>
            <button
              onClick={async () => {
                await adminFetch(`/api/admin/hospitals/${h.id}`, {
                  method: "DELETE",
                });
                toast.success("Deleted");
                setList(list.filter((x) => x.id !== h.id));
              }}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
