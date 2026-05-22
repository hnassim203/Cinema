import { FaArrowRight } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [show, setShow] = useState({
    password : false,
  });

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email : "", password : "" , 
  });

 
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert('fill fields');
    return;
  }

  try {
  const res = await fetch("https://cinema-wan-htf0bcg0end6fhfv.spaincentral-01.azurewebsites.net/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  
  localStorage.setItem("user", JSON.stringify(data.user));

  if(data.user.role === 'admin'){
    navigate("/dashbord");
  }else{
    navigate('/');
  }

  

} catch (error) {
  console.log(error);
  alert("Server error");
}

};


  return (
    <div className="login-page">
          <div className="left">
    
              <div className="overlay">
              <h1> Cinema</h1>
              <h2>Start Your Journey.</h2>
              <p>Step into the Shadows of Cinema. Where every seat has a story, and every scream is real.
                 Book your nightmare now. </p>
              </div>
              
          </div>
          <div className="right">
    
              <div className="log-right">
                <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p>Join the premiere and start watching in minutes.</p>
    
    
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Entre your address" 
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                </div>
    
                <div className="form-group">
                  <label>Password</label>
                  <input type={show.password ? "text": "password"} placeholder="create strong password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData, password:e.target.value})} />
                  <span onClick={()=>setShow({...show, password: !show.password})}> {show.password ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
    
                <button type="submit">Login<FaArrowRight/></button>
                <hr />
          <p className="alre"> Don’t have an account? <Link to="/register" style={{ color: "red" }}>Register</Link></p>

                </form>
              </div>
    
          </div>
    
        </div>
  )
}
