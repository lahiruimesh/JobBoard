import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ApplyJob() {
  const { jobId } = useParams(); 
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${jobId}`)
       .then(res => setJob(res.data))
       .catch(err => alert("Error loading job"));
  }, [jobId]);

  const handleApply = async () => {
    try {
      await api.post('/applications', { job_id: jobId });
      alert("Applied Successfully!");
      navigate('/dashboard/candidate');
    } catch (error) {
      alert(error.response?.data?.message || "Application Failed. (You might have already applied)");
    }
  };

  if (!job) return <div className="text-center py-10 text-white pt-24">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-12 px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-[#1a1f2e] p-8 rounded-lg border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">Apply for: {job.title}</h1>
        <p className="text-lg text-gray-300 mb-2"><strong className="text-[#ff6b35]">Company:</strong> {job.employer?.name}</p>
        <p className="text-gray-300 mb-4"><strong className="text-[#ff6b35]">Description:</strong> {job.description}</p>
        <hr className="border-gray-700 mb-4" />
        <p className="text-gray-300 mb-6">Are you sure you want to apply for this position?</p>
        
        <div className="flex gap-4">
          <button 
            onClick={handleApply}
            className="bg-[#ff6b35] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition"
          >
            Confirm & Apply
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-transparent text-white px-6 py-3 rounded-lg border-2 border-gray-600 font-bold hover:border-[#ff6b35] hover:text-[#ff6b35] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}