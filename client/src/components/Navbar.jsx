import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <div className='bg-[#0a0820] border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 transition-all'>
        <Link to='/' className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-[#0a0820] text-lg">R</div>
          <span className="text-white font-bold text-lg tracking-tight">ResumeForge</span>
        </Link>

        <div className='flex items-center gap-4 text-sm'>
          <div className='max-sm:hidden flex items-center gap-2'>
            <div className='size-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-xs uppercase'>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <p className='text-slate-300'>Hi, <span className="text-white font-medium">{user?.name}</span></p>
          </div>
          <button
            onClick={logoutUser}
            className='bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 text-slate-300 hover:text-white px-5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-2'
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </div>
  )
}

export default Navbar