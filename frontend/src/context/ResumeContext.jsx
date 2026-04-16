import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ResumeContext = createContext(null);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};

const defaultResume = {
  title: 'Untitled Resume',
  personalInfo: {
    fullName: '', email: '', phone: '', location: '',
    linkedin: '', website: '', summary: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  templateId: 'minimal-classic',
  themeSettings: {
    primaryColor: '#6366f1',
    secondaryColor: '#4f46e5',
    fontFamily: 'Inter',
    fontSize: 'medium',
    spacing: 'normal'
  },
  sectionOrder: ['personalInfo', 'education', 'experience', 'skills', 'projects', 'certifications'],
  hiddenSections: []
};

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState({ ...defaultResume });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState('en');
  const autoSaveTimer = useRef(null);

  // Fetch all resumes
  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/resume');
      setResumes(data);
    } catch (error) {
      console.error('Fetch resumes error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create resume
  const createResume = useCallback(async (resumeData = {}) => {
    try {
      const { data } = await api.post('/api/resume', { ...defaultResume, ...resumeData });
      setResumes(prev => [data, ...prev]);
      setCurrentResume(data);
      toast.success('Resume created!');
      return data;
    } catch (error) {
      toast.error('Failed to create resume');
      throw error;
    }
  }, []);

  // Update resume
  const updateResume = useCallback(async (id, updates) => {
    setSaving(true);
    try {
      const { data } = await api.put(`/api/resume/${id}`, updates);
      setResumes(prev => prev.map(r => r._id === id ? data : r));
      setCurrentResume(data);
      return data;
    } catch (error) {
      toast.error('Failed to save resume');
      throw error;
    } finally {
      setSaving(false);
    }
  }, []);

  // Auto-save with debounce
  const autoSave = useCallback((id, data) => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        await updateResume(id, data);
      } catch (e) {
        // Save to localStorage as backup
        localStorage.setItem(`resume_draft_${id}`, JSON.stringify(data));
      }
    }, 2000);
  }, [updateResume]);

  // Delete resume
  const deleteResume = useCallback(async (id) => {
    try {
      await api.delete(`/api/resume/${id}`);
      setResumes(prev => prev.filter(r => r._id !== id));
      toast.success('Resume deleted');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  }, []);

  // Duplicate resume
  const duplicateResume = useCallback(async (id) => {
    try {
      const { data } = await api.post(`/api/resume/${id}/duplicate`);
      setResumes(prev => [data, ...prev]);
      toast.success('Resume duplicated!');
      return data;
    } catch (error) {
      toast.error('Failed to duplicate resume');
    }
  }, []);

  // Save version
  const saveVersion = useCallback(async (id, label = '') => {
    try {
      const { data } = await api.post(`/api/resume/${id}/version`, { label });
      setCurrentResume(data);
      toast.success('Version saved!');
    } catch (error) {
      toast.error('Failed to save version');
    }
  }, []);

  // Restore version
  const restoreVersion = useCallback(async (id, versionIndex) => {
    try {
      const { data } = await api.put(`/api/resume/${id}/restore/${versionIndex}`);
      setCurrentResume(data);
      toast.success('Version restored!');
    } catch (error) {
      toast.error('Failed to restore version');
    }
  }, []);

  // Toggle public
  const togglePublic = useCallback(async (id) => {
    try {
      const { data } = await api.put(`/api/resume/${id}/toggle-public`);
      setCurrentResume(prev => ({ ...prev, isPublic: data.isPublic, publicId: data.publicId }));
      setResumes(prev => prev.map(r => r._id === id ? { ...r, isPublic: data.isPublic, publicId: data.publicId } : r));
      toast.success(data.isPublic ? 'Resume is now public!' : 'Resume is now private');
      return data;
    } catch (error) {
      toast.error('Failed to toggle public status');
    }
  }, []);

  // Update current resume locally (for live preview)
  const updateCurrentLocal = useCallback((updates) => {
    setCurrentResume(prev => ({ ...prev, ...updates }));
  }, []);

  // Save to localStorage for offline support
  const saveDraft = useCallback((data) => {
    localStorage.setItem('resume_draft_offline', JSON.stringify(data));
  }, []);

  const loadDraft = useCallback(() => {
    const draft = localStorage.getItem('resume_draft_offline');
    return draft ? JSON.parse(draft) : null;
  }, []);

  // Copy resume content to clipboard
  const copyToClipboard = useCallback(async (resume) => {
    const pi = resume.personalInfo || {};
    let text = `${pi.fullName}\n${pi.email} | ${pi.phone} | ${pi.location}\n\n`;
    
    if (pi.summary) text += `SUMMARY\n${pi.summary}\n\n`;
    
    if (resume.experience?.length > 0) {
      text += 'EXPERIENCE\n';
      resume.experience.forEach(exp => {
        text += `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n`;
        exp.bullets?.forEach(b => { text += `• ${b}\n`; });
        text += '\n';
      });
    }
    
    if (resume.education?.length > 0) {
      text += 'EDUCATION\n';
      resume.education.forEach(edu => {
        text += `${edu.degree} in ${edu.field} - ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
      });
      text += '\n';
    }
    
    if (resume.skills?.length > 0) {
      text += `SKILLS\n${resume.skills.map(s => s.name).join(', ')}\n\n`;
    }
    
    if (resume.projects?.length > 0) {
      text += 'PROJECTS\n';
      resume.projects.forEach(p => {
        text += `${p.name}: ${p.description}\nTech: ${p.technologies}\n\n`;
      });
    }
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Resume copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumes, currentResume, loading, saving, language,
      setLanguage, setCurrentResume, fetchResumes, createResume,
      updateResume, autoSave, deleteResume, duplicateResume,
      saveVersion, restoreVersion, togglePublic,
      updateCurrentLocal, saveDraft, loadDraft, copyToClipboard,
      defaultResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
