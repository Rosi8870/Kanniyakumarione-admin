import { useEffect, useState } from "react";
import {
  getAdminProblems,
  approveProblem,
  rejectProblem,
  deleteProblem,
} from "../services/adminProblems.service";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

export default function AdminProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getAdminProblems();
      setProblems(data);
    } catch {
      toast.error("Unauthorized");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const action = async (fn, id, msg) => {
    try {
      await fn(id);
      toast.success(msg);
      load();
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <h2 className="text-white text-2xl font-bold">
          Reported Problems
        </h2>

        {loading && <p className="text-gray-400">Loading…</p>}

        {problems.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
          >
            <h3 className="text-white font-semibold">{p.title}</h3>
            <p className="text-gray-400 text-sm">{p.description}</p>
            <p className="text-gray-500 text-xs">📍 {p.area}</p>

            {p.imageUrl && (
              <img
                src={p.imageUrl}
                className="rounded-lg w-full max-h-60 object-cover"
              />
            )}

            {p.lat && p.lng && (
              <a
                href={`https://www.google.com/maps?q=${p.lat},${p.lng}`}
                target="_blank"
                className="text-indigo-400 text-sm"
              >
                Open Map →
              </a>
            )}

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() =>
                  action(approveProblem, p.id, "Approved")
                }
                className="bg-green-600 px-3 py-1 rounded text-white text-sm"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  action(rejectProblem, p.id, "Rejected")
                }
                className="bg-yellow-600 px-3 py-1 rounded text-white text-sm"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  action(deleteProblem, p.id, "Deleted")
                }
                className="bg-red-600 px-3 py-1 rounded text-white text-sm"
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
