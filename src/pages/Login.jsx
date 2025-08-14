import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Basic credential check (should come from backend/db!)
    if (
      (username === "superadmin" && password === "LKCS@2024!") ||
      (username === "principal" && password === "Principal@123") ||
      (username === "teacher1" && password === "Teacher@123")
    ) {
      // Store session (in real apps use JWT/cookies)
      localStorage.setItem("lkcs_admin", username);
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* School Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="text-white text-3xl font-bold">🏫</div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
            Lord Krishna Convent School
          </h1>
          <p className="text-gray-600">Administrative Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-center">
            <div className="text-white text-2xl mb-2">🔐</div>
            <h2 className="text-xl font-bold text-white">Admin Login</h2>
            <p className="text-green-100 text-sm">Enter your credentials to access the admin panel</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 pr-12"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                  />
                  {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400">
                    👤
                  </div> */}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 pr-20"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                  />
                  {/* <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-400">
                    🔒
                  </div> */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200 p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <div className="text-lg">
                      {showPassword ? "🙈" : "👁️"}
                    </div>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="text-red-500 text-xl">⚠️</div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Login to Admin Panel</span>
                  <div className="text-lg">🚀</div>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                🔒 Secure login protected by school administration
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}