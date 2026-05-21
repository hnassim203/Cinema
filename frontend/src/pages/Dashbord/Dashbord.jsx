import React from 'react';
import { Link } from "react-router-dom";
import './Dashbord.css'; 

export default function Dashbord() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="dashboard-links">
        <Link to="/dashbord/films" className="dash-card"> Films</Link>
        <Link to="/dashbord/screnning" className="dash-card"> Screenings</Link>
        <Link to="/dashbord/salles" className="dash-card"> Salles</Link>
        <Link to="/dashbord/snaks" className="dash-card"> Snacks</Link>
        <Link to="/dashbord/users" className="dash-card"> Users</Link>
        {/* <Link to="/dashbord/seats" className="dash-card"> seats</Link> */}
      </div>
    </div>
  );
}