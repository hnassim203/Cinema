import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد دالة التوجيه
import axios from 'axios';
import Navbar from '../Home/composenents/Navbar/Navbar'; 
import Footer from '../../components/Footer/Footer'; 
import { MdEventSeat, MdFastfood } from 'react-icons/md';
// import './Profile.css';

export default function Profile() {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);


    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchUserReservations = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/users/${currentUser.id}/reservations`);
                setReservations(res.data);
                setLoading(false);
            } catch (error) {
                console.error("error get resevations", error);
                setLoading(false);
            }
        };

        fetchUserReservations();
    }, [navigate]); 

  
    if (!currentUser) return null;

    return (
        <div className="profile-page" style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
            <Navbar />

            <div className="profile-container" style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
                
                <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', padding: '30px', backgroundColor: '#1a1a1a', borderRadius: '15px', border: '1px solid #2a2a2a' }}>
                    <div className="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f20d33', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {currentUser.name.charAt(0)}
                    </div>
                    <div>
                        <h1 style={{ margin: '0 0 5px 0' }}>{currentUser.name}</h1>
                        <p style={{ color: '#888', margin: 0 }}>{currentUser.email}</p>
                    </div>
                </div>

                <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #f20d33', paddingBottom: '10px', display: 'inline-block' }}>My Tickets</h2>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>loading...</div>
                ) : reservations.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1a1a1a', borderRadius: '15px' }}>
                        <p style={{ color: '#888' }}>You have no past bookings.</p>
                    </div>
                ) : (
                    <div className="tickets-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {reservations.map((res) => (
                            <div key={res.id} className="ticket-card" style={{ display: 'flex', backgroundColor: '#1a1a1a', borderRadius: '15px', overflow: 'hidden', border: '1px solid #2a2a2a' }}>
                                
                                <div style={{ width: '150px', flexShrink: 0 }}>
                                    <img 
                                        src={`http://127.0.0.1:8000/storage/${res.screening?.film?.image}`} 
                                        alt="Movie" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150x220?text=No+Image'; }} 
                                    />
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>{res.screening?.film?.title || 'Unknown Movie'}</h3>
                                            <span style={{ backgroundColor: 'rgba(242,13,51,0.1)', color: '#f20d33', padding: '5px 10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>
                                                ${res.total_price}
                                            </span>
                                        </div>
                                        <p style={{ color: '#aaa', fontSize: '14px', margin: '0 0 15px 0' }}>
                                            {res.screening?.salle?.name} • {res.screening?.date} at {res.screening?.time}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #2a2a2a', paddingTop: '15px', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#ccc' }}>
                                            <MdEventSeat style={{ color: '#f20d33' }} /> 
                                            {res.seats.length} Seats
                                        </div>
                                        {res.snacks.length > 0 && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#ccc' }}>
                                                <MdFastfood style={{ color: '#f20d33' }} /> 
                                                {res.snacks.reduce((acc, curr) => acc + curr.quantity, 0)} Snacks
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#ccc', marginLeft: 'auto' }}>
                                            Booking ID: #{res.id}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}