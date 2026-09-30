"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Loader2, Calendar } from "lucide-react";

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string, currentlyRead: boolean) => {
    if (currentlyRead) return;
    try {
      await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
    } catch (e) {
      alert("Failed to update message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message permanently?")) return;
    try {
      await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (e) {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inbox Messages</h1>
          <p className="text-sm text-zinc-400 mt-1">Read and manage contact form submissions from your live site.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-zinc-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl flex flex-col items-center">
          <MailOpen className="w-8 h-8 text-zinc-600 mb-3" />
          <p className="text-sm text-zinc-400">Inbox is empty. No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => handleMarkAsRead(msg._id, msg.read)}
              className={`p-5 border rounded-xl transition-colors ${
                msg.read 
                  ? "bg-zinc-900 border-zinc-800/60 opacity-80" 
                  : "bg-zinc-900 border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.05)] cursor-pointer"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${msg.read ? "bg-zinc-800 text-zinc-500" : "bg-emerald-950 text-emerald-400"}`}>
                    {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100 text-sm">
                      {msg.name} <span className="text-zinc-500 font-normal ml-1">&lt;{msg.email}&gt;</span>
                    </h3>
                    <p className={`text-xs mt-0.5 ${msg.read ? "text-zinc-500" : "text-emerald-400 font-medium"}`}>
                      {msg.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg._id);
                    }}
                    className="p-1.5 hover:bg-red-950/40 text-zinc-500 hover:text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-sm text-zinc-300 whitespace-pre-wrap pl-11 border-l-2 border-zinc-800 ml-4 py-1">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}