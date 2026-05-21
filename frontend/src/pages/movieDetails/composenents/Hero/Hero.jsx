import HeroImg from '../../../../assets/images/home.png'
import './Hero.css'
import { MdOutlineWatchLater } from "react-icons/md";
import { FiPlay } from "react-icons/fi"
import { Link } from 'react-router-dom';


export default function Hero() {


  return (
  <div>
    <div className='hero'>
      <img src={HeroImg} alt="imge" />
    </div>
    <div className="textes">
      <h1>Inserstllar:<br/> <span>The Final Frontier</span></h1>
      <p>The epic continuation of humanity's journey through the stars. 
        Experience a masterpiece of visual storytelling in 4K HDR.</p>
        <div className="buttonsHero">
          <a href="/watch"><button className='btn1'> <FiPlay/> Watch Trailler</button></a>
          {/* <a href="/view"><button className='btn2'> <MdOutlineWatchLater /> View Showtimes</button></a> */}
          <Link to="/view">
            <button className='btn2'> <MdOutlineWatchLater /> View Showtimes</button>
          </Link>
        </div>
    </div>
    </div>
    
  )
}
