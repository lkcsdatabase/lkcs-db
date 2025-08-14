import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", desc: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  async function fetchEvents() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/events`);
      if (!res.ok) throw new Error("Failed to load events");
      const json = await res.json();
      // newest first (backend already sorts, but ensure)
      setEvents(json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (e) {
      console.error(e);
      alert("Could not load events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function addOrUpdateEvent(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.date.trim()) return;

    setBusy(true);
    try {
      if (editingId) {
        // UPDATE
        const res = await fetch(`${API}/api/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          // Fallback if PUT not implemented: delete + create
          await fetch(`${API}/api/events/${editingId}`, { method: "DELETE" });
          await fetch(`${API}/api/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
        }
      } else {
        // CREATE
        const res = await fetch(`${API}/api/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Create failed");
      }
      setForm({ title: "", date: "", desc: "" });
      setEditingId(null);
      await fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Could not save event.");
    } finally {
      setBusy(false);
    }
  }

  function handleEdit(ev) {
    setForm({ title: ev.title || "", date: ev.date || "", desc: ev.desc || "" });
    setEditingId(ev._id);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    setBusy(true);
    try {
      const res = await fetch(`${API}/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEvents((prev) => prev.filter((e) => e._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm({ title: "", date: "", desc: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Could not delete event.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-700 to-green-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0v4a1 1 0 001 1h4a1 1 0 001-1V7M8 7h8m-8 4v8a1 1 0 001 1h6a1 1 0 001-1v-8M8 11h8" />
            </svg>
          </div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-4">
            Event Calendar Management
          </h3>
          <p className="text-lg text-gray-600">Create and manage school events with excellence and organization</p>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 p-1">
            <div className="bg-white rounded-2xl p-6">
              <form onSubmit={addOrUpdateEvent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Title */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <input
                        name="title"
                        placeholder="Enter event title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0v4a1 1 0 001 1h4a1 1 0 001-1V7M8 7h8m-8 4v8a1 1 0 001 1h6a1 1 0 001-1v-8M8 11h8" />
                      </svg>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-yellow-50/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <div className="relative">
                      <svg className="absolute left-3 top-4 w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      <input
                        name="desc"
                        placeholder="Event description"
                        value={form.desc}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-blue-50/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {editingId ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Update Event
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Event
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 p-1">
            <div className="bg-white rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-gray-800">Upcoming Events</h4>
                  {loading ? (
                    <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                      Loading...
                    </div>
                  ) : events.length > 0 ? (
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Total: {events.length}
                    </div>
                  ) : null}
                </div>

                {loading ? (
                  <div className="text-center py-12 text-gray-500">Loading events...</div>
                ) : events.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0v4a1 1 0 001 1h4a1 1 0 001-1V7M8 7h8m-8 4v8a1 1 0 001 1h6a1 1 0 001-1v-8M8 11h8" />
                      </svg>
                    </div>
                    <p className="text-xl font-medium text-gray-500">No events scheduled yet</p>
                    <p className="text-gray-400">Create your first event to get started</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {events.map((ev) => (
                      <li
                        key={ev._id}
                        className="group bg-gradient-to-r from-white to-green-50 border border-green-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0v4a1 1 0 001 1h4a1 1 0 001-1V7M8 7h8m-8 4v8a1 1 0 001 1h6a1 1 0 001-1v-8M8 11h8" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xl font-bold text-gray-900 mb-2">{ev.title}</h5>
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0v4a1 1 0 001 1h4a1 1 0 001-1V7M8 7h8m-8 4v8a1 1 0 001 1h6a1 1 0 001-1v-8M8 11h8" />
                                    </svg>
                                    {ev.date}
                                  </div>
                                </div>
                                {ev.desc && (
                                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3 border-l-4 border-green-400">
                                    {ev.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(ev)}
                              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(ev._id)}
                              disabled={busy}
                              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-800 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Busy overlay */}
      {busy && <div className="fixed inset-0 bg-black/5 pointer-events-none" />}
    </div>
  );
}
