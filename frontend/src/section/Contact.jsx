import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);  // Optional: for failure handling

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          fullname: '',
          email: '',
          mobile: '',
          message: '',
        });
      } else {
        setError(true);
        alert('Failed to send message. Please try again later.');
      }
    } catch (err) {
      setError(true);
      console.error(err);
      alert('An error occurred while sending your message.');
    }
  };

  return (
    <div id="contact" className="bg-white w-full">
      <div className="lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.h1 variants={slideUpVariants} className="text-yellow-500 text-2xl">
            CONTACT US
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-black uppercase text-[40px] font-bold"
          >
            feel free to reach out!
          </motion.h1>
          <div className="w-[120px] h-[6px] bg-yellow-500"></div>
          <p className="text-3xl italic text-gray-600 mt-[60px]">
          We value communication and transparency. Whether you have an inquiry or need support 
          regarding our sliding window construction services for public water purifiers.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            variants={zoomInVariants}
            className="flex flex-col justify-center items-start gap-4 w-full"
          >
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter Fullname"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
              className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
              required
            ></textarea>
            <motion.button
              variants={zoomInVariants}
              type="submit"
              className="bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full"
            >
              SUBMIT
            </motion.button>
          </motion.form>
          {success && (
            <p className="text-green-500 font-semibold text-lg">Message sent successfully!</p>
          )}
          {error && (
            <p className="text-red-500 font-semibold text-lg">Failed to send message. Try again.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
