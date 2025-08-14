export default function Academics() {
  return (
    <section className="container mx-auto p-4 min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-900">Academics</h2>
      
      {/* Curriculum */}
      <div className="mb-8 bg-green-50 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Curriculum Overview</h3>
        <ul className="list-disc pl-6 text-green-900">
          <li>CBSE / [Your Board] syllabus from Nursery to Class XII</li>
          <li>Core subjects: English, Hindi, Mathematics, Science, Social Studies</li>
          <li>Languages: Sanskrit, French, (customize as needed)</li>
          <li>ICT, Computer Science, Art, Music, Physical Education</li>
        </ul>
      </div>

      {/* Class Structure */}
      <div className="mb-8 bg-yellow-50 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Class Structure</h3>
        <ul className="list-disc pl-6">
          <li>Pre-Primary (Nursery, KG)</li>
          <li>Primary (Class I - V)</li>
          <li>Middle (Class VI - VIII)</li>
          <li>Secondary (Class IX - X)</li>
          <li>Senior Secondary (Class XI - XII: Science, Commerce, Humanities)</li>
        </ul>
      </div>

      {/* Exam Schedule */}
      <div className="mb-8 bg-blue-50 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Examination Schedule</h3>
        <ul className="list-disc pl-6">
          <li>Unit Tests: July, September, December, February</li>
          <li>Half-Yearly Exams: September</li>
          <li>Annual Exams: March</li>
          <li>CBSE Board Exams (as per CBSE calendar)</li>
        </ul>
      </div>

      {/* Academic Calendar */}
      <div className="mb-8 bg-gray-50 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Academic Calendar Highlights</h3>
        <ul className="list-disc pl-6">
          <li>School reopens: April 1</li>
          <li>Summer Break: Mid May – End June</li>
          <li>Winter Break: Last week December – Early January</li>
          <li>Parent-Teacher Meetings: Bi-monthly</li>
          <li>Annual Day: November</li>
        </ul>
      </div>

      {/* Fee Structure */}
      <div className="bg-yellow-100 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Fee Structure <span className="text-sm font-normal">(Sample)</span></h3>
        <table className="w-full border mt-2 bg-white rounded">
          <thead>
            <tr className="bg-yellow-200">
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">Quarterly Fee (₹)</th>
              <th className="py-2 px-4 border">Annual Fee (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">Nursery - KG</td>
              <td className="py-2 px-4 border">9,000</td>
              <td className="py-2 px-4 border">36,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">I - V</td>
              <td className="py-2 px-4 border">10,000</td>
              <td className="py-2 px-4 border">40,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">VI - VIII</td>
              <td className="py-2 px-4 border">11,000</td>
              <td className="py-2 px-4 border">44,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">IX - XII</td>
              <td className="py-2 px-4 border">12,500</td>
              <td className="py-2 px-4 border">50,000</td>
            </tr>
          </tbody>
        </table>
        <div className="text-xs text-gray-500 mt-2">* Fees are indicative. For latest, contact the school office.</div>
      </div>
    </section>
  );
}
