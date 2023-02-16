
import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Reg from "./Pages/Reg"
import Bookingcam from "./Pages/Bookingcam"
import UserBookings from './Pages/UserBookings';
import AddCam from './Pages/AddCam';
import AdminHome from './Pages/AdminHome';
import EditCam from './Pages/EditCam';



function App() {
  return (



    <BrowserRouter>
      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/booking/:camid" element={<Bookingcam />} />
        <Route path="/userbookings" element={<UserBookings />} />
        <Route path="/addcam" element={<AddCam />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/editcam/:camid" element={<EditCam />} />

      </Routes>




    </BrowserRouter>

  );
}

export default App;


export function ProtectedRoute(props) {

  if (localStorage.getItem('user')) {
    return <Route{...props} />
  }

  else {
    return <Navigate to="/login" />
  }

}
