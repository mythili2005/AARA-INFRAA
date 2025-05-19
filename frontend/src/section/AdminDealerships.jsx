import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from './animation';

const AdminDealership = () => {
  const [requests, setRequests] = useState([]);
  const [replyContent, setReplyContent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/dealership/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched requests:", data);
        setRequests(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleReplyChange = (email, value) => {
    setReplyContent((prev) => ({ ...prev, [email]: value }));
  };

  const sendReply = async (email) => {
    const subject = "Regarding Your Dealership Request";
    const message = replyContent[email] || "";

    if (!message.trim()) {
      alert("Reply message cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/dealership/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (res.ok) {
        alert("Reply sent!");
        setReplyContent((prev) => ({ ...prev, [email]: "" }));
      } else {
        alert("Failed to send reply");
      }
    } catch (err) {
      alert("Error sending reply");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="lg:w-[80%] w-[90%] m-auto py-[60px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="mb-12"
        >
          <h1 className="text-yellow-500 text-2xl">ADMIN PANEL</h1>
          <h2 className="text-black uppercase text-[40px] font-bold">Dealership Requests</h2>
          <div className="w-[120px] h-[6px] bg-yellow-500 mb-8"></div>
        </motion.div>

        {requests.length === 0 ? (
          <p className="text-xl text-gray-600">No requests found.</p>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <motion.div
                key={req._id}
                variants={zoomInVariants}
                className="border-[2px] border-black rounded-xl p-6"
              >
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
                  <div>
                    <p><span className="font-bold">Name:</span> {req.name}</p>
                    <p><span className="font-bold">Email:</span> {req.email}</p>
                    <p><span className="font-bold">Phone:</span> {req.phone}</p>
                  </div>
                  <div>
                    <p><span className="font-bold">Company:</span> {req.companyName}</p>
                    <p><span className="font-bold">Address:</span> {req.address}</p>
                    <p><span className="font-bold">Location:</span> {req.location}</p>
                  </div>
                </div>

                {req.businessLicense && (
                  <a 
                    href={`http://localhost:5000/uploads/${req.businessLicense}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-500 hover:underline mb-4 inline-block"
                  >
                    View Business License
                  </a>
                )}

                <textarea
                  rows={3}
                  value={replyContent[req.email] || ""}
                  onChange={(e) => handleReplyChange(req.email, e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full px-4 py-2 border-[2px] border-black rounded-lg mb-4"
                />

                <button
                  onClick={() => sendReply(req.email)}
                  disabled={loading}
                  className="bg-yellow-500 hover:bg-black hover:text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  {loading ? "Sending..." : "Send Reply"}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDealership;