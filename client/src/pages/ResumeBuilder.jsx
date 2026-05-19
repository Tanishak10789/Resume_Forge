import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Save, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '', title: '', personal_info: {}, professional_summary: "",
    experience: [], education: [], project: [], skills: [],
    template: "classic", accent_color: "#3B82F6", public: false,
  })

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) { console.log(error.message) }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => { loadExistingResume() }, [])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) { console.error("Error saving resume:", error) }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    } else { alert('Share not supported on this browser.') }
  }

  const downloadResume = () => { window.print(); }

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) { console.error("Error saving resume:", error) }
  }

  const progressPct = (activeSectionIndex / (sections.length - 1)) * 100

  return (
    <div className='min-h-screen bg-[#0a0820] relative overflow-hidden'>
      {/* Background decorations */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed top-1/4 -left-20 size-96 bg-purple-600 blur-[140px] opacity-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 size-96 bg-cyan-500 blur-[140px] opacity-10 rounded-full pointer-events-none" />

{/* Top bar with title */}
<div className="relative max-w-7xl mx-auto px-4 pt-6 pb-5 flex items-center justify-between flex-wrap gap-3">
  <div className="flex items-center gap-4">
    <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-400 hover:text-white transition group'>
      <ArrowLeftIcon className="size-4 group-hover:-translate-x-0.5 transition" />
      <span className="text-sm">Dashboard</span>
    </Link>
    <div className="h-5 w-px bg-white/10" />
    <div className="flex items-center gap-2">
      <Sparkles size={13} className="text-cyan-400" />
      <span className="text-sm text-white font-medium truncate max-w-[200px]">
        {resumeData.title || 'Untitled Resume'}
      </span>
    </div>
  </div>

  <div className="flex items-center gap-2">
    {resumeData.public && (
      <button onClick={handleShare} className='flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-blue-500/10 border border-blue-400/30 text-blue-300 hover:bg-blue-500/20 transition'>
        <Share2Icon className='size-3.5' /> Share
      </button>
    )}
    <button onClick={changeResumeVisibility} className='flex items-center gap-1.5 px-4 py-2 text-xs rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 transition'>
      {resumeData.public ? <EyeIcon className="size-3.5" /> : <EyeOffIcon className="size-3.5" />}
      {resumeData.public ? 'Public' : 'Private'}
    </button>
    <button onClick={downloadResume} className='flex items-center gap-1.5 px-5 py-2 text-xs rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-medium shadow-lg shadow-purple-500/30 transition'>
      <DownloadIcon className='size-3.5' /> Download
    </button>
  </div>
</div>

      <div className='relative max-w-7xl mx-auto px-4 pb-12'>
        <div className='grid lg:grid-cols-12 gap-6'>

          {/* Left Panel - Form */}
          <div className='lg:col-span-5'>
            <div className='relative rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl shadow-purple-500/5 overflow-hidden'>

              {/* Progress bar */}
              <div className="h-1 bg-white/5 relative">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-500 shadow-lg shadow-purple-500/50"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Section pills (visual progress) */}
              <div className="px-6 pt-5 pb-4 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
  {sections.map((section, idx) => {
                  const Icon = section.icon
                  const isActive = idx === activeSectionIndex
                  const isDone = idx < activeSectionIndex
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30'
                          : isDone
                            ? 'bg-purple-500/10 text-purple-300 border border-purple-400/30'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={13} />
                      <span className="hidden sm:inline">{section.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Toolbar (template + color + nav) */}
              <div className="px-6 py-4 border-t border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                    disabled={activeSectionIndex === 0}
                    className='flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-white/5 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent'
                  >
                    <ChevronLeft className="size-4" /> Prev
                  </button>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className='flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-cyan-300 hover:bg-cyan-500/10 transition disabled:opacity-30 disabled:hover:bg-transparent'
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form content (white card inside, since form components use light styling) */}
              <div className="p-3">
  <div className='bg-white rounded-xl p-6 space-y-6'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                  )}
                </div>
              </div>

              {/* Save button */}
             <div className="px-6 py-5 border-t border-white/10 flex items-center justify-between gap-3 bg-white/[0.02]">
  <p className="text-xs text-slate-500">
    Step <span className="text-white font-medium">{activeSectionIndex + 1}</span> of {sections.length}
  </p>
  <button
    onClick={() => { toast.promise(saveResume(), { loading: 'Saving...', success: 'Saved!', error: 'Failed' }) }}
    className='flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg px-6 py-2.5 text-sm font-medium shadow-lg shadow-purple-500/30 transition active:scale-95'
  >
    <Save size={14} /> Save Changes
  </button>
</div>
            </div>
          </div>

          {/* Right Panel - Preview (keep white for print) */}
          <div className='lg:col-span-7'>
            <div className='rounded-2xl bg-white/95 border border-white/10 shadow-2xl shadow-purple-500/10 overflow-hidden'>
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  )
}

export default ResumeBuilder