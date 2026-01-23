import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  HiOutlineMegaphone, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlinePhoto,
  HiOutlineCalendar
} from "react-icons/hi2";

export default function AdminUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);

  const apiBase = import.meta.env.VITE_ADMIN_API ;
  const headers = { 
    "Content-Type": "application/json",
    "x-admin-key": import.meta.env.VITE_ADMIN_SECRET 
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const res = await fetch(`${apiBase}/api/admin/updates`);
      if (!res.ok) throw new Error("Failed to fetch updates");
      const data = await res.json();
      setUpdates(data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading updates");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) return toast.error("Title and Content are required");

    try {
      const url = editingId 
        ? `${apiBase}/api/admin/updates/${editingId}`
        : `${apiBase}/api/admin/updates`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Operation failed");

      toast.success(editingId ? "Update saved" : "Update posted");
      setForm({ title: "", content: "", imageUrl: "" });
      setEditingId(null);
      fetchUpdates();
    } catch (error) {
      toast.error("Error saving update");
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      content: item.content,
      imageUrl: item.imageUrl || ""
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this update?")) return;
    try {
      const res = await fetch(`${apiBase}/api/admin/updates/${id}`, {
        method: "DELETE",
        headers
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Update deleted");
      setUpdates(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      toast.error("Error deleting update");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">News & Updates</h1>
        <p className="text-slate-400 mt-1">Post announcements and news</p>
      </div>

      {/* Form */}
      <div className="mb-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-medium mb-4">{editingId ? "Edit Update" : "Post New Update"}</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            placeholder="Title"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Content / Description"
            rows={3}
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600 resize-none"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            placeholder="Image URL (Optional)"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 transition">
              {editingId ? "Save Changes" : "Post Update"}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ title: "", content: "", imageUrl: "" }); }} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 transition">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      {loading && <div className="text-center py-16 text-slate-400">Loading...</div>}
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {updates.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col hover:border-slate-700 transition">
            {item.imageUrl && (
              <div className="h-40 w-full bg-slate-950/50 rounded-lg mb-4 overflow-hidden border border-slate-800/50">
                <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="font-medium text-lg text-slate-200 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 mb-4 whitespace-pre-wrap line-clamp-4">{item.content}</p>
            
            <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <HiOutlineCalendar />
                {item.createdAt?._seconds ? new Date(item.createdAt._seconds * 1000).toLocaleDateString() : "Just now"}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"><HiOutlinePencil /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-rose-900/20 hover:bg-rose-900/40 text-rose-400 transition"><HiOutlineTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}