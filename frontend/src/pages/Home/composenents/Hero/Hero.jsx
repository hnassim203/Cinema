import React, { useState, useEffect } from 'react';
import './Hero.css';
import { MdOutlineWatchLater } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export default function Hero() {
  const navigate = useNavigate(); 

  const [MainMovie, setMainMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies/featured')
      .then(res => {
        setMainMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('main film error 111', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (!MainMovie) return null;

  return (
    <div>
      <div className='hero'>
        <img 
          src={`http://127.0.0.1:8000/storage/${MainMovie.image}`} 
          alt={MainMovie.title} 
        />
      </div>

      <div className="textes">
        <h1>{MainMovie.title}</h1>
        <p>{MainMovie.description}</p>
        
        <div className="buttonsHero">    
          <button 
            className='btn2' 
            onClick={() => navigate(`/view/${MainMovie.id}`, { state: { film: MainMovie } })}
          > 
            <MdOutlineWatchLater /> View Showtimes
          </button>
        </div>
      </div>
    </div>
  );
}