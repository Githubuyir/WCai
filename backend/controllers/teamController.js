const Team = require('../models/Team');
const fallbackData = require('../utils/fallbackData');

// Filter for WCai 2026 data: sourceSeason is 2026 OR missing (legacy records)
const WCAI_FILTER = {
  $or: [
    { sourceSeason: 2026 },
    { sourceSeason: { $exists: false } },
    { sourceSeason: null },
  ],
};

// Get all teams (WCai 2026 only)
const getTeams = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const teams = await Team.find(WCAI_FILTER).sort({ name: 1 });
      if (teams && teams.length > 0) {
        return res.status(200).json(teams);
      }
    }
    
    // Fallback
    const teamsMap = fallbackData.getTeamsData();
    const teams = Object.keys(teamsMap).map(code => ({
      code,
      ...teamsMap[code]
    }));
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get team by code (WCai 2026 only)
const getTeamByCode = async (req, res) => {
  try {
    const teamCode = req.params.code.toUpperCase();
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const team = await Team.findOne({
        code: teamCode,
        $or: WCAI_FILTER.$or,
      });
      if (team) {
        return res.status(200).json(team);
      }
    }
    
    // Fallback
    const teamsMap = fallbackData.getTeamsData();
    const teamData = teamsMap[teamCode];
    if (!teamData) {
      return res.status(404).json({ message: `Team with code ${teamCode} not found` });
    }
    return res.status(200).json({ code: teamCode, ...teamData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamByCode
};
