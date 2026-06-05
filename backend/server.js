require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const matchRoutes = require('./routes/matchRoutes');
const teamRoutes = require('./routes/teamRoutes');
const insightRoutes = require('./routes/insightRoutes');
const apiFootballSyncRoutes = require('./routes/apiFootballSyncRoutes');
const demoRoutes = require('./routes/demoRoutes');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());

// Dynamic CORS configuration to allow localhost and production frontend environments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman, or same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // In development or if no explicit FRONTEND_URL is defined, allow origin to prevent blocks
      if (process.env.NODE_ENV === 'development' || !process.env.FRONTEND_URL) {
        return callback(null, true);
      }
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Routes
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/sync/api-football', apiFootballSyncRoutes);
app.use('/api/demo/api-football', demoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected (mock-fallback)',
    uptime: process.uptime()
  });
});

// Root landing endpoint
app.get('/', (req, res) => {
  res.send('⚽ Match Intelligence Hero API Server is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
