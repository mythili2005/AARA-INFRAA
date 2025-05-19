import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Manage Dealership Requests",
      description: "View and manage all dealership inquiries.",
      link: "/admin-dealerships",
    },
    {
      title: "Manage Contact Submissions",
      description: "Review messages from users via contact form.",
      link: "/admin-contacts",
    },
    {
      title: "Product CRUD Operations",
      description: "Add, update, or delete products on the site.",
      link: "/admin-products",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(card.link)}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
