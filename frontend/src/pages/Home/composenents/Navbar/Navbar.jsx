import './Navbar.css'
import userProfilImg from '../../../../assets/images/profile.png'
import { FiSearch, FiLogOut } from 'react-icons/fi' 
import { useNavigate } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';
import { useState } from 'react';
export default function Navbar() {
  const navigat = useNavigate();
  const [searchMovie,SetSearchMovie]=useState('')
  const isUser = localStorage.getItem('user');
  const currentUser = isUser ? JSON.parse(isUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigat('/login'); 
  };

  return (
    <div>
      <nav>
        <div className="nav-left">
            <h1>Cinema</h1>
            <ul>
                <li><Link  to='/'>Home</Link></li>
                <li><Link  to='/#now-playing'>Movies</Link></li>

                {currentUser && currentUser.role === 'admin' && (
                    <li><Link  to='/dashbord'>Dashboard</Link></li>
                )}
            </ul>
        </div>
        
        <div className="nav-right">
          <div className="search-box">
             <FiSearch className="search-icon" />
            <input type="text" placeholder="Search movies..." />
          </div>

          {currentUser && (
            <button 
              onClick={handleLogout} 
              title="Logout"
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#f20d33', 
                cursor: 'pointer', 
                fontSize: '22px', 
                marginLeft: '15px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FiLogOut />
            </button>
          )}

          
          <img 
            src={userProfilImg} 
            alt="user Profil" 
            style={{ cursor: 'pointer', marginLeft: '15px' }} 
            onClick={() => navigat('/profile')}
          />
        </div>
      </nav>
    </div>
  )
}