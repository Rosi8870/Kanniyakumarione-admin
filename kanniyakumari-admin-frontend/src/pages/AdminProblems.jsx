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
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusBadge = (status) => (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
      {status?.toUpperCase() || "PENDING"}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚨 Problem Reports</h1>
          <p className="text-gray-600">Total: {items.length} problems</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg shadow-md p-2">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === status
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Loading problems...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No problems found</p>
          </div>
        )}

        {/* Problems Grid */}
        <div className="grid grid-cols-1 gap-6">
          {items.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-l-4 border-indigo-600"
            >
              <div className="p-6">
                {/* Title and Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{p.title}</h2>
                    {statusBadge(p.status)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">{p.description}</p>

                {/* Image */}
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Metadata */}
                <div className="text-sm text-gray-500 mb-4">
                  {p.location && <p>📍 Location: {p.location}</p>}
                  {p.category && <p>📂 Category: {p.category}</p>}
                  {p.createdAt && (
                    <p>📅 {new Date(p.createdAt.seconds * 1000).toLocaleDateString()}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  {p.status !== "approved" && (
                    <button
                      onClick={async () => {
                        await approveProblem(p.id);
                        toast.success("✅ Problem Approved");
                        load(filter === "all" ? null : filter);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      ✓ Approve
                    </button>
                  )}
                  {p.status !== "rejected" && (
                    <button
                      onClick={async () => {
                        await rejectProblem(p.id);
                        toast.error("❌ Problem Rejected");
                        load(filter === "all" ? null : filter);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      ✕ Reject
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this problem?")) {
                        await deleteProblem(p.id);
                        toast.success("🗑️ Problem Deleted");
                        load(filter === "all" ? null : filter);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
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
