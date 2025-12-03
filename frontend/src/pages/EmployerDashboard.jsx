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
    <div className="min-h-screen bg-[#0a0e1a] py-12 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Employer Dashboard</h1>
          <button 
            onClick={() => navigate('/create-job')}
            className="bg-[#ff6b35] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition"
          >
            Post a New Job
          </button>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-700 p-6 rounded-lg bg-[#1a1f2e]">
              <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
              <p className="text-gray-300 mb-4">Location: {job.location}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => viewApplicants(job.id)}
                  className="bg-[#ff6b35] text-white px-4 py-2 rounded hover:bg-[#ff8555] transition"
                >
                  View Applicants
                </button>
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="bg-transparent text-white border border-gray-600 px-4 py-2 rounded hover:border-red-500 hover:text-red-500 transition"
                >
                  Delete Job
                </button>
              </div>

              {/* Show Applicants if they exist in state */}
              {applicants[job.id] && (
                <div className="mt-4 bg-[#0a0e1a] border border-gray-700 p-4 rounded">
                  <h4 className="font-bold text-[#ff6b35] mb-2">Applicants:</h4>
                  <ul className="list-disc list-inside">
                    {applicants[job.id].length === 0 && <li className="text-gray-400">No applicants yet.</li>}
                    {applicants[job.id].map((app) => (
                      <li key={app.id} className="text-gray-300">
                        {app.candidate.name} ({app.candidate.email}) - Status: {app.status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}