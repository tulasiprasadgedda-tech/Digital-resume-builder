const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Public route (no auth)
router.get('/public/:publicId', getPublicResume);

// Protected routes
router.get('/', protect, getResumes);
router.post('/', protect, createResume);
router.get('/:id', protect, getResume);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);
router.post('/:id/duplicate', protect, duplicateResume);
router.post('/:id/version', protect, saveVersion);
router.put('/:id/restore/:versionIndex', protect, restoreVersion);
router.put('/:id/toggle-public', protect, togglePublic);

module.exports = router;
