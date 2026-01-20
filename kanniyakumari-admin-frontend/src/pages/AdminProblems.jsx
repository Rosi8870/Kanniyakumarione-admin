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

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "rejected":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const statusBadge = (status) => (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)} backdrop-blur-sm`}>
      {status?.toUpperCase() || "PENDING"}
    </span>
  );

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-slideInDown">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">🚨 Problem Reports</h1>
          <p className="text-gray-400 text-sm sm:text-base">Total: <span className="text-blue-400 font-bold">{items.length}</span> problems</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 overflow-x-auto animate-slideInUp">
          <div className="flex gap-2 bg-black/40 backdrop-blur-md rounded-2xl p-2 border border-white/10 w-fit sm:w-full">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                  filter === status
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading problems...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="glass rounded-2xl p-8 sm:p-12 text-center border-white/10">
            <p className="text-gray-400 text-lg">✨ No problems found in this category</p>
          </div>
        )}

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <div
              key={p.id}
              className="glass rounded-2xl overflow-hidden border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-glow-lg group animate-slideInUp"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Image Section */}
              {p.imageUrl && (
                <div className="relative overflow-hidden h-40 sm:h-48">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              {/* Content Section */}
              <div className="p-4 sm:p-6">
                {/* Title and Status */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{p.title}</h2>
                  {statusBadge(p.status)}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{p.description}</p>

                {/* Metadata */}
                <div className="text-xs text-gray-400 space-y-1 mb-4 pb-4 border-b border-white/10">
                  {p.location && <p>📍 {p.location}</p>}
                  {p.category && <p>📂 {p.category}</p>}
                  {p.createdAt && (
                    <p>📅 {new Date(p.createdAt.seconds * 1000).toLocaleDateString()}</p>
                  )}
                </div>

                {/* Map */}
                {p.lat && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-32 border border-white/10"
                      src={`https://maps.google.com/maps?q=${p.lat},${p.lng}&z=15&output=embed`}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 sm:flex-col sm:gap-2">
                  {p.status !== "approved" && (
                    <button
                      onClick={async () => {
                        await approveProblem(p.id);
                        toast.success("✅ Approved");
                        load(filter === "all" ? null : filter);
                      }}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-3 py-2 rounded-lg font-semibold transition-all text-sm hover:shadow-lg"
                    >
                      ✓ Approve
                    </button>
                  )}
                  {p.status !== "rejected" && (
                    <button
                      onClick={async () => {
                        await rejectProblem(p.id);
                        toast.error("❌ Rejected");
                        load(filter === "all" ? null : filter);
                      }}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-3 py-2 rounded-lg font-semibold transition-all text-sm hover:shadow-lg"
                    >
                      ✕ Reject
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      if (confirm("Delete this problem?")) {
                        await deleteProblem(p.id);
                        toast.success("🗑️ Deleted");
                        load(filter === "all" ? null : filter);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-3 py-2 rounded-lg font-semibold transition-all text-sm hover:shadow-lg"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
