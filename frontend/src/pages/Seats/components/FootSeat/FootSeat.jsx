import "./FootSeat.css";
import { MdEventSeat } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; 


export default function FootSeat() {
  const navigate = useNavigate();
  
  const { screeningId } = useParams();

  const selectedSeats = useSelector(
    (state) => state.seats.reservations?.[screeningId] ?? []
  );
console.log('mmm',selectedSeats)
  const seatsList = selectedSeats.map((s) => s.name).join(",");
  const totalTickets = selectedSeats.length;

  const getPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      if (seat.type === "vip") return total + 20;
      // if (seat.type === "premium") return total + 15;
      return total + 10;
    }, 0);
  };

  return (
    <div className="foot">

      <div className="foot-right">
        <span><div className="G-1"><MdEventSeat /></div> STANDARD</span>
        {/* <span><div className="C-1"><MdEventSeat /></div> PREMIUM</span> */}
        <span><div className="A-1"><MdEventSeat /></div> VIP</span>
        <span><div className="S-1"><MdEventSeat /></div> SELECTED</span>
        <span><div className="R-1"><MdEventSeat /></div> RESERVED</span>
      </div>

      <div className="foot-left">
        <h4>{totalTickets} TICKETS</h4>

        <div className="set">
          <h3>${getPrice().toFixed(2)}</h3>

          <div className="vv">
            <p>SEATS :</p>
            <p>{seatsList || "None"}</p>
          </div>
        </div>

        <button 
          disabled={totalTickets === 0} 
          onClick={() => navigate('/snaks', { state: { screeningId } })}
        >
          Snaks Selection <FaArrowRight />
        </button>

      </div>

    </div>
  );
}