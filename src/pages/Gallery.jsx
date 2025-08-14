import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || "https://lkcs.onrender.com";



export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI state
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  // Helper for YouTube parsing
  function extractYouTubeID(url = "") {
    const match =
      url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))(([\w-]{11}))/) ||
      [];
    return match[1] || null;
  }

  // Fetch gallery from API
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/api/gallery`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const normalized = (Array.isArray(data) ? data : []).map((it) => {
          const type = it.type || (extractYouTubeID(it.url || it.src || "") ? "youtube" : "image");

          if (type === "youtube") {
            const ytId = it.ytId || extractYouTubeID(it.url || it.src || "");
            return {
              ...it,
              type: "youtube",
              ytId,
              name: it.name || `YouTube Video (${ytId || "Unknown"})`,
              thumbnail: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
            };
          }

          const src = it.url || it.src;
          return {
            ...it,
            type: "image",
            src: src?.startsWith("http") ? src : src ? `${API_BASE}${src.startsWith("/") ? "" : "/"}${src}` : "",
            name: it.name || "Image",
          };
        });

        if (!isMounted) return;
        setItems(normalized);
        setFilteredItems(normalized);
      } catch (e) {
        if (isMounted) setErr("Failed to load gallery. Please try again.");
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = items;

    // Filter by type
    if (activeFilter !== "all") {
      filtered = filtered.filter(item => item.type === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [items, activeFilter, searchQuery]);

  // Pagination logic
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  };
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

  // Enhanced Responsive Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    const isMobile = window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 5;
    
    // Calculate visible page range
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return (
      <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12 mb-6 sm:mb-8 px-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1 sm:gap-2 max-w-[calc(100vw-120px)] overflow-x-auto scrollbar-hide">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..." || page === currentPage}
              className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap ${
                page === currentPage
                  ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg border-2 border-green-600"
                  : page === "..."
                  ? "text-green-400 cursor-default bg-transparent"
                  : "text-green-700 hover:bg-green-50 border-2 border-green-200 hover:border-green-400 bg-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  // Enhanced Responsive Lightbox component
  const Lightbox = ({ item, onClose }) => {
    if (!item) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4" 
        onClick={onClose}
      >
        <div className="relative max-w-7xl max-h-[95vh] w-full flex flex-col" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-yellow-400 transition-colors duration-200 z-10"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {item.type === "youtube" ? (
            <div className="relative w-full aspect-video bg-black rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${item.ytId}?autoplay=1`}
                title={item.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center max-h-[85vh]">
              <img
                src={item.src}
                alt={item.name}
                className="max-w-full max-h-full object-contain rounded-lg sm:rounded-2xl shadow-2xl"
              />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 rounded-b-lg sm:rounded-b-2xl">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-2 line-clamp-2">{item.name}</h3>
            <div className="flex items-center gap-2 text-yellow-400">
              {item.type === "youtube" ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8 8.001a2.75 2.75 0 00-1.937-1.939C18.04 6 12 6 12 6s-6.039 0-7.863.062A2.75 2.75 0 002.2 8.001 28.226 28.226 0 002 12c.001 1.345.068 2.271.2 3.998a2.75 2.75 0 001.937 1.939C5.961 18 12 18 12 18s6.04 0 7.863-.062a2.75 2.75 0 001.937-1.939C21.932 14.271 22 13.345 22 12c0-1.345-.068-2.271-.2-3.999zm-11.8 5.999V10l5 2-5 2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              <span className="text-xs sm:text-sm font-medium">{item.type === "youtube" ? "Video" : "Image"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-800 mt-4 sm:mt-6 mb-2">Loading Gallery</h2>
          <p className="text-sm sm:text-base text-green-600">Preparing our cherished memories...</p>
        </div>
      </section>
    );
  }

  const images = items.filter(item => item.type === "image");
  const videos = items.filter(item => item.type === "youtube");

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-16">
          {/* Enhanced Responsive Hero Header */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl sm:rounded-3xl shadow-2xl mb-6 sm:mb-8 transform hover:scale-105 transition-transform duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-800 via-green-700 to-yellow-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
              School Gallery
            </h1>
            
            <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
            
            {err ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.696-.833-3.464 0L.93 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-red-800 font-semibold text-sm sm:text-base">{err}</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-base sm:text-xl text-green-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                  Journey through the vibrant moments and cherished memories that define our school community. 
                  From academic achievements to cultural celebrations, discover the spirit of Lord Krishna Convent School.
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 px-4">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
                    <span className="font-bold text-green-800 text-sm sm:text-base">{items.length} Total Memories</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-bold text-blue-800 text-sm sm:text-base">{images.length} Images</span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.8 8.001a2.75 2.75 0 00-1.937-1.939C18.04 6 12 6 12 6s-6.039 0-7.863.062A2.75 2.75 0 002.2 8.001 28.226 28.226 0 002 12c.001 1.345.068 2.271.2 3.998a2.75 2.75 0 001.937 1.939C5.961 18 12 18 12 18s6.04 0 7.863-.062a2.75 2.75 0 001.937-1.939C21.932 14.271 22 13.345 22 12c0-1.345-.068-2.271-.2-3.999zm-11.8 5.999V10l5 2-5 2z" />
                    </svg>
                    <span className="font-bold text-red-800 text-sm sm:text-base">{videos.length} Videos</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Enhanced Responsive Search and Filter Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-green-100 p-4 sm:p-8 mb-8 sm:mb-12">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Search Bar */}
              <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-green-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 bg-green-50/50 font-medium text-sm sm:text-base"
                />
              </div>

              {/* Enhanced Responsive Filter Tabs */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-green-50 rounded-xl sm:rounded-2xl p-1 sm:p-2 border-2 border-green-100 overflow-x-auto">
                {[
                  { id: "all", label: "All", fullLabel: "All Memories", icon: "✨", count: items.length },
                  { id: "image", label: "Photos", fullLabel: "Photos", icon: "📸", count: images.length },
                  { id: "youtube", label: "Videos", fullLabel: "Videos", icon: "🎥", count: videos.length },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex-1 sm:flex-initial px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap ${
                      activeFilter === filter.id
                        ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg"
                        : "text-green-700 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <span className="text-sm sm:text-lg">{filter.icon}</span>
                    <span className="hidden xs:inline sm:hidden lg:inline">{filter.fullLabel}</span>
                    <span className="xs:hidden sm:inline lg:hidden">{filter.label}</span>
                    <span className={`text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold ${
                      activeFilter === filter.id ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Responsive Gallery Content */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 sm:py-20 px-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-16 max-w-lg mx-auto border-2 border-green-100">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2 sm:mb-3">
                  {searchQuery ? "No matches found" : "No memories yet"}
                </h3>
                <p className="text-green-600 text-base sm:text-lg">
                  {searchQuery ? "Try adjusting your search terms" : "New memories will appear here soon!"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Enhanced Responsive Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                {getCurrentItems().map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelected(item)}
                    className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer border-2 border-green-100 hover:border-green-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-green-50 to-yellow-50 overflow-hidden relative">
                      {item.type === "youtube" ? (
                        <>
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          
                          {/* Enhanced Responsive Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>

                          {/* Enhanced Responsive Video Badge */}
                          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21.8 8.001a2.75 2.75 0 00-1.937-1.939C18.04 6 12 6 12 6s-6.039 0-7.863.062A2.75 2.75 0 002.2 8.001 28.226 28.226 0 002 12c.001 1.345.068 2.271.2 3.998a2.75 2.75 0 001.937 1.939C5.961 18 12 18 12 18s6.04 0 7.863-.062a2.75 2.75 0 001.937-1.939C21.932 14.271 22 13.345 22 12c0-1.345-.068-2.271-.2-3.999zm-11.8 5.999V10l5 2-5 2z" />
                            </svg>
                            <span className="hidden xs:inline">VIDEO</span>
                            <span className="xs:hidden">VID</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iMTIiIGZpbGw9IiNkMWQ1ZGIiLz48cGF0aCBkPSJtMjAgNjAgNjAtNjBNMjAgODAgNjAtNjAiIHN0cm9rZT0iI2QxZDVkYiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+';
                            }}
                          />

                          {/* Enhanced Responsive Image Badge */}
                          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="hidden xs:inline">PHOTO</span>
                            <span className="xs:hidden">PIC</span>
                          </div>
                        </>
                      )}

                      {/* Enhanced Responsive Expand Icon */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </div>

                    {/* Enhanced Responsive Card Content */}
                    <div className="p-3 sm:p-6">
                      <h3 className="font-bold text-green-800 text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-green-600">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {item.type === "youtube" ? (
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21.8 8.001a2.75 2.75 0 00-1.937-1.939C18.04 6 12 6 12 6s-6.039 0-7.863.062A2.75 2.75 0 002.2 8.001 28.226 28.226 0 002 12c.001 1.345.068 2.271.2 3.998a2.75 2.75 0 001.937 1.939C5.961 18 12 18 12 18s6.04 0 7.863-.062a2.75 2.75 0 001.937-1.939C21.932 14.271 22 13.345 22 12c0-1.345-.068-2.271-.2-3.999zm-11.8 5.999V10l5 2-5 2z" />
                              </svg>
                              <span className="font-medium hidden xs:inline">Video</span>
                              <span className="font-medium xs:hidden">Vid</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-medium hidden xs:inline">Photo</span>
                              <span className="font-medium xs:hidden">Pic</span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-green-500 font-medium">
                          <span className="hidden sm:inline">Click to view</span>
                          <span className="sm:hidden">Tap</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-600/0 via-transparent to-yellow-400/0 group-hover:from-green-600/10 group-hover:to-yellow-400/5 transition-all duration-500 pointer-events-none"></div>
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox item={selected} onClose={() => setSelected(null)} />

      {/* Enhanced Responsive Scroll to Top Button */}
      {currentPage > 1 && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage(1);
          }}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 border-2 sm:border-3 border-white"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Enhanced Custom Styles with Responsive Improvements */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #15803d, #16a34a);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #166534, #15803d);
        }

        /* Hide scrollbar for pagination on mobile */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .xs\:inline {
            display: inline;
          }
          .xs\:hidden {
            display: none;
          }
        }

        /* Enhanced mobile touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          .group {
            -webkit-tap-highlight-color: transparent;
          }
        }

        /* Improved focus styles for accessibility */
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid #15803d;
          outline-offset: 2px;
        }

        /* Enhanced grid responsiveness */
        @media (min-width: 1536px) {
          .2xl\:grid-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Optimize for mobile performance */
        .group img {
          will-change: transform;
        }

        /* Prevent layout shift on load */
        .aspect-video {
          aspect-ratio: 16 / 9;
        }

        /* Enhance mobile lightbox experience */
        @media (max-width: 640px) {
          .fixed.inset-0 {
            padding: 0.5rem;
          }
          
          .fixed.inset-0 .relative {
            max-height: 95vh;
          }
        }

        /* Improve button accessibility on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .transform.hover\:scale-105:hover,
          .transform.hover\:scale-110:hover,
          .transform.hover\:-translate-y-1:hover,
          .transform.hover\:-translate-y-2:hover {
            transform: none;
          }
          
          .group:hover .group-hover\:scale-110 {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
