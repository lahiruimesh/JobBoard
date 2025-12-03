import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ApplyJob() {
  const { jobId } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details to show user what they are applying for
    api.get(`/jobs/${jobId}`)
       .then(res => setJob(res.data))
       .catch(err => alert("Error loading job"));
  }, [jobId]);

  const handleApply = async () => {
    try {
      await api.post('/applications', { job_id: jobId });
      alert("Applied Successfully!");
      navigate('/dashboard/candidate'); // Send them to their dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Application Failed. (You might have already applied)");
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h1>Apply for: {job.title}</h1>
      <p>Company: {job.employer?.name}</p>
      <p>Description: {job.description}</p>
      <hr />
      <p>Are you sure you want to apply for this position?</p>
      
      <button onClick={handleApply}>Confirm & Apply</button>
      <br/><br/>
      <button onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
}