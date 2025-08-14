import { useState } from "react";

export default function Contact() {
  const API = import.meta.env.VITE_API_URL || "https://lkcs.onrender.com";
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSent(false);

    try {
      const { name, email, message } = formData;
      if (!name.trim() || !email.trim() || !message.trim()) {
        throw new Error("Please fill in all required fields.");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error("Please enter a valid email address.");
      }
      // POST to backend (JSON)
      const res = await fetch(`${API}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 400 && json.details) throw new Error(json.details.join(", "));
        throw new Error(json.error || json.message || "Failed to submit enquiry.");
      }

      // Success
      setSent(true);
      setFormData({ name: "", email: "", message: "" });

      // Auto-hide success after 8s
      setTimeout(() => setSent(false), 8000);
    } catch (err) {
      console.error("Enquiry submit error:", err);
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
              Contact & Location
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
            <p className="text-green-100 mt-4 text-lg max-w-2xl mx-auto">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  School Address
                </h3>
              </div>
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  <div className="font-semibold text-green-800 text-lg mb-2">
                    Lord Krishna Convent School
                  </div>
                  <div className="space-y-1 text-gray-600">
                    <div>Dhanwapur Road, Chanchal Vihar</div>
                    <div>Sector 104, Gurugram, Haryana 122006</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="font-medium">Phone:</span>
                      <span className="ml-2 text-green-700 font-semibold">+91 9870203211</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="font-medium">Email:</span>
                      <span className="ml-2 text-green-700 font-semibold">lordkrishna943@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Emergency Contacts
                </h3>
              </div>
              <div className="p-6 space-y-3">
                {/* <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Principal:</span>
                  <span className="text-yellow-700 font-bold">+91-XXXXXXXXXX</span>
                </div> */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">School Office:</span>
                  <span className="text-yellow-700 font-bold">+91-9870203211</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-700">Nearest Hospital:</span>
                  <span className="text-yellow-700 font-bold">08588915252</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                  Find Us on Map
                </h3>
              </div>
              <div className="relative">
                <iframe
                  title="LKCS Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.8542344285675!2d76.99363737445583!3d28.48142478245395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d176f2b82e9ed%3A0x1238492db4043ec8!2sLord%20Krishna%20Convert%20School%2C%20Dhanwapur%20Rd%2C%20Chanchal%20Vihar%2C%20Sector%20104%2C%20Gurugram%2C%20Haryana%20122006!5e0!3m2!1sen!2sin!4v1723020000000!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  className="w-full"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-500 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">Send us a Message</h3>
            <p className="text-green-100 mt-2 text-center">We'd love to hear from you. Drop us a line!</p>
          </div>

          <div className="p-8">
            {sent && (
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg px-6 py-4 mb-6 shadow-md">
                <p className="text-green-800 font-semibold">Message sent successfully!</p>
                <p className="text-green-700 text-sm">We’ll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg px-6 py-4 mb-6 shadow-md">
                <p className="text-red-800 font-semibold">Submission failed</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* ✅ Proper form submit */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none text-gray-700 bg-gray-50 focus:bg-white"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <input
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none text-gray-700 bg-gray-50 focus:bg-white"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email Address"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <textarea
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none text-gray-700 bg-gray-50 focus:bg-white resize-none"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-60 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

        {/* Additional Contact Info Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Office Hours</h4>
            <p className="text-gray-600">Mon - Fri: 8:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Saturday: 8:00 AM - 12:00 PM</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Response Time</h4>
            <p className="text-gray-600">We typically respond within</p>
            <p className="text-gray-600 font-semibold">24-48 hours</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Visit Campus</h4>
            <p className="text-gray-600">Schedule a tour</p>
            <p className="text-gray-600 font-semibold">Call for appointment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
