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

  if (loading) return <div className="text-center py-10 text-white">Loading jobs...</div>;
  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;

  return (
    <div>
      {/* Grid Layout for Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No jobs found.</p>
        )}
      </div>
    </div>
  );
}