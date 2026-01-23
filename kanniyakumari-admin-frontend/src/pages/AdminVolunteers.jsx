import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlinePhone, 
  HiOutlineBriefcase, 
  HiOutlineClock,
  HiOutlineTrash
} from "react-icons/hi2";

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const apiBase = import.meta.env.VITE_ADMIN_API || "http://localhost:5001";
      const res = await fetch(`${apiBase}/api/admin/volunteers`, {
        headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET },
      });
      if (!res.ok) {
        if (res.status === 404) throw new Error("Route not found (404). Backend not updated?");
        throw new Error("Failed to fetch volunteers");
      }
      const data = await res.json();
      setVolunteers(data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading volunteers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this volunteer?")) return;
    try {
      const apiBase = import.meta.env.VITE_ADMIN_API || "http://localhost:5001";
      const res = await fetch(`${apiBase}/api/admin/volunteers/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET },
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Volunteer removed");
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      toast.error("Error deleting volunteer");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Volunteers</h1>
        <p className="text-slate-400 mt-1">Manage registered volunteers</p>
      </div>

      {loading && <div className="text-center py-16 text-slate-400">Loading...</div>}

      {!loading && volunteers.length === 0 && (
        <div className="border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No volunteers found.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {volunteers.map((vol) => (
          <div key={vol.id} className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col hover:border-slate-700 transition group">
            
            <button 
              onClick={() => handleDelete(vol.id)}
              className="absolute top-4 right-4 text-slate-600 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
              title="Delete Volunteer"
            >
              <HiOutlineTrash className="text-lg" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <HiOutlineUser className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-slate-200">{vol.name || "Unknown"}</h3>
                <p className="text-xs text-slate-500">Age: {vol.age || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <HiOutlineBriefcase className="text-slate-500" />
                <span>{vol.profession || "Not specified"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <HiOutlinePhone className="text-slate-500" />
                <a href={`tel:${vol.phone}`} className="hover:text-orange-400 transition">{vol.phone || "N/A"}</a>
              </div>

              <div className="flex items-center gap-2">
                <HiOutlineEnvelope className="text-slate-500" />
                <a href={`mailto:${vol.email}`} className="hover:text-orange-400 transition break-all">{vol.email}</a>
              </div>

              <div className="flex items-center gap-2 text-xs pt-2 border-t border-slate-800/50 mt-2">
                <HiOutlineClock className="text-slate-600" />
                <span className="text-slate-600">
                  Joined: {vol.createdAt?._seconds ? new Date(vol.createdAt._seconds * 1000).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVolunteers;