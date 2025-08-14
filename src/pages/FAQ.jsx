import { useState } from "react";

const FAQS = [
  {
    q: "What is the admission process?",
    a: "Admission forms are available at the school office or can be downloaded online. Submit the completed form with required documents. Shortlisted candidates will be called for an interaction/interview.",
    icon: "📝",
    category: "Admissions"
  },
  {
    q: "What are the school timings?",
    a: "Classes run from 8:00 AM to 2:00 PM, Monday to Saturday. Pre-primary timings may vary.",
    icon: "🕒",
    category: "Schedule"
  },
  {
    q: "Does the school provide transportation?",
    a: "Yes, we have safe, GPS-enabled school buses covering major routes. Contact the transport office for details.",
    icon: "🚌",
    category: "Transport"
  },
  {
    q: "How can parents meet teachers?",
    a: "Parent-Teacher Meetings are scheduled bi-monthly. For urgent matters, appointments can be arranged via the school office.",
    icon: "👥",
    category: "Communication"
  },
  {
    q: "Is there a facility for online fee payment?",
    a: "Yes, fee payments can be made online via the school's payment portal or through bank transfer.",
    icon: "💳",
    category: "Fees"
  },
  {
    q: "What safety measures are in place?",
    a: "The school campus is under CCTV surveillance, with security staff and regular safety drills conducted for students.",
    icon: "🛡️",
    category: "Safety"
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-yellow-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full mb-6"></div>
          <p className="text-green-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about Lord Krishna Convent School. 
            Can't find what you're looking for? Feel free to contact us directly.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {FAQS.map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                  open === idx 
                    ? 'border-green-300 shadow-xl ring-4 ring-green-100' 
                    : 'border-green-100 hover:border-green-200 hover:shadow-xl'
                }`}
              >
                {/* Question Button */}
                <button
                  className="flex justify-between items-center w-full p-6 text-left group"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon and Category */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center text-xl group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-xs text-green-600 font-medium">{item.category}</span>
                    </div>
                    
                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-green-900 group-hover:text-green-700 transition-colors duration-200">
                        {item.q}
                      </h3>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className={`ml-4 transition-all duration-300 ${open === idx ? "rotate-90 text-green-600" : "text-green-400"}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                {/* Answer Content */}
                <div className={`transition-all duration-300 ease-in-out ${
                  open === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 border-l-4 border-green-400">
                      <p className="text-green-800 leading-relaxed text-base">
                        {item.a}
                      </p>
                      
                      {/* Additional help indicator */}
                      <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Still have questions? Contact our office for more details.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-green-100 p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900">Need More Help?</h3>
            </div>
            <p className="text-green-700 leading-relaxed mb-6">
              Our friendly staff is always ready to assist you with any questions or concerns about your child's education journey.
            </p>
            
            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-green-800 font-medium">Call Office</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-yellow-800 font-medium">Send Email</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-blue-800 font-medium">Visit Campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}