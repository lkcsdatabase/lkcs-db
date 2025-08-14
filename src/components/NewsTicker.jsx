import { useEffect, useRef, useState } from "react";

export default function NewsTicker() {
  const [news, setNews] = useState([]);
  const [paused, setPaused] = useState(false);
  const tickerRef = useRef();

  // Load news from localStorage and update on change
  useEffect(() => {
    function updateNews() {
      const items = JSON.parse(localStorage.getItem("lkcs_news") || "[]");
      setNews(items.map(n => n.text));
    }
    updateNews();
    // Listen for changes (if admin adds/deletes)
    window.addEventListener("storage", updateNews);
    return () => window.removeEventListener("storage", updateNews);
  }, []);

  if (!news.length) return null;

  return (
    <div
      className="w-full bg-yellow-100 py-2 border-b border-yellow-400 cursor-pointer select-none overflow-hidden relative"
      onClick={() => setPaused(v => !v)}
      title={paused ? "Click to resume" : "Click to pause"}
    >
      <div
        ref={tickerRef}
        className={`whitespace-nowrap text-gold-900 font-semibold text-lg transition-all`}
        style={{
          animation: paused
            ? "none"
            : `ticker-scroll ${Math.max(15, news.join(" • ").length / 4)}s linear infinite`
        }}
      >
        {news.join("  •  ")}
      </div>
      {/* Add CSS animation */}
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
