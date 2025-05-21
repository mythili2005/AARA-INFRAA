// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', adminData);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    }
  };

  return (
    <div id="auth" className="bg-white w-full">
      <div className="lg:w-[50%] w-[90%] m-auto py-[60px] flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="w-full flex flex-col justify-center items-center gap-6"
        >
          <motion.h1 variants={slideUpVariants} className="text-yellow-500 text-2xl">
            ADMIN ACCESS
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-black uppercase text-[40px] font-bold text-center"
          >
            Secure Dashboard
          </motion.h1>
          <div className="w-[120px] h-[6px] bg-yellow-500"></div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          onSubmit={handleSubmit}
          className="mt-8 w-full flex flex-col gap-4 max-w-md"
        >
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={adminData.email}
            onChange={handleChange}
            className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={adminData.password}
            onChange={handleChange}
            className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
          />
          <motion.button
            variants={zoomInVariants}
            type="submit"
            className="bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full"
          >
            VERIFY IDENTITY
          </motion.button>
          {error && <p className="text-center text-red-600 mt-2">{error}</p>}
        </motion.form>

        <div className="mt-8 text-center">
          <p className="text-black">
            User account?{' '}
            <a href="/authPage" className="text-yellow-500 underline">
              Switch to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
