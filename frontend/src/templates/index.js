// Template Registry - exports all 20 templates with metadata
import MinimalClassic from './MinimalClassic';
import MinimalModern from './MinimalModern';
import MinimalElegant from './MinimalElegant';
import MinimalSleek from './MinimalSleek';
import MinimalFresh from './MinimalFresh';
import ProfessionalExecutive from './ProfessionalExecutive';
import ProfessionalCorporate from './ProfessionalCorporate';
import ProfessionalTimeline from './ProfessionalTimeline';
import ProfessionalSidebar from './ProfessionalSidebar';
import ProfessionalBold from './ProfessionalBold';
import CreativeColorful from './CreativeColorful';
import CreativeDesigner from './CreativeDesigner';
import CreativePortfolio from './CreativePortfolio';
import CreativeModern from './CreativeModern';
import CreativeArtistic from './CreativeArtistic';
import ATSClassic from './ATSClassic';
import ATSSimple from './ATSSimple';
import ATSClean from './ATSClean';
import DarkProfessional from './DarkProfessional';
import DarkCreative from './DarkCreative';

// Template metadata list
export const templateList = [
  { id: 'minimal-classic', name: 'Minimal Classic', component: MinimalClassic, category: 'Minimal', icon: '📄', preview: '#6366f1' },
  { id: 'minimal-modern', name: 'Minimal Modern', component: MinimalModern, category: 'Minimal', icon: '✨', preview: '#8b5cf6' },
  { id: 'minimal-elegant', name: 'Minimal Elegant', component: MinimalElegant, category: 'Minimal', icon: '🌸', preview: '#ec4899' },
  { id: 'minimal-sleek', name: 'Minimal Sleek', component: MinimalSleek, category: 'Minimal', icon: '🔷', preview: '#06b6d4' },
  { id: 'minimal-fresh', name: 'Minimal Fresh', component: MinimalFresh, category: 'Minimal', icon: '🍃', preview: '#10b981' },
  { id: 'professional-executive', name: 'Executive', component: ProfessionalExecutive, category: 'Professional', icon: '👔', preview: '#1e293b' },
  { id: 'professional-corporate', name: 'Corporate', component: ProfessionalCorporate, category: 'Professional', icon: '🏢', preview: '#2563eb' },
  { id: 'professional-timeline', name: 'Timeline', component: ProfessionalTimeline, category: 'Professional', icon: '📊', preview: '#7c3aed' },
  { id: 'professional-sidebar', name: 'Sidebar', component: ProfessionalSidebar, category: 'Professional', icon: '📐', preview: '#0f172a' },
  { id: 'professional-bold', name: 'Bold', component: ProfessionalBold, category: 'Professional', icon: '💪', preview: '#dc2626' },
  { id: 'creative-colorful', name: 'Colorful', component: CreativeColorful, category: 'Creative', icon: '🎨', preview: '#f59e0b' },
  { id: 'creative-designer', name: 'Designer', component: CreativeDesigner, category: 'Creative', icon: '🖌️', preview: '#d946ef' },
  { id: 'creative-portfolio', name: 'Portfolio', component: CreativePortfolio, category: 'Creative', icon: '🎭', preview: '#f97316' },
  { id: 'creative-modern', name: 'Creative Modern', component: CreativeModern, category: 'Creative', icon: '💎', preview: '#14b8a6' },
  { id: 'creative-artistic', name: 'Artistic', component: CreativeArtistic, category: 'Creative', icon: '🎪', preview: '#e11d48' },
  { id: 'ats-classic', name: 'ATS Classic', component: ATSClassic, category: 'ATS-Friendly', icon: '✅', preview: '#000000' },
  { id: 'ats-simple', name: 'ATS Simple', component: ATSSimple, category: 'ATS-Friendly', icon: '📋', preview: '#374151' },
  { id: 'ats-clean', name: 'ATS Clean', component: ATSClean, category: 'ATS-Friendly', icon: '📝', preview: '#1f2937' },
  { id: 'dark-professional', name: 'Dark Pro', component: DarkProfessional, category: 'Dark Mode', icon: '🌙', preview: '#312e81' },
  { id: 'dark-creative', name: 'Dark Creative', component: DarkCreative, category: 'Dark Mode', icon: '🌌', preview: '#1e1b4b' }
];

// Get template component by ID
export const getTemplate = (templateId) => {
  const template = templateList.find(t => t.id === templateId);
  return template?.component || MinimalClassic;
};

export const getTemplateInfo = (templateId) => {
  return templateList.find(t => t.id === templateId) || templateList[0];
};
