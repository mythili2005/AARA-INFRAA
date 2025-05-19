import React, { useEffect, useState } from "react";

const AdminDealership = () => {
  const [requests, setRequests] = useState([]);
  const [replyContent, setReplyContent] = useState({});

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

    try {
      const res = await fetch("http://localhost:5000/api/dealership/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      if (res.ok) {
        alert("Reply sent!");
        setReplyContent((prev) => ({ ...prev, [email]: "" })); // clear textarea
      } else {
        alert("Failed to send reply");
      }
    } catch (err) {
      alert("Error sending reply");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dealership Requests</h1>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="border rounded-lg p-4 mb-4 shadow-md bg-white"
          >
            <p>
              <strong>Name:</strong> {req.name}
            </p>
            <p>
              <strong>Email:</strong> {req.email}
            </p>
            <p>
              <strong>Phone:</strong> {req.phone}
            </p>
            <p>
              <strong>Company:</strong> {req.companyName}
            </p>
            <p>
              <strong>Address:</strong> {req.address}
            </p>
            <p>
              <strong>Location:</strong> {req.location}
            </p>

            {req.businessLicense && (
              <p>
                <a
                  href={`http://localhost:5000/uploads/${req.businessLicense}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Business License
                </a>
              </p>
            )}

            <textarea
              rows="3"
              value={replyContent[req.email] || ""}
              onChange={(e) => handleReplyChange(req.email, e.target.value)}
              placeholder="Write reply..."
              className="border mt-2 p-2 w-full"
            />

            <button
              onClick={() => sendReply(req.email)}
              className="mt-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-black hover:text-white"
            >
              Send Reply
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDealership;
