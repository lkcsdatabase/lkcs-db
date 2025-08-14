import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Calendar, Clock, FileText } from "lucide-react";

export default function News() {
  const [news, setNews] = useState([]);
  const [input, setInput] = useState("");
  const [editIdx, setEditIdx] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lkcs_news") || "[]");
    setNews(saved);
  }, []);

  // Save to localStorage whenever news changes
  useEffect(() => {
    localStorage.setItem("lkcs_news", JSON.stringify(news));
  }, [news]);

  function addNews(e) {
    e.preventDefault();
    if (!input.trim()) return;
    if (editIdx !== null) {
      // Edit existing
      const updated = [...news];
      updated[editIdx] = input.trim();
      setNews(updated);
      setEditIdx(null);
    } else {
      // Add new
      setNews([{ text: input.trim(), date: new Date().toLocaleString() }, ...news]);
    }
    setInput("");
  }

  function handleEdit(idx) {
    setInput(news[idx].text);
    setEditIdx(idx);
  }

  function handleDelete(idx) {
    setNews(news.filter((_, i) => i !== idx));
    setInput("");
    setEditIdx(null);
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              News & Announcements
            </h3>
          </div>
          <p className="text-gray-600 text-lg">Manage school news and important announcements</p>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {editIdx !== null ? "Edit Announcement" : "New Announcement"}
              </label>
              <div className="relative">
                <textarea
                  className="w-full border-2 border-green-200 rounded-xl p-4 pr-12 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 resize-none"
                  placeholder="Enter news or announcement..."
                  rows="4"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      addNews(e);
                    }
                  }}
                />
                <div className="absolute top-4 right-4 text-green-400">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-opacity-50 ${
                  editIdx !== null 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 focus:ring-yellow-300' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 focus:ring-green-300'
                }`}
                onClick={addNews}
              >
                {editIdx !== null ? (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Update Announcement
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Announcement
                  </>
                )}
              </button>
              
              {editIdx !== null && (
                <button
                  onClick={() => {
                    setEditIdx(null);
                    setInput("");
                  }}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-green-600" />
            <h4 className="text-xl font-bold text-gray-800">Recent Announcements</h4>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {news.length} {news.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          <div className="space-y-4">
            {news.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No announcements yet</p>
                <p className="text-gray-400 text-sm">Add your first announcement using the form above</p>
              </div>
            ) : (
              news.map((n, idx) => (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 transition-all duration-200 hover:shadow-md ${
                    editIdx === idx ? 'border-l-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50' : 'border-l-green-500'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-gray-800 text-base leading-relaxed font-medium mb-3">
                        {n.text}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Published: {n.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-all duration-200 transform hover:scale-110 focus:ring-4 focus:ring-blue-100"
                        title="Edit announcement"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-all duration-200 transform hover:scale-110 focus:ring-4 focus:ring-red-100"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Stats */}
        {news.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-semibold">News Management</h5>
                <p className="text-green-100 text-sm">Keep your school community informed</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{news.length}</div>
                <div className="text-green-100 text-sm">Total Announcements</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}