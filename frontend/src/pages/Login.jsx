import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      
      const token = response.data.token;
      
      localStorage.setItem('token', token);
      
      alert("Login Successful!");
      navigate('/');
    } catch (error) {
      alert("Login Failed. Check email/password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /> <br/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /> <br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}