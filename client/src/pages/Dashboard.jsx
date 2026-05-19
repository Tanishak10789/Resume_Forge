import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, FileText, Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)

  // ResumeForge themed gradient palette
  const colors = ["#a855f7", "#06b6d4", "#ec4899", "#8b5cf6", "#3b82f6", "#10b981"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => { loadAllResumes() }, [])

  return (
    <div className='min-h-screen bg-[#0a0820] relative overflow-hidden'>
      {/* Background decorations */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed top-1/4 -left-20 size-96 bg-purple-600 blur-[140px] opacity-15 rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 size-96 bg-cyan-500 blur-[140px] opacity-10 rounded-full pointer-events-none" />

      <div className='relative max-w-7xl mx-auto px-4 py-10'>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/30 bg-purple-500/10 mb-3">
            <Sparkles size={12} className="text-cyan-300" />
            <span className="text-xs text-slate-300">Your workspace</span>
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
            Welcome back, <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">{user?.name?.split(' ')[0] || 'Builder'}</span>
          </h1>
          <p className="text-slate-400 mt-2">Pick up where you left off, or forge something new.</p>
        </div>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <button
            onClick={() => setShowCreateResume(true)}
            className='group w-full sm:max-w-xs h-44 flex flex-col items-center justify-center rounded-2xl gap-3 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-purple-400/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
          >
            <div className='size-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30'>
              <PlusIcon className='size-6 text-white' />
            </div>
            <p className='text-sm text-slate-200 group-hover:text-white font-medium transition'>Create New Resume</p>
            <p className='text-xs text-slate-500'>Start from scratch</p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className='group w-full sm:max-w-xs h-44 flex flex-col items-center justify-center rounded-2xl gap-3 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-400/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
          >
            <div className='size-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30'>
              <UploadCloudIcon className='size-6 text-white' />
            </div>
            <p className='text-sm text-slate-200 group-hover:text-white font-medium transition'>Upload Existing</p>
            <p className='text-xs text-slate-500'>AI will parse your PDF</p>
          </button>
        </div>

        {/* My resumes section */}
        {allResumes.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-semibold text-white">Your resumes</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {allResumes.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className='relative h-44 flex flex-col items-center justify-center rounded-2xl gap-2 border group hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden'
                    style={{ background: `linear-gradient(135deg, ${baseColor}15, ${baseColor}05)`, borderColor: baseColor + '40' }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${baseColor}30, transparent 70%)` }}
                    />
                    <FileText className="size-8 group-hover:scale-110 transition-all relative" style={{ color: baseColor }} />
                    <p className='text-sm font-medium px-3 text-center relative line-clamp-2' style={{ color: baseColor }}>
                      {resume.title}
                    </p>
                    <p className='absolute bottom-2 text-[10px] text-slate-500 px-2 text-center'>
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>

                    <div onClick={e => e.stopPropagation()} className='absolute top-2 right-2 group-hover:flex items-center hidden gap-1'>
                      <button
                        onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                        className="size-7 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur text-slate-200 transition"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="size-7 p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/30 backdrop-blur text-slate-200 hover:text-rose-300 transition"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {allResumes.length === 0 && (
          <div className="text-center py-16 rounded-2xl border border-dashed border-white/10">
            <FileText className="size-12 mx-auto text-slate-600 mb-3" />
            <p className="text-slate-400">No resumes yet — create your first one above ✨</p>
          </div>
        )}

        {/* Create modal */}
        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-[#13102e] border border-white/10 shadow-2xl shadow-purple-500/20 rounded-2xl w-full max-w-md p-7'>
              <h2 className='text-xl font-bold text-white mb-1'>Create a new resume</h2>
              <p className='text-sm text-slate-400 mb-5'>Give it a title — you can change this later.</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='e.g. Software Engineer 2026'
                className='w-full px-4 py-3 mb-4 bg-white/5 border border-white/10 focus:border-purple-400 outline-none rounded-lg text-white placeholder:text-slate-500'
                required
              />
              <button className='w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30'>
                Create Resume
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition' onClick={() => { setShowCreateResume(false); setTitle('') }} />
            </div>
          </form>
        )}

        {/* Upload modal */}
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-[#13102e] border border-white/10 shadow-2xl shadow-cyan-500/20 rounded-2xl w-full max-w-md p-7'>
              <h2 className='text-xl font-bold text-white mb-1'>Upload existing resume</h2>
              <p className='text-sm text-slate-400 mb-5'>Drop in your PDF — AI will extract everything.</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='Resume title'
                className='w-full px-4 py-3 mb-4 bg-white/5 border border-white/10 focus:border-cyan-400 outline-none rounded-lg text-white placeholder:text-slate-500'
                required
              />
              <label htmlFor="resume-input" className="block text-sm">
                <div className='flex flex-col items-center justify-center gap-2 border border-dashed border-white/15 hover:border-cyan-400 text-slate-500 hover:text-cyan-300 rounded-lg p-6 my-3 cursor-pointer transition'>
                  {resume ? (
                    <p className='text-cyan-300 font-medium'>{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className='size-12 stroke-1' />
                      <p>Click to upload PDF</p>
                    </>
                  )}
                </div>
              </label>
              <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
              <button disabled={isLoading} className='w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 disabled:opacity-60'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4' />}
                {isLoading ? 'Processing...' : 'Upload Resume'}
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition' onClick={() => { setShowUploadResume(false); setTitle('') }} />
            </div>
          </form>
        )}

        {/* Edit modal */}
        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-[#13102e] border border-white/10 shadow-2xl shadow-purple-500/20 rounded-2xl w-full max-w-md p-7'>
              <h2 className='text-xl font-bold text-white mb-1'>Rename resume</h2>
              <p className='text-sm text-slate-400 mb-5'>Update the title for this resume.</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='New title'
                className='w-full px-4 py-3 mb-4 bg-white/5 border border-white/10 focus:border-purple-400 outline-none rounded-lg text-white placeholder:text-slate-500'
                required
              />
              <button className='w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30'>
                Save changes
              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition' onClick={() => { setEditResumeId(''); setTitle('') }} />
            </div>
          </form>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 30px transparent inset !important;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  )
}

export default Dashboard