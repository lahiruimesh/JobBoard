import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({}); // Store applicants by job ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  // Note: We are fetching ALL jobs. 
  // Ideally, you should make a backend endpoint for "my-jobs-only".
  // For now, we assume the list contains your jobs or we filter them.
  const fetchMyJobs = async () => {
    try {
      const res = await api.get('/jobs'); 
      setJobs(res.data.data); // Laravel pagination puts data in .data
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      fetchMyJobs(); // Refresh list
    } catch (error) {
      alert("Error deleting job");
    }
  };

  const viewApplicants = async (jobId) => {
    try {
      const res = await api.get(`/applications/${jobId}`);
      // Store applicants in state object: { "job_1": [user1, user2] }
      setApplicants({ ...applicants, [jobId]: res.data });
    } catch (error) {
      alert("Error fetching applicants or Unauthorized");
    }
  };

  return (
    <div>
      <h1>Employer Dashboard</h1>
      <button onClick={() => navigate('/create-job')}>Post a New Job</button>
      <br/><br/>

      {jobs.map((job) => (
        <div key={job.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
          <h3>{job.title}</h3>
          <p>Location: {job.location}</p>
          
          <button onClick={() => viewApplicants(job.id)}>View Applicants</button>
          <button onClick={() => handleDelete(job.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete Job</button>

          {/* Show Applicants if they exist in state */}
          {applicants[job.id] && (
            <div style={{ marginTop: '10px', backgroundColor: '#f0f0f0', padding: '5px' }}>
              <h4>Applicants:</h4>
              <ul>
                {applicants[job.id].length === 0 && <li>No applicants yet.</li>}
                {applicants[job.id].map((app) => (
                  <li key={app.id}>
                    {app.candidate.name} ({app.candidate.email}) - Status: {app.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}