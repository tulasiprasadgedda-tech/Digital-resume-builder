const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled Resume',
    trim: true
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    website: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  education: [{
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    gpa: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  experience: [{
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    bullets: [{ type: String }]
  }],
  skills: [{
    name: { type: String, default: '' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' }
  }],
  projects: [{
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    technologies: { type: String, default: '' },
    link: { type: String, default: '' }
  }],
  certifications: [{
    name: { type: String, default: '' },
    issuer: { type: String, default: '' },
    date: { type: String, default: '' },
    link: { type: String, default: '' }
  }],
  templateId: {
    type: String,
    default: 'minimal-classic'
  },
  themeSettings: {
    primaryColor: { type: String, default: '#2563eb' },
    secondaryColor: { type: String, default: '#1e40af' },
    fontFamily: { type: String, default: 'Inter' },
    fontSize: { type: String, default: 'medium' },
    spacing: { type: String, default: 'normal' }
  },
  sectionOrder: {
    type: [String],
    default: ['personalInfo', 'education', 'experience', 'skills', 'projects', 'certifications']
  },
  hiddenSections: {
    type: [String],
    default: []
  },
  versions: [{
    data: { type: mongoose.Schema.Types.Mixed },
    savedAt: { type: Date, default: Date.now },
    label: { type: String, default: '' }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  publicId: {
    type: String,
    default: null,
    unique: true,
    sparse: true
  },
  language: {
    type: String,
    default: 'en'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
