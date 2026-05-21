// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import './DashSeats.css'

// export default function DashSeats() {

//   const { id } = useParams();

//   const [salle, setSalle] = useState(null);

//   const [vip, setVip] = useState(0);
//   const [premium, setPremium] = useState(0);
//   const [standard, setStandard] = useState(0);

//   useEffect(() => {

//     const getSalle = async () => {

//       const res = await fetch(`http://127.0.0.1:8000/api/salles/${id}`);
//       const data = await res.json();

//       setSalle(data);
//     };

//     getSalle();

//   }, [id]);


//   const usedSeats = vip + premium + standard;

//   const remainingSeats =
//     salle ? Math.max(0, salle.total_seats - usedSeats) : 0;

//   const isFull = remainingSeats === 0;

//   // submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       vip,
//       premium,
//       standard,
//       salle_id: id
//     };

//     console.log(data);
//   };

//   return (
//     <div>

//       <h1>{salle?.name}</h1>
//       <p>{salle?.total_seats}</p>
//       <p>{salle?.status}</p>

  
//       <form onSubmit={handleSubmit}>

//         <label>VIP</label>
//         <input
//           type="number"
//           value={vip}
//           min={1}
//           onChange={(e) => {
//             const value = Number(e.target.value);
            
//             if (value + premium + standard <= salle.total_seats) {
//               setVip(value);
//             } else {
//               alert("No more seats available!");
//             }
//           }}
//         />

//         <label>Premium</label>
//         <input
//           type="number"
//           value={premium}
//           min={1}
//           onChange={(e) => {
//             const value = Number(e.target.value);

//             if (vip + value + standard <= salle.total_seats) {
//               setPremium(value);
//             } else {
//               alert("No more seats available!");
//             }
//           }}
//         />

//         <label>Standard</label>
//         <input
//           type="number"
//           value={standard}
//           min={1}
//           onChange={(e) => {
//             const value = Number(e.target.value);

//             if (vip + premium + value <= salle.total_seats) {
//               setStandard(value);
//             } else {
//               alert("No more seats available!");
//             }
//           }}
//         />

//         <button type="submit" disabled={isFull}>
//           Add
//         </button>

//       </form>

//       <h2>Total Seats: {salle?.total_seats}</h2>
//       <h2>Used Seats: {usedSeats}</h2>

//       <h2>
//         Remaining Seats:
//         <span >
//           {remainingSeats}
//         </span>
//       </h2>

//       {isFull && (
//         <p style={{ color: "red" }}>
//           🚫 No seats available
//         </p>
//       )}

//     </div>
//   );
// }