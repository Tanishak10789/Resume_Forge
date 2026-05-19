import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div id='cta' className='bg-[#0a0820] py-24 px-4'>
      <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-violet-700 to-cyan-600" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 40%)'
        }} />

        <div className="relative flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-8 md:px-14 py-16 md:py-20">
          <div className="max-w-lg">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ready to forge your future?</h3>
            <p className="text-purple-100 mt-3 text-base">Join 10,000+ professionals who built standout resumes with ResumeForge. Free forever, no credit card needed.</p>
          </div>
          <Link to="/app" className="flex items-center gap-2 rounded-lg py-4 px-9 bg-white hover:bg-slate-100 transition text-purple-700 font-semibold shadow-xl whitespace-nowrap">
            <span>Start free</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallToAction