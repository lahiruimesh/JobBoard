import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    job_type: 'Full Time'
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', formData);
      alert("Job Posted Successfully!");
      navigate('/');
    } catch (err) {
      console.error(err);
      
      setError(err.response?.data?.message || "Failed to post job. Are you an Employer?");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-12 px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-[#1a1f2e] p-8 rounded-lg border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Post a New Job</h1>
        <p className="text-[#ff6b35] text-center mb-6 text-sm">Fill in the job details below.</p>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Job Title */}
          <div>
            <label className="block text-white font-medium mb-2">Job Title</label>
            <input 
              type="text" 
              name="title" 
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-white font-medium mb-2">Location</label>
            <input 
              type="text" 
              name="location" 
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-white font-medium mb-2">Job Type</label>
            <select 
              name="job_type" 
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#ff6b35] rounded-lg text-white focus:outline-none focus:border-[#ff8555] transition"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea 
              name="description" 
              rows="5"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-[#ff6b35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8555] transition"
            ></textarea>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-bold hover:bg-[#ff8555] transition mt-6"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}