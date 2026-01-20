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
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Hospitals</h1>

      {/* ADD FORM */}
      <div className="grid md:grid-cols-4 gap-3">
        <input
          placeholder="Name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Address"
          className="input"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          placeholder="Latitude"
          className="input"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
        />
        <input
          placeholder="Longitude"
          className="input"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
        />
        <button onClick={submit} className="btn-primary col-span-full">
          Add Hospital
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {items.map((h) => (
          <div key={h.id} className="card">
            <h3 className="font-semibold">{h.name}</h3>
            <p className="text-sm text-gray-400">{h.address}</p>

            <div className="flex gap-3 mt-2 text-sm">
              <a
                href={mapLink(h.lat, h.lng)}
                target="_blank"
                className="text-indigo-400"
              >
                📍 View Map
              </a>
              <button
                onClick={async () => {
                  await adminFetch(`/api/admin/hospitals/${h.id}`, {
                    method: "DELETE",
                  });
                  toast.success("Deleted");
                  load();
                }}
                className="text-red-400"
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
