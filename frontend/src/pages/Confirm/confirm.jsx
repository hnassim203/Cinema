import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../movieDetails/composenents/Navbar/Navbar';
import Footer from "../../components/Footer/Footer"
import './Confirm.css';

export default function Confirm() {
    const location = useLocation();
    const navigate = useNavigate();

    const { reservationId, seats, snacks, total } = location.state || {};

    if (!location.state) {
        return (
            <div className="confirm-page">
                <Navbar />
                <div className="confirm-content">
                    <h2>No booking data found.</h2>
                    <button className="home-btn" onClick={() => navigate('/')}>Go to Home</button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="confirm-page">
            <Navbar />
            
            <div className="confirm-content">
                <h1>Payment Successful!</h1>
                <p className="sub-text">Your reservation has been confirmed.</p>

                <div className="ticket-card">
                    <h3>Reservation Summary</h3>
                    
                    <div className="ticket-row">
                        <span>Reservation ID:</span>
                        <strong>#{reservationId || 'N/A'}</strong>
                    </div>
                    
                    <div className="ticket-row">
                        <span>Seats ({seats?.length || 0}):</span>
                        <strong>{seats?.map(s => s.name).join(', ')}</strong>
                    </div>

                    {snacks && snacks.length > 0 && (
                        <div className="ticket-row">
                            <span>Snacks:</span>
                            <strong>{snacks.reduce((acc, curr) => acc + curr.quantity, 0)} Items</strong>
                        </div>
                    )}
                    
                    <hr className="divider" />
                    
                    <div className="ticket-row total-row">
                        <span>Total Paid:</span>
                        <strong>${Number(total).toFixed(2)}</strong>
                    </div>
                </div>

                <button className="home-btn" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>

            <Footer />
        </div>
    );
}