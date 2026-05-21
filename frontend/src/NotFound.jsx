// pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found 🚫</h1>
      <p>Had l-page li k-tqalbi 3liha makaynach.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Rje3 l-Home
      </Link>
    </div>
  );
}