const Team = require('../models/Team');
const Match = require('../models/Match');

// Get all synced API-Football demo teams
const getDemoTeams = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const teams = await Team.find({ sourceType: 'api-football-demo' }).sort({ name: 1 });
      return res.status(200).json(teams);
    }
    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all synced API-Football demo matches
const getDemoMatches = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const matches = await Match.find({ sourceType: 'api-football-demo' }).sort({ id: 1 });
      return res.status(200).json(matches);
    }
    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDemoTeams,
  getDemoMatches
};
