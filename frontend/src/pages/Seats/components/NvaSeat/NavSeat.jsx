import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import profilImg from '../../../../assets/images/profile.png';
import './NavSeat.css';

export default function NavSeat() {
  const navigate = useNavigate();
  
  const { screeningId } = useParams(); 
  
  const [screeningData, setScreeningData] = useState(null);

  useEffect(() => {
    const fetchScreeningInfo = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/screenings/${screeningId}/seats`);
        setScreeningData(res.data.screening);
      } catch (error) {
        console.error("error get film in movie details nav", error);
      }
    };

    if (screeningId) {
      fetchScreeningInfo();
    }
  }, [screeningId]);

  if (!screeningData) {
    return (
      <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
      Loading ...
      </div>
    );
  }

  return (
    <div className="nav_seat">

      <div className="nav_seat_left">
        <h1>Cinema Abineda</h1>

        <div className="seat_navimg">
          <img
            src={`http://127.0.0.1:8000/storage/${screeningData.film.image}`}
            alt={screeningData.film.title}
          />

          <div className="pr">
            <h3>{screeningData.film.title}</h3>
            <p>
              {screeningData.salle.name} . {screeningData.time} . {screeningData.date}
            </p>
          </div>
        </div>

      </div>

      <div className="nav_seat_right">
        <ul>
          <li><Link to='/#now-playing'>Movies</Link></li>
          {/* <li><a href="#theaters">Theaters</a></li> */}
          <img
            src={profilImg}
            alt="Profile"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          />
        </ul>
      </div>

    </div>
  );
}