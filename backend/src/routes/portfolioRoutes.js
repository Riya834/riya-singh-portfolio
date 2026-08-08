const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { getProfile, updateProfile } = require('../controllers/profileController');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillsController');
const { getExperience, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/projectsController');
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { getCertifications, createCertification, updateCertification, deleteCertification } = require('../controllers/certificationsController');
const { getLeadership, createLeadership, updateLeadership, deleteLeadership } = require('../controllers/leadershipController');
const { getSettings, updateSettings } = require('../controllers/settingsController');

// Profile
router.get('/profile', getProfile);
router.put('/profile', protect, updateProfile);

// Skills
router.get('/skills', getSkills);
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Experience
router.get('/experience', getExperience);
router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

// Projects
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Education
router.get('/education', getEducation);
router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

// Certifications
router.get('/certifications', getCertifications);
router.post('/certifications', protect, createCertification);
router.put('/certifications/:id', protect, updateCertification);
router.delete('/certifications/:id', protect, deleteCertification);

// Leadership
router.get('/leadership', getLeadership);
router.post('/leadership', protect, createLeadership);
router.put('/leadership/:id', protect, updateLeadership);
router.delete('/leadership/:id', protect, deleteLeadership);

// Site Settings
router.get('/settings', getSettings);
router.put('/settings', protect, updateSettings);

module.exports = router;
