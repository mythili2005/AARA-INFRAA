// src/pages/AdminLogin.jsx
import React, { useState } from 'react';

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy check – you can replace this with your own logic
    if (adminData.email === 'mythilinatarajan159@gmail.com' && adminData.password === 'admin123') {
      window.location.href = '/admin-dashboard';
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="w-[90%] md:w-[400px] p-8 border border-black rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-black rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-black rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-black hover:text-white text-black font-bold py-2 rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
