import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getBusinesses,
  approveBusiness,
  deleteBusiness,
} from "../services/business.admin.service";

export default function AdminBusinesses() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      setItems(await getBusinesses());
    } catch {
      toast.error("Failed to load businesses");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Businesses</h1>

      {items.map((b) => (
        <div key={b.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h3 className="font-semibold">{b.name}</h3>
          <p className="text-gray-400 text-sm">{b.category}</p>

          <div className="flex gap-3 mt-3">
            {!b.verified && (
              <button
                onClick={async () => {
                  await approveBusiness(b.id);
                  toast.success("Approved");
                  load();
                }}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Approve
              </button>
            )}

            <button
              onClick={async () => {
                await deleteBusiness(b.id);
                toast.success("Deleted");
                load();
              }}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
