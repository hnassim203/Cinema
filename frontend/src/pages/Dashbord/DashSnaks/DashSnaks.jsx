import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashSnaks() {
  const [snacks, setSnacks] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'popcorn',
    image: null
  });

  useEffect(() => {
    fetchSnacks();
  }, []);

  const fetchSnacks = async () => {
    try {
      const res = await axios.get("https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/snacks");
      setSnacks(res.data);
    } catch (error) {
      console.error("error fetching foods", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      const res = await axios.post("https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/snacks", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message);
      setForm({ name: '', description: '', price: '', category: 'popcorn', image: null });
      fetchSnacks(); 
    } catch (error) {
      console.error(error);
      alert("error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("sure ?")) {
      try {
        await axios.delete(`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/snacks/${id}`);
        fetchSnacks();
      } catch (error) {
        console.error("delete error", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1> manage (Snacks)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="product name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="description" 
          value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        
        <input 
          type="number" 
          step="0.01" 
          placeholder="price" 
          value={form.price} 
          onChange={(e) => setForm({ ...form, price: e.target.value })} 
          required 
        />
        
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="popcorn">Popcorn</option>
          <option value="drinks">Drinks</option>
          <option value="food">Food</option>
          <option value="sweet">Sweets</option>
        </select>

        <input 
          type="file" 
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })} 
        />

        <button type="submit" style={{ padding: '5px 15px', background: '#f20d33', color: 'white', border: 'none' }}>add</button>
      </form>

      <table border="1" width="100%" style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>image</th>
            <th>name</th>
            <th>description</th>
            <th>price</th>
            <th>category</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {snacks.map(snack => (
            <tr key={snack.id}>
              <td>
                {snack.image ? (
                   <img src={`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/storage/${snack.image}`} alt={snack.name} width="50" height="50" style={{ objectFit: 'cover', borderRadius: '5px' }} />
                ) : (
                  "there is no image"
                )}
              </td>
              <td>{snack.name}</td>
              <td>{snack.description}</td>
              <td>${snack.price}</td>
              <td>{snack.category}</td>
              <td>
                <button onClick={() => handleDelete(snack.id)} style={{ color: 'red', cursor: 'pointer' }}>remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}