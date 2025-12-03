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
    <div>
      <h1>My Applications</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.job?.title}</td>
              <td>{app.job?.employer?.name}</td>
              <td>{app.job?.location}</td>
              <td>{app.status}</td> {/* pending, accepted, etc. */}
              <td>{new Date(app.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}