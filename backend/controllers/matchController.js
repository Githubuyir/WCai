const Match = require('../models/Match');
const fallbackData = require('../utils/fallbackData');

// Filter for WCai 2026 data: sourceSeason is 2026 OR missing (legacy records)
const WCAI_FILTER = {
  $or: [
    { sourceSeason: 2026 },
    { sourceSeason: { $exists: false } },
    { sourceSeason: null },
  ],
};

// Get all matches (WCai 2026 only)
const getMatches = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const matches = await Match.find(WCAI_FILTER).sort({ id: 1 });
      if (matches && matches.length > 0) {
        return res.status(200).json(matches);
      }
    }
    
    // Fallback if DB not connected or empty
    const matches = fallbackData.getMatchesData();
    return res.status(200).json(matches);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get specific match by ID (WCai 2026 only)
const getMatchById = async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      const match = await Match.findOne({
        id: matchId,
        $or: WCAI_FILTER.$or,
      });
      if (match) {
        return res.status(200).json(match);
      }
    }
    
    // Fallback if DB not connected or match not found in DB
    const matches = fallbackData.getMatchesData();
    const match = matches.find(m => m.id === matchId);
    if (!match) {
      return res.status(404).json({ message: `Match with ID ${matchId} not found` });
    }
    return res.status(200).json(match);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a match
const createMatch = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected. Write operations unavailable." });
    }
    const newMatch = new Match(req.body);
    const savedMatch = await newMatch.save();
    return res.status(201).json(savedMatch);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update match details
const updateMatch = async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected. Write operations unavailable." });
    }
    
    const updatedMatch = await Match.findOneAndUpdate(
      { id: matchId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedMatch) {
      return res.status(404).json({ message: `Match with ID ${matchId} not found` });
    }
    
    return res.status(200).json(updatedMatch);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch
};
