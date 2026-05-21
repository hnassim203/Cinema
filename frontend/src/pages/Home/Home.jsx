import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import { FiSearch, FiLogOut } from 'react-icons/fi';

import "./composenents/Navbar/Navbar.css";
import "./composenents/Playning/Playning.css";
import userProfilImg from "../../assets/images/profile.png"; 

import Hero from "./composenents/Hero/Hero";
import Review from "./composenents/Review/Review";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  const navigate = useNavigate();

  const [searchMovie, setsearchMovie] = useState("");

  const isUser = localStorage.getItem("user");
  const currentUser = isUser ? JSON.parse(isUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [films, setFilms] = useState([]);

  const getFilms = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/film");
      const data = await res.json();
      setFilms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

  const filteredFilms = films.filter(film => 
    film.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  return (
    <div>
      
      <nav>
        <div className="nav-left">
            <h1>Cinema Abineda</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/#now-playing'>Movies</Link></li>
                {currentUser && currentUser.role === 'admin' && (
                    <li><Link to='/dashbord'>Dashboard</Link></li>
                )}
            </ul>
        </div>
        
        <div className="nav-right">
          <div className="search-box">
             <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchMovie}
              onChange={(e) => setsearchMovie(e.target.value)} 
            />
          </div>

          {currentUser && (
            <button 
              onClick={handleLogout} 
              title="Logout"
              style={{ 
                background: 'transparent', border: 'none', color: '#f20d33', 
                cursor: 'pointer', fontSize: '22px', marginLeft: '15px',
                display: 'flex', alignItems: 'center'
              }}
            >
              <FiLogOut />
            </button>
          )}
          
          <img 
            src={userProfilImg} 
            alt="user Profil" 
            style={{ cursor: 'pointer', marginLeft: '15px' }} 
            onClick={() => navigate('/profile')}
          />
        </div>
      </nav>

      <Hero />

      <div className='playning' id='now-playing'>
        
        <h1>{searchMovie ? `Search Results: ${searchMovie}` : "Now Playing"}</h1>

        <div className="cards">
          {filteredFilms.length > 0 ? (
              filteredFilms.map((film) => (
              <div
                  key={film.id}
                  className="card"
                  onClick={() => navigate(`/view/${film.id}`, { state: { film: film } })}
              >
                  <img
                  src={`http://127.0.0.1:8000/storage/${film.image}`}
                  alt={film.title}
                  />
                  <h4>{film.title}</h4>
                  <p>{film.category} . {film.hours}h {film.min}m</p>
              </div>
              ))
          ) : (
              <div style={{ color: 'white', padding: '20px', fontSize: '18px' }}>
                 No movies found for "{searchMovie}" 😢
              </div>
          )}
        </div>
      </div>

      <Review />
      <Footer />

    </div>
  );
}