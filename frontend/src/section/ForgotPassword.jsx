import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    } finally {
      setIsLoading(false);
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
            PASSWORD RECOVERY
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-black uppercase text-[40px] font-bold text-center"
          >
            Reset Your Password
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
            required
          />
          
          <motion.button
            variants={zoomInVariants}
            type="submit"
            disabled={isLoading}
            className={`bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </motion.button>
        </motion.form>

        {message && (
          <div className={`mt-4 p-3 rounded-md text-center w-full max-w-md ${
            message.toLowerCase().includes('success') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/auth')} 
            className="text-yellow-500 underline hover:text-black"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;