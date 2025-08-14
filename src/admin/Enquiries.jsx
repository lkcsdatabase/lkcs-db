import { useEffect, useState, useMemo } from "react";

export default function Enquiries() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  async function fetchEnquiries({ page: pg = page, limit: lm = limit } = {}) {
    try {
      setLoading(true);
      setError(null);

      const url = new URL(`${API}/api/enquiries`);
      url.searchParams.set("page", String(pg));
      url.searchParams.set("limit", String(lm));

      const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();

      // Accept both new format {success, data, pagination} and legacy raw array
      const items = Array.isArray(json) ? json : json.data || [];
      const meta = Array.isArray(json) ? null : json.pagination || null;

      // Safe sort by createdAt desc if server didn't already
      const sorted = items.slice().sort((a, b) => {
        const ad = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bd = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bd - ad;
      });

      setData(sorted);
      if (meta) {
        setTotal(meta.total || sorted.length);
        setPage(meta.page || 1);
        setLimit(meta.limit || lm);
      } else {
        setTotal(sorted.length);
        setPage(1);
        setLimit(sorted.length || lm);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError(err.message || "Failed to fetch enquiries");
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      const res = await fetch(`${API}/api/enquiries/${id}`, { method: "DELETE", headers: { Accept: "application/json" } });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      setData((prev) => prev.filter((q) => q._id !== id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      console.error("Delete error:", err);
      alert(`Error deleting enquiry: ${err.message}`);
    }
  }

  useEffect(() => {
    fetchEnquiries({ page, limit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  function formatDate(s) {
    try {
      return new Date(s).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 py-12 px-4">
      <section className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-700 to-green-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-4">
            Enquiries
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Managing community questions and feedback with care and attention
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-red-800">{error}</span>
              <button
                onClick={() => fetchEnquiries({ page, limit })}
                className="ml-auto px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 p-1">
            <div className="bg-white rounded-2xl">
              <div className="p-8">
                {loading ? (
                  <p className="text-center text-gray-500">Loading enquiries...</p>
                ) : data.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-6">
                      <svg className="w-12 h-12 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Enquiries Yet</h3>
                    <p className="text-gray-500 text-lg">Enquiries from visitors will appear here once submitted.</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-hidden rounded-xl border border-green-100">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-green-200">
                          <thead>
                            <tr className="bg-gradient-to-r from-green-600 to-green-700">
                              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider rounded-tl-xl">Name</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Email</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Message</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Date</th>
                              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider rounded-tr-xl">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-100">
                            {data.map((q, i) => (
                              <tr
                                key={q._id}
                                className={`transition-colors duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 ${
                                  i % 2 === 0 ? "bg-white" : "bg-green-50" /* fixed from bg-green-25 */
                                }`}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                                      <span className="text-white font-semibold text-sm">
                                        {q.name?.charAt(0)?.toUpperCase() || "N"}
                                      </span>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-semibold text-gray-900">{q.name || "N/A"}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <a
                                    href={q.email ? `mailto:${q.email}` : undefined}
                                    className="text-sm text-gray-700 hover:text-green-600 transition-colors"
                                  >
                                    {q.email || "N/A"}
                                  </a>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border-l-4 border-green-400">
                                      <div className="line-clamp-3" title={q.message}>
                                        {q.message}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {formatDate(q.createdAt)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    onClick={() => handleDelete(q._id)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-800 transition-all duration-200 shadow-sm hover:shadow-md"
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-600">
                        Page <span className="font-semibold">{page}</span> of{" "}
                        <span className="font-semibold">{totalPages}</span> ·{" "}
                        <span className="font-semibold">{total}</span> total
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page <= 1}
                          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page >= totalPages}
                          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50"
                        >
                          Next
                        </button>
                        <select
                          value={limit}
                          onChange={(e) => setLimit(Number(e.target.value))}
                          className="ml-2 border border-gray-200 rounded-lg px-2 py-2 text-sm"
                        >
                          {[10, 25, 50, 100].map((n) => (
                            <option key={n} value={n}>{n} / page</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer stats */}
        {!loading && data.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-semibold">Total Enquiries (this page): {data.length}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
