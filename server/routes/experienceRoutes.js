const express = require('express');
const router = express.Router();
const { getExperience, createExperience } = require('../controllers/experienceController');

// GET /api/experience
router.route('/').get(getExperience);

// POST /api/experience
router.route('/').post(createExperience);

module.exports = router;
