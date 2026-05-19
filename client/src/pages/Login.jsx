import { Lock, Mail, User2Icon, Eye, EyeOff, Sparkles } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
    const dispatch = useDispatch()
    const query = new URLSearchParams(window.location.search)
    const urlState = query.get('state')
    const [state, setState] = React.useState(urlState || "login")
    const [showPassword, setShowPassword] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-[#0a0820] relative overflow-hidden p-4'>
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />
            <div className="absolute top-1/4 left-1/4 size-96 bg-purple-600 blur-[140px] opacity-30 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 size-80 bg-cyan-500 blur-[120px] opacity-25 rounded-full" />

            <form onSubmit={handleSubmit} className="relative w-full sm:w-[420px] text-center rounded-2xl px-8 py-10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="size-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-[#0a0820] text-xl">R</div>
                    <span className="text-white font-bold text-xl tracking-tight">ResumeForge</span>
                </div>

                <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-500/10">
                    <Sparkles size={12} className="text-cyan-300" />
                    <span className="text-xs text-slate-300">{state === "login" ? "Welcome back" : "Join the forge"}</span>
                </div>

                <h1 className="text-white text-3xl mt-4 font-bold tracking-tight">
                    {state === "login" ? "Sign in to your account" : "Create your account"}
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                    {state === "login" ? "Pick up where you left off" : "Start forging your resume in minutes"}
                </p>

                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white/5 border border-white/10 focus-within:border-purple-400/60 transition h-12 rounded-lg overflow-hidden pl-4 gap-3">
                        <User2Icon size={16} className="text-slate-400" />
                        <input type="text" name="name" placeholder="Full name" className="bg-transparent border-none outline-none ring-0 text-white placeholder:text-slate-500 w-full" value={formData.name} onChange={handleChange} required />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-white/5 border border-white/10 focus-within:border-purple-400/60 transition h-12 rounded-lg overflow-hidden pl-4 gap-3">
                    <Mail size={16} className="text-slate-400" />
                    <input type="email" name="email" placeholder="Email address" className="bg-transparent border-none outline-none ring-0 text-white placeholder:text-slate-500 w-full" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="flex items-center mt-4 w-full bg-white/5 border border-white/10 focus-within:border-purple-400/60 transition h-12 rounded-lg overflow-hidden pl-4 pr-3 gap-3">
                    <Lock size={16} className="text-slate-400" />
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="bg-transparent border-none outline-none ring-0 text-white placeholder:text-slate-500 w-full" value={formData.password} onChange={handleChange} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-cyan-300 transition">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {state === "login" && (
                    <div className="mt-3 text-right">
                        <button type="button" className="text-xs text-cyan-300 hover:text-cyan-200 transition">Forgot password?</button>
                    </div>
                )}

                <button type="submit" className="mt-5 w-full h-12 rounded-lg text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 active:scale-[0.98] transition-all font-medium shadow-lg shadow-purple-500/40">
                    {state === "login" ? "Sign in" : "Create account"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-slate-500 uppercase tracking-widest">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-slate-400 text-sm cursor-pointer">
                    {state === "login" ? "New to ResumeForge?" : "Already have an account?"}{' '}
                    <span className="text-cyan-300 hover:text-cyan-200 transition font-medium">
                        {state === "login" ? "Create an account" : "Sign in"}
                    </span>
                </p>

                <p className="text-[10px] text-slate-600 mt-6">
                    By continuing you agree to our Terms & Privacy Policy
                </p>
            </form>

            <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    * { font-family: 'Space Grotesk', sans-serif; }

    /* Fix browser autofill making inputs white */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px transparent inset !important;
        -webkit-text-fill-color: #ffffff !important;
        caret-color: #ffffff !important;
        transition: background-color 5000s ease-in-out 0s;
        background-clip: content-box !important;
    }
`}</style>
        </div>
    )
}

export default Login