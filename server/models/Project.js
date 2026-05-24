const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    techStack: {
      type: [String],
      required: [true, 'Please add the tech stack used (e.g., Flutter, SQLite)'],
    },
    githubLink: {
      type: String,
      required: false, // Sometimes projects might be private
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
