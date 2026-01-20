import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "../services/adminApi";
import { mapLink } from "../utils/map";

export default function AdminSchools() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });

  const load = async () => setItems(await adminFetch("/api/admin/schools"));

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    await adminFetch("/api/admin/schools", {
      method: "POST",
      body: JSON.stringify(form),
    });
    toast.success("School added");
    setForm({ name: "", address: "", lat: "", lng: "" });
    load();
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Schools</h1>

      <div className="grid md:grid-cols-4 gap-3">
        {["name", "address", "lat", "lng"].map((k) => (
          <input
            key={k}
            placeholder={k.toUpperCase()}
            className="input"
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        ))}
        <button onClick={submit} className="btn-primary col-span-full">
          Add School
        </button>
      </div>

      {items.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p className="text-sm text-gray-400">{s.address}</p>

          <div className="flex gap-4 text-sm mt-2">
            <a
              href={mapLink(s.lat, s.lng)}
              target="_blank"
              className="text-indigo-400"
            >
              View Map
            </a>
            <button
              onClick={async () => {
                await adminFetch(`/api/admin/schools/${s.id}`, {
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
  );
}
