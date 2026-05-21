import { Routes , Route} from "react-router-dom";
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute' 
import NotFound from './NotFound'
import Profile from "./pages/Profile/Profile";
import Seats from "./pages/Seats/Seats";
import Dashbord from './pages/Dashbord/Dashbord'
import Snaks from "./pages/Snaks/Snaks"
import DashFilm from './pages/Dashbord/DashFilms/DashFilms'
// import DashSalles from './pages/Dashbord/DashSalles/DashSalles'
// import DashSeats from './pages/Dashbord/DashSeats/DashSeats'
import DashSnaks from './pages/Dashbord/DashSnaks/DashSnaks'
import MovieDetails from "./pages/movieDetails/MovieDetails";
import ManageSalles from "./pages/Dashbord/manageSalles/manageSalles";
import DashScreenings from "./pages/Dashbord/DashScrenning/DashScrenning";
import Payment from "./pages/Payment/payment";
import DashUsers from './pages/Dashbord/DashUsers/DashUsers';
import Confirm from "./pages/Confirm/confirm";

export default function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/view/:filmId" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>} />
        <Route path="/seats/:screeningId" element={<ProtectedRoute><Seats/></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/snaks" element={<ProtectedRoute><Snaks/></ProtectedRoute>} />
        <Route path="/confirm" element={<ProtectedRoute><Confirm/></ProtectedRoute>} />
        
        <Route path="/dashbord" element={<AdminRoute><Dashbord/></AdminRoute>} />
        <Route path="/dashbord/screnning" element={<AdminRoute><DashScreenings/></AdminRoute>} />
        <Route path="/dashbord/films" element={<AdminRoute><DashFilm/></AdminRoute>} />
        <Route path="/dashbord/salles" element={<AdminRoute><ManageSalles/></AdminRoute>} />
        <Route path="/dashbord/users" element={<AdminRoute><DashUsers/></AdminRoute>} />
        {/* <Route path="/dashbord/sall" element={<AdminRoute><DashSalles/></AdminRoute>} /> */}
        <Route path="/dashbord/snaks" element={<AdminRoute><DashSnaks/></AdminRoute>} />
        {/* <Route path="/dashbord/seats/:id" element={<AdminRoute><DashSeats/></AdminRoute>} /> */}
        
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </div>
  )
}