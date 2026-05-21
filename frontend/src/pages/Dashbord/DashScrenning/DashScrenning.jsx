import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashScreenings() {
  const [screenings, setScreenings] = useState([]);
  const [films, setFilms] = useState([]);
  const [salles, setSalles] = useState([]);

  const [form, setForm] = useState({
    film_id: '',
    salle_id: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const filmsRes = await axios.get("http://127.0.0.1:8000/api/film");
      setFilms(Array.isArray(filmsRes.data) ? filmsRes.data : filmsRes.data.film || []);

      const sallesRes = await axios.get("http://127.0.0.1:8000/api/salles");
      setSalles(sallesRes.data);

      const screeningsRes = await axios.get("http://127.0.0.1:8000/api/screenings");
      setScreenings(screeningsRes.data);
    } catch (error) {
      console.error("error fetching", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.film_id || !form.salle_id || !form.date || !form.time) {
      alert('fill the fields');
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/screenings", form);
      
      alert(res.data.message || "added succ");
      
      setForm({ film_id: '', salle_id: '', date: '', time: '' });
      
      fetchData();
    } catch (error) {
      console.error(error);
      alert("error");
    }
  };

  return (
    <div>
      <h1>schedule (Screenings)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <label >Movies :</label>
        <select 
          value={form.film_id} 
          onChange={(e) => setForm({ ...form, film_id: e.target.value })}
        >
          <option value="">-- select movie--</option>
          {films.map(film => (
            <option key={film.id} value={film.id}>{film.title}</option>
          ))}
        </select>
          <label >Salles :</label>
        <select 
          value={form.salle_id} 
          onChange={(e) => setForm({ ...form, salle_id: e.target.value })}
        >
          <option value="">-- select salle --</option>
          {salles.map(salle => (
            <option key={salle.id} value={salle.id}>{salle.name}</option>
          ))}
        </select>
          <label htmlFor="">Date :</label>
        <input 
          type="date" 
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <label htmlFor="">Time :</label>
        <input 
          type="time" 
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button type="submit">add</button>
      </form>

      <h2>schedule</h2>
      <table border="1" width="100%" style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>movie image</th>
            <th>movie titre</th>
            <th>salle</th>
            <th>date</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {screenings.map((screening, index) => (
            <tr key={screening.id}>
              <td>{index + 1}</td>
              <td>
                {screening.film && screening.film.image && (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${screening.film.image}`} 
                    alt="poster" 
                    width="50" 
                    height="70" 
                  />
                )}
              </td>
              <td>{screening.film ? screening.film.title : 'removed film'}</td>
              <td>{screening.salle ? screening.salle.name : 'removed salle'}</td>
              <td>{screening.date}</td>
              <td>{screening.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}