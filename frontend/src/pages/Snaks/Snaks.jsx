import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/composenents/Navbar/Navbar'; 
import Footer from '../../components/Footer/Footer'; 
import './Snaks.css';

export default function Snaks() {
    const location = useLocation();
    const navigate = useNavigate();

    const screeningId = location.state?.screeningId;
console.log('screenid kkk',screeningId)
    const [snacks, setSnacks] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSnacksData = async () => {
            try {
                const res = await axios.get("https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/snacks");
                setSnacks(res.data);
                setLoading(false);
            } catch (error) {
                console.error("error get food", error);
                setLoading(false);
            }
        };
        fetchSnacksData();
    }, []);

    const renderProductImage = (snack) => {
        if (snack.image) {
            return <img src={`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/storage/${snack.image}`} alt={snack.name} width="80" height="80" style={{ objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />;
        }
        if (snack.category === 'popcorn') return <div className="product-emoji">🍿</div>;
        if (snack.category === 'drinks') return <div className="product-emoji">🥤</div>;
        if (snack.category === 'food') return <div className="product-emoji">🌭</div>;
        return <div className="product-emoji">🍬</div>;
    };

    const filteredSnacks = activeFilter === 'all'?snacks: snacks.filter(snack=>snack.category === activeFilter);

    const addToCart = (snack) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === snack.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...snack, quantity: 1 }];
        });
    };
    const cartTotal = cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

    const proceedToPayment = () => {
        navigate('/payment', { 
            state: { 
                screeningId: screeningId,
                snacksCart: cart 
            } 
        });
    };

    if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Loading..</div>;

    return (
        <div className="snaks-page">
            <Navbar />

            <div className="page-content">
                <h1>🍿 Add Snacks & Drinks</h1>
                <p className="sub">Order now and have it ready when you arrive.</p>

                <div className="main-layout">
                    <div className="menu-side">
                        <div className="filters">
                            {['all', 'popcorn', 'drinks', 'food', 'sweet'].map(cat => (
                                <button 
                                    key={cat}
                                    className={`filter-btn ${activeFilter === cat ? 'active' : ''}`} 
                                    onClick={() => setActiveFilter(cat)}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="products-grid">
                            {filteredSnacks.map(snack => (
                                <div key={snack.id} className="product-card">
                                    {renderProductImage(snack)}
                                    <h4>{snack.name}</h4>
                                    <p>{snack.description || "No description available"}</p>
                                    <div className="price">${Number(snack.price).toFixed(2)}</div>
                                    <button 
                                        className="add-btn" 
                                        onClick={() => addToCart(snack)}
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cart-side">
                        <div className="cart-box">
                            <h3>🛒 My Order</h3>
                            
                            <div id="cartItems">
                                {cart.length === 0 ? (
                                    <p className="cart-empty">Nothing added yet.</p>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="cart-total">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                              <button 
                                  className="continue-btn" 
                                  onClick={proceedToPayment}
                                  disabled={cart.length === 0}
                              >
                                  Continue to Payment →
                              </button>

                              <button 
                                  className="skip-link" 
                                  onClick={() => navigate('/payment', { state: { screeningId, snacksCart: [] } })}
                              >
                                  Skip snacks →
                              </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}