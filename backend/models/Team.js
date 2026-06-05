const mongoose = require('mongoose');

// ─── Sub-schemas ─────────────────────────────────────────────────────

// Existing: startingXI player positions (for formation rendering)
const FormationPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  isCaptain: { type: Boolean, default: false }
}, { _id: false });

// Existing: key player cards
const KeyPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  score: { type: Number, required: true },
  impact: { type: String, required: true }
}, { _id: false });

// Existing: similar teams
const SimilarTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  archetype: { type: String, required: true },
  sim: { type: Number, required: true }
}, { _id: false });

// NEW: API-Football squad player
const SquadPlayerSchema = new mongoose.Schema({
  providerPlayerId: { type: Number, default: null },
  name: { type: String, required: true },
  photo: { type: String, default: '' },
  position: { type: String, default: '' },
  number: { type: Number, default: null },
  age: { type: Number, default: null },
  nationality: { type: String, default: '' }
}, { _id: false });

// NEW: standing sub-document (from API-Football standings)
const StandingSchema = new mongoose.Schema({
  group: { type: String, default: '' },
  rank: { type: Number, default: null },
  points: { type: Number, default: 0 },
  played: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  goalDifference: { type: Number, default: 0 },
  form: { type: String, default: '' },
  qualificationStatus: { type: String, default: '' }
}, { _id: false });

// ─── Main Team Schema ────────────────────────────────────────────────

const TeamSchema = new mongoose.Schema({
  // ── Data source tracking ──
  sourceSeason: { type: Number, default: 2026 },           // 2026 = WCai project, 2022 = API-Football demo
  sourceType: { type: String, default: 'wcai-generated' }, // "wcai-generated" | "api-football-demo"

  // ── API-Football provider fields ──
  provider: { type: String, default: null },              // "api-football"
  providerTeamId: { type: Number },        // API-Football team.id

  // ── Identifiers ──
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country: { type: String, default: '' },
  flag: { type: String, default: '' },                     // country flag URL
  logo: { type: String, default: '' },                     // team/federation logo URL

  // ── Ranking & ratings ──
  fifaRank: { type: Number, default: null },
  powerRank: { type: Number, default: null },
  rating: { type: Number, default: 70 },                   // aiRating equivalent

  // ── Group & tournament ──
  group: { type: String, default: '' },

  // ── Probabilities ──
  winProb: { type: String, default: '0%' },
  qualProb: { type: String, default: '0%' },
  titleProbability: { type: Number, default: null },
  qualificationProbability: { type: Number, default: null },

  // ── Tactical identity (WCai-specific) ──
  isDarkHorse: { type: Boolean, default: false },
  heroImage: { type: String, default: '' },
  archetype: { type: String, default: '' },
  archetypeDesc: { type: String, default: '' },
  tacticalStyle: { type: String, default: '' },
  tags: { type: [String], default: [] },
  overview: { type: String, default: '' },

  // ── Formation & lineup ──
  formation: { type: String, default: '4-3-3' },
  startingXI: { type: [FormationPlayerSchema], default: [] },
  predictedXI: { type: mongoose.Schema.Types.Mixed, default: null },

  // ── Performance metrics (WCai radar) ──
  metrics: {
    attack: { type: Number, default: 50 },
    control: { type: Number, default: 50 },
    solidity: { type: Number, default: 50 },
    resistance: { type: Number, default: 50 },
    transitions: { type: Number, default: 50 },
    depth: { type: Number, default: 50 }
  },

  // ── Tactical breakdown (WCai-specific) ──
  tactics: {
    buildup: { type: String, default: '' },
    attack: { type: String, default: '' },
    defense: { type: String, default: '' },
    transition: { type: String, default: '' },
    setpieces: { type: String, default: '' },
    weakness: { type: String, default: '' }
  },

  // ── Key players & squad ──
  players: { type: [KeyPlayerSchema], default: [] },       // WCai key player cards
  squad: { type: [SquadPlayerSchema], default: [] },       // API-Football full squad

  // ── Form & stats ──
  form: { type: [String], default: [] },
  recentForm: { type: mongoose.Schema.Types.Mixed, default: null },
  goalsScored: { type: Number, default: 0 },
  goalsConceded: { type: Number, default: 0 },
  cleanSheets: { type: Number, default: 0 },
  momentum: { type: [Number], default: [] },

  // ── Standings (synced from API-Football) ──
  standing: { type: StandingSchema, default: null },

  // ── Venue ──
  venue: {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    capacity: { type: Number, default: null },
    image: { type: String, default: '' }
  },

  // ── Similar teams ──
  similar: { type: [SimilarTeamSchema], default: [] },

  // ── Raw API data for debugging ──
  rawApiData: { type: mongoose.Schema.Types.Mixed, default: null },
  lastSyncedAt: { type: Date, default: null }
}, {
  timestamps: true
});

// Sparse unique index: only enforced when providerTeamId is not null
TeamSchema.index({ providerTeamId: 1 }, { unique: true, sparse: true });
// Compound unique index for code + season
TeamSchema.index({ code: 1, sourceSeason: 1 }, { unique: true });

module.exports = mongoose.model('Team', TeamSchema);
