import { useState, useEffect } from "react";

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL || "https://lkcs.onrender.com";

  async function fetchApps() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API}/api/applications`, {
        method: "GET",
        headers: { Accept: "application/json" }, // keep it simple (avoids preflight)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.error || errorData.message || `HTTP ${res.status}: ${res.statusText}`;
        throw new Error(`Backend Error: ${errorMessage}`);
      }

      const responseData = await res.json();
      const applications = responseData.data || responseData;

      if (!Array.isArray(applications)) throw new Error("Invalid response format - expected array");

      const sorted = applications.slice().sort((a, b) => {
        const ad = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bd = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bd - ad;
      });

      setApps(sorted);
    } catch (err) {
      console.error("❌ Failed to fetch applications:", err);
      let msg = err.message || "Failed to load applications";
      if (err.name === "TypeError") {
        msg = "Network error - is the backend server running on port 5000?";
      }
      setError(msg);
      setApps([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this application? This action cannot be undone.")) return;
    try {
      const res = await fetch(`${API}/api/applications/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Delete failed: ${res.status}`);
      }
      setApps((prev) => prev.filter((x) => x._id !== id));
      alert("Application deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert(`Error deleting application: ${err.message}`);
    }
  }

  function handleDownload(id) {
    // Rely on server Content-Disposition for filename
    window.open(`${API}/api/applications/${id}/resume`, "_blank");
  }

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

  function getStatusBadge(status = "pending") {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      reviewed: "bg-blue-100 text-blue-800 border-blue-300",
      shortlisted: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return styles[status] || styles.pending;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-700 to-green-600 rounded-full mb-4 animate-spin">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-lg text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 py-12 px-4">
      <section className="container mx-auto max-w-7xl">
        {/* header omitted for brevity */}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error Loading Applications</h3>
                <p className="text-red-600">{error}</p>
                <button onClick={fetchApps} className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 p-1">
            <div className="bg-white rounded-2xl">
              <div className="p-8">
                {apps.length === 0 ? (
                  <div className="text-center py-16">
                    {/* empty state */}
                    <button onClick={fetchApps} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Refresh
                    </button>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-green-100">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-green-200">
                        <thead>
                          <tr className="bg-gradient-to-r from-green-600 to-green-700">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Position</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Resume</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Message</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Applied</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                          {apps.map((app, i) => (
                            <tr key={app._id} className={`transition-colors duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 ${i % 2 === 0 ? "bg-white" : "bg-green-50"}`}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="text-white font-semibold text-sm">
                                      {app.name?.charAt(0)?.toUpperCase() || "N"}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-semibold text-gray-900">{app.name || "N/A"}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700">{app.email || "N/A"}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700">{app.phone || "N/A"}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300">
                                  {app.position || "N/A"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(app.status)}`}>
                                  {(app.status || "pending").charAt(0).toUpperCase() + (app.status || "pending").slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {app._id ? (
                                  <button
                                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:text-green-800 transition-all duration-200 shadow-sm hover:shadow-md"
                                    onClick={() => handleDownload(app._id)}
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download
                                  </button>
                                ) : (
                                  <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 border">
                                    No Resume
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-700 max-w-xs truncate" title={app.message || "No message"}>
                                  {app.message || "No message provided"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{formatDate(app.createdAt)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleDelete(app._id)}
                                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-800 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                )}
              </div>
            </div>
          </div>
        </div>

        {!loading && apps.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-lg">
              <span className="font-semibold">Total Applications: {apps.length}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
