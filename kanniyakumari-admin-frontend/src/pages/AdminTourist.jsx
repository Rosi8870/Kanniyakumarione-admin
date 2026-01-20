import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "../services/adminApi";
import { mapLink } from "../utils/map";

export default function AdminTourist() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    lat: "",
    lng: "",
  });

  const load = async () => setItems(await adminFetch("/api/admin/tourist"));

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    await adminFetch("/api/admin/tourist", {
      method: "POST",
      body: JSON.stringify(form),
    });
    toast.success("Tourist place added");
    setForm({ name: "", description: "", lat: "", lng: "" });
    load();
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Tourist Places</h1>

      <div className="grid md:grid-cols-4 gap-3">
        <input placeholder="Name" className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input placeholder="Description" className="input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input placeholder="Latitude" className="input"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
        />
        <input placeholder="Longitude" className="input"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
        />
        <button onClick={submit} className="btn-primary col-span-full">
          Add Tourist Place
        </button>
      </div>

      {items.map((t) => (
        <div key={t.id} className="card">
          <h3>{t.name}</h3>
          <p className="text-sm text-gray-400">{t.description}</p>

          <div className="flex gap-4 mt-2 text-sm">
            <a
              href={mapLink(t.lat, t.lng)}
              target="_blank"
              className="text-indigo-400"
            >
              View Map
            </a>
            <button
              onClick={async () => {
                await adminFetch(`/api/admin/tourist/${t.id}`, {
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
