import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const res = await api.get('/my-applications'); // We defined this in Laravel
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-12 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">My Applications</h1>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-[#1a1f2e]">
              <tr>
                <th className="px-4 py-3 text-left text-[#ff6b35] font-semibold">Job Title</th>
                <th className="px-4 py-3 text-left text-[#ff6b35] font-semibold">Company</th>
                <th className="px-4 py-3 text-left text-[#ff6b35] font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-[#ff6b35] font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-[#ff6b35] font-semibold">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-gray-700 hover:bg-[#1a1f2e] transition">
                  <td className="px-4 py-3 text-white">{app.job?.title}</td>
                  <td className="px-4 py-3 text-gray-300">{app.job?.employer?.name}</td>
                  <td className="px-4 py-3 text-gray-300">{app.job?.location}</td>
                  <td className="px-4 py-3 text-gray-300">{app.status}</td>
                  <td className="px-4 py-3 text-gray-300">{new Date(app.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}