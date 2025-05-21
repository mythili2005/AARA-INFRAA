import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";

const BASE_URL = "http://localhost:5000"; // Change to your backend URL or env var

const AdminDealership = () => {
  const [requests, setRequests] = useState([]);
  const [replyContent, setReplyContent] = useState({});
  const [loadingEmail, setLoadingEmail] = useState(null); // track loading per email

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch(`${BASE_URL}/api/dealership/all`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleReplyChange = (email, value) => {
    setReplyContent((prev) => ({ ...prev, [email]: value }));
  };

  const sendReply = async (email) => {
    const subject = "Regarding Your Dealership Request";
    const message = replyContent[email]?.trim();

    if (!message) {
      alert("Reply message cannot be empty");
      return;
    }

    setLoadingEmail(email);
    try {
      const res = await fetch(`${BASE_URL}/api/dealership/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (res.ok) {
        alert("Reply sent!");
        setReplyContent((prev) => ({ ...prev, [email]: "" }));

        // Update replied and replyMessage, replyDate locally from backend data
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.email === email
              ? {
                  ...req,
                  replied: true,
                  replyMessage: message,
                  replyDate: new Date().toISOString(),
                }
              : req
          )
        );
      } else {
        const error = await res.json();
        alert(error?.error || "Failed to send reply");
      }
    } catch (err) {
      alert("Error sending reply");
      console.error(err);
    }
    setLoadingEmail(null);
  };

  // Filter requests by search term and replied status
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      req.name.toLowerCase().includes(term) ||
      req.email.toLowerCase().includes(term) ||
      req.companyName.toLowerCase().includes(term);

    if (filterStatus === "replied") return req.replied && matchesSearch;
    if (filterStatus === "unreplied") return !req.replied && matchesSearch;

    return matchesSearch;
  });

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
          <h2 className="text-black uppercase text-[40px] font-bold">
            Dealership Requests
          </h2>
          <div className="w-[120px] h-[6px] bg-yellow-500 mb-8"></div>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            className="border border-black px-4 py-2 rounded-lg w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-black px-4 py-2 rounded-lg w-full md:w-[200px]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="replied">Replied</option>
            <option value="unreplied">Unreplied</option>
          </select>
        </div>

        {filteredRequests.length === 0 ? (
          <p className="text-xl text-gray-600">No requests found.</p>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((req) => (
              <motion.div
                key={req._id}
                variants={zoomInVariants}
                className="border-[2px] border-black rounded-xl p-6"
              >
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
                  <div>
                    <p>
                      <span className="font-bold">Name:</span> {req.name}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span> {req.email}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {req.phone}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Company:</span> {req.companyName}
                    </p>
                    <p>
                      <span className="font-bold">Address:</span> {req.address}
                    </p>
                    <p>
                      <span className="font-bold">Location:</span> {req.location}
                    </p>
                  </div>
                </div>

                {req.businessLicense && (
                  <a
                    href={`${BASE_URL}/uploads/${req.businessLicense}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-500 hover:underline mb-4 inline-block"
                  >
                    View Business License
                  </a>
                )}

                {req.replied ? (
                  <div className="mb-4 text-green-600 font-bold">
                    Replied ✔
                    {req.replyDate && (
                      <p className="text-sm text-gray-700">
                        <em>Replied on: {new Date(req.replyDate).toLocaleString()}</em>
                      </p>
                    )}
                    {req.replyMessage && (
                      <p className="mt-2 bg-green-100 p-3 rounded">
                        <strong>Reply Message:</strong> {req.replyMessage}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <textarea
                      rows={3}
                      value={replyContent[req.email] || ""}
                      onChange={(e) => handleReplyChange(req.email, e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full px-4 py-2 border-[2px] border-black rounded-lg mb-4"
                    />

                    <button
                      onClick={() => sendReply(req.email)}
                      disabled={loadingEmail === req.email}
                      className="bg-yellow-500 hover:bg-black hover:text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                      {loadingEmail === req.email ? "Sending..." : "Send Reply"}
                    </button>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDealership;
