import { useNavigate } from 'react-router-dom';

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a1f2e] border border-gray-700 p-6 rounded-lg hover:border-[#ff6b35] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{job.title}</h2>
          <p className="text-gray-400 mt-1">{job.employer?.name || "Unknown Company"}</p>
        </div>
        <span className="bg-[#ff6b35]/20 text-[#ff6b35] px-3 py-1 rounded text-sm font-medium border border-[#ff6b35]/30">
          {job.job_type || "Full Time"}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-gray-400">{job.location || "Remote"}</p>
      </div>

      <p className="text-gray-300 mb-4">
        {job.description}
      </p>
      <div className="flex gap-2 mt-4">
        <button className="bg-transparent border border-gray-600 text-white py-2 px-4 rounded hover:border-[#ff6b35] hover:text-[#ff6b35] transition">
            View Details
        </button>
        
        
        <button 
            onClick={() => navigate(`/apply/${job.id}`)}
            className="bg-[#ff6b35] text-white py-2 px-4 rounded hover:bg-[#ff8555] transition"
        >
            Apply Now
        </button>
      </div>
    </div>
  );
}