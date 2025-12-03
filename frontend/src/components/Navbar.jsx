import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="bg-[#0a0e1a]/5 backdrop-blur-sm text-white py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* LEFT: Logo */}
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Auto<span className="text-[#ff6b35]">Jobs</span>
      </div>

      {/* MIDDLE: Links */}
      <div className="hidden md:flex space-x-8 font-medium">
        <Link to="/" className="hover:text-[#ff6b35] transition">Services</Link>
        <Link to="/" className="hover:text-[#ff6b35] transition">About Us</Link>
        <Link to="/" className="hover:text-[#ff6b35] transition">Contact</Link>
        {token && (
          <>
            <Link to="/dashboard/candidate" className="hover:text-[#ff6b35] transition">My Applications</Link>
            <Link to="/dashboard/employer" className="hover:text-[#ff6b35] transition">My Jobs</Link>
          </>
        )}
      </div>

      {/* RIGHT: Buttons */}
      <div className="flex gap-4 items-center">
        {!token ? (
          <>
            <Link to="/login" className="text-white hover:text-[#ff6b35] font-medium transition">
              Login
            </Link>
            <Link to="/register" className="bg-[#ff6b35] text-white px-6 py-2 rounded-lg hover:bg-[#ff8555] transition font-semibold">
              Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-[#ff6b35] text-white px-6 py-2 rounded-lg hover:bg-[#ff8555] transition font-semibold">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}