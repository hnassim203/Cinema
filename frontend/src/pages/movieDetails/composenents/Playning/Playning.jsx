import './Playning.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Playning() {

  const navigate = useNavigate();
  const [films, setFilms] = useState([]);

  const getFilms = async () => {

    try {

      const res = await fetch("https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/film");

      const data = await res.json();

      console.log("DATA FROM DB:", data);

      setFilms(data);

    } catch (error) {

      console.log(error);

    }

  };

    useEffect(() => {
    getFilms();
  }, []);
  

  return (
    <div className='playning' id='now-playing'>

      <h1>Now Playing</h1>

      <div className="cards">

        {films.map((film) => (

          <div
            key={film.id}
            className="card"
            onClick={() => navigate(`/seats/${film.id}`, { state: { film: film } })}
          >

            <img
              src={`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/storage/${film.image}`}
              alt={film.title}
            />

            <h4>{film.title}</h4>

            <p>{film.category} . {film.hours}h {film.min}m</p>

          </div>

        ))}

      </div>

    </div>
  );
}