import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from './animation';
import { FaArrowUp, FaCopyright } from "react-icons/fa";
import { Link } from "react-scroll";

const DealershipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    location: "",
  });

  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    if (file) {
      data.append("businessLicense", file);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/dealership/submit",
        data
      );
      setSuccess(true);
      setError(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        address: "",
        location: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <>
      <div id="dealership" className="bg-white w-full min-h-screen">
        <div className="lg:w-[80%] w-[90%] m-auto py-[60px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="flex flex-col justify-center items-center gap-6 mb-12"
          >
            <motion.h1 variants={slideUpVariants} className="text-yellow-500 text-2xl">
              DEALERSHIP
            </motion.h1>
            <motion.h1
              variants={slideUpVariants}
              className="text-black uppercase text-[40px] font-bold text-center"
            >
              Become Our Dealer
            </motion.h1>
            <div className="w-[120px] h-[6px] bg-yellow-500"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={zoomInVariants}
            className="lg:w-[70%] w-full m-auto"
          >
           
            <motion.form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              variants={zoomInVariants}
              className="flex flex-col gap-6"
            >
              {[
                { name: "name", type: "text" },
                { name: "email", type: "email" },
                { name: "phone", type: "tel" },
                { name: "companyName", type: "text" },
                { name: "address", type: "text" },
                { name: "location", type: "text" },
              ].map(({ name, type }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  required
                  className="px-6 py-3 border-[2px] border-black text-black rounded-lg w-full"
                />
              ))}

              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="businessLicense" className="text-black font-medium">
                  Upload Business License (PDF/JPG/PNG)
                </label>
                <input
                  id="businessLicense"
                  type="file"
                  name="businessLicense"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  required
                  className="w-full text-black text-sm file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-yellow-500 file:text-black
                    hover:file:bg-black hover:file:text-white"
                />
              </div>

              {success && (
              <p className="text-green-500 font-semibold text-lg text-center mb-6">
                Request submitted successfully!
              </p>
            )}
            {error && (
              <p className="text-red-500 font-semibold text-lg text-center mb-6">
                Error submitting request. Please try again.
              </p>
            )}


              <motion.button
                variants={zoomInVariants}
                type="submit"
                className="bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full mt-2"
              >
                SUBMIT REQUEST
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DealershipForm;