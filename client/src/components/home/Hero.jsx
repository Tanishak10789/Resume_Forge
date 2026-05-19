import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    { name: 'Google',    src: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg' },
    { name: 'Microsoft', src: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg' },
    { name: 'Amazon',    src: 'https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg' },
    { name: 'Netflix',   src: 'https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg' },
    { name: 'Spotify',   src: 'https://www.vectorlogo.zone/logos/spotify/spotify-ar21.svg' },
    { name: 'Slack',     src: 'https://www.vectorlogo.zone/logos/slack/slack-ar21.svg' },
]

  return (
    <>
      <div className="min-h-screen pb-20 bg-[#0a0820] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 size-96 bg-purple-600 blur-[140px] opacity-30 rounded-full" />
        <div className="absolute top-40 right-1/4 size-80 bg-cyan-500 blur-[120px] opacity-25 rounded-full" />

        {/* Navbar */}
        <nav className="relative z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="#" className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-[#0a0820] text-lg">R</div>
            <span className="text-white font-bold text-lg tracking-tight">ResumeForge</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-slate-300">
            <a href="#" className="hover:text-cyan-300 transition">Home</a>
            <a href="#features" className="hover:text-cyan-300 transition">Features</a>
            <a href="#testimonials" className="hover:text-cyan-300 transition">Reviews</a>
            <a href="#cta" className="hover:text-cyan-300 transition">Contact</a>
          </div>

          <div className="flex gap-2">
            <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 active:scale-95 transition-all rounded-lg text-white font-medium shadow-lg shadow-purple-500/30" hidden={user}>
              Start Building
            </Link>
            <Link to='/app?state=login' className="hidden md:block px-6 py-2 border border-purple-400/40 active:scale-95 hover:bg-purple-500/10 transition-all rounded-lg text-slate-200" hidden={user}>
              Login
            </Link>
            <Link to='/app' className='hidden md:block px-8 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 active:scale-95 transition-all rounded-lg text-white font-medium shadow-lg shadow-purple-500/30' hidden={!user}>
              Dashboard
            </Link>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h16M4 12h16M4 19h16" /></svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[100] bg-[#0a0820]/95 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <a href="#" className="text-slate-200 hover:text-cyan-300">Home</a>
          <a href="#features" className="text-slate-200 hover:text-cyan-300">Features</a>
          <a href="#testimonials" className="text-slate-200 hover:text-cyan-300">Reviews</a>
          <a href="#cta" className="text-slate-200 hover:text-cyan-300">Contact</a>
          <button onClick={() => setMenuOpen(false)} className="aspect-square size-10 p-1 bg-purple-600 hover:bg-purple-700 transition text-white rounded-md flex items-center justify-center">X</button>
        </div>

        {/* Hero Content */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40">
          <div className="flex items-center gap-2 mt-20 px-4 py-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-slate-200">Powered by next-gen AI</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-5xl text-center mt-6 md:leading-[1.1] text-white tracking-tight">
            Forge resumes that{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
              recruiters can't ignore.
            </span>
          </h1>

          <p className="max-w-xl text-center text-base my-7 text-slate-400">
            Build pixel-perfect, ATS-optimized resumes in minutes. AI-driven writing, real-time previews, instant exports — everything devs and creators need to stand out.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to='/app' className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg px-9 h-12 flex items-center transition-all shadow-lg shadow-purple-500/40 font-medium">
              Start Forging
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
            <button className="flex items-center gap-2 border border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/5 transition rounded-lg px-7 h-12 text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
              <span>Watch demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-10 flex-wrap justify-center">
            <div className="text-center"><p className="text-2xl font-bold text-white">10k+</p><p className="text-xs text-slate-500">Resumes built</p></div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center"><p className="text-2xl font-bold text-white">98%</p><p className="text-xs text-slate-500">ATS pass rate</p></div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center"><p className="text-2xl font-bold text-white">4.9★</p><p className="text-xs text-slate-500">User rating</p></div>
          </div>

          <p className="py-6 text-slate-500 mt-14 text-xs uppercase tracking-widest">Trusted by professionals at</p>
         <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 max-w-4xl w-full mx-auto py-4">
  {logos.map((logo, index) => (
    <img
      key={index}
      src={logo.src}
      alt={logo.name}
      className="h-8 w-auto opacity-50 hover:opacity-90 transition brightness-0 invert"
    />
  ))}
</div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </>
  )
}

export default Hero