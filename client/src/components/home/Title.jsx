import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className='text-center mt-6'>
      <h2 className='text-3xl sm:text-5xl font-bold text-white tracking-tight'>{title}</h2>
      <p className='max-w-2xl mt-4 text-slate-400 mx-auto'>{description}</p>
    </div>
  )
}

export default Title