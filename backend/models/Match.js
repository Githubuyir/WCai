const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  // ── Data source tracking ──
  sourceSeason: { type: Number, default: 2026 },           // 2026 = WCai project, 2022 = API-Football demo
  sourceType: { type: String, default: 'wcai-generated' }, // "wcai-generated" | "api-football-demo"

  // ── API-Football provider fields ──
  provider: { type: String, default: null },                 // "api-football"
  providerFixtureId: { type: Number },        // API-Football fixture.id

  // ── WCai internal match id (sequential, used by frontend) ──
  id: {
    type: Number,
    required: true,
    unique: true
  },

  // ── Schedule ──
  date: { type: String, default: '' },
  time: { type: String, default: '' },

  // ── Tournament structure ──
  group: { type: String, default: '' },
  round: { type: String, default: '' },
  stage: { type: String, default: '' },

  // ── Status ──
  status: { type: String, default: 'Upcoming' },

  // ── Venue ──
  stadium: { type: String, default: '' },
  stadiumAtmosphere: { type: String, default: '' },
  venue: { type: String, default: '' },
  city: { type: String, default: '' },

  // ── Teams (WCai format — used by frontend) ──
  team1: {
    name: { type: String, default: '' },
    code: { type: String, default: '' },
    prob: { type: Number, default: 0 }
  },
  team2: {
    name: { type: String, default: '' },
    code: { type: String, default: '' },
    prob: { type: Number, default: 0 }
  },

  // ── Teams (API-Football reference IDs) ──
  homeTeam: { type: String, default: '' },
  awayTeam: { type: String, default: '' },
  homeTeamId: { type: Number, default: null },
  awayTeamId: { type: Number, default: null },

  // ── Score ──
  score: {
    homeGoals: { type: Number, default: null },
    awayGoals: { type: Number, default: null },
    homeHT: { type: Number, default: null },
    awayHT: { type: Number, default: null },
    homeFT: { type: Number, default: null },
    awayFT: { type: Number, default: null },
    homeET: { type: Number, default: null },
    awayET: { type: Number, default: null },
    homePenalty: { type: Number, default: null },
    awayPenalty: { type: Number, default: null }
  },

  // ── Probabilities ──
  drawProb: { type: Number, default: 0 },
  probabilities: {
    homeWin: { type: Number, default: null },
    draw: { type: Number, default: null },
    awayWin: { type: Number, default: null }
  },

  // ── xG ──
  xG1: { type: Number, default: 0 },
  xG2: { type: Number, default: 0 },
  xg: {
    home: { type: Number, default: null },
    away: { type: Number, default: null }
  },

  // ── AI / WCai analysis fields ──
  aiConfidence: { type: Number, default: 50 },
  intensity: { type: Number, default: 50 },
  insight: { type: String, default: '' },
  isTopGame: { type: Boolean, default: false },

  // ── Form ──
  form1: { type: [String], default: [] },
  form2: { type: [String], default: [] },
  recentForm: { type: mongoose.Schema.Types.Mixed, default: null },

  // ── Lineups & stats (from API-Football) ──
  lineups: { type: mongoose.Schema.Types.Mixed, default: null },
  fixtureStats: { type: mongoose.Schema.Types.Mixed, default: null },

  // ── WCai tactical analysis (generated) ──
  tacticalReport: { type: mongoose.Schema.Types.Mixed, default: null },
  metricBreakdown: { type: mongoose.Schema.Types.Mixed, default: null },
  formationLayout: { type: mongoose.Schema.Types.Mixed, default: null },
  momentumTimeline: { type: mongoose.Schema.Types.Mixed, default: null },
  heatZones: { type: mongoose.Schema.Types.Mixed, default: null },
  simulationEngine: { type: mongoose.Schema.Types.Mixed, default: null },
  isTopMatch: { type: Boolean, default: false },

  // ── Completed Match Data fields ──
  goals1: { type: Number, default: null },
  goals2: { type: Number, default: null },
  scorers1: { type: [String], default: [] },
  scorers2: { type: [String], default: [] },
  matchNote: { type: String, default: '' },
  predictionVsReality: { type: mongoose.Schema.Types.Mixed, default: null },
  summaryText: { type: String, default: '' },
  timelineEvents: { type: mongoose.Schema.Types.Mixed, default: null },
  statsDetails: { type: mongoose.Schema.Types.Mixed, default: null },
  lineupDetails: { type: mongoose.Schema.Types.Mixed, default: null },
  substitutesList: { type: mongoose.Schema.Types.Mixed, default: null },
  playerOfTheMatch: { type: mongoose.Schema.Types.Mixed, default: null },
  tacticalReviews: { type: mongoose.Schema.Types.Mixed, default: null },

  // ── Raw API data for debugging ──
  rawApiData: { type: mongoose.Schema.Types.Mixed, default: null },
  lastSyncedAt: { type: Date, default: null }
}, {
  timestamps: true
});

// Sparse unique index: only enforced when providerFixtureId is not null
MatchSchema.index({ providerFixtureId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Match', MatchSchema);
