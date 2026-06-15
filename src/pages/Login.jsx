import React, { useState } from "react"

// Mock users for local/demo authentication
const MOCK_USERS = [
  { id: 1, email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, email: "staff@example.com", password: "staff123", role: "staff" },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", success: true });

  const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password);
    if (!user) {
      setMessage({ text: "Invalid credentials (use admin@example.com/admin123).", success: false });
      return;
    }
    // set demo token and user id in localStorage to mimic real auth
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user_id", String(user.id));
    localStorage.setItem("role", user.role);
    setMessage({ text: "Login successful — redirecting...", success: true });
    setTimeout(() => { window.location.href = "/"; }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md border border-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="text-sm mt-1 text-slate-500">Login to your StockFlow account</p>
        </div>

        {message.text && (
          <div className={`mb-4 p-3 rounded text-sm font-medium ${message.success ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
            { label: "Password", name: "password", type: "password", placeholder: "••••••••" }
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1 text-slate-700">{label}</label>
              <input type={type} name={name} value={formData[name]} onChange={handleChange} required
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-slate-200 bg-slate-50 placeholder:text-slate-400" />
            </div>
          ))}
          <button type="submit"
            className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-teal-700 hover:bg-teal-800 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-500">
          Don't have an account? <a href="/register" className="text-teal-700 font-medium">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;