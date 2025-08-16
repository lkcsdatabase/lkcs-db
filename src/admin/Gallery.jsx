import { useEffect, useRef, useState } from "react";

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);

  const API =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE ||
    window.__API__ ||
    "https://lkcs.onrender.com";

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; 
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (file.size > maxSize) {
      throw new Error(`File ${file.name} is too large. Maximum size is 50MB.`);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File ${file.name} is not a supported image format.`);
    }

    return true;
  };

  // Replace your handleFileChange function in GalleryAdmin component with this:

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setBusy(true);
    setUploadProgress(0);

    try {
      let uploadedCount = 0;
      const totalFiles = files.length;

      for (const file of files) {
        try {
          // Validate file first
          validateFile(file);

          // Create FormData properly
          const formData = new FormData();
          formData.append('image', file); // This matches upload.single('image') in backend
          formData.append('name', file.name);

          console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

          const res = await fetch(`${API}/api/gallery`, {
            method: "POST",
            credentials: "include",
            // DON'T set Content-Type header - let browser set it with boundary
            body: formData,
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error('Upload response:', res.status, errorText);
            throw new Error(`Failed to upload ${file.name}: ${res.status} ${errorText}`);
          }

          const result = await res.json();
          console.log('Upload success:', result);

          uploadedCount++;
          setUploadProgress((uploadedCount / totalFiles) * 100);
        } catch (fileError) {
          console.error(`Error uploading ${file.name}:`, fileError);
          alert(`Failed to upload ${file.name}: ${fileError.message}`);
        }
      }

      await fetchItems();
      if (uploadedCount > 0) {
        alert(`Successfully uploaded ${uploadedCount} of ${totalFiles} files.`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setBusy(false);
      setUploadProgress(0);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/gallery`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          'Cache-Control': 'no-cache'
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to load gallery: ${res.status} ${errorText}`);
      }

      const json = await res.json();
      setItems(json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (e) {
      console.error("Fetch items error:", e);
      alert(`Could not load gallery items: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!API) {
      console.warn("VITE_API_URL not set; falling back to http://localhost:5000");
    }
    fetchItems();
  }, []);

  const extractYouTubeID = (url) => {
    if (!url || typeof url !== 'string') return null;

    const cleanUrl = url.trim();

    const patterns = [
      /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
      /(?:youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/embed\/)([\w-]{11})/,
      /(?:youtube\.com\/v\/)([\w-]{11})/,
      /[?&]v=([\w-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }

    if (/^[\w-]{11}$/.test(cleanUrl)) {
      return cleanUrl;
    }

    return null;
  };
  const getImageSrc = (item) => {
    if (!item.src) return '';

    if (item.src.startsWith('http')) {
      return item.src;
    }

    const baseUrl = API.replace(/\/$/, '');
    const path = item.src.startsWith('/') ? item.src : `/${item.src}`;

    return `${baseUrl}${path}`;
  };
  const handleAddVideo = async (e) => {
    e.preventDefault();
    const trimmedURL = videoURL.trim();

    if (!trimmedURL) {
      alert("Please enter a YouTube URL");
      return;
    }

    const ytId = extractYouTubeID(trimmedURL);
    if (!ytId) {
      alert("Invalid YouTube URL. Please use a valid YouTube video URL.");
      return;
    }

    setBusy(true);
    try {
      const payload = {
        type: "youtube",
        ytId,
        name: `YouTube Video (${ytId})`,
        url: trimmedURL,
      };

      const res = await fetch(`${API}/api/gallery`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add video: ${res.status} ${errorText}`);
      }

      setVideoURL("");
      await fetchItems();
      alert("Video added successfully!");
    } catch (err) {
      console.error("Add video error:", err);
      alert(`Could not add video: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setBusy(true);
    try {
      const res = await fetch(`${API}/api/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Delete failed: ${res.status} ${errorText}`);
      }

      setItems((prev) => prev.filter((x) => x._id !== id));
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert(`Could not delete item: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-700 to-green-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-4">
            Gallery Uploads
          </h3>
          <p className="text-lg text-gray-600">Manage school memories through images and videos with excellence</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 p-1">
            <div className="bg-white rounded-2xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">Upload Images</h4>
                  </div>

                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      ref={fileRef}
                      disabled={busy}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${busy ? "border-gray-200 bg-gray-50/60" : "border-blue-300 bg-blue-50/50 hover:bg-blue-100/50"
                        }`}
                    >
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        {busy ? `Uploading... ${Math.round(uploadProgress)}%` : "Click to upload images"}
                      </p>
                      <p className="text-sm text-gray-500">Support for JPG, PNG, GIF, WebP files (Max 50MB each)</p>
                      {busy && uploadProgress > 0 && (
                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">Add YouTube Video</h4>
                  </div>

                  <form onSubmit={handleAddVideo} className="space-y-4">
                    <input
                      type="url"
                      value={videoURL}
                      onChange={(e) => setVideoURL(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-4 pr-4 py-3 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-red-50/50"
                      disabled={busy}
                      required
                    />
                    <button
                      type="submit"
                      disabled={busy || !videoURL.trim()}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {busy ? "Adding Video..." : "Add Video to Gallery"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-600 p-1">
            <div className="bg-white rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-gray-800">Gallery Items</h4>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {loading ? "Loading..." : `Total Items: ${items.length}`}
                  </div>
                </div>

                {loading ? (
                  <div className="text-center text-gray-500 py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="mt-2">Loading gallery...</p>
                  </div>
                ) : items.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h5 className="text-2xl font-semibold text-gray-700 mb-2">No Gallery Items Yet</h5>
                    <p className="text-gray-500 text-lg">Upload images or add YouTube videos to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) =>
                      item.type === "youtube" ? (
                        <div
                          key={item._id}
                          className="group relative bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="aspect-video bg-black rounded-xl overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${item.ytId}`}
                              title={item.name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                              loading="lazy"
                            />
                          </div>

                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={busy}
                            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform hover:scale-110 disabled:opacity-60"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium truncate">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={item._id}
                          className="group relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                            <img
                              src={getImageSrc(item)}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                console.error('Image failed to load:', getImageSrc(item));
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                              }}
                            />
                          </div>

                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={busy}
                            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform hover:scale-110 disabled:opacity-60"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium truncate">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Busy overlay */}
      {busy && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="text-gray-700 font-medium">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
