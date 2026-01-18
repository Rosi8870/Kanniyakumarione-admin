import React, { useEffect, useState } from "react";
import {
  getAdminProblems,
  approveProblem,
  rejectProblem,
  deleteProblem,
} from "../services/adminProblems.service";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";

/* Fix leaflet marker */
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function AdminProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getAdminProblems();
      setProblems(data);
    } catch {
      toast.error("Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveProblem(id);
      toast.success("Problem approved");
      load();
    } catch {
      toast.error("Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectProblem(id);
      toast.warn("Problem rejected");
      load();
    } catch {
      toast.error("Reject failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete permanently?")) return;

    try {
      await deleteProblem(id);
      toast.success("Deleted");
      setProblems((p) => p.filter((x) => x.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading admin panel…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-white text-center md:text-left">
        Admin – Reported Problems
      </h1>

      {problems.length === 0 && (
        <p className="text-gray-400 text-center">
          No problems found
        </p>
      )}

      <div className="grid gap-6">
        {problems.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4"
          >
            <div>
              <h2 className="text-lg font-semibold text-white">
                {p.title}
              </h2>
              <p className="text-gray-400 text-sm">
                {p.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                📍 {p.area}
              </p>
            </div>

            {p.imageUrl && (
              <img
                src={p.imageUrl}
                className="rounded-xl w-full max-h-64 object-cover"
              />
            )}

            {p.lat && p.lng && (
              <div className="h-48 rounded-xl overflow-hidden">
                <MapContainer
                  center={[Number(p.lat), Number(p.lng)]}
                  zoom={15}
                  className="h-full w-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[Number(p.lat), Number(p.lng)]} />
                </MapContainer>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {p.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="flex-1 bg-green-600 py-2 rounded-lg text-white text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(p.id)}
                    className="flex-1 bg-yellow-600 py-2 rounded-lg text-white text-sm"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 bg-red-600 py-2 rounded-lg text-white text-sm"
              >
                Delete
              </button>
            </div>

            <p className="text-xs text-center text-gray-400">
              Status:{" "}
              <span className="capitalize">{p.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
