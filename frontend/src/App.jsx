import './App.css'
import Login from './components/login'
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import { Navigate } from "react-router";
import Expense from './components/Expense/Expense';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogAnalysis from './components/LogAnalysis';
import RetirementPlan from './components/RetirementPlan';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-expense" element={<Expense />} />
        <Route path="/log-analysis" element={<LogAnalysis />} />
        <Route path="/retirement-plan" element={<RetirementPlan />} />
      </Routes>
    </Router>
  )
}

export default App
