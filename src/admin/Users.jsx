import { useEffect, useState } from "react";

const ROLES = [
  "SuperAdmin",
  "Principal",
  "Teacher",
  "HouseCoordinator"
];

const DEFAULT_USERS = [
  { username: "superadmin", password: "LKCS@2024!", role: "SuperAdmin" },
  { username: "principal", password: "Principal@123", role: "Principal" },
  { username: "teacher1", password: "Teacher@123", role: "Teacher" }
];

export default function Users() {
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [form, setForm] = useState({ username: "", password: "", role: "Teacher" });
  const [accessDenied, setAccessDenied] = useState(false);

  // Load users from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lkcs_users") || "null");
    setUsers(saved || DEFAULT_USERS);

    // Check if logged-in user is SuperAdmin
    const current = localStorage.getItem("lkcs_admin");
    const all = saved || DEFAULT_USERS;
    const user = all.find(u => u.username === current);
    if (!user || user.role !== "SuperAdmin") {
      setAccessDenied(true);
    }
  }, []);

  // Save to localStorage when users change
  useEffect(() => {
    localStorage.setItem("lkcs_users", JSON.stringify(users));
  }, [users]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addUser(e) {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) return;
    if (users.some(u => u.username === form.username)) return;
    setUsers([{ ...form }, ...users]);
    setForm({ username: "", password: "", role: "Teacher" });
  }

  function deleteUser(idx) {
    setUsers(users.filter((_, i) => i !== idx));
  }

  if (accessDenied) {
    return <div className="text-red-700 font-bold p-4">Access Denied: Only Super Admin can manage users.</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">User Management (SuperAdmin Only)</h3>
      <form onSubmit={addUser} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          className="border p-2 rounded"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <select
          className="border p-2 rounded"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        <button className="bg-green-700 text-white px-4 rounded" type="submit">
          Add User
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.username}>
                <td className="py-2 px-4 border-b">{u.username}</td>
                <td className="py-2 px-4 border-b">{u.role}</td>
                <td className="py-2 px-4 border-b">
                  {u.role !== "SuperAdmin" && (
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => deleteUser(idx)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
