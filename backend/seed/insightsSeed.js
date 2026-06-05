require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Insight = require('../models/Insight');

const insightData = {
  heroMetrics: {
    simulationsRun: "2.4M",
    tacticalSystems: 48,
    predictionConfidence: "87%",
    volatilityIndex: "Moderate"
  },

  tacticalEvolution: [
    {
      title: "High Press Systems",
      trend: "+21%",
      summary: "High recovery counter-pressing increased significantly in knockout simulations, limiting transition time for midfield pivots."
    },
    {
      title: "Compact Mid-Blocks",
      trend: "+14%",
      summary: "Deep and mid zonal blocks are neutralizing possession teams by overloading central passing channels and forcing wide crosses."
    },
    {
      title: "Transition Efficiency",
      trend: "+18%",
      summary: "Direct transitions into deep vertical runs are registering the highest increase in conversion rate across simulations."
    },
    {
      title: "Wide Overload xG",
      trend: "+26%",
      summary: "Attacking strategies creating overloads in wide spaces and half-spaces are producing 26% higher quality shot opportunities."
    }
  ],

  matchupIntelligence: [
    {
      category: "BEST ATTACK",
      team: "Brazil",
      code: "BRA",
      emoji: "🇧🇷",
      score: 96.8,
      summary: "Fluid horizontal rotations, high xG generation in zone 14, and individual overload profiles from half-spaces make Brazil's system the tournament's most lethal attacking threat."
    },
    {
      category: "MOST AGGRESSIVE PRESS",
      team: "Germany",
      code: "GER",
      emoji: "🇩🇪",
      score: 94.2,
      summary: "Germany leads simulations in low PPDA (Passes Per Defensive Action) scores, enforcing extremely fast ball-recovery times in the opponent's final third."
    },
    {
      category: "STRONGEST MIDFIELD CONTROL",
      team: "Spain",
      code: "ESP",
      emoji: "🇪🇸",
      score: 95.5,
      summary: "Exceptional pass completion under high pressure (88.4%) and structural resting defense shapes keep Spain in control of central transition spaces."
    },
    {
      category: "HIGHEST TRANSITION SPEED",
      team: "France",
      code: "FRA",
      emoji: "🇫🇷",
      score: 93.8,
      summary: "Averaging 4.8 seconds from defensive ball recovery to final third entries. Explores vertical spaces with high-pace wing systems."
    },
    {
      category: "MOST DEFENSIVELY STABLE",
      team: "Portugal",
      code: "POR",
      emoji: "🇵🇹",
      score: 92.4,
      summary: "Low opposition xG allowed inside the box. Portuguese compact mid-block defensive lines show minimal spacing gaps under sustained pressure."
    },
    {
      category: "MOST UNPREDICTABLE TEAM",
      team: "Canada",
      code: "CAN",
      emoji: "🇨🇦",
      score: 88.9,
      summary: "High variation of formations (switching between 3-5-2 and 4-3-3 mid-game) makes tactical preparation difficult for opponents in current projections."
    }
  ],

  narrativeInsights: [
    {
      topic: "TACTICAL ANALYSIS",
      title: "Youth Dynamics vs Veteran Systems",
      summary: "Our models suggest that squads with an average age below 26 are significantly outperforming veteran-heavy squads. High-intensity pressing and physical durability over 90+ minutes are playing a greater role than positional experience on the hot pitches of the 2026 World Cup."
    },
    {
      topic: "TOURNAMENT EVOLUTION",
      title: "The Slow Death of Pure Possession",
      summary: "Possession volume is losing its correlation to win probability. The tournament model indicates compact, defensively solid mid-blocks that control spaces rather than the ball are generating the highest margin of efficiency, waiting for vertical transition triggers to strike."
    },
    {
      topic: "NATION PROFILES",
      title: "South American Transition Dominance",
      summary: "South American teams (Brazil, Argentina, Uruguay) are setting record-high transition efficiency ratings. Midfield recovery rates coupled with immediate direct progression mean they bypass traditional build-up phases, exposing opponents' unorganized backlines."
    },
    {
      topic: "xG TELEMETRY",
      title: "Exploiting the Half-Spaces",
      summary: "Overload setups in wide areas and half-spaces are generating the highest xG patterns. Systems that pull fullbacks out of position and use inverted wingers to thread diagonal passes between CB-FB channels are breaking low blocks at a 26% higher success rate."
    }
  ]
};

const seedInsights = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri || mongoUri.trim() === "") {
    console.log("\n=========================================================================");
    console.log("⚠️  SEEDER NOTICE: MONGO_URI is empty. Insights seeding skipped.");
    console.log("   Provide a valid connection string in backend/.env to run the seeder.");
    console.log("=========================================================================\n");
    process.exit(0);
  }

  try {
    console.log("Connecting to database for insights seeding...");
    await mongoose.connect(mongoUri);
    console.log("📡 Connected to MongoDB.");

    // Clear existing insights
    console.log("Cleaning insights collection...");
    await Insight.deleteMany({});

    // Insert the insight document
    console.log("Inserting insights data...");
    await Insight.create(insightData);

    console.log("🎉 Insights seeding completed successfully!");
    console.log("   → 1 insight document");
    console.log(`   → ${insightData.tacticalEvolution.length} tactical evolution cards`);
    console.log(`   → ${insightData.matchupIntelligence.length} matchup intelligence cards`);
    console.log(`   → ${insightData.narrativeInsights.length} narrative insight cards`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Insights seeder failed: ${error.message}`);
    process.exit(1);
  }
};

seedInsights();
