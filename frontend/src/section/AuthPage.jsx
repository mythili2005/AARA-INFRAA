import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setMessage('');
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const url = isSignup
        ? 'http://localhost:5000/api/auth/signup'
        : 'http://localhost:5000/api/auth/login';

      const payload = isSignup
        ? {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await axios.post(url, payload);
      setMessage(response.data.message || 'Success');

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to homepage or contact page
      navigate('/contact');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Something went wrong');
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
            {isSignup ? 'SIGN UP' : 'LOGIN'}
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-black uppercase text-[40px] font-bold text-center"
          >
            {isSignup ? 'Create Your Account' : 'Welcome Back'}
          </motion.h1>
          <div className="w-[120px] h-[6px] bg-yellow-500"></div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          onSubmit={handleSubmit}
          className="mt-8 w-full flex flex-col gap-4"
        >
          {isSignup && (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
            />
          )}
          <motion.button
            variants={zoomInVariants}
            type="submit"
            className="bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full"
          >
            {isSignup ? 'SIGN UP' : 'LOGIN'}
          </motion.button>
          {message && <p className="text-center text-red-600 mt-2">{message}</p>}
        </motion.form>

        <div className="mt-4 text-center">
          <p className="text-black">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={toggleForm} className="text-yellow-500 cursor-pointer underline">
              {isSignup ? 'Login' : 'Sign up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
