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
      // Show error message
      setError(err.response?.data?.message || "Failed to post job. Are you an Employer?");
    }
  };

  return (
    <div>
      <h1>Post a New Job</h1>
      
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        
        {/* Job Title */}
        <div>
          <label>Job Title</label>
          <input 
            type="text" 
            name="title" 
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label>Location</label>
          <input 
            type="text" 
            name="location" 
            onChange={handleChange}
          />
        </div>

        {/* Job Type */}
        <div>
          <label>Job Type</label>
          <select 
            name="job_type" 
            onChange={handleChange}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea 
            name="description" 
            rows="5"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
           >
          Post Job
        </button>
      </form>
    </div>
  );
}