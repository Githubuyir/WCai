const Insight = require('../models/Insight');

// @desc    Get all insights (returns the single insight document)
// @route   GET /api/insights
// @access  Public
const getInsights = async (req, res) => {
  try {
    // There's only one insights document — grab the latest
    const insight = await Insight.findOne().sort({ createdAt: -1 });

    if (!insight) {
      return res.status(404).json({ message: 'No insights data found.' });
    }

    res.status(200).json(insight);
  } catch (error) {
    console.error('Error fetching insights:', error.message);
    res.status(500).json({ message: 'Server error fetching insights.' });
  }
};

module.exports = { getInsights };
