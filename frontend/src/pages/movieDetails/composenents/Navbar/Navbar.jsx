import './Navbar.css'
import userProfilImg from '../../../../assets/images/profile.png'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';

export default function Navbar() {
  const navigat = useNavigate();
  return (
    <div>
      <nav>
        <div className="nav-left">
            <h1>Cinema</h1>
            <ul>
                <li><Link smooth to='/#now-playing'>Movies</Link></li>
                <li><a href="/cinemas">Cinemas</a></li>
                <li><a href="/pricing">Pricing</a></li>
            </ul>
        </div>

      </nav>
    </div>
  )
}
