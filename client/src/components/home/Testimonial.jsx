import React from 'react'
import Title from './Title'
import { Quote } from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
    { image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200', name: 'Arjun Mehta', handle: 'Software Engineer @ Razorpay', quote: 'Landed three interviews in a week. The AI suggestions actually understood what I do.' },
    { image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200', name: 'Priya Nair', handle: 'Product Designer @ Swiggy', quote: "Finally a builder that doesn't look generic. The dark templates are gorgeous." },
    { image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60', name: 'Rohan Kapoor', handle: 'Data Analyst @ Flipkart', quote: 'Built my resume in 8 minutes. Got shortlisted at two FAANG companies the same month.' },
    { image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60', name: 'Sara Khan', handle: 'Backend Dev @ Zerodha', quote: 'The live preview is addictive. I kept refining until it felt exactly right.' },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-6 rounded-2xl mx-3 w-80 shrink-0 bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-sm hover:border-purple-400/40 transition-all">
      <Quote className="size-6 text-purple-400 mb-3 opacity-60" />
      <p className="text-sm text-slate-300 leading-relaxed mb-5">{card.quote}</p>
      <div className="flex gap-3 items-center">
        <img className="size-11 rounded-full ring-2 ring-purple-400/30" src={card.image} alt={card.name} />
        <div>
          <p className="text-white font-medium text-sm">{card.name}</p>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div id='testimonials' className='bg-[#0a0820] py-24 scroll-mt-12 relative overflow-hidden'>
      <div className="flex flex-col items-center mb-12 px-4">
        <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-4 py-1.5">
          <span className="uppercase tracking-widest font-medium">Loved by builders</span>
        </div>
        <Title title='Real stories, real offers' description="Don't take our word for it — hear from developers, designers, and analysts who shipped their resumes with us." />
      </div>

      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0a0820] to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] py-5">
          {[...cardsData, ...cardsData].map((card, index) => <CreateCard key={index} card={card} />)}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#0a0820] to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#0a0820] to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-5">
          {[...cardsData, ...cardsData].map((card, index) => <CreateCard key={index} card={card} />)}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#0a0820] to-transparent"></div>
      </div>

      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .marquee-inner { animation: marqueeScroll 30s linear infinite; }
        .marquee-reverse { animation-direction: reverse; }
      `}</style>
    </div>
  )
}

export default Testimonial