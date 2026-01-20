import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "../services/adminApi";
import { mapLink } from "../utils/map";

export default function AdminHospitals() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });

  const load = async () => {
    try {
      setItems(await adminFetch("/api/admin/hospitals"));
    } catch {
      toast.error("Failed to load hospitals");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!form.name || !form.lat || !form.lng)
      return toast.error("Name & location required");

    await adminFetch("/api/admin/hospitals", {
      method: "POST",
      body: JSON.stringify(form),
    });

    toast.success("Hospital added");
    setForm({ name: "", address: "", lat: "", lng: "" });
    load();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Hospitals</h1>
        <p className="text-slate-400 mt-1">
          Add and manage hospital locations
        </p>
      </div>

      {/* Add Form */}
      <div className="mb-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-medium mb-4">Add Hospital</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            placeholder="Hospital Name"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Address"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            placeholder="Latitude"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
          />
          <input
            placeholder="Longitude"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
          />

          <button
            onClick={submit}
            className="col-span-full py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 transition"
          >
            Add Hospital
          </button>
        </div>
      </div>

      {/* Empty */}
      {items.length === 0 && (
        <div className="border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No hospitals added yet
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((h) => (
          <div
            key={h.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-1">
              {h.name}
            </h3>

            <p className="text-sm text-slate-400 mb-4">
              {h.address}
            </p>

            <div className="mt-auto flex gap-3 text-sm">
              <a
                href={mapLink(h.lat, h.lng)}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                View Map
              </a>

              <button
                onClick={async () => {
                  await adminFetch(`/api/admin/hospitals/${h.id}`, {
                    method: "DELETE",
                  });
                  toast.success("Hospital deleted");
                  load();
                }}
                className="text-rose-400 hover:text-rose-300 transition"
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
