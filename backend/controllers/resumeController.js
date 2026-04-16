const Resume = require('../models/Resume');
const { nanoid } = require('nanoid');

// @desc    Get all resumes for current user
// @route   GET /api/resume
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single resume
// @route   GET /api/resume/:id
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new resume
// @route   POST /api/resume
const createResume = async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user._id,
      publicId: nanoid(10)
    };
    const resume = await Resume.create(resumeData);
    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update resume
// @route   PUT /api/resume/:id
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedResume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Duplicate resume
// @route   POST /api/resume/:id/duplicate
const duplicateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const duplicated = resume.toObject();
    delete duplicated._id;
    delete duplicated.createdAt;
    delete duplicated.updatedAt;
    duplicated.title = `${resume.title} (Copy)`;
    duplicated.publicId = nanoid(10);
    duplicated.isPublic = false;
    duplicated.versions = [];

    const newResume = await Resume.create(duplicated);
    res.status(201).json(newResume);
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Save version of resume
// @route   POST /api/resume/:id/version
const saveVersion = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const versionData = {
      data: {
        personalInfo: resume.personalInfo,
        education: resume.education,
        experience: resume.experience,
        skills: resume.skills,
        projects: resume.projects,
        certifications: resume.certifications,
        templateId: resume.templateId,
        themeSettings: resume.themeSettings,
        sectionOrder: resume.sectionOrder,
        hiddenSections: resume.hiddenSections
      },
      savedAt: new Date(),
      label: req.body.label || `Version ${resume.versions.length + 1}`
    };

    resume.versions.push(versionData);
    // Keep only last 10 versions
    if (resume.versions.length > 10) {
      resume.versions = resume.versions.slice(-10);
    }
    await resume.save();
    res.json(resume);
  } catch (error) {
    console.error('Save version error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Restore version
// @route   PUT /api/resume/:id/restore/:versionIndex
const restoreVersion = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const vIndex = parseInt(req.params.versionIndex);
    if (vIndex < 0 || vIndex >= resume.versions.length) {
      return res.status(400).json({ message: 'Invalid version index' });
    }

    const versionData = resume.versions[vIndex].data;
    Object.assign(resume, versionData);
    await resume.save();
    res.json(resume);
  } catch (error) {
    console.error('Restore version error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Toggle public visibility
// @route   PUT /api/resume/:id/toggle-public
const togglePublic = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.isPublic = !resume.isPublic;
    if (!resume.publicId) {
      resume.publicId = nanoid(10);
    }
    await resume.save();
    res.json({ isPublic: resume.isPublic, publicId: resume.publicId });
  } catch (error) {
    console.error('Toggle public error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get public resume (no auth needed)
// @route   GET /api/resume/public/:publicId
const getPublicResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ publicId: req.params.publicId, isPublic: true });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not public' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Get public resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  saveVersion,
  restoreVersion,
  togglePublic,
  getPublicResume
};
