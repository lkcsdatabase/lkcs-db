import { useEffect, useState } from "react";

export default function Reports() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("lkcs_events") || "[]"));
    setNews(JSON.parse(localStorage.getItem("lkcs_news") || "[]"));
  }, []);

  // Get upcoming events (events in the future)
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= new Date();
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-3 rounded-xl">
              <div className="w-6 h-6 text-white text-xl font-bold">📊</div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Reports & Analytics
            </h3>
          </div>
          <p className="text-gray-600 text-lg">Comprehensive overview of school activities and performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📅</div>
              <div className="text-right">
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <div className="text-green-100 text-sm">Upcoming Events</div>
              </div>
            </div>
            <div className="text-green-100 text-sm">
              {events.length} total events scheduled
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📢</div>
              <div className="text-right">
                <div className="text-2xl font-bold">{news.length}</div>
                <div className="text-purple-100 text-sm">Announcements</div>
              </div>
            </div>
            <div className="text-purple-100 text-sm">
              Latest communication updates
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xl">📅</div>
            <h4 className="text-xl font-bold text-gray-800">Upcoming Events</h4>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {upcomingEvents.length} upcoming
            </div>
          </div>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl">📅</div>
              </div>
              <p className="text-gray-500 text-lg font-medium">No upcoming events</p>
              <p className="text-gray-400 text-sm">Events will appear here when scheduled</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Event Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map((ev, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-green-50 transition-colors duration-200">
                      <td className="py-4 px-6 font-medium text-gray-800">{ev.title}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(ev.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{ev.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xl">📢</div>
            <h4 className="text-xl font-bold text-gray-800">Recent Announcements</h4>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
              Latest 5
            </div>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl">📢</div>
              </div>
              <p className="text-gray-500 text-lg font-medium">No announcements yet</p>
              <p className="text-gray-400 text-sm">Recent news will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.slice(0, 5).map((n, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-l-purple-500">
                  <p className="text-gray-800 font-medium mb-2">{n.text}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="text-sm">📖</div>
                    <span>Published: {n.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}