import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";

import Academics from "./pages/Academics";
import Life from "./pages/Life";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Career from "./pages/Career";

// Admin Panel & Sections
import AdminPanel from "./admin/AdminPanel";
import News from "./admin/News";
import Events from "./admin/Events";
import GalleryAdmin from "./admin/Gallery";
import Enquiries from "./admin/Enquiries";
import Users from "./admin/Users";
import Reports from "./admin/Reports";
import Applications from "./admin/Applications";

// 404 Page (optional)
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <a href="/" className="text-green-700 underline">Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />        
        <Route path="/academics" element={<Academics />} />
        <Route path="/life" element={<Life />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/career" element={<Career />} />

        {/* Admin Panel - Nested */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="news" element={<News />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<GalleryAdmin />} />          
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="applications" element={<Applications />} />
          <Route path="enquiries" element={<Enquiries />} />
          {/* Default: News */}
          <Route index element={<News />} />
        </Route>
        
        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
