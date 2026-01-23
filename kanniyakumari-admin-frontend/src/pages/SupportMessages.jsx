import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Mail, User, Clock } from "lucide-react";

export default function SupportMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const apiBase = import.meta.env.VITE_ADMIN_API;
        const res = await fetch(`${apiBase}/api/support_messages`, {
          headers: {
            "x-admin-key": import.meta.env.VITE_ADMIN_SECRET,
          },
        });

        if (!res.ok) throw new Error("Failed to load");

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load support messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-4 sm:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          📨 Support Messages
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Messages sent from users via Contact / Support page
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-400 mt-20">
          Loading messages…
        </div>
      )}

      {/* EMPTY */}
      {!loading && messages.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No support messages found.
        </div>
      )}

      {/* LIST */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <User size={16} className="text-indigo-400" />
                {msg.name || "Anonymous"}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={14} />
                {msg.createdAt?._seconds
                  ? new Date(
                      msg.createdAt._seconds * 1000
                    ).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-2 text-sm text-indigo-400 mb-3">
              <Mail size={16} />
              <a
                href={`mailto:${msg.email}`}
                className="hover:underline break-all"
              >
                {msg.email}
              </a>
            </div>

            {/* MESSAGE */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </div>

            {/* FOOTER (future-ready) */}
            <div className="mt-4 flex justify-between items-center text-xs">
              <span className="text-yellow-400">
                ⏳ Pending
              </span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(msg.message);
                  toast.success("Message copied");
                }}
                className="text-indigo-400 hover:underline"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
