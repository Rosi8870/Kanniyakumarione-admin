import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "../services/adminApi";

export default function AdminProblems() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const data = await adminFetch("/api/admin/problems");
      setItems(data);
    } catch {
      toast.error("Unauthorized");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const action = async (id, type) => {
    await adminFetch(`/api/admin/problems/${id}/${type}`, { method: "PATCH" });
    toast.success(type);
    load();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl text-white font-bold">Problems</h1>

      {items.map((p) => (
        <div key={p.id} className="bg-white/5 p-5 rounded-xl border border-white/10">
          <h3 className="text-white font-semibold">{p.title}</h3>
          <p className="text-gray-400">{p.description}</p>

          {p.imageUrl && (
            <img src={p.imageUrl} className="mt-3 rounded-xl max-h-64 object-cover" />
          )}

          {p.lat && (
            <iframe
              className="w-full h-48 mt-3 rounded-xl"
              src={`https://maps.google.com/maps?q=${p.lat},${p.lng}&z=15&output=embed`}
            />
          )}

          <div className="flex gap-3 mt-4">
            <button onClick={() => action(p.id, "approve")} className="bg-green-600 px-4 py-2 rounded">Approve</button>
            <button onClick={() => action(p.id, "reject")} className="bg-yellow-600 px-4 py-2 rounded">Reject</button>
            <button onClick={() => action(p.id, "delete")} className="bg-red-600 px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
