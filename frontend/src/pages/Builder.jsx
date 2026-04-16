import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

// Builder sections
import PersonalInfo from '../components/builder/PersonalInfo';
import Education from '../components/builder/Education';
import Experience from '../components/builder/Experience';
import Skills from '../components/builder/Skills';
import Projects from '../components/builder/Projects';
import Certifications from '../components/builder/Certifications';
import ThemeCustomizer from '../components/builder/ThemeCustomizer';
import SectionManager from '../components/builder/SectionManager';
import ResumeScore from '../components/ResumeScore';
import LivePreview from '../components/LivePreview';

import { generateSummary, generateBullets } from '../utils/resumeGenerator';
import { getRoleNames, getRoleData } from '../utils/jobRoles';
import { demoData } from '../utils/demoData';

import {
  FiSave, FiDownload, FiArrowLeft, FiPrinter, FiCopy, FiShare2,
  FiZap, FiEye, FiEyeOff, FiMic, FiMicOff, FiClock, FiSmartphone,
  FiSettings, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentResume, setCurrentResume, updateResume, autoSave,
    saveVersion, togglePublic, copyToClipboard, defaultResume, updateCurrentLocal
  } = useResume();
  
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [showPreview, setShowPreview] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceField, setVoiceField] = useState(null);

  // Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await api.get(`/api/resume/${id}`);
        setCurrentResume(data);
      } catch (error) {
        toast.error('Failed to load resume');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResume();
  }, [id]);

  // Update local state and trigger auto-save
  const handleUpdate = useCallback((field, value) => {
    const updated = { ...currentResume, [field]: value };
    updateCurrentLocal(updated);
    if (id) autoSave(id, { [field]: value });
  }, [currentResume, id, autoSave, updateCurrentLocal]);

  // Save resume
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateResume(id, currentResume);
      toast.success('Resume saved!');
    } catch (e) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // Download PDF
  const handleDownload = async () => {
    const element = document.getElementById('resume-preview-content');
    if (!element) {
      toast.error('Preview not ready');
      return;
    }
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: 0,
        filename: `${currentResume.personalInfo?.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      await html2pdf().set(opt).from(element).save();
      toast.success('PDF downloaded!');
    } catch (e) {
      toast.error('PDF export failed');
      console.error(e);
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Quick fill demo data
  const handleQuickFill = () => {
    const updated = { ...currentResume, ...demoData };
    setCurrentResume(updated);
    toast.success('Demo data filled!');
  };

  // One-click generate
  const handleAutoGenerate = () => {
    const role = currentResume.personalInfo?.fullName ? 'Software Developer' : 'Software Developer';
    const roleData = getRoleData(role);
    const skills = roleData.skills.slice(0, 8);
    
    const summary = generateSummary(
      currentResume.personalInfo?.fullName || 'Professional',
      role,
      skills
    );
    
    const updated = {
      ...currentResume,
      personalInfo: {
        ...currentResume.personalInfo,
        summary
      },
      skills: skills.map(s => ({ name: s, level: 'Advanced' }))
    };
    
    // Generate bullets for experience
    if (updated.experience?.length > 0) {
      updated.experience = updated.experience.map(exp => ({
        ...exp,
        bullets: exp.bullets?.length > 0 ? exp.bullets : generateBullets(role, skills)
      }));
    }
    
    setCurrentResume(updated);
    toast.success('Resume auto-generated!');
  };

  // Job role based generation
  const handleRoleGenerate = (roleName) => {
    const roleData = getRoleData(roleName);
    const summary = generateSummary(
      currentResume.personalInfo?.fullName || 'Professional',
      roleName,
      roleData.skills
    );
    
    const updated = {
      ...currentResume,
      personalInfo: { ...currentResume.personalInfo, summary },
      skills: roleData.skills.map(s => ({ name: s, level: 'Advanced' }))
    };
    
    setCurrentResume(updated);
    toast.success(`Generated for ${roleName}`);
  };

  // Voice input (Web Speech API)
  const startVoiceInput = (field) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
      setVoiceField(field);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (field.includes('.')) {
        const [section, key] = field.split('.');
        handleUpdate(section, { ...currentResume[section], [key]: transcript });
      }
      toast.success('Voice captured!');
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice input failed');
    };
    
    recognition.onend = () => {
      setIsListening(false);
      setVoiceField(null);
    };
    
    recognition.start();
  };

  const sections = [
    { id: 'personalInfo', label: 'Personal Info', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'theme', label: 'Theme', icon: '🎨' },
    { id: 'sections', label: 'Sections', icon: '📋' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-bg dark:bg-bg-dark">
      {/* Left Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${sidebarCollapsed ? 'w-16' : 'w-72'} border-r border-border dark:border-border-dark bg-white dark:bg-surface-dark flex flex-col transition-all duration-300 no-print fixed left-0 top-0 bottom-0 z-30`}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-border dark:border-border-dark flex items-center justify-between">
          {!sidebarCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
              <FiArrowLeft className="w-4 h-4" />
              Back
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            {sidebarCollapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Section navigation */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sections.filter(s => !currentResume.hiddenSections?.includes(s.id)).map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              {!sidebarCollapsed && <span>{section.label}</span>}
            </button>
          ))}
        </div>

        {/* Sidebar footer actions */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-border dark:border-border-dark space-y-2">
            <button onClick={handleAutoGenerate} className="btn-primary w-full justify-center text-xs py-2">
              <FiZap className="w-3.5 h-3.5" />
              Auto Generate
            </button>
            <button onClick={handleQuickFill} className="btn-secondary w-full justify-center text-xs py-2">
              Quick Fill Demo
            </button>

            {/* Job role selector */}
            <select
              onChange={(e) => e.target.value && handleRoleGenerate(e.target.value)}
              className="input-field text-xs py-2"
              defaultValue=""
            >
              <option value="">Select Job Role...</option>
              {getRoleNames().map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 flex ${sidebarCollapsed ? 'ml-16' : 'ml-72'} transition-all duration-300`}>
        {/* Editor Panel */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col transition-all duration-300`}>
          {/* Top toolbar */}
          <div className="h-14 border-b border-border dark:border-border-dark bg-white dark:bg-surface-dark flex items-center justify-between px-4 no-print">
            <div className="flex items-center gap-2">
              <input
                value={currentResume.title || ''}
                onChange={(e) => handleUpdate('title', e.target.value)}
                className="text-sm font-semibold bg-transparent border-none outline-none text-text dark:text-text-dark"
                placeholder="Resume Title"
              />
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => startVoiceInput('personalInfo.summary')} className={`btn-ghost text-xs ${isListening ? 'text-danger' : ''}`} title="Voice Input">
                {isListening ? <FiMicOff className="w-4 h-4" /> : <FiMic className="w-4 h-4" />}
              </button>
              <button onClick={() => setMobilePreview(!mobilePreview)} className="btn-ghost text-xs" title="Mobile Preview">
                <FiSmartphone className="w-4 h-4" />
              </button>
              <button onClick={() => copyToClipboard(currentResume)} className="btn-ghost text-xs" title="Copy to Clipboard">
                <FiCopy className="w-4 h-4" />
              </button>
              <button onClick={() => togglePublic(id)} className="btn-ghost text-xs" title={currentResume.isPublic ? 'Make Private' : 'Share Public Link'}>
                <FiShare2 className="w-4 h-4" />
              </button>
              <button onClick={() => saveVersion(id)} className="btn-ghost text-xs" title="Save Version">
                <FiClock className="w-4 h-4" />
              </button>
              <button onClick={() => setShowPreview(!showPreview)} className="btn-ghost text-xs">
                {showPreview ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
              <div className="w-px h-6 bg-border dark:bg-border-dark mx-1" />
              <button onClick={handleSave} className="btn-ghost text-xs text-primary" disabled={saving}>
                <FiSave className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handlePrint} className="btn-ghost text-xs">
                <FiPrinter className="w-4 h-4" />
              </button>
              <button onClick={handleDownload} className="btn-primary text-xs py-1.5 px-3">
                <FiDownload className="w-3.5 h-3.5" />
                PDF
              </button>
            </div>
          </div>

          {/* Section Editor */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'personalInfo' && (
              <PersonalInfo
                data={currentResume.personalInfo || {}}
                onChange={(data) => handleUpdate('personalInfo', data)}
                onVoice={startVoiceInput}
                isListening={isListening}
              />
            )}
            {activeSection === 'education' && (
              <Education
                data={currentResume.education || []}
                onChange={(data) => handleUpdate('education', data)}
              />
            )}
            {activeSection === 'experience' && (
              <Experience
                data={currentResume.experience || []}
                onChange={(data) => handleUpdate('experience', data)}
                skills={currentResume.skills?.map(s => s.name) || []}
              />
            )}
            {activeSection === 'skills' && (
              <Skills
                data={currentResume.skills || []}
                onChange={(data) => handleUpdate('skills', data)}
              />
            )}
            {activeSection === 'projects' && (
              <Projects
                data={currentResume.projects || []}
                onChange={(data) => handleUpdate('projects', data)}
              />
            )}
            {activeSection === 'certifications' && (
              <Certifications
                data={currentResume.certifications || []}
                onChange={(data) => handleUpdate('certifications', data)}
              />
            )}
            {activeSection === 'theme' && (
              <ThemeCustomizer
                settings={currentResume.themeSettings || {}}
                templateId={currentResume.templateId}
                onChange={(settings) => handleUpdate('themeSettings', settings)}
                onTemplateChange={(templateId) => handleUpdate('templateId', templateId)}
              />
            )}
            {activeSection === 'sections' && (
              <SectionManager
                sectionOrder={currentResume.sectionOrder || defaultResume.sectionOrder}
                hiddenSections={currentResume.hiddenSections || []}
                onOrderChange={(order) => handleUpdate('sectionOrder', order)}
                onHiddenChange={(hidden) => handleUpdate('hiddenSections', hidden)}
                versions={currentResume.versions || []}
                onRestore={(vIndex) => {
                  // handled by context
                }}
              />
            )}

            {/* Resume Score */}
            <div className="mt-8">
              <ResumeScore resumeData={currentResume} />
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l border-border dark:border-border-dark bg-gray-100 dark:bg-gray-900 flex flex-col no-print">
            <div className="h-14 border-b border-border dark:border-border-dark bg-white dark:bg-surface-dark flex items-center justify-center px-4">
              <span className="text-sm font-medium text-text-muted">Live Preview</span>
            </div>
            <div className={`flex-1 overflow-y-auto p-6 flex justify-center ${mobilePreview ? 'items-start' : ''}`}>
              <div className={`${mobilePreview ? 'w-[375px] border-4 border-gray-800 rounded-3xl overflow-hidden' : 'w-full max-w-[816px]'}`}>
                <LivePreview resumeData={currentResume} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Builder;
