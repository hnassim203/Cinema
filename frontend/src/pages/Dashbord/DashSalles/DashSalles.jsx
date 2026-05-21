// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

// export default function DashSalles() {

//   const [salles, setSalles] = useState({
//     name: '',
//     total_seats: '',
//     status: 'active'
//   });

//   const [list, setList] = useState([]);

//   const fetchSalles = async () => {
//     try {
//       const res = await fetch('http://127.0.0.1:8000/api/salles');
//       const data = await res.json();
//       setList(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchSalles();
//   }, []);

//   const handlSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await fetch('http://127.0.0.1:8000/api/salles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(salles)
//       });

//       alert('Salle added successfully');

//       setSalles({ name: '', total_seats: '', status: 'active' });

//       fetchSalles();

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const deleteSalle = async (id) => {
//     try {
//       await fetch(`http://127.0.0.1:8000/api/salles/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Accept': 'application/json'
//         }
//       });

//       alert('Deleted successfully');

//       fetchSalles();

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div>
// kkkkkkkkkkkkkkkk
//       <form onSubmit={handlSubmit}>
//         <input
//           type="text"
//           value={salles.name}
//           onChange={(e) =>
//             setSalles({ ...salles, name: e.target.value })
//           }
//           placeholder="Name"
//         />

//         <input
//           type="number"
//           value={salles.total_seats} min={1} max={100}
//           onChange={(e) =>
//             setSalles({ ...salles, total_seats: e.target.value })
//           }
//           placeholder="Seats"
//         />

//         <select
//           value={salles.status}
//           onChange={(e) =>
//             setSalles({ ...salles, status: e.target.value })
//           }
//         >
//           <option value="active">active</option>
//           <option value="inactive">inactive</option>
//         </select>

//         <button type="submit">Add Salle</button>
//       </form><br />

//       <hr /><br />

//       <h2>All Salles</h2>


//       <table border="1" width='30%'>
//         <tr>
//             <th>Name</th>
//             <th>Seats</th>
//             <th>Actions</th>
//             <th>delete</th>
//         </tr>
        
//             {list.map((s)=>(
//                 <tr key={s.id}>
//                     <td>{s.name}</td>
//                     <td>{s.total_seats}</td>
//                     <td>{s.status}</td>
//                     <td><button onClick={()=>deleteSalle(s.id)}>delete</button></td>
//                     <td><Link to={`/dashbord/seats/${s.id}`} >seats</Link></td>
//                 </tr>
//             ))}
        
//       </table>

//     </div>
//   )
// }