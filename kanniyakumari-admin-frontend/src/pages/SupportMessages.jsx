import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEnvelope, HiOutlineUser, HiOutlineClock } from "react-icons/hi2";

export default function SupportMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const apiBase = import.meta.env.VITE_ADMIN_API;
        const res = await fetch(`${apiBase}/api/admin/support-messages`, {
          headers: {
            "x-admin-key": import.meta.env.VITE_ADMIN_SECRET,
          },
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Endpoint not found (404). Check backend registration.");
          throw new Error("Failed to load messages");
        }

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Support Messages
        </h1>
        <p className="text-slate-400 mt-1">
          View inquiries from the contact form
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-16 text-slate-400">
          Loading messages…
        </div>
      )}

      {/* EMPTY */}
      {!loading && messages.length === 0 && (
        <div className="border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No support messages found.
        </div>
      )}

      {/* LIST */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col hover:border-slate-700 transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 font-medium text-slate-200">
                <HiOutlineUser className="text-blue-400 text-lg" />
                {msg.name || "Anonymous"}
              </div>

              <div className="flex flex-col items-end gap-1">
                {msg.status && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {msg.status}
                  </span>
                )}
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <HiOutlineClock />
                  {msg.createdAt?._seconds
                    ? new Date(
                        msg.createdAt._seconds * 1000
                      ).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-2 text-sm text-blue-400 mb-4">
              <HiOutlineEnvelope />
              <a
                href={`mailto:${msg.email}`}
                className="hover:underline hover:text-blue-300 transition"
              >
                {msg.email}
              </a>
            </div>

            {/* MESSAGE */}
            <div className="bg-slate-950/50 p-4 rounded-lg text-slate-300 text-sm whitespace-pre-wrap border border-slate-800/50">
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
