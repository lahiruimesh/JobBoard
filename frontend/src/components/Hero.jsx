import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://tse3.mm.bing.net/th/id/OIP.Ldeo4j8bkupVbZns-CqIxAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" 
          alt="Automobile Workshop" 
          className="w-full h-full object-cover opacity-50" 
        />
        {/* Dark Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* --- SPOTLIGHT EFFECTS (Centered) --- */}
      {/* Top Center Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-amber-600/30 to-transparent blur-3xl pointer-events-none z-0"></div>
      
      {/* Central Glow Ball */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 mt-6 max-w-4xl mx-auto px-4 text-center">
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
          Unlock Your Potential <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            Find the Perfect Job
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Explore thousands of opportunities across every industry. Connect with top employers, 
          showcase your skills, and take the next big step in your career journey today.</p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/register" 
            className="px-8 py-3 bg-[#ff6b35] text-white rounded-full font-bold text-lg hover:bg-[#ff8555] transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1"
          >
            Get Started
          </Link>
          
          <Link 
            to="/create-job" 
            className="px-8 py-3 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Post a Job
          </Link>
        </div>

      </div>
    </div>
  );
}