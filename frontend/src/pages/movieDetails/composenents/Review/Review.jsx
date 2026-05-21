import "./Review.css"
import Rev1 from '../../../../assets/images/rev1.png'
import Rev2 from '../../../../assets/images/rev2.png'
import Rev3 from '../../../../assets/images/rev3.png'
import Rev4 from '../../../../assets/images/rev4.png'
import Rev5 from '../../../../assets/images/rev5.png'
import Rev6 from '../../../../assets/images/rev6.png'
import { FaStar } from "react-icons/fa"

export default function Review() {
  return (
    <div className="rev">
        <h1>Top Rated This Month</h1>
      <div className="review">
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev1} alt="" />
                <h5>Classic Echoes</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>9.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev2} alt="" />
                <h5>The Horizon</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>9.5</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev3} alt="" />
                <h5>Deep Woods</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>9.3</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev4} alt="" />
                <h5>Gatekeepers</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>9.1</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev5} alt="" />
                <h5>Director's Cut</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.9</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
        <div className="review_vid">
            <div className="rev1">
                <img src={Rev6} alt="" />
                <h5>Masked Justice</h5>
                <div className="njma"><FaStar style={{color:'red'}}/> <span>8.8</span></div>
            </div>
        </div>
       
      </div>
    </div>
  )
}
