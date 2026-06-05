require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Match = require('../models/Match');
const Team = require('../models/Team');
const fallbackData = require('../utils/fallbackData');

const seedDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri || mongoUri.trim() === "") {
    console.log("\n=========================================================================");
    console.log("⚠️  SEEDER NOTICE: MONGO_URI is empty. Database seeding skipped.");
    console.log("   Provide a valid connection string in backend/.env to run the seeder.");
    console.log("=========================================================================\n");
    process.exit(0);
  }
  
  try {
    console.log("Connecting to database for seeding...");
    await mongoose.connect(mongoUri);
    console.log("📡 Connected to MongoDB.");
    
    // Get Matches mock data
    console.log("Extracting matches mock data from frontend...");
    const matches = fallbackData.getMatchesData();
    console.log(`Successfully extracted ${matches.length} matches.`);
    
    // Get Teams mock data
    console.log("Extracting teams mock data from frontend...");
    const teamsMap = fallbackData.getTeamsData();
    const teams = Object.keys(teamsMap).map(code => ({
      code,
      ...teamsMap[code]
    }));
    console.log(`Successfully extracted ${teams.length} teams.`);
    
    if (matches.length === 0 && teams.length === 0) {
      console.warn("⚠️  Warning: No data was extracted. Check paths to frontend files.");
      process.exit(1);
    }
    
    // Clear matches
    console.log("Cleaning matches collection...");
    await Match.deleteMany({});
    console.log("Cleaning teams collection...");
    await Team.deleteMany({});
    
    // Seed matches
    if (matches.length > 0) {
      console.log("Inserting matches...");
      await Match.insertMany(matches);
      console.log(`Successfully seeded ${matches.length} matches.`);
    }
    
    // Seed teams
    if (teams.length > 0) {
      console.log("Inserting teams...");
      await Team.insertMany(teams);
      console.log(`Successfully seeded ${teams.length} teams.`);
    }
    
    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeder failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
