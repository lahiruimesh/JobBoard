import Hero from '../components/Hero';
import JobFeed from './JobFeed'; // Reusing your existing JobFeed logic

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Hero />
      
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Latest Opportunities</h2>
        <JobFeed /> 
      </div>
    </div>
  );
}