import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../components/AdminNavbar";
import {
  getBusinesses,
  approveBusiness,
  deleteBusiness,
} from "../services/business.admin.service";

export default function AdminBusinesses() {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      setList(await getBusinesses());
    } catch {
      toast.error("Failed to load businesses");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4 space-y-4">
        {list.map((b) => (
          <div
            key={b.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <h3 className="text-white font-semibold">{b.name}</h3>
            <p className="text-gray-400">{b.category}</p>

            <div className="flex gap-3 mt-3">
              {!b.verified && (
                <button
                  onClick={async () => {
                    await approveBusiness(b.id);
                    toast.success("Business approved");
                    load();
                  }}
                  className="bg-green-600 px-3 py-1 rounded text-white"
                >
                  Approve
                </button>
              )}

              <button
                onClick={async () => {
                  if (!confirm("Delete business?")) return;
                  await deleteBusiness(b.id);
                  toast.success("Deleted");
                  load();
                }}
                className="bg-red-600 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
