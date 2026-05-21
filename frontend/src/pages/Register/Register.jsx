import { Link, useNavigate } from "react-router-dom"
import "./Register.css"
import { FaArrowRight } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";




export default function Register() {

  const [show, setShow] = useState({
    password : false,
    confirm : false,
  });

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name : "", email : "", password : "" , confirm_password : "",
  });






const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password || !formData.confirm_password) {
    alert('3mer kolxi');
    return;
  }

  if (formData.password !== formData.confirm_password) {
    alert('error password');
    return;
  }

  if (!accepted) {
    alert("You must accept the terms");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        terms_accepted: accepted
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error happened");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

navigate('/');
    console.log(data);

    

  } catch (error) {
    console.log(error);
    alert("Email dija kayn");
  }
};



  return (
    <div className="Register-page">
      <div className="left">

          <div className="overlay">
          <h1> Cinema Abineda</h1>
          <h2>Start Your Journey.</h2>
          <p>Step into the Shadows of Cinema. Where every seat has a story, and every scream is real.
             Book your nightmare now. </p>
          </div>
          
      </div>
      <div className="right">

          <div className="form-right">
            <form onSubmit={handleSubmit}>
            <h1>Create your account</h1>
            <p>Join the premiere and start watching in minutes.</p>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Entre your full name"
              value={formData.name} 
              onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
            </div>

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

            <div className="form-group">
              <label>Confirm Password</label>
              <input type={show.confirm ? "text" : "password"} placeholder="Re-enter your password"
              value={formData.confirm_password}
              onChange={(e)=>setFormData({...formData, confirm_password:e.target.value})} />
                <span onClick={()=>setShow({...show, confirm: !show.confirm})}> {show.confirm ? <FaEyeSlash /> : <FaEye />}</span>
            </div>



            <button type="submit">Create Account <FaArrowRight/></button>
            <hr />
            <p className="alre">Already have an account? <Link style={{color:'red'}} to="/login">login</Link> </p>
            </form>
          </div>

      </div>

    </div>
  )
}
