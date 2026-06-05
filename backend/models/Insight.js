const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  heroMetrics: {
    simulationsRun: { type: String, required: true },
    tacticalSystems: { type: Number, required: true },
    predictionConfidence: { type: String, required: true },
    volatilityIndex: { type: String, required: true }
  },
  tacticalEvolution: [{
    title: { type: String, required: true },
    trend: { type: String, required: true },
    summary: { type: String, required: true }
  }],
  matchupIntelligence: [{
    category: { type: String, required: true },
    team: { type: String, required: true },
    code: { type: String, required: true },
    emoji: { type: String },
    score: { type: Number, required: true },
    summary: { type: String, required: true }
  }],
  narrativeInsights: [{
    topic: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Insight', InsightSchema);
