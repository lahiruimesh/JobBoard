import { useNavigate } from 'react-router-dom';

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>
          <h2>{job.title}</h2>
          <p>{job.employer?.name || "Unknown Company"}</p>
        </div>
        <span>
          {job.job_type || "Full Time"}
        </span>
      </div>

      <div>
        <p>{job.location || "Remote"}</p>
      </div>

      <p>
        {job.description}
      </p>
      <div className="flex gap-2 mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded">
            View Details
        </button>
        
        {/* New Apply Button */}
        <button 
            onClick={() => navigate(`/apply/${job.id}`)}
            className="bg-green-600 text-white py-2 px-4 rounded"
        >
            Apply Now
        </button>
      </div>
    </div>
  );
}