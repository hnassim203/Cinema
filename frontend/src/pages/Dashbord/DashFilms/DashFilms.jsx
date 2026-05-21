import { useState, useEffect } from 'react';
import axios from 'axios';
import './DashFilms.css';

export default function Dashbord() {

  const [films, setFilms] = useState([]);

  const [form, setForm] = useState({
    title: '', description: '', image: null, release_date: '', hours: '', min: '', category: ''
  });
const handleSetFeatured = async (filmId) => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/movies/${filmId}/featured`);
        alert(res.data.message);
getFilms();
    } catch (error) {
        console.error("eror make film special", error);
    }
};
  const getFilms = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/film");
      const data = await res.json();

      setFilms(Array.isArray(data) ? data : data.film);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);


  const deleteFilm = async (id) => {
    if (!window.confirm("Are you sure you want to delete this film?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/film/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      alert("Film deleted successfully");
      getFilms();

    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.image ||
      !form.release_date ||
      !form.hours ||
      !form.min ||
      !form.category 
    ) {
      alert('3mr kolxu');
      return;
    }

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("image", form.image);
    data.append("release_date", form.release_date);
    data.append("hours", form.hours);
    data.append("min", form.min);
    data.append("category", form.category);


    try {
      const res = await fetch("http://127.0.0.1:8000/api/film", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error happened");
        return;
      }

      alert("Film added successfully");

      setForm({
        title: '',
        description: '',
        image: null,
        release_date: '',
        hours: '',
        min: '',
        category: '',

      });

      getFilms();

    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="dashboard-page">
    <h1>Cinema Dashboard</h1>

    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <label >Title :</label>
      <input 
        placeholder="Movie Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      /> <br/>
      <label >Description : </label>
      <input 
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      /> <br />
      <label >file : </label>
      <input 
        type="file"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      /> <br />
      <label>Date :</label>
      <input 
        type="date"
        value={form.release_date}
        onChange={(e) => setForm({ ...form, release_date: e.target.value })}
      /> <br />
      <div className="duration-inputs">
        
    <label >hours :</label>
        <input 
          type="number"
          placeholder="Hours"
          value={form.hours}
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
        /> <br />
        <label htmlFor="">Minutes</label>
        <input 
          type="number"
          placeholder="Minutes"
          value={form.min}
          onChange={(e) => setForm({ ...form, min: e.target.value })}
        /> <br />
      </div>
      <label htmlFor="">Category :</label>
      <input 
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      /> <br />

      <button type="submit" className="btn-add">Add Movie</button>
    </form>

    <h2>Films List</h2>

    <table border="1">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Release</th>
          <th>Duration</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {films.map((film) => (
          <tr key={film.id}>
            <td>
              <img
                src={`http://127.0.0.1:8000/storage/${film.image}`}
                width="80"
                height="60"
                alt="poster"
              />
            </td>
            <td>{film.title}</td>
            <td className="desc-cell">{film.description}</td>
            <td>{film.release_date}</td>
            <td>{film.hours}h {film.min}min</td>
            <td>{film.category}</td>
            <td>
              <button className="btn-delete" onClick={() => deleteFilm(film.id)}>
                Delete
              </button>
              <button 
                onClick={() => handleSetFeatured(film.id)}
                className={`btn-featured ${film.is_featured ? 'active' : ''}`}
              >
                {film.is_featured ? 'special ' : 'normal'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}