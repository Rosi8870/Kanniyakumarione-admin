import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAdminProblems,
  approveProblem,
  rejectProblem,
  deleteProblem,
} from "../services/problems.admin.service";

export default function AdminProblems() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const load = async (status = null) => {
    setLoading(true);
    try {
      setItems(await getAdminProblems(status));
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const status = filter === "all" ? null : filter;
    load(status);
  }, [filter]);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusClass = (status) => {
    if (status === "approved") return "bg-emerald-500/10 text-emerald-400";
    if (status === "rejected") return "bg-rose-500/10 text-rose-400";
    return "bg-amber-500/10 text-amber-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Problem Reports</h1>
        <p className="text-slate-400 mt-1">
          Review, approve or reject reported problems
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search problems"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
        />

        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition
                ${
                  filter === s
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800"
                }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-slate-400">
          Loading problems...
        </div>
      )}

      {/* Empty */}
      {!loading && filteredItems.length === 0 && (
        <div className="border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No problems found
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col"
          >
            {/* Image */}
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-44 w-full object-cover"
              />
            )}

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Status */}
              <span
                className={`inline-block w-fit px-3 py-1 text-xs rounded-full mb-3 ${statusClass(
                  p.status
                )}`}
              >
                {(p.status || "pending").toUpperCase()}
              </span>

              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {p.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-slate-400 line-clamp-3 mb-4">
                {p.description}
              </p>

              {/* Meta */}
              <div className="text-xs text-slate-500 space-y-1 mb-4">
                {p.location && <div>Location: {p.location}</div>}
                {p.category && <div>Category: {p.category}</div>}
                {p.createdAt && (
                  <div>
                    Date:{" "}
                    {new Date(
                      p.createdAt.seconds * 1000
                    ).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {p.status !== "approved" && (
                    <button
                      onClick={async () => {
                        await approveProblem(p.id);
                        toast.success("Problem approved");
                        load(filter === "all" ? null : filter);
                      }}
                      className="py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500"
                    >
                      Approve
                    </button>
                  )}

                  {p.status !== "rejected" && (
                    <button
                      onClick={async () => {
                        await rejectProblem(p.id);
                        toast.error("Problem rejected");
                        load(filter === "all" ? null : filter);
                      }}
                      className="py-2 rounded-lg text-sm font-medium bg-amber-600 hover:bg-amber-500"
                    >
                      Reject
                    </button>
                  )}
                </div>

                <button
                  onClick={async () => {
                    if (confirm("Delete this problem?")) {
                      await deleteProblem(p.id);
                      toast.success("Problem deleted");
                      load(filter === "all" ? null : filter);
                    }
                  }}
                  className="w-full py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
