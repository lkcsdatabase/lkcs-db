export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Est. 2005
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Lord Krishna
            <span className="block bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              Convent School
            </span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Nurturing minds, building character, and shaping tomorrow's leaders for over 18 years
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-300 mx-auto mt-8 rounded-full"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl"></div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Principal's Message */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-100 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
            <div className="relative">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-6 text-emerald-900 flex items-center">
                    Principal's Message
                    <div className="ml-4 w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"></div>
                  </h2>
                  <blockquote className="relative">
                    <div className="absolute -left-2 -top-2 text-6xl text-emerald-200 font-serif">"</div>
                    <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 ml-4">
                      <p className="text-xl mb-6 font-medium text-emerald-800 leading-relaxed italic">
                        At Lord Krishna Convent School, we are dedicated to nurturing responsible, innovative, and compassionate global citizens. 
                        Our commitment is to provide holistic education that empowers every child to excel academically, morally, and socially.
                      </p>
                      <footer className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <div>
                          <div className="text-emerald-900 font-bold text-lg">Dr. [Principal Name]</div>
                          <div className="text-emerald-700 text-sm">Principal</div>
                        </div>
                      </footer>
                    </div>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="group">
            <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-2">Our Vision</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"></div>
                  </div>
                </div>
                <p className="text-amber-700 leading-relaxed text-lg">
                  To nurture global citizens with strong values and academic excellence, preparing them to lead with integrity and purpose in an interconnected world.
                </p>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">Our Mission</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <p className="text-emerald-700 leading-relaxed text-lg">
                  Providing holistic education that develops mind, body, and character through innovative pedagogy and timeless values.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* School History */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-gray-100 to-transparent rounded-full -translate-y-20 -translate-x-20"></div>
            <div className="relative">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2V6h12a2 2 0 00-2-2H4zm2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm2 2v4h8v-4H8z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                    History & Legacy
                    <div className="ml-4 w-12 h-1 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full"></div>
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Established in 2005, Lord Krishna Convent School has become a beacon of excellence in education, fostering a tradition of academic achievement, cultural enrichment, and character development. Over the years, we have built a legacy of nurturing young minds and preparing them for the challenges of tomorrow. Our alumni are making meaningful contributions in diverse fields across the world, carrying forward the values and knowledge imparted during their formative years at our institution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Highlights */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-emerald-100 to-transparent rounded-full translate-y-20 translate-x-20"></div>
            <div className="relative">
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-emerald-900 mb-2">Our Distinguished Faculty</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Experienced, qualified teachers for all subjects",
                  "Continuous professional development and training", 
                  "Committed to student mentorship and guidance"
                ].map((text, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 10.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-emerald-800 font-semibold leading-relaxed">{text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievements */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/30 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/20 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative">
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-amber-800 mb-2">Our Achievements</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Consistent 100% board exam results",
                  "Winners at district, state, and national competitions",
                  "Recognized for excellence in sports, arts, and social initiatives"
                ].map((text, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-amber-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 10.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-amber-800 font-semibold leading-relaxed">{text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}