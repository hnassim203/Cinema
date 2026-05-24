import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../Home/composenents/Navbar/Navbar'; 
import Footer from '../../components/Footer/Footer'; 
import { clearFilmSeats } from '../../redux/SeatSlice'; 
import "./payment.css";
export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const screeningId = location.state?.screeningId;
    const snacksCart = location.state?.snacksCart || [];

    const selectedSeats = useSelector(
        (state) => state.seats.reservations?.[screeningId] || []
    );

    const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvv: '' });

    const seatsTotal = selectedSeats.reduce((total, seat) => {
        if (seat.type === "vip") return total + 20;
        if (seat.type === "premium") return total + 15;
        return total + 10;
    }, 0);

    const snacksTotal = snacksCart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
    
    const bookingFee = 1.50; 
    const grandTotal = seatsTotal + snacksTotal + bookingFee;

const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedSeats || selectedSeats.length === 0) {
            alert('Error: No seats selected! Please go back and select your seats.');
            return; 
        }

        if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
            alert('invalid informations');
            return;
        }

        try {
    const user = JSON.parse(localStorage.getItem('user')); 

    const response = await axios.post("https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/reservations", {
        user_id: user?.id,
        screening_id: screeningId,
        seats: selectedSeats.map(s => s.id), 
        snacks: snacksCart.map(item => ({ id: item.id, quantity: item.quantity })), 
        total_price: grandTotal
    });

    dispatch(clearFilmSeats(screeningId));

    navigate('/confirm', { 
        state: { 
            reservationId: response.data.reservation_id, 
            seats: selectedSeats,
            snacks: snacksCart,
            total: grandTotal
        } 
    });
        } catch (error) {
            console.error("error to save", error);
            alert(error.response?.data?.message || "error occurred during payment");
        }
    };

    return (
        <div className="payment-page">
            <Navbar />

            <div className="page-content-pay">
                <div className="payment-form-side">
                    <h1>Payment Details</h1>
                    <p className="sub">Complete your booking securely.</p>

                    <div className="form-group-pay">
                        <label>Card Number</label>
                        <input 
                            type="text" 
                            placeholder="1234 5678 9012 3456" 
                            maxLength="19"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        />
                    </div>

                    <div className="form-group-pay">
                        <label>Card Holder Name</label>
                        <input 
                            type="text" 
                            placeholder="enter your name"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                        />
                    </div>

                    <div className="two-cols">
                        <div className="form-group-pay">
                            <label>Expiry Date</label>
                            <input 
                                type="text" 
                                placeholder="MM/YY" 
                                maxLength="5"
                                value={cardInfo.expiry}
                                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                            />
                        </div>
                        <div className="form-group-pay">
                            <label>CVV</label>
                            <input 
                                type="password" 
                                placeholder="•••" 
                                maxLength="3"
                                value={cardInfo.cvv}
                                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="order-summary-side">
                    <div className="order-box">
                        <h3>Order Summary</h3>
                        
                        <div className="order-row">
                            <span>{selectedSeats.length}x Tickets Selected</span>
                            <span>${seatsTotal.toFixed(2)}</span>
                        </div>

                        {snacksCart.length > 0 && (
                            <div className="order-row">
                                <span>Snacks ({snacksCart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                                <span>${snacksTotal.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="order-row">
                            <span>Booking Fee</span>
                            <span>${bookingFee.toFixed(2)}</span>
                        </div>

                        <div className="order-total">
                            <span>Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>

                        <button className="pay-btn" onClick={handlePaymentSubmit}>
                            Pay ${grandTotal.toFixed(2)}
                        </button>

                        <div className="secure-note">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>security</span>
                            Secured by SSL Encryption
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}