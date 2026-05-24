import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageSalles.css';

const ManageSalles = () => {
  const [formData, setFormData] = useState({
    name: '',
    rows_count: 10,
    columns_count: 10,
  });

  const [currentSalle, setCurrentSalle] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [allSalles, setAllSalles] = useState([]);

  useEffect(() => {
    fetchSalles();
  }, []);

  const fetchSalles = async () => {
    try {
      const response = await axios.get('https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/salles');
      setAllSalles(response.data);
    } catch (error) {
      console.error('error', error);
    }
  };

  const handleCreateSalle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/salles', formData);
      setCurrentSalle(response.data.salle);
      setSeats(response.data.salle.seats);
      setSelectedSeats([]);
      alert('succ');
      fetchSalles(); 
    } catch (error) {
      console.error('create error', error);
    }
  };

  const handleSelectSalle = (e) => {
    const salleId = e.target.value;
    if (!salleId) {
      setCurrentSalle(null);
      setSeats([]);
      return;
    }
    
    const selected = allSalles.find(s => s.id === parseInt(salleId));
    if (selected) {
      setCurrentSalle(selected);
      setSeats(selected.seats);
      setSelectedSeats([]);
    }
  };

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prev) => 
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  const handleUpdateSeatType = async (newType) => {
    if (selectedSeats.length === 0) {
      alert('eror');
      return;
    }

    try {
      await axios.post('https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/seats/bulk-update', {
        seat_ids: selectedSeats,
        type: newType
      });

      setSeats(seats.map(seat => 
        selectedSeats.includes(seat.id) ? { ...seat, type: newType } : seat
      ));
      
      setSelectedSeats([]);
      fetchSalles(); 
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="salle-manager">
      <h2>manage salles and seats</h2>

      <div className="salle-selector" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>edit existed salle </label>
        <select onChange={handleSelectSalle} style={{ padding: '8px', minWidth: '200px' }}>
          <option value="">-- select salle--</option>
          {allSalles.map(salle => (
            <option key={salle.id} value={salle.id}>
              {salle.name} ({salle.rows_count} row * {salle.columns_count} column)
            </option>
          ))}
        </select>
      </div>

      <hr style={{ margin: '20px 0', borderTop: '1px solid #ccc' }} />

      <form onSubmit={handleCreateSalle} className="salle-form">
        <label style={{ fontWeight: 'bold' }}>create new salle </label>
        <input 
          type="text" 
          placeholder="salle name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required 
        />
        <label>rows number</label>
        <input 
          type="number" 
          placeholder="rows number" 
          value={formData.rows_count}
          onChange={(e) => setFormData({...formData, rows_count: e.target.value})}
          required 
          />
          <label>columns number</label>
        <input 
          type="number" 
          placeholder="columns number" 
          value={formData.columns_count}
          onChange={(e) => setFormData({...formData, columns_count: e.target.value})}
          required 
        />
        <button type="submit">create</button>
      </form>

      {currentSalle && (
        <div className="seat-editor">
          <h3>edit seat {currentSalle.name}</h3>
          
          <div className="seat-actions">
            <button onClick={() => handleUpdateSeatType('vip')} className="btn-vip"> return toVIP</button>
            <button onClick={() => handleUpdateSeatType('space')} className="btn-space">Convert to corridor(hide)</button>
            <button onClick={() => handleUpdateSeatType('disabled')} className="btn-disabled">disable seat</button>
            <button onClick={() => handleUpdateSeatType('regular')} className="btn-regular">return to standart</button>
          </div>

          <div 
            className="seat-grid" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${currentSalle.columns_count}, 1fr)`,
              gap: '10px',
              marginTop: '20px'
            }}
          >
            {seats.map((seat) => (
              <div 
                key={seat.id} 
                onClick={() => toggleSeatSelection(seat.id)}
                className={`seat-box ${seat.type} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
              >
                {seat.type !== 'space' && `${seat.row_index}${seat.column_index}`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSalles;