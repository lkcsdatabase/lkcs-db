export default function Life() {
  return (
    <section className="container mx-auto p-4 min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-900">Student Life & Activities</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Clubs & Societies */}
        <div className="bg-blue-50 rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Clubs & Societies</h3>
          <ul className="list-disc pl-6">
            <li>Science Club</li>
            <li>Eco Club</li>
            <li>Debate & Literary Society</li>
            <li>Drama & Theatre Club</li>
            <li>Robotics Club</li>
            <li>Art & Craft Society</li>
          </ul>
        </div>

        {/* Sports */}
        <div className="bg-green-50 rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Sports & Games</h3>
          <ul className="list-disc pl-6">
            <li>Football, Cricket, Basketball, Badminton</li>
            <li>Yoga & Athletics</li>
            <li>Inter-house and Inter-school tournaments</li>
            <li>Annual Sports Day</li>
          </ul>
        </div>

        {/* Cultural Programs */}
        <div className="bg-yellow-50 rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Cultural Programs</h3>
          <ul className="list-disc pl-6">
            <li>Music, Dance, and Drama Festivals</li>
            <li>Annual Day Celebration</li>
            <li>Independence & Republic Day Events</li>
            <li>Art Exhibitions</li>
          </ul>
        </div>

        {/* Library */}
        <div className="bg-gray-50 rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Library & E-Resources</h3>
          <ul className="list-disc pl-6">
            <li>Well-stocked library with books, journals, magazines</li>
            <li>Reading rooms and study areas</li>
            <li>Digital resources and e-books</li>
          </ul>
        </div>

        {/* Canteen */}
        <div className="bg-pink-50 rounded shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Canteen</h3>
          <ul className="list-disc pl-6">
            <li>Healthy and hygienic meals and snacks</li>
            <li>Weekly menu with vegetarian and vegan options</li>
            <li>Focus on nutrition and taste</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-lg text-green-800 mt-10">
        <span className="font-semibold">At LKCS, every child explores, grows, and shines—both inside and outside the classroom!</span>
      </div>
    </section>
  );
}
