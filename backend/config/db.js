const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri || mongoUri.trim() === "") {
    console.warn("\n=========================================================================");
    console.warn("⚠️  WARNING: MONGO_URI environment variable is empty.");
    console.warn("   The server will run in mock-data fallback mode without a database.");
    console.warn("=========================================================================\n");
    return false;
  }
  
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    console.warn("Server will continue running in mock-data fallback mode.");
    return false;
  }
};

module.exports = connectDB;
