import React from 'react'
import Title from './Title';
import { Zap, Brain, ShieldCheck, Download, Layers, Wand2 } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: <Brain className="size-6" />, title: 'AI Content Engine', desc: 'Smart suggestions for bullet points, summaries, and skills tailored to your role.', gradient: 'from-purple-500 to-fuchsia-500' },
    { icon: <Layers className="size-6" />, title: 'Modular Templates', desc: 'Switch layouts instantly. Every template is ATS-friendly and recruiter-tested.', gradient: 'from-cyan-500 to-blue-500' },
    { icon: <Wand2 className="size-6" />, title: 'Live Editing', desc: 'See changes update in real-time as you type. No reloads, no friction.', gradient: 'from-pink-500 to-rose-500' },
    { icon: <ShieldCheck className="size-6" />, title: 'Privacy First', desc: 'Your data stays yours. Encrypted storage and zero tracking, ever.', gradient: 'from-emerald-500 to-teal-500' },
    { icon: <Download className="size-6" />, title: 'Instant Export', desc: 'Download crisp PDFs or share a public link. Print-perfect every time.', gradient: 'from-amber-500 to-orange-500' },
    { icon: <Zap className="size-6" />, title: 'Built for Speed', desc: 'From blank page to polished resume in under five minutes. Guaranteed.', gradient: 'from-violet-500 to-indigo-500' },
  ];

  return (
    <div id='features' className='py-24 bg-[#0a0820] scroll-mt-12 relative overflow-hidden'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-purple-600/10 blur-[150px] rounded-full" />

      <div className="relative flex flex-col items-center px-4 md:px-16 lg:px-24">
        <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-4 py-1.5">
          <Zap size={12} />
          <span className="uppercase tracking-widest font-medium">Features</span>
        </div>

        <Title title="Everything you need, nothing you don't" description='A complete toolkit engineered for modern job seekers. Smart, fast, and pixel-perfect.' />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl w-full">
          {features.map((f, i) => (
            <div key={i} className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-purple-400/40 transition-all hover:-translate-y-1">
              <div className={`size-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-5 shadow-lg`}>{f.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </div>
  )
}

export default Features