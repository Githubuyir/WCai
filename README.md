# WCai — AI World Cup Intelligence Platform

WCai is a full-stack MERN web application built for the FIFA World Cup 2026. It provides AI-style match intelligence, team analytics, tournament simulations, tactical summaries, group standings, and football data visualizations through a modern interactive dashboard.

The platform is designed as a real-world football intelligence product where users can explore matches, analyze team strengths, view tactical predictions, and simulate knockout outcomes.

## Live Links

Frontend Live URL: https://wc-ai-khaki.vercel.app/ 
Backend API URL: https://wcai-backend.onrender.com

## Project Status

The frontend, backend, MongoDB integration, responsive UI, and API-Football integration are completed.

Due to API-Football free-plan limitations, official FIFA World Cup 2026 data is not fully available through the free tier at the moment. Therefore, WCai uses curated/generated 2026 project data as the main public data source, while API-Football integration is implemented and tested separately using available demo seasons.
This keeps the public website focused on World Cup 2026 while still demonstrating real external API integration.

## Features

### Home Page
World Cup-inspired hero section with modern visual design.
Featured match intelligence cards.
Match prediction previews.
World Cup overview section.
Group standings and tournament statistics.
AI-style explanation of how predictions work.
### Matches Page
Match listing with filters.
Match cards with win probability, draw probability, xG estimate, AI confidence, and intensity.
Upcoming, completed, top games, knockouts, and final-stage sections.
Detailed match analysis page for each fixture.
### Match Analysis Page
Team-versus-team prediction view.
Interactive probability slider.
Tactical summary overview.
AI tactical simulation report.
Predictive metric breakdown.
Recent form comparison.
Formation layout.
Momentum timeline.
Heat-zone visualization.
Match simulation engine summary.
### Teams Page
AI power rankings
Group standings
Dark-horse predictions
Team strength and tactical overview
Team analysis page for individual nations
### Team Analysis Page
Team hero section
Tactical classification
Predicted starting XI
Team strength metrics
Tactical heat zones
Tactical identity analysis
Key player profiles
Recent form and AI momentum
Similar tactical profiles
### Insights Page
AI World Cup intelligence overview
Global tactical evolution trends
Interactive knockout tournament simulator
Tournament telemetry
Simulation insights
Matchup intelligence cards
AI narrative insights

## Tech Stack

### Frontend
React
Vite
JavaScript
CSS
Responsive UI design
Component-based architecture

### Backend
Node.js
Express.js
MongoDB
Mongoose
REST APIs
API-Football integration
CORS configuration
Environment variable support

### Database
MongoDB Atlas
External API
API-Football by API-Sports

## Project Architecture
WCai
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── data
│   │   ├── pages
│   │   └── utils
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── seed
│   ├── services
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md


## Data Strategy

WCai uses a hybrid data approach.

### Main Website Data

The public WCai website uses 2026-focused project data stored in MongoDB.

These records are marked as:

sourceSeason: 2026
sourceType: "wcai-generated"

This ensures the public website always displays FIFA World Cup 2026-focused content.

### API-Football Demo Data

API-Football integration is implemented and tested. Since the free API plan does not currently provide full access to the FIFA World Cup 2026 season, synced API records are kept separate as demo data.

These records are marked as:

sourceSeason: 2022
sourceType: "api-football-demo"

Demo API data is available only through separate backend demo routes and does not affect the public WCai frontend.

## Backend API Endpoints

### Public Website APIs

These endpoints power the main WCai frontend:

GET /api/matches
GET /api/matches/:id
GET /api/teams
GET /api/teams/:code
GET /api/insights

These routes return the main WCai 2026 data.

### API-Football Sync APIs

These endpoints are used to test and sync external football data into MongoDB:

GET /api/sync/api-football/find-world-cup
GET /api/sync/api-football/leagues?search=world cup
GET /api/sync/api-football/teams?leagueId=1&season=2022
GET /api/sync/api-football/fixtures?leagueId=1&season=2022
GET /api/sync/api-football/standings?leagueId=1&season=2022
GET /api/sync/api-football/all?leagueId=1&season=2022

The sync data is stored separately so that older API demo data does not overwrite WCai 2026 project data.

### API-Football Demo APIs

These routes return synced API-Football demo data separately:

GET /api/demo/api-football/teams
GET /api/demo/api-football/matches


## Environment Variables

Create a .env file inside the backend folder.

PORT=5001
MONGO_URI=your_mongodb_connection_string
FOOTBALL_API_KEY=your_api_football_key
FOOTBALL_API_BASE_URL=https://v3.football.api-sports.io
NODE_ENV=development

For production deployment, also add:

FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production

For frontend deployment, add this environment variable in Vercel:

VITE_API_URL=https://your-backend-domain.onrender.com/api


## Installation and Setup

1. Clone the repository

git clone https://github.com/your-username/wcai.git

cd wcai

2. Install backend dependencies

cd backend

npm install

3. Install frontend dependencies
cd backend
npm install
3. Install frontend dependencies
cd ../frontend
npm install
4. Start backend server
cd backend
npm run dev

The backend runs on:

http://localhost:5001
5. Start frontend development server
cd frontend
npm run dev

The frontend runs on:

http://localhost:5173
Build Frontend
cd frontend
npm run build

The production build is generated inside:

frontend/dist

## Deployment Plan

### Backend Deployment

Recommended platform: Render

Render settings:

Root Directory: backend
Build Command: npm install
Start Command: npm start

Backend environment variables:

MONGO_URI=your_mongodb_connection_string
FOOTBALL_API_KEY=your_api_football_key
FOOTBALL_API_BASE_URL=https://v3.football.api-sports.io
NODE_ENV=production
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app

## Frontend Deployment

Recommended platform: Vercel

Vercel settings:

Root Directory: frontend
Build Command: npm run build
Output Directory: dist

Frontend environment variable:

VITE_API_URL=https://your-render-backend-url.onrender.com/api

## Security Notes

.env files are not included in the repository.
API keys and MongoDB credentials must be configured using environment variables.
node_modules, build outputs, and local environment folders are ignored using .gitignore.
API-Football credentials are used only in the backend and are never exposed to the frontend.

## Important Notes
API-Football free plan currently limits access to some seasons, including FIFA World Cup 2026.
WCai protects the main 2026 project data from being overwritten by older API demo data.
API-Football demo sync proves real external API integration.
The tournament simulator currently uses WCai project data and is prepared for future real-data simulation logic.
OpenAI/Gemini integration is planned as a future enhancement and is not currently included.

## Future Enhancements
OpenAI/Gemini integration for dynamic tactical summaries.
Real-time FIFA World Cup 2026 data sync when API access is available.
Scheduled backend sync using cron jobs.
Live match status updates.
Live standings updates.
Player-level statistics.
Advanced AI prediction model.
Admin dashboard for controlled data updates.
Team comparison feature.
Enhanced tournament simulator with real qualification logic.

## Purpose

WCai was built as a real-world full-stack football intelligence platform for the FIFA World Cup 2026.

It demonstrates:

Full-stack MERN development
Responsive frontend design
REST API development
MongoDB data modeling
External API integration
Data separation and fallback handling
Sports analytics product thinking
Deployment-ready project structure
Author

Developed by Steven Abraham.