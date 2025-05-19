import React, { useEffect, useState } from 'react';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleReplyChange = (e) => setReply(e.target.value);

  const handleReplySubmit = async (id) => {
    if (!reply) return alert('Please enter a reply message.');

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/contact/reply/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage: reply }),
      });

      if (res.ok) {
        alert('Reply sent successfully!');
        setReply('');
        setSelectedContactId(null);
        fetchContacts(); // refresh list to show reply status
      } else {
        alert('Failed to send reply.');
      }
    } catch (error) {
      alert('Error sending reply.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="admin-contact-dashboard p-8">
      <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>
      {contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Reply</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id} className="border border-gray-300">
                <td className="border border-gray-300 p-2">{contact.fullname}</td>
                <td className="border border-gray-300 p-2">{contact.email}</td>
                <td className="border border-gray-300 p-2">{contact.mobile}</td>
                <td className="border border-gray-300 p-2">{contact.message}</td>
                <td className="border border-gray-300 p-2">
                  {contact.replied ? contact.reply : 'No reply yet'}
                </td>
                <td className="border border-gray-300 p-2">
                  {contact.replied ? (
                    <button disabled className="px-3 py-1 bg-gray-300 rounded cursor-not-allowed">
                      Replied
                    </button>
                  ) : (
                    <>
                      {selectedContactId === contact._id ? (
                        <>
                          <textarea
                            rows={3}
                            value={reply}
                            onChange={handleReplyChange}
                            placeholder="Write reply..."
                            className="border p-1 rounded w-full mb-1"
                          />
                          <button
                            onClick={() => handleReplySubmit(contact._id)}
                            disabled={loading}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Send
                          </button>
                          <button
                            onClick={() => {
                              setSelectedContactId(null);
                              setReply('');
                            }}
                            className="ml-2 px-3 py-1 rounded border border-gray-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setSelectedContactId(contact._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Reply
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContact;
