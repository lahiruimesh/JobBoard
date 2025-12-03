import { useEffect, useState } from 'react';
import api from '../services/api'; 
import JobCard from '../components/JobCard';

export default function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      
      setJobs(response.data.data); 
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Latest Jobs</h1>

      {/* Grid Layout for Jobs */}
      <div>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}