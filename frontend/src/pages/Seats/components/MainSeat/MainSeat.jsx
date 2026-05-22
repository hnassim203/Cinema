import React, { useState, useEffect } from 'react';
import './MainSeat.css';
import EcranImg from '../../../../assets/images/ecran1.png';
import { MdEventSeat } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSeat } from '../../../../redux/seatSlice';
import { useParams } from "react-router-dom";
import axios from 'axios';

const EMPTY_ARRAY = [];

export default function MainSeat() {
  const { screeningId } = useParams(); 
  
  const dispatch = useDispatch();

  const [screeningData, setScreeningData] = useState(null);
  const [salleSeats, setSalleSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reservedSeatsDB, setReservedSeatsDB] = useState([]); 

  useEffect(() => {
    const fetchSeatMap = async () => {
      try {
        const res = await axios.get(`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/screenings/${screeningId}/seats`);
        setScreeningData(res.data.screening);
        setSalleSeats(res.data.seats);
        setLoading(false);
      } catch (error) {
        console.error("error fetching:", error);
        setLoading(false);
      }
    };

    if (screeningId) {
      fetchSeatMap();
    }
  }, [screeningId]);

  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const res = await axios.get(`https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/reservations/seats/${screeningId}`);
        setReservedSeatsDB(res.data); 
      } catch (error) {
        console.error("خطأ في جلب المقاعد المحجوزة:", error);
      }
    };

    if (screeningId) {
      fetchReservedSeats();
    }
  }, [screeningId]);

  const selectedSeats = useSelector((state) => 
    state.seats.reservations[screeningId] || EMPTY_ARRAY
  );

  const handleSeat = (seatId, seatType,seatRow,seatColumn) => {
    
    if (seatType === 'space' || seatType === 'disabled') return;

    dispatch(
      toggleSeat({
        filmId: screeningId, 
        seat: { id: seatId, type: seatType ,name: `${seatRow}${seatColumn}` }
      })
    );
  };

  const isSelected = (seatId) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>جاري تحميل خريطة المقاعد...</div>;
  if (!screeningData) return <div style={{ color: 'white', textAlign: 'center' }}>حدث خطأ، لم يتم العثور على العرض.</div>;

  return (
    <div>
      <div className='ecron'>
        <img src={EcranImg} alt="Screen" />
        
        {/* معلومات العرض */}
        <div style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
          <h3>{screeningData.film.title}</h3>
          <p>{screeningData.salle.name} | {screeningData.date} - {screeningData.time}</p>
        </div>

        <div className="cinema">
          <div 
            className="seat-grid" 
            style={{ 
              display: 'grid', 
              // تحديد عدد الأعمدة بناءً على بيانات القاعة القادمة من الداتابيز
              gridTemplateColumns: `repeat(${screeningData.salle.columns_count}, auto)`, 
              gap: '10px', 
              justifyContent: 'center' 
            }}
          >
            {salleSeats.map((seat) => {
              // 1. ترجمة الكلمة من الداتابيز لتتطابق مع الـ CSS الخاص بك
              const seatTypeForCss = seat.type === 'regular' ? 'standard' : seat.type;

              // 2. التحقق مما إذا كان المقعد الحالي محجوزاً في قاعدة البيانات
              const isReserved = reservedSeatsDB.includes(seat.id);

              return (
                <div 
                  key={seat.id}
                  className={`
                    seat 
                    ${seatTypeForCss} 
                    ${isSelected(seat.id) ? "active" : ""}
                    ${seat.type === 'space' ? 'invisible-space' : ''}
                    ${isReserved ? 'R-1' : ''} /* إضافة كلاس اللون الرمادي */
                  `}
                  // 3. منع الضغط نهائياً إذا كان المقعد محجوزاً أو إذا كان مجرد مساحة فارغة
                  onClick={() => {
                    if (!isReserved && seat.type !== 'space') {
                      console.log('this seat bbb',seat)
                      handleSeat(seat.id, seat.type,seat.row_index,seat.column_index);
                    }
                  }} 
                  // 4. تغيير شكل الماوس ليدل على أن المقعد مأخوذ واللون باهت قليلاً
                  style={{ 
                    cursor: isReserved ? 'not-allowed' : (seat.type === 'space' ? 'default' : 'pointer'),
                    opacity: isReserved ? 0.4 : 1 
                  }}
                >
                  {/* إظهار أيقونة المقعد ورقمها إذا لم يكن مساحة فارغة */}
                  {seat.type !== 'space' && (
                    <>
                      <MdEventSeat size={24} />
                      <span className="seat-label" style={{ fontSize: '10px', display: 'block' }}>
                        {seat.row_index}{seat.column_index}
                      </span>
                    </>
                  )}
                </div>
              );
            })} 
          </div>
        </div>
      </div>
    </div>
  );
}