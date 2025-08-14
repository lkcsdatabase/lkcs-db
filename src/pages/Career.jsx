import { useRef, useState, useEffect } from "react";

export default function Career() {
  const fileInput = useRef(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    // Clear success timeout on unmount to avoid setState on unmounted
    return () => {};
  }, []);

  // inside Career component

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    // e.currentTarget is guaranteed to be the <form> on submit
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const position = (fd.get("position") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();
    const resumeFile = fileInput.current?.files?.[0] || fd.get("resume");

    if (!name || !email || !phone || !position) {
      throw new Error("Please fill in all required fields");
    }
    if (!resumeFile) {
      throw new Error("Please upload your resume");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Please enter a valid email address");
    if (phone.length < 10) throw new Error("Phone number must be at least 10 digits");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resumeFile.type)) {
      throw new Error("Please upload a PDF, DOC, or DOCX file");
    }
    if (resumeFile.size > 5 * 1024 * 1024) {
      throw new Error("Resume file must be smaller than 5MB");
    }

    // Reuse the same FormData (no need to rebuild)
    const response = await fetch(`${API}/api/applications`, {
      method: "POST",
      body: fd, // contains all fields + resume
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 409) throw new Error("An application with this email already exists");
      if (response.status === 413) throw new Error("File too large. Please upload a smaller resume");
      if (response.status === 400 && data.details) throw new Error(data.details.join(", "));
      throw new Error(data.error || data.message || "Failed to submit application");
    }

    setSuccess(true);
    form.reset();
    if (fileInput.current) fileInput.current.value = "";
    setTimeout(() => setSuccess(false), 10000);
  } catch (err) {
    console.error("Submission error:", err);
    setError(err.message || "Failed to submit application. Please try again.");
  } finally {
    setLoading(false);
  }
}


  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOC, or DOCX file");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Please upload a file smaller than 5MB");
      e.target.value = "";
      return;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 px-4">
       <div className="container mx-auto max-w-4xl mb-12">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            Career Opportunities
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Join Our Team of
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent"> Excellence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Shape young minds and be part of a legacy that nurtures values, wisdom, and holistic development at Lord Krishna Convent School
          </p>
        </div>
      </div>



      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Why Join Us Section */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-3"></div>
                Why Choose LKCS?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Collaborative and supportive work environment</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Professional development opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Modern teaching resources and technology</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Competitive compensation and benefits</p>
                </div>
              </div>
            </div>

            {/* Open Positions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full mr-3"></div>
                Open Positions
              </h3>
              <div className="grid gap-3">
                {['Mathematics Teacher', 'English Teacher', 'Science Teacher', 'Administrative Assistant', 'Sports Coach'].map((position, index) => (
                  <div key={index} className="bg-gradient-to-r from-emerald-50 to-amber-50 p-4 rounded-xl border-l-4 border-emerald-600 hover:shadow-md transition-all duration-300">
                    <p className="font-semibold text-emerald-800">{position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Apply Now</h2>
              <p className="text-emerald-100">
                Ready to make a difference? Submit your application and join our family of dedicated educators.
              </p>
            </div>

            <div className="p-8">
              {success && (
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 p-4 mb-6 rounded-r-lg">
                  <p className="font-semibold text-emerald-800">Application Submitted Successfully!</p>
                  <p className="text-emerald-700 text-sm">We'll contact you if shortlisted. Thank you for your interest!</p>
                </div>
              )}

              {error && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                  <p className="font-semibold text-red-800">Submission Failed</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* ✅ Proper form wrapper */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                    <input
                      name="name"
                      required
                      disabled={loading}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      disabled={loading}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      disabled={loading}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Position Applying For *</label>
                    <input
                      name="position"
                      required
                      disabled={loading}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="e.g., Mathematics Teacher"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Cover Letter / Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    disabled={loading}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us why you'd be a great addition to our team..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Upload Resume *</label>
                  <div className="relative">
                    <input
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      ref={fileInput}
                      required
                      disabled={loading}
                      onChange={handleFileChange}
                      className="w-full border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl mt-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100 text-center">
          <h3 className="text-2xl font-bold text-emerald-900 mb-4">Need More Information?</h3>
          <p className="text-gray-600 mb-6">
            Have questions about our openings or application process? We're here to help!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 text-emerald-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>lordkrishna943@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+91 9870203211</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
