import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-[#070518] border-t border-white/5 px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center lg:justify-between gap-10 md:gap-16">
          <div className="max-w-sm">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="size-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-[#0a0820] text-lg">R</div>
              <span className="text-white font-bold text-lg tracking-tight">ResumeForge</span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">The modern resume builder for ambitious professionals. Built with AI, designed for impact.</p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" /></svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Templates</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">AI Engine</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Changelog</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Resources</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Docs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Community</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Career tips</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-300 transition">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">© 2026 ResumeForge. All rights reserved.</p>
          <p className="text-xs text-slate-500">Crafted by Lakshay · Built with React + Tailwind</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </>
  )
}

export default Footer