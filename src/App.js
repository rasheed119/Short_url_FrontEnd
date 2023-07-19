import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Activateaccount from "./Pages/activateaccount";
import Dashboard from "./Pages/Dashboard";
import Resetpassword from "./Pages/Resetpassword";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route exact path="/" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/activateaccount" element={<Activateaccount />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/resetpassword" element={<Resetpassword/>} />
    </Routes>
  );
}

export default App;
