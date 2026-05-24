const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new experience
// @route   POST /api/experience
// @access  Private (Admin)
const createExperience = async (req, res) => {
  const { title, company, duration, keyAchievements } = req.body;

  if (!title || !company || !duration || !keyAchievements) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const experience = await Experience.create({
      title,
      company,
      duration,
      keyAchievements,
    });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExperience,
  createExperience,
};
