import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  HiOutlineCurrencyDollar, 
  HiOutlineLink, 
  HiOutlinePhoto, 
  HiOutlinePencil, 
  HiOutlineTrash 
} from "react-icons/hi2";

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", imageUrl: "", website: "", community: "" });
  const [editingId, setEditingId] = useState(null);

  const apiBase = import.meta.env.VITE_ADMIN_API || "http://localhost:5001";
  const headers = { 
    "Content-Type": "application/json",
    "x-admin-key": import.meta.env.VITE_ADMIN_SECRET 
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await fetch(`${apiBase}/api/admin/sponsors`);
      if (!res.ok) throw new Error("Failed to fetch sponsors");
      const data = await res.json();
      setSponsors(data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading sponsors");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.imageUrl) return toast.error("Name and Image URL are required");

    try {
      const url = editingId 
        ? `${apiBase}/api/admin/sponsors/${editingId}`
        : `${apiBase}/api/admin/sponsors`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Operation failed");

      toast.success(editingId ? "Sponsor updated" : "Sponsor added");
      setForm({ name: "", imageUrl: "", website: "", community: "" });
      setEditingId(null);
      fetchSponsors();
    } catch (error) {
      toast.error("Error saving sponsor");
    }
  };

  const handleEdit = (sponsor) => {
    setForm({
      name: sponsor.name,
      imageUrl: sponsor.imageUrl,
      website: sponsor.website || "",
      community: sponsor.community || ""
    });
    setEditingId(sponsor.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sponsor?")) return;
    try {
      const res = await fetch(`${apiBase}/api/admin/sponsors/${id}`, {
        method: "DELETE",
        headers
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Sponsor deleted");
      setSponsors(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      toast.error("Error deleting sponsor");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Sponsors</h1>
        <p className="text-slate-400 mt-1">Manage event sponsors and partners</p>
      </div>

      {/* Form */}
      <div className="mb-10 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-medium mb-4">{editingId ? "Edit Sponsor" : "Add Sponsor"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Sponsor Name"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Image URL"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <input
            placeholder="Website URL (Optional)"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
          <input
            placeholder="Community (e.g. Gold, Silver)"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:border-slate-600"
            value={form.community}
            onChange={(e) => setForm({ ...form, community: e.target.value })}
          />
          <div className="col-span-full flex gap-2">
            <button onClick={handleSubmit} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 transition">
              {editingId ? "Update Sponsor" : "Add Sponsor"}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ name: "", imageUrl: "", website: "", community: "" }); }} className="px-6 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 transition">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      {loading && <div className="text-center py-16 text-slate-400">Loading...</div>}
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col hover:border-slate-700 transition">
            <div className="h-32 w-full bg-slate-950/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-slate-800/50">
              {sponsor.imageUrl ? <img src={sponsor.imageUrl} alt={sponsor.name} className="h-full w-full object-contain p-2" /> : <HiOutlinePhoto className="text-3xl text-slate-700" />}
            </div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-lg text-slate-200">{sponsor.name}</h3>
              {sponsor.community && (
                <span className="text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">{sponsor.community}</span>
              )}
            </div>
            {sponsor.website && <a href={sponsor.website} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline flex items-center gap-1 mb-4"><HiOutlineLink /> Visit Website</a>}
            
            <div className="mt-auto flex gap-2 pt-4 border-t border-slate-800/50">
              <button onClick={() => handleEdit(sponsor)} className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition flex items-center justify-center gap-2"><HiOutlinePencil /> Edit</button>
              <button onClick={() => handleDelete(sponsor.id)} className="flex-1 py-2 rounded-lg bg-rose-900/20 hover:bg-rose-900/40 text-rose-400 text-sm font-medium transition flex items-center justify-center gap-2"><HiOutlineTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}