import { useEffect, useState } from "react";

const HOUSE_INFO = [
  {
    name: "Arjuna House",
    color: "bg-red-500",
    gradientFrom: "from-red-500",
    gradientTo: "to-red-600",
    text: "Courage & Valor",
    description: "Embodying the spirit of the greatest archer, fostering bravery and determination in every challenge.",
    icon: "🏹",
    bgPattern: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    name: "Krishna House",
    color: "bg-blue-600",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-700",
    text: "Wisdom & Knowledge",
    description: "Following the path of divine wisdom, nurturing intellect and spiritual understanding.",
    icon: "📚",
    bgPattern: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    name: "Hanuman House",
    color: "bg-yellow-500",
    gradientFrom: "from-yellow-400",
    gradientTo: "to-yellow-600",
    text: "Strength & Devotion",
    description: "Channeling unwavering devotion and physical strength to overcome all obstacles.",
    icon: "💪",
    bgPattern: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  {
    name: "Ganga House",
    color: "bg-green-600",
    gradientFrom: "from-green-500",
    gradientTo: "to-green-700",
    text: "Purity & Flow",
    description: "Like the sacred river, flowing with purity of thought and continuous progress.",
    icon: "🌊",
    bgPattern: "bg-green-50",
    borderColor: "border-green-200"
  }
];

export default function Houses() {
  const [points, setPoints] = useState([0, 0, 0, 0]);

  useEffect(() => {
    // Pull house points from localStorage, fallback to zeros
    const houses = JSON.parse(localStorage.getItem("lkcs_houses") || "[]");
    if (houses.length === 4) {
      setPoints(houses.map(h => h.points));
    }
  }, []);

  // Find the leading house
  const maxPoints = Math.max(...points);
  const leadingHouseIndex = points.indexOf(maxPoints);

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-yellow-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 21V5a2 2 0 012-2h6a2 2 0 012 2v16" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            The House System
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto rounded-full mb-6"></div>
          <p className="text-green-700 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Four legendary houses, each embodying unique virtues and values, compete in the spirit of excellence, 
            character building, and holistic development
          </p>
          
          {/* Current Leader Badge */}
          {maxPoints > 0 && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-yellow-200">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-green-800 font-semibold">
                Current Leader: <span className="text-yellow-600">{HOUSE_INFO[leadingHouseIndex].name}</span>
              </span>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Houses Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {HOUSE_INFO.map((house, idx) => (
              <div 
                key={house.name} 
                className="relative group"
              >
                {/* Leading House Crown */}
                {idx === leadingHouseIndex && maxPoints > 0 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      👑 LEADING
                    </div>
                  </div>
                )}

                {/* House Card */}
                <div className={`bg-gradient-to-br ${house.gradientFrom} ${house.gradientTo} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white h-80`}>
                  
                  {/* Card Content */}
                  <div className="p-6 h-full flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {house.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{house.name}</h3>
                      <div className="text-sm font-medium opacity-90 mb-4">{house.text}</div>
                    </div>

                    {/* Middle Section - Points */}
                    <div className="text-center flex-grow flex flex-col justify-center">
                      <div className="text-sm font-medium opacity-75 mb-2">House Points</div>
                      <div className="text-3xl font-bold mb-3">
                        {points[idx].toLocaleString()}
                      </div>
                      
                      {/* Points Bar */}
                      <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: maxPoints > 0 ? `${(points[idx] / maxPoints) * 100}%` : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="text-center">
                      <div className="text-xs opacity-75">Competing with Honor</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900">Building Character Together</h3>
            </div>
            <p className="text-green-700 leading-relaxed text-lg">
              Inter-house activities, competitions, and achievements nurture character, camaraderie, and holistic growth at LKCS. 
              Through healthy competition and collaborative spirit, our students develop leadership, teamwork, and lifelong values.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">{points.reduce((a, b) => a + b, 0).toLocaleString()}</div>
                <div className="text-sm text-green-600 font-medium">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">4</div>
                <div className="text-sm text-green-600 font-medium">Active Houses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">365</div>
                <div className="text-sm text-green-600 font-medium">Days of Competition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">∞</div>
                <div className="text-sm text-green-600 font-medium">Opportunities to Grow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}