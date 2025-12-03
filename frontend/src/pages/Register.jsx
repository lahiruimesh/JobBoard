import { useState } from 'react';
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'candidate' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await api.post('/auth/register', formData);
      console.log(response.data);
      alert("Registration Successful! Please Login.");
      navigate('/login'); 
    } catch (error) {
      console.error(error);
      alert("Registration Failed: " + (error.response?.data?.message || "Check inputs"));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center py-12 px-4 pt-24">
      <div className="max-w-md w-full bg-[#1a1f2e] p-8 rounded-lg border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Registration</h1>
        <p className="text-[#ff6b35] text-center mb-6 text-sm">Enter your details below.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
          />
          <input 
            type="password" 
            name="password_confirmation" 
            placeholder="Confirm Password" 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
          />
          
          <select 
            name="role" 
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#ff6b35] rounded-lg text-white focus:outline-none focus:border-[#ff8555] transition"
          >
            <option value="candidate">Candidate (Looking for Job)</option>
            <option value="employer">Employer (Hiring)</option>
          </select>

          <button 
            type="submit"
            className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-bold hover:bg-[#ff8555] transition mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}