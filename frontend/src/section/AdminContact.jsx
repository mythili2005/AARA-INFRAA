import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants } from './animation';

const BASE_URL = 'http://localhost:5000'; // <-- Make sure to change this if needed

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/contact`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setMessage({ type: 'error', text: 'Invalid response from server.' });
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setMessage({ type: 'error', text: 'Failed to load contact messages.' });
    }
  };

  const handleReplyChange = (e) => setReply(e.target.value);

  const handleReplySubmit = async (id) => {
    if (!reply.trim()) {
      setMessage({ type: 'error', text: 'Please enter a reply message.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`${BASE_URL}/api/contact/reply/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage: reply.trim() }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Reply sent successfully!' });
        setReply('');
        setSelectedContactId(null);
        fetchContacts();
      } else {
        setMessage({ type: 'error', text: 'Failed to send reply.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error sending reply.' });
      console.error(error);
    }
    setLoading(false);
  };

  const filteredContacts = contacts.filter((contact) => {
    const nameMatch = contact.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = contact.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSearch = nameMatch || emailMatch;

    if (filterStatus === 'replied') return contact.replied && matchesSearch;
    if (filterStatus === 'unreplied') return !contact.replied && matchesSearch;

    return matchesSearch;
  });

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
          <h2 className="text-black uppercase text-[40px] font-bold">Contact Messages</h2>
          <div className="w-[120px] h-[6px] bg-yellow-500 mb-8"></div>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
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

        {message.text && (
          <div
            className={`mb-6 text-center ${
              message.type === 'error' ? 'text-red-600' : 'text-green-600'
            } font-semibold`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {filteredContacts.length === 0 ? (
          <p className="text-xl text-gray-600">No contact messages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-[2px] border-black">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left">Reply</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b-[2px] border-black hover:bg-gray-100"
                  >
                    <td className="p-3">{contact.fullname}</td>
                    <td className="p-3">{contact.email}</td>
                    <td className="p-3">{contact.mobile}</td>
                    <td className="p-3">{contact.message}</td>
                    <td className="p-3">
                      {contact.replied ? contact.reply : 'No reply yet'}
                    </td>
                    <td className="p-3">
                      {contact.replied ? (
                        <span className="text-green-500 font-bold">Replied</span>
                      ) : selectedContactId === contact._id ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            rows={3}
                            value={reply}
                            onChange={handleReplyChange}
                            className="px-4 py-2 border-[2px] border-black rounded-lg"
                            aria-label={`Reply message for ${contact.fullname}`}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReplySubmit(contact._id)}
                              disabled={loading}
                              className={`px-4 py-2 rounded-lg ${
                                loading
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-yellow-500 hover:bg-black hover:text-white'
                              }`}
                              aria-label={`Send reply to ${contact.fullname}`}
                            >
                              {loading ? 'Sending...' : 'Send'}
                            </button>
                            <button
                              onClick={() => {
                                setSelectedContactId(null);
                                setReply('');
                                setMessage({ type: '', text: '' });
                              }}
                              className="border-[2px] border-black px-4 py-2 rounded-lg"
                              aria-label="Cancel reply"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedContactId(contact._id);
                            setReply('');
                            setMessage({ type: '', text: '' });
                          }}
                          className="bg-yellow-500 hover:bg-black hover:text-white px-4 py-2 rounded-lg"
                          aria-label={`Reply to message from ${contact.fullname}`}
                        >
                          Reply
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
