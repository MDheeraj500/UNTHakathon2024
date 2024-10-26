import './App.css'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import { Navigate } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
