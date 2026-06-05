const express = require('express');
const router = express.Router();
const {
  searchLeagues,
  findWorldCup,
  syncTeams,
  syncFixtures,
  syncStandings,
  syncSquads,
  syncFixtureLineups,
  syncFixtureStats,
  syncAllWorldCupData,
} = require('../controllers/apiFootballSyncController');

// Search / discovery (no DB writes)
router.get('/leagues', searchLeagues);            // ?search=world cup
router.get('/find-world-cup', findWorldCup);       // auto-search for FIFA WC 2026

// Sync routes (fetch from API-Football → upsert into MongoDB)
router.get('/teams', syncTeams);                   // ?leagueId=&season=
router.get('/fixtures', syncFixtures);             // ?leagueId=&season=
router.get('/standings', syncStandings);           // ?leagueId=&season=
router.get('/squads', syncSquads);                 // ?teamId=
router.get('/fixture-lineups', syncFixtureLineups);// ?fixtureId=
router.get('/fixture-stats', syncFixtureStats);    // ?fixtureId=

// Full sync (teams + fixtures + standings in sequence)
router.get('/all', syncAllWorldCupData);           // ?leagueId=&season=

module.exports = router;
