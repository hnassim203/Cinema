import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { MdLiveTv } from "react-icons/md";
import { FiPlay, FiBookmark, FiShare2 } from "react-icons/fi";
import axios from 'axios';
import './MovieDetails.css';
import Navbar from './composenents/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function MovieDetails() {
    const [activeTab, setActiveTab] = useState('Overview');
    
    const location = useLocation();
    const navigate = useNavigate(); 
    const film = location.state?.film;

    const [screenings, setScreenings] = useState([]);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedScreeningId, setSelectedScreeningId] = useState('');

    useEffect(() => {
        if (film) {
            const fetchScreenings = async () => {
                try {
                    const res = await axios.get(`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/films/${film.id}/screenings`);
                    const data = res.data;
                    setScreenings(data);                    
                    const dates = [...new Set(data.map(item => item.date))];
                    setUniqueDates(dates);
                } catch (error) {
                    console.error("error get films )", error);
                }
            };
            fetchScreenings();
        }
    }, [film]);

    if (!film) {
        return (
            <div className="movie-details-page" style={{ color: 'white', textAlign: 'center', padding: '100px' }}>
                <h2>we don't have film information </h2>
                <Link to="/" style={{ color: '#f20d33' }}>back to home page</Link>
            </div>
        );
    }

    const imageUrl = `https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/storage/${film.image}`;

    const availableTimes = screenings.filter(s => s.date === selectedDate);

    const handleBookNow = () => {
        if (!selectedScreeningId) {
            alert('choose salle and date');
            return;
        }
        navigate(`/seats/${selectedScreeningId}`);
    };

    return (
        <div className="movie-details-page">
            <Navbar/>

            <div className="movie-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="movie-hero-content">
                    <span className="tag">★★★★½ — Now Premiering</span>
                    <h1>{film.title}</h1>
                    <div className="movie-meta">
                        <span>{film.release_date || "2024"}</span> 
                        <span className="dot">•</span>
                        <span>{film.category}</span>
                        <span className="dot">•</span>
                        <span>{film.hours}h {film.min}m</span>
                    </div>
                </div>
            </div> 

            <div className="main-content">
                <div className="left-col">
                    <div className="action-buttons">
                        <Link to="/live">
                            <button className="btn-outline">
                                <MdLiveTv size={20} /> Watch Live
                            </button>
                        </Link>
                        <button className="btn-outline">
                            <FiPlay size={20} /> Trailer
                        </button>
                        <button className="btn-outline">
                            <FiBookmark size={20} /> Watchlist
                        </button>
                        <button className="btn-outline">
                            <FiShare2 size={20} /> Share
                        </button>
                    </div>

                    <div className="tabs">
                        <button className={`tab ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => setActiveTab('Overview')}>Overview</button>
                        <button className={`tab ${activeTab === 'Cast' ? 'active' : ''}`} onClick={() => setActiveTab('Cast')}>Cast</button>
                        <button className={`tab ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => setActiveTab('Reviews')}>Reviews</button>
                    </div>

                    {activeTab === 'Overview' && (
                        <>
                            <p className="movie-desc">
                                {film.description || "there is no description "}
                            </p>
                        </>
                    )}
                </div>

                <div className="right-col">
                    <div className="booking-card">
                        <h3>Book Your Tickets</h3>
                        
                        <label>Select Date</label>
                        <select 
                            value={selectedDate} 
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedScreeningId(''); 
                            }}
                            style={{ width: '100%', marginBottom: '15px', padding: '10px' }}
                        >
                            <option value="">-- choose date --</option>
                            {uniqueDates.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>

                        <label>Select Time & Cinema</label>
                        <select 
                            value={selectedScreeningId} 
                            onChange={(e) => setSelectedScreeningId(e.target.value)}
                            disabled={!selectedDate} 
                            style={{ width: '100%', marginBottom: '20px', padding: '10px' }}
                        >
                            <option value="">-- choose date --</option>
                            {availableTimes.map(screening => (
                                <option key={screening.id} value={screening.id}>
                                    {screening.time} — {screening.salle ? screening.salle.name : 'قاعة غير معروفة'}
                                </option>
                            ))}
                        </select>                        
                        <button className="book-btn" onClick={handleBookNow}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}