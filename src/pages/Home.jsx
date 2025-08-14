import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import NewsTicker from "../components/NewsTicker";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";

const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  "http://localhost:5000";

const FEATURES = [
  { 
    icon: "⚽", 
    title: "Sports Excellence", 
    desc: "State-of-the-art facilities for cricket, football, athletics, and indoor games to encourage physical fitness and teamwork." 
  },
  { 
    icon: "💻", 
    title: "Smart Classrooms", 
    desc: "Interactive digital boards, e-learning tools, and modern teaching technology for enhanced learning experiences." 
  },
  { 
    icon: "🛡️", 
    title: "Advanced Security", 
    desc: "24/7 CCTV surveillance, secured campus entry, and trained staff ensuring safety for all students." 
  },
  { 
    icon: "🎭", 
    title: "Co-Curricular Activities", 
    desc: "Art, music, drama, debates, and cultural events to nurture creativity and overall personality development." 
  }
];


// ---- Gallery Preview Component (latest 4 images from API) ----
function HomeGalleryPreview() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // turn /uploads/... into absolute URLs (same approach as Gallery page)
  const toAbsoluteUrl = (src = "") => {
    if (!src) return "";
    if (src.startsWith("http")) return src;
    // ensure exactly one slash between base and path
    return `${API}${src.startsWith("/") ? "" : "/"}${src}`;
  };

  async function loadGallery() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/gallery`);
      if (!res.ok) throw new Error("Failed to load gallery");

      const all = await res.json();

      // normalize + pick the latest 4 images
      const imgs = (Array.isArray(all) ? all : [])
        .map((it) => {
          const raw = it.url || it.src || "";
          const type =
            it.type ||
            (/(youtu\.be|youtube\.com)/i.test(raw) ? "youtube" : "image");

          return {
            ...it,
            type,
            src: type === "image" ? toAbsoluteUrl(raw) : raw,
            name: it.name || "Image",
          };
        })
        .filter((x) => x.type === "image")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      setImages(imgs);
    } catch (e) {
      console.error(e);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="text-slate-500 text-center py-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
        Loading gallery…
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="text-slate-500 text-center py-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
        <div className="text-6xl mb-4 opacity-20">📸</div>
        <p className="text-lg font-medium">No images uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <img
              src={img.src}
              alt={img.name}
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // graceful fallback instead of a broken image
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHBhdGggZD0iTTgwIDEzMGMzMC0zMCA3MC0zMCAxMDAtMTBNNzAgOTBjNS0xNSA0MC0yMCA1MC0xMCIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-sm truncate max-w-[13rem]">
                  {img.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="/gallery"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white font-semibold rounded-full hover:from-emerald-800 hover:to-emerald-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span>Explore Gallery</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}


// ---- Calendar Component (unchanged) ----
function EventCalendar({ events, onDateSelect, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const hasEvents = (day) => {
    if (!day) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.some((e) => e.date === dateStr || e.date?.includes?.(dateStr));
  };

  const isSelected = (day) => {
    if (!day || !selectedDate) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return selectedDate === dateStr;
  };

  const isToday = (day) =>
    day &&
    today.getDate() === day &&
    today.getMonth() === currentMonth &&
    today.getFullYear() === currentYear;

  const navigateMonth = (dir) => setCurrentDate(new Date(currentYear, currentMonth + dir, 1));
  const clickDate = (day) => {
    if (!day) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelect(dateStr);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-xl font-bold text-slate-800">{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-sm font-semibold text-slate-600 py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => (
          <div key={idx} className="aspect-square">
            {day ? (
              <button
                onClick={() => clickDate(day)}
                className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isSelected(day)
                    ? "bg-emerald-600 text-white shadow-md"
                    : isToday(day)
                    ? "bg-amber-100 text-amber-800 border-2 border-amber-400"
                    : hasEvents(day)
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                {day}
                {hasEvents(day) && !isSelected(day) && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-400 rounded-full" /><span className="text-slate-600">Today</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" /><span className="text-slate-600">Has Events</span></div>
      </div>
    </div>
  );
}

// ---- Events Preview Component (fetch from API) ----
function HomeEventsPreview() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  function normalizeDateStr(d) {
    // accept "YYYY-MM-DD" or ISO; output "YYYY-MM-DD"
    const date = typeof d === "string" && d.length === 10 ? new Date(`${d}T00:00:00`) : new Date(d);
    if (isNaN(date)) return null;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
    }

  async function loadEvents() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/events`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const json = await res.json();

      // Normalize events (ensure date is "YYYY-MM-DD")
      const normalized = json
        .map((e) => ({
          _id: e._id,
          title: e.title || "Untitled",
          desc: e.desc || "",
          date: e.date ? normalizeDateStr(e.date) : normalizeDateStr(e.createdAt),
          time: e.time || "",
          location: e.location || "",
          createdAt: e.createdAt || new Date().toISOString(),
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(normalized);
      setDisplayedEvents(normalized.slice(0, 6));
    } catch (e) {
      console.error(e);
      setEvents([]);
      setDisplayedEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = events.filter((ev) => ev.date === selectedDate || ev.date?.includes?.(selectedDate));
      setDisplayedEvents(filtered.length ? filtered : events.slice(0, 6));
    } else {
      setDisplayedEvents(events.slice(0, 6));
    }
  }, [selectedDate, events]);

  const handleDateSelect = (date) => setSelectedDate(selectedDate === date ? null : date);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d)
      ? dateStr
      : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="text-slate-500 text-center py-12 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
        Loading events…
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-slate-500 text-center py-12 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
        <div className="text-6xl mb-4 opacity-20">📅</div>
        <p className="text-lg font-medium">No upcoming events yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <EventCalendar events={events} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
      </div>

      <div className="lg:col-span-2 space-y-6">
        {selectedDate && (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
              <span className="text-amber-800 font-semibold">Events for {formatDate(selectedDate)}</span>
            </div>
            <button onClick={() => setSelectedDate(null)} className="w-6 h-6 flex items-center justify-center bg-amber-200 rounded-full hover:bg-amber-300 transition-colors duration-200">
              <svg className="w-4 h-4 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: "calc(var(--spacing) * 140)" }}>
          {displayedEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 border-l-4 border-amber-500 hover:border-amber-600 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-amber-700 font-medium uppercase tracking-wide bg-amber-100 px-2 py-1 rounded-full">
                      {formatDate(event.date)}
                    </div>
                  </div>
                </div>
                {event.time && <div className="text-sm text-slate-500 font-medium">{event.time}</div>}
              </div>

              <div className="mb-3">
                <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                  {event.title}
                </h3>
                {event.desc && <p className="text-sm text-slate-600 leading-relaxed">{event.desc}</p>}
              </div>

              {event.location && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {displayedEvents.length === 0 && selectedDate && (
          <div className="text-center py-8 text-slate-500 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-2">📅</div>
            <p>No events found for this date.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-slate-50">
      <NewsTicker />

      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute opacity-10 bg-amber-300 blur-3xl rounded-full w-96 h-96 top-[-8rem] left-[-8rem]" />
          <div className="absolute opacity-10 bg-emerald-300 blur-3xl rounded-full w-80 h-80 bottom-[-6rem] right-[-6rem]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="relative z-10 mb-8">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <img src={logo} alt="LKCS Logo" className="w-28 h-28 rounded-full border-4 border-amber-400 bg-white/95 shadow-2xl" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-amber-200 font-light tracking-wide">Knowledge is Light,</span>
            <span className="block mt-2">Character is Strength</span>
          </h1>

          <div className="mb-8 space-y-4">
            <p className="text-xl md:text-2xl font-light text-slate-100 leading-relaxed">Welcome to Lord Krishna Convent School</p>
            <p className="text-lg md:text-xl text-amber-100 font-medium max-w-3xl mx-auto leading-relaxed">
              Nurturing values, excellence, and leaders for tomorrow through time-honored traditions and modern pedagogy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#academics" className="px-10 py-4 bg-white/15 backdrop-blur-sm border-2 border-white/30 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-900 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
              Explore Academics 
            </a>
            <a href="#about" className="px-10 py-4 bg-amber-600/80 backdrop-blur-sm border-2 border-amber-500 rounded-full text-lg font-semibold hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        {/* ...unchanged content... */}
        <div className="container mx-auto px-6">
          {/* keep your About content here exactly as before */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          {/* features header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">School Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive digital platform designed to enhance the educational experience for students, parents, and teachers through innovative technology and traditional values.
            </p>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 p-8 transition-all duration-500 transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Gallery Highlights</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Capturing precious moments and celebrating achievements across our vibrant school community.
            </p>
          </div>
          <HomeGalleryPreview />
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Upcoming Events</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stay connected with our dynamic calendar of academic, cultural, and community events.
            </p>
          </div>
          <HomeEventsPreview />
        </div>
      </section>

      {/* House System Section */}
      <section id="houses" className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our House System</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Four distinguished houses fostering healthy competition, leadership, and camaraderie among our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Arjuna House", gradient: "from-red-500 to-red-600", text: "Courage & Valor", icon: "🏹" },
              { name: "Krishna House", gradient: "from-blue-500 to-blue-600", text: "Wisdom & Knowledge", icon: "🪶" },
              { name: "Hanuman House", gradient: "from-yellow-500 to-amber-500", text: "Strength & Devotion", icon: "💪" },
              { name: "Ganga House", gradient: "from-green-500 to-emerald-600", text: "Purity & Flow", icon: "🌊" }
            ].map((house, index) => (
              <div key={house.name} className="group">
                <div className={`bg-gradient-to-br ${house.gradient} rounded-2xl shadow-2xl p-8 text-white text-center transform transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl`}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {house.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{house.name}</h3>
                  <p className="text-white/90 font-medium italic">{house.text}</p>
                  <div className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full w-3/4 transition-all duration-1000 group-hover:w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Academic Excellence</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-amber-600 mx-auto mb-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl">
                    📚
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Curriculum & Structure</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-3">Academic Program</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        CBSE/Board syllabus Nursery–XII
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        Languages, Science, Mathematics, Arts, Sports
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-3">Class Structure</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { level: "Pre-Primary", classes: "Nursery, KG" },
                        { level: "Primary", classes: "I–V" },
                        { level: "Middle", classes: "VI–VIII" },
                        { level: "Secondary", classes: "IX–XII" }
                      ].map((level, idx) => (
                        <div key={idx} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="font-medium text-emerald-800 text-sm">{level.level}</div>
                          <div className="text-slate-600 text-xs">{level.classes}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Key Highlights</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Expert Faculty", desc: "Experienced educators with modern teaching methodologies" },
                    { title: "Modern Facilities", desc: "State-of-the-art laboratories and learning resources" },
                    { title: "Holistic Development", desc: "Focus on academics, sports, arts, and character building" },
                    { title: "Proven Results", desc: "Consistent excellence in board examinations and competitions" },
                    { title: "Value Education", desc: "Integrated moral and ethical development programs" },
                    { title: "Co-curricular Excellence", desc: "Rich program of clubs, societies, and extracurricular activities" }
                  ].map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800 mb-1">{highlight.title}</h5>
                        <p className="text-slate-600 text-sm">{highlight.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <FAQ />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <Testimonials />
        </div>
      </section>

      {/* Footer CTA Section */}

      <section className="py-16 bg-gradient-to-r from-emerald-800 to-amber-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have Questions About Our School?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're interested in admissions, academics, or extracurricular activities, our team is ready to assist you and your family.
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}