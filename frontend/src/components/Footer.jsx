export default function Footer() {
  return (
    <footer className="bg-[#0a0e1a] border-t border-gray-800 text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Auto<span className="text-[#ff6b35]">Jobs</span></h2>
          <p className="text-gray-400 text-sm mt-1">The #1 Job Board for Automobile Industry.</p>
        </div>

        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-[#ff6b35] transition">About Us</a>
          <a href="#" className="hover:text-[#ff6b35] transition">Contact</a>
          <a href="#" className="hover:text-[#ff6b35] transition">Privacy Policy</a>
        </div>

      </div>
      <div className="text-center text-gray-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} AutoJobs Sri Lanka. All rights reserved.
      </div>
    </footer>
  );
}