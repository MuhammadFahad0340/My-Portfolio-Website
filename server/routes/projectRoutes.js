const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');
// const { protect } = require('../middleware/authMiddleware'); // For Admin later

// GET /api/projects
router.route('/').get(getProjects);

// POST /api/projects - Add protect middleware later when auth is fully implemented
router.route('/').post(createProject);

module.exports = router;
