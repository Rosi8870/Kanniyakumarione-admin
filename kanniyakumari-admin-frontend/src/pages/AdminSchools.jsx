import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../components/AdminNavbar";
import { adminFetch } from "../services/adminApi";

export default function AdminSchools() {
  const [list, setList] = useState([]);

  useEffect(() => {
    adminFetch("/api/admin/schools").then(setList);
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4 space-y-3">
        {list.map((s) => (
          <div
            key={s.id}
            className="bg-white/5 border border-white/10 rounded p-3 flex justify-between"
          >
            <span className="text-white">{s.name}</span>
            <button
              onClick={async () => {
                await adminFetch(`/api/admin/schools/${s.id}`, {
                  method: "DELETE",
                });
                toast.success("Deleted");
                setList(list.filter((x) => x.id !== s.id));
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
