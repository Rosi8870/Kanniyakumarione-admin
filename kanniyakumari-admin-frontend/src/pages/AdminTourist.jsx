import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../components/AdminNavbar";
import {
  getTouristPlaces,
  addTouristPlace,
  deleteTouristPlace,
} from "../services/tourist.admin.service";

export default function AdminTourist() {
  const [places, setPlaces] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    setPlaces(await getTouristPlaces());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4 space-y-4">
        <input
          placeholder="Tourist place name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-black/40 text-white"
        />

        <button
          onClick={async () => {
            await addTouristPlace({ name });
            toast.success("Added");
            setName("");
            load();
          }}
          className="bg-indigo-600 px-4 py-2 rounded text-white"
        >
          Add Place
        </button>

        {places.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded p-3 flex justify-between"
          >
            <span className="text-white">{p.name}</span>
            <button
              onClick={async () => {
                await deleteTouristPlace(p.id);
                toast.success("Deleted");
                load();
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
