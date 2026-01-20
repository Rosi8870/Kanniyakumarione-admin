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
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Businesses</h1>
        <p className="text-slate-400 mt-1">
          Review and manage registered businesses
        </p>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No businesses found
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((b) => (
          <div
            key={b.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col"
          >
            {/* Status */}
            <span
              className={`inline-block w-fit px-3 py-1 text-xs rounded-full mb-3
                ${
                  b.verified
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
            >
              {b.verified ? "VERIFIED" : "PENDING"}
            </span>

            {/* Name */}
            <h3 className="text-lg font-semibold mb-1">
              {b.name}
            </h3>

            {/* Category */}
            <p className="text-sm text-blue-400 mb-2">
              {b.category}
            </p>

            {/* Description */}
            <p className="text-sm text-slate-400 mb-2 line-clamp-3">
              {b.description}
            </p>

            {/* Contact */}
            {(b.contact || b.phone) && (
              <p className="text-sm text-slate-300 mb-4">
                Contact: {b.contact || b.phone}
              </p>
            )}

            {/* Actions */}
            <div className="mt-auto space-y-2">
              {!b.verified && (
                <button
                  onClick={async () => {
                    await approveBusiness(b.id);
                    toast.success("Business approved");
                    load();
                  }}
                  className="w-full py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 transition"
                >
                  Approve
                </button>
              )}

              <button
                onClick={async () => {
                  await deleteBusiness(b.id);
                  toast.success("Business deleted");
                  load();
                }}
                className="w-full py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
