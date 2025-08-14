import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for login
    if (!localStorage.getItem("lkcs_admin")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <button
  className="mb-4 px-3 py-1 rounded bg-red-500 text-white"
  onClick={() => {
    localStorage.removeItem("lkcs_admin");
    window.location.href = "/login";
  }}
>
  Logout
</button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded shadow">News & Announcements</div>
        <div className="p-4 bg-yellow-100 rounded shadow">Manage Houses</div>
        <div className="p-4 bg-blue-100 rounded shadow">Gallery Upload</div>
      </div>
    </section>
  );
}
