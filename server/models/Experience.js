const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    duration: {
      type: String,
      required: [true, 'Please add the duration (e.g., May - Aug 2025)'],
    },
    keyAchievements: {
      type: [String],
      required: [true, 'Please add at least one key achievement'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Experience', experienceSchema);
