import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
//import JobFeed from './pages/JobFeed';
import CreateJob from './pages/CreateJob';
import ApplyJob from './pages/ApplyJob';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
        <Route path="/dashboard/employer" element={<EmployerDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;