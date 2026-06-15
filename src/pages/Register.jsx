import React, { useState } from "react";

const RegisterPage = () => {
  const fields = [
    { label: "First name", name: "first_name", type: "text" },
    { label: "Last name", name: "last_name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", success: true });

  const handleChange = (e) => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation for demo
    if (!formData.email || !formData.password || formData.password.length < 6) {
      setMessage({ text: 'Please provide a valid email and password (min 6 chars).', success: false });
      return;
    }

    // For demo: pretend user is created and store a mock token + user id
    const mockId = Date.now();
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user_id', String(mockId));
    localStorage.setItem('first_name', formData.first_name);

    setMessage({ text: 'Account created — redirecting to dashboard...', success: true });
    setTimeout(() => { window.location.href = '/'; }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md border border-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
          <p className="text-sm mt-1 text-slate-500">Join StockFlow today</p>
        </div>

        {message.text && (
          <div className={`mb-4 p-3 rounded text-sm font-medium ${message.success ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1 text-slate-700">{label}</label>
              <input type={type} name={name} required value={formData[name]} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border border-slate-200 bg-slate-50" />
            </div>
          ))}
          <button type="submit"
            className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-teal-700 hover:bg-teal-800 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-500">
          Already have an account? <a href="/login" className="text-teal-700 font-medium">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;