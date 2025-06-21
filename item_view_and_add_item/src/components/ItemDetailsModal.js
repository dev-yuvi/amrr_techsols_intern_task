import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function ItemDetailsModal({ item, onClose }) {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    if (!receiverEmail) {
      alert("Please enter the recipient's email address.");
      return;
    }

    setLoading(true);
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        item_name: item.name,
        item_type: item.type,
        message: customMessage || `Hi, I want to enquire about ${item.name}`,
        to_email: receiverEmail,
        user_name: senderName || 'Anonymous'
      },
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then(() => {
      alert(`✅ Enquiry Email sent to the sales`);
      setReceiverEmail('');
      setSenderName('');
      setCustomMessage('');
    })
    .catch(err => {
      alert("❌ Failed to send email.");
      console.error(err);
    })
    .finally(() => setLoading(false));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{item.name}</h2>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Description:</strong> {item.description}</p>

        <input
          type="email"
          placeholder="Your email address"
          value={receiverEmail}
          onChange={e => setReceiverEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <input
          type="text"
          placeholder="Your name"
          value={senderName}
          onChange={e => setSenderName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <textarea
          placeholder="Custom message"
          value={customMessage}
          onChange={e => setCustomMessage(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

          <div className="flex justify-end gap-4 mt-4">
            <button
    onClick={sendEmail}
    disabled={loading}
    className={`px-4 py-2 rounded-lg font-semibold shadow-md transition 
      ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-black'}`}
  >
    {loading ? 'Sending...' : 'Send Enquiry'}
  </button>

  <button
    onClick={onClose}
    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-black rounded-lg font-semibold shadow-md transition"
  >
    Close
  </button>
          </div>

      </div>
    </div>
  );
}

export default ItemDetailsModal;