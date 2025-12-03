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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /> <br/><br/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /> <br/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /> <br/><br/>
        <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} required /> <br/><br/>
        
        <select name="role" onChange={handleChange}>
          <option value="candidate">Candidate (Looking for Job)</option>
          <option value="employer">Employer (Hiring)</option>
        </select> <br/><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}