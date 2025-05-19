import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-h-screen p-[60px]">
      <div className="lg:w-[80%] w-[90%] m-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="mb-12"
        >
          <h1 className="text-yellow-500 text-2xl">ADMIN PANEL</h1>
          <h2 className="text-black uppercase text-[40px] font-bold">Dashboard</h2>
          <div className="w-[120px] h-[6px] bg-yellow-500 mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {[
            {
              title: "Manage Dealerships",
              description: "View and respond to dealership applications",
              link: "/admin-dealerships"
            },
            {
              title: "Manage Contacts",
              description: "Respond to customer inquiries",
              link: "/admin-contacts"
            },
            {
              title: "Manage Products",
              description: "Update product listings",
              link: "/admin-products"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={zoomInVariants}
              className="border-[2px] border-black rounded-xl p-6 hover:bg-yellow-500 hover:text-black cursor-pointer transition"
              onClick={() => navigate(card.link)}
            >
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
