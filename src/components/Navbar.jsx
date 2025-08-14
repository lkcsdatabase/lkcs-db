import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/logo.png';


export default function Navbar() {
  const isAdmin = localStorage.getItem("lkcs_admin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            {/* School Logo/Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <img
                src={logo}
                alt="LKCS Logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full border-2 border-green-700 shadow"
              />
            </div>


            {/* School Name */}
            <div className="hidden sm:block">
              <h1 className="font-bold text-green-800 text-xl md:text-2xl font-sans leading-tight">
                LKCS
              </h1>
              <p className="text-xs text-green-600 font-medium tracking-wide">
                Lord Krishna Convent School
              </p>
            </div>

            {/* Mobile Logo Text */}
            <h1 className="sm:hidden font-bold text-green-800 text-xl font-sans">
              LKCS
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="relative px-4 py-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-300 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/about"
              className="relative px-4 py-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-300 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/gallery"
              className="relative px-4 py-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-300 group"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/career"
              className="relative px-4 py-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-300 group"
            >
              Careers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>



            {/* Admin/Dashboard Button */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="ml-4 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-4 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-green-700 hover:text-green-800 hover:bg-green-50 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="px-2 pt-2 pb-4 space-y-2 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg mt-2 border border-green-100">

            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-green-700 font-semibold hover:bg-white hover:text-green-800 rounded-lg transition-all duration-300"
            >
              🏠 Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-green-700 font-semibold hover:bg-white hover:text-green-800 rounded-lg transition-all duration-300"
            >
              ℹ️ About
            </Link>

            <Link
              to="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-green-700 font-semibold hover:bg-white hover:text-green-800 rounded-lg transition-all duration-300"
            >
              🖼️ Gallery
            </Link>

            <Link
              to="/career"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-green-700 font-semibold hover:bg-white hover:text-green-800 rounded-lg transition-all duration-300"
            >
              🏛️ Careers
            </Link>

            <div className="border-t border-green-200 pt-2 mt-2">
              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
