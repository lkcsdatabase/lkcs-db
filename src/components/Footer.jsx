import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-yellow-100 py-12 mt-16 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-300 rounded-full"></div>
        <div className="absolute top-12 right-8 w-8 h-8 bg-yellow-300 rounded-full"></div>
        <div className="absolute bottom-8 left-1/4 w-12 h-12 border border-yellow-300 rotate-45"></div>
        <div className="absolute bottom-4 right-1/3 w-6 h-6 bg-yellow-300 rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* School Info */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="mb-4">
              <h3 className="text-3xl font-bold tracking-wide text-yellow-100 mb-3">
                Lord Krishna Convent School
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto md:mx-0 mb-4 rounded-full"></div>
              <p className="text-lg text-yellow-200 font-medium italic mb-3">
                "Knowledge is Light, Character is Strength"
              </p>
              <p className="text-yellow-300 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                Nurturing young minds with values, wisdom, and excellence for over decades.
                We are committed to holistic development and character building.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="https://www.facebook.com/profile.php?id=100065196832750" className="bg-yellow-600 hover:bg-yellow-500 text-green-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm font-bold">f</span>
              </a>
              {/* <a href="#" className="bg-yellow-600 hover:bg-yellow-500 text-green-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm font-bold">@</span>
              </a>
              <a href="#" className="bg-yellow-600 hover:bg-yellow-500 text-green-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm font-bold">in</span>
              </a> */}
              <a href="https://www.youtube.com/channel/UCCgJDuz05g-O0I52-C5-jxw" className="bg-yellow-600 hover:bg-yellow-500 text-green-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm font-bold">yt</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4 text-yellow-200">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/academics", label: "Academics" },
                
                { to: "/gallery", label: "Gallery" },
                { to: "/contact", label: "Contact Us" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-yellow-100 hover:text-yellow-300 transition-colors duration-300 flex items-center justify-center md:justify-start group"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4 text-yellow-200">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start justify-center md:justify-start">
                <div className="bg-yellow-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-green-900 text-xs font-bold">📍</span>
                </div>
                <div>
                  <p className="text-yellow-100 text-sm leading-relaxed">
                    Dhanwapur Road, Chanchal Vihar
                    <br />
                    Sector 104, Gurugram, Haryana-122006<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start">
                <div className="bg-yellow-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-900 text-xs font-bold">📞</span>
                </div>
                <a href="tel:+91 9870203211" className="text-yellow-100 hover:text-yellow-300 transition-colors text-sm">
                  +91 9870203211
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start">
                <div className="bg-yellow-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-900 text-xs font-bold">✉️</span>
                </div>
                <a
                  href="mailto:info@lkcs.edu.in"
                  className="text-yellow-100 hover:text-yellow-300 transition-colors text-sm break-all"
                >
                  lordkrishna943@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* House Colors Strip */}
        <div className="mb-6">
          <div className="flex justify-center items-center space-x-1 mb-2">
            <div className="w-16 h-2 bg-red-500 rounded-full"></div>
            <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-16 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-16 h-2 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-center text-yellow-300 text-xs">
            United in Diversity - Four Houses, One Family
          </p>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-yellow-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-yellow-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Lord Krishna Convent School. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-yellow-300">
              <Link to="/privacy" className="hover:text-yellow-100 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-yellow-100 transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-yellow-100 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}