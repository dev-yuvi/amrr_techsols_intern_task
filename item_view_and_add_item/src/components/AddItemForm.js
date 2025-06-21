import React, { useState } from 'react';
import axios from 'axios';

function AddItemForm() {
  const [form, setForm] = useState({ name: '', type: '', description: '' });
  const [coverImage, setCoverImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const[error,setError]=useState()
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess(false);

  if (!coverImage) {
    alert('Please select an image file');
    return;
  }

  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('type', form.type);
  formData.append('description', form.description);
  formData.append('coverImage', coverImage);

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/items`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setSuccess(true);
    setForm({ name: '', type: '', description: '' });
    setCoverImage(null);
  } catch (err) {
    console.error('Upload error:', err);
    setError(err.response?.data?.message || 'Upload failed');
  }
  finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className='add-item-form'>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><br />
      <input placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} /><br />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /><br />
      <input type="file" onChange={e => setCoverImage(e.target.files[0])}  /><br />
      {loading ? (
      <p>Uploading item, please wait...</p>
    ) : (
      <button type="submit">Add Item</button>
    )}
      
      {success && <p style={{ color: 'green' }}>Item successfully added</p>}
    </form>
  );
}

export default AddItemForm;
