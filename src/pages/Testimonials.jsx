const TESTIMONIALS = [
  {
    name: "Aarav Sharma",
    relation: "Alumnus",
    text: "LKCS shaped my academic journey and personal growth. The teachers go above and beyond, and the house system made learning fun and competitive!",
  },
  {
    name: "Neha Gupta",
    relation: "Parent",
    text: "My daughter loves going to school every day. The environment is safe, nurturing, and she's encouraged to explore her interests.",
  },
  {
    name: "Riya Singh",
    relation: "Class XII Student",
    text: "From science club to cultural fests, LKCS gave me countless opportunities to shine outside the classroom too. The support from staff is amazing.",
  },
  {
    name: "Sunil Kumar",
    relation: "Parent",
    text: "Very transparent communication, excellent teaching, and strong values. I highly recommend LKCS to every parent.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full opacity-30 -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-100 rounded-full opacity-20 translate-x-24 translate-y-24"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 font-['Inter',sans-serif]">
            What Our Community Says
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-amber-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Discover the experiences and stories from our students, parents, and alumni who are part of the LKCS family
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={idx}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 overflow-hidden"
            >
              {/* Card accent decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-amber-500 to-green-600"></div>
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              {/* Testimonial content */}
              <div className="relative z-10">
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium italic">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-green-800 text-lg font-['Inter',sans-serif]">
                      {testimonial.name}
                    </h4>
                    <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide">
                      {testimonial.relation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover effect decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-amber-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-green-600 rounded-full"></div>
              <div className="absolute top-8 right-8 w-6 h-6 bg-amber-500 rounded-full"></div>
              <div className="absolute bottom-6 left-8 w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-amber-500 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-green-800 mb-4 font-['Inter',sans-serif]">
                Share Your LKCS Experience
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Want to share your feedback and become part of our testimonial community?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center text-green-700 font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email us at:
                </div>
                <a 
                  href="mailto:info@lkcs.edu.in" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  lordkrishna943@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}