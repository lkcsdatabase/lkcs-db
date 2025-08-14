import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const adminLinks = [
  { path: "news", label: "News", icon: "📰", description: "Manage news articles" },
  { path: "events", label: "Events", icon: "📅", description: "Event scheduling" },
  { path: "gallery", label: "Gallery", icon: "🖼️", description: "Photo management" },
  { path: "applications", label: "Applications", icon: "📄", description: "Student applications" },
  { path: "users", label: "Users", icon: "👥", description: "User management" },
  { path: "enquiries", label: "Enquiries", icon: "📩", description: "Customer support" },
];

export default function AdminPanel() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-green-50">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside
        className={`
          fixed lg:sticky left-0 top-0 z-50 lg:z-20
          ${isCollapsed ? 'w-20' : 'w-80'} lg:${isCollapsed ? 'w-20' : 'w-80'}
          h-screen overflow-hidden
          bg-gradient-to-b from-green-900 via-green-950 to-emerald-950
          text-white shadow-2xl
          transform transition-all duration-500 ease-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-green-700/30
          backdrop-blur-xl
        `}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/20 via-transparent to-emerald-600/20" />
          <div className="absolute top-1/4 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        {/* Sidebar Header */}
        <div className="relative p-6 border-b border-green-700/40 bg-gradient-to-r from-green-800/50 to-emerald-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center w-full' : 'space-x-3'}`}>
              <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-green-300/20 group-hover:ring-green-300/40 transition-all duration-300">
                <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full" />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
                    Admin Panel
                  </h2>
                  <p className="text-green-300 text-sm font-medium opacity-90">
                    LKCS Dashboard
                  </p>
                </div>
              )}
            </div>
            
            {/* Toggle & Close Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2.5 rounded-xl text-green-300 hover:text-white hover:bg-green-700/50 transition-all duration-300 hover:scale-110 group"
              >
                <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M21 12H3" />
                </svg>
              </button>
              
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2.5 rounded-xl text-green-300 hover:text-white hover:bg-green-700/50 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-green-900/20 scrollbar-thumb-green-700/50">
          {adminLinks.map((link, index) => (
            <Link
              key={link.path}
              to={`/admin/${link.path}`}
              className={`
                group relative flex items-center rounded-2xl font-medium text-sm
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                ${isCollapsed ? 'p-4 justify-center' : 'p-4 space-x-4'}
                ${location.pathname.endsWith(link.path)
                  ? "bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white shadow-2xl shadow-green-600/40 ring-2 ring-green-400/30 scale-[1.02]"
                  : "text-green-200 hover:bg-gradient-to-r hover:from-green-700/60 hover:to-emerald-700/60 hover:text-white hover:shadow-lg hover:shadow-green-600/20"
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon Container */}
              <div className={`relative flex-shrink-0 transition-all duration-300 ${location.pathname.endsWith(link.path) ? 'scale-110' : 'group-hover:scale-110'}`}>
                <div className={`
                  w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300
                  ${location.pathname.endsWith(link.path) 
                    ? 'bg-white/20 shadow-lg' 
                    : 'bg-green-800/30 group-hover:bg-white/10'
                  }
                `}>
                  <span className="text-xl filter drop-shadow-sm">
                    {link.icon}
                  </span>
                </div>
                {location.pathname.endsWith(link.path) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg" />
                )}
              </div>
              
              {/* Label & Description */}
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base leading-tight">
                    {link.label}
                  </div>
                  <div className={`text-xs opacity-75 transition-opacity duration-300 ${
                    location.pathname.endsWith(link.path) ? 'text-green-100' : 'text-green-300 group-hover:text-green-200'
                  }`}>
                    {link.description}
                  </div>
                </div>
              )}
              
              {/* Active indicator line */}
              {location.pathname.endsWith(link.path) && (
                <div className={`absolute ${isCollapsed ? 'right-2 top-1/2 -translate-y-1/2 h-6 w-1' : 'right-4 top-1/2 -translate-y-1/2 h-8 w-1'} bg-white rounded-full shadow-lg`} />
              )}
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 via-green-400/5 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  <div className="font-medium">{link.label}</div>
                  <div className="text-xs opacity-75">{link.description}</div>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Enhanced User Section */}
        <div className="p-4 border-t border-green-700/40 bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm">
          {/* Admin User Card */}
          <div className={`bg-gradient-to-r from-green-800/60 to-emerald-800/60 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-green-600/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-2' : 'space-x-3'}`}>
              <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg ring-3 ring-yellow-300/30 hover:ring-yellow-300/50 transition-all duration-300">
                <svg className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-green-900" />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="text-white font-bold text-sm leading-tight">Administrator</p>
                  <p className="text-green-300 text-xs opacity-90">LKCS Admin • Online</p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Logout Button */}
          <button
            className={`
              w-full flex items-center justify-center font-bold text-sm
              bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-2xl
              hover:from-red-700 hover:via-red-800 hover:to-red-900 
              transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
              shadow-xl hover:shadow-2xl shadow-red-600/30 hover:shadow-red-600/50
              border border-red-500/30 hover:border-red-400/50
              relative overflow-hidden group
              ${isCollapsed ? 'p-4' : 'p-4 space-x-3'}
            `}
            onClick={() => {
              localStorage.removeItem("lkcs_admin");
              window.location.href = "/login";
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <svg className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} relative z-10 drop-shadow`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            
            {!isCollapsed && (
              <span className="relative z-10">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed left-4 top-4 z-30 p-4 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white rounded-2xl shadow-2xl hover:shadow-green-600/50 hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-110 active:scale-95 border border-green-500/30 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
      </button>

      {/* Enhanced Main Content */}
      <main className={`flex-1 transition-all duration-500 ${isCollapsed ? 'lg:ml-0' : 'lg:ml-0'} bg-gradient-to-br from-white via-gray-50 to-green-50 min-h-screen overflow-hidden`}>
        {/* Enhanced Content Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-green-100/50 px-6 py-6 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="ml-20 lg:ml-0 flex-1">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 via-green-600 to-emerald-700 rounded-full shadow-lg" />
                  <div>
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 bg-clip-text capitalize leading-tight">
                      {location.pathname.split('/').pop() || 'Dashboard'}
                    </h1>
                    <p className="text-green-600/80 font-medium text-sm mt-1 flex items-center space-x-2">
                      <span>Manage your {location.pathname.split('/').pop() || 'dashboard'} content</span>
                      <div className="w-1 h-1 bg-green-500 rounded-full" />
                      <span className="text-green-500">Active</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Status Indicators */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2.5 rounded-2xl border border-green-200/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-green-700 text-sm font-bold">System Online</span>
              </div>
              
              <div className="text-green-600 font-semibold text-sm bg-white/80 px-4 py-2.5 rounded-2xl border border-green-100 shadow-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content Area */}
        <div className="p-6 space-y-6">
          <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100/50 min-h-[calc(100vh-12rem)] overflow-hidden hover:shadow-green-100/20 transition-all duration-500 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-400 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-400 to-transparent rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}