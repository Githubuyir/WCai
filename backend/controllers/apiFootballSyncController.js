const Team = require('../models/Team');
const Match = require('../models/Match');
const apiFootball = require('../services/apiFootballService');

// ─── Helpers ─────────────────────────────────────────────────────────

/**
 * Map an API-Football team object to our Team model fields.
 * Only sets fields that API-Football actually provides.
 * @param {object} apiTeam - Raw API-Football team object
 * @param {number} season - The season being synced (e.g. 2022)
 */
function mapApiTeamToFields(apiTeam, season) {
  const t = apiTeam.team || {};
  const v = apiTeam.venue || {};
  return {
    provider: 'api-football',
    sourceSeason: parseInt(season) || 2022,
    sourceType: 'api-football-demo',
    providerTeamId: t.id,
    name: t.name || '',
    code: (t.code || t.name || '').substring(0, 3).toUpperCase(),
    country: t.country || '',
    flag: t.logo || '',     // API-Football: team.logo is the crest
    logo: t.logo || '',
    venue: {
      name: v.name || '',
      address: v.address || '',
      city: v.city || '',
      capacity: v.capacity || null,
      image: v.image || '',
    },
    rawApiData: apiTeam,
    lastSyncedAt: new Date(),
  };
}

/**
 * Map an API-Football fixture object to our Match model fields.
 * @param {object} apiFix - Raw API-Football fixture object
 * @param {number} season - The season being synced (e.g. 2022)
 */
function mapApiFixtureToFields(apiFix, season) {
  const f = apiFix.fixture || {};
  const league = apiFix.league || {};
  const teams = apiFix.teams || {};
  const goals = apiFix.goals || {};
  const score = apiFix.score || {};

  const dateObj = f.date ? new Date(f.date) : null;

  return {
    provider: 'api-football',
    sourceSeason: parseInt(season) || 2022,
    sourceType: 'api-football-demo',
    providerFixtureId: f.id,
    date: dateObj ? dateObj.toISOString().split('T')[0] : '',
    time: dateObj ? dateObj.toISOString().split('T')[1]?.substring(0, 5) || '' : '',
    group: league.round || '',
    round: league.round || '',
    stage: league.round || '',
    status: mapFixtureStatus(f.status),
    stadium: f.venue ? f.venue.name || '' : '',
    venue: f.venue ? f.venue.name || '' : '',
    city: f.venue ? f.venue.city || '' : '',

    // WCai format (used by frontend)
    team1: {
      name: teams.home ? teams.home.name || '' : '',
      code: teams.home ? (teams.home.name || '').substring(0, 3).toUpperCase() : '',
      prob: 0, // will be set if predictions available
    },
    team2: {
      name: teams.away ? teams.away.name || '' : '',
      code: teams.away ? (teams.away.name || '').substring(0, 3).toUpperCase() : '',
      prob: 0,
    },

    // API-Football reference
    homeTeam: teams.home ? teams.home.name || '' : '',
    awayTeam: teams.away ? teams.away.name || '' : '',
    homeTeamId: teams.home ? teams.home.id : null,
    awayTeamId: teams.away ? teams.away.id : null,

    // Score
    score: {
      homeGoals: goals.home,
      awayGoals: goals.away,
      homeHT: score.halftime ? score.halftime.home : null,
      awayHT: score.halftime ? score.halftime.away : null,
      homeFT: score.fulltime ? score.fulltime.home : null,
      awayFT: score.fulltime ? score.fulltime.away : null,
      homeET: score.extratime ? score.extratime.home : null,
      awayET: score.extratime ? score.extratime.away : null,
      homePenalty: score.penalty ? score.penalty.home : null,
      awayPenalty: score.penalty ? score.penalty.away : null,
    },

    rawApiData: apiFix,
    lastSyncedAt: new Date(),
  };
}

/**
 * Convert API-Football fixture.status to a WCai-friendly status string.
 */
function mapFixtureStatus(apiStatus) {
  if (!apiStatus) return 'Upcoming';
  const short = (apiStatus.short || '').toUpperCase();
  const statusMap = {
    TBD: 'Upcoming',
    NS: 'Upcoming',
    '1H': 'Live',
    HT: 'Live',
    '2H': 'Live',
    ET: 'Live',
    P: 'Live',
    BT: 'Live',
    FT: 'Completed',
    AET: 'Completed',
    PEN: 'Completed',
    SUSP: 'Suspended',
    INT: 'Interrupted',
    PST: 'Postponed',
    CANC: 'Cancelled',
    ABD: 'Abandoned',
    AWD: 'Completed',
    WO: 'Completed',
  };
  return statusMap[short] || 'Upcoming';
}

/**
 * Find the next available numeric match id for new matches.
 */
async function getNextMatchId() {
  const last = await Match.findOne().sort({ id: -1 }).select('id').lean();
  return last ? last.id + 1 : 1;
}

// ─── Controller functions ────────────────────────────────────────────

/**
 * GET /api/sync/api-football/leagues?search=
 * Search leagues — NO database write.
 */
const searchLeagues = async (req, res) => {
  try {
    const search = req.query.search || 'world cup';
    const leagues = await apiFootball.searchLeagues(search);
    res.status(200).json({
      success: true,
      resultsCount: leagues.length,
      requestCount: apiFootball.getRequestCount(),
      data: leagues,
    });
  } catch (error) {
    console.error('❌ searchLeagues error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/find-world-cup
 * Search and filter for FIFA World Cup 2026 — NO database write.
 */
const findWorldCup = async (req, res) => {
  try {
    const result = await apiFootball.findWorldCupLeague();
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Could not find a FIFA World Cup league in API-Football.',
        requestCount: apiFootball.getRequestCount(),
      });
    }
    res.status(200).json({
      success: true,
      requestCount: apiFootball.getRequestCount(),
      data: result,
    });
  } catch (error) {
    console.error('❌ findWorldCup error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/teams?leagueId=&season=
 * Fetch teams from API-Football and upsert into MongoDB.
 */
const syncTeams = async (req, res) => {
  try {
    const { leagueId, season } = req.query;
    if (!leagueId || !season) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query params: leagueId, season',
      });
    }

    const apiTeams = await apiFootball.getTeamsByLeagueSeason(leagueId, season);

    if (apiTeams.length === 0) {
      console.warn('⚠️  API-Football returned 0 teams — skipping sync.');
      return res.status(200).json({
        success: true,
        message: 'API-Football returned no teams. Existing data preserved.',
        teamsSynced: 0,
        requestCount: apiFootball.getRequestCount(),
      });
    }

    let synced = 0;
    for (const apiTeam of apiTeams) {
      const fields = mapApiTeamToFields(apiTeam, season);
      const providerTeamId = fields.providerTeamId;

      if (!providerTeamId) continue;

      // Try to find existing team by providerTeamId OR by code (within the same season)
      const existingByProvider = await Team.findOne({ providerTeamId });
      const existingByCode = !existingByProvider
        ? await Team.findOne({ code: fields.code, sourceSeason: fields.sourceSeason })
        : null;

      if (existingByProvider) {
        // Update API-sourced fields only, preserve WCai fields
        await Team.findOneAndUpdate(
          { providerTeamId },
          {
            $set: {
              name: fields.name,
              country: fields.country,
              flag: fields.flag,
              logo: fields.logo,
              venue: fields.venue,
              rawApiData: fields.rawApiData,
              lastSyncedAt: fields.lastSyncedAt,
              provider: 'api-football',
              sourceSeason: fields.sourceSeason,
              sourceType: fields.sourceType,
            },
          },
          { new: true }
        );
      } else if (existingByCode) {
        // Link existing team to API-Football
        await Team.findOneAndUpdate(
          { code: fields.code, sourceSeason: fields.sourceSeason },
          {
            $set: {
              providerTeamId,
              name: fields.name,
              country: fields.country,
              flag: fields.flag,
              logo: fields.logo,
              venue: fields.venue,
              rawApiData: fields.rawApiData,
              lastSyncedAt: fields.lastSyncedAt,
              provider: 'api-football',
              sourceSeason: fields.sourceSeason,
              sourceType: fields.sourceType,
            },
          },
          { new: true }
        );
      } else {
        // Insert new team with sensible WCai defaults
        await Team.create({
          ...fields,
          // WCai defaults for new teams
          rating: 65,
          winProb: '0%',
          qualProb: '0%',
          archetype: 'Unknown',
          archetypeDesc: 'Style analysis pending.',
          overview: `${fields.name} — tactical analysis will be generated.`,
          formation: '4-3-3',
          metrics: {
            attack: 50,
            control: 50,
            solidity: 50,
            resistance: 50,
            transitions: 50,
            depth: 50,
          },
          tactics: {
            buildup: 'TBD',
            attack: 'TBD',
            defense: 'TBD',
            transition: 'TBD',
            setpieces: 'TBD',
            weakness: 'TBD',
          },
          goalsScored: 0,
          goalsConceded: 0,
          cleanSheets: 0,
        });
      }
      synced++;
    }

    console.log(`✅ API-Football teams synced: ${synced}`);
    res.status(200).json({
      success: true,
      teamsSynced: synced,
      requestCount: apiFootball.getRequestCount(),
    });
  } catch (error) {
    console.error('❌ syncTeams error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/fixtures?leagueId=&season=
 * Fetch fixtures from API-Football and upsert into MongoDB.
 */
const syncFixtures = async (req, res) => {
  try {
    const { leagueId, season } = req.query;
    if (!leagueId || !season) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query params: leagueId, season',
      });
    }

    const apiFixtures = await apiFootball.getFixturesByLeagueSeason(leagueId, season);

    if (apiFixtures.length === 0) {
      console.warn('⚠️  API-Football returned 0 fixtures — skipping sync.');
      return res.status(200).json({
        success: true,
        message: 'API-Football returned no fixtures. Existing data preserved.',
        fixturesSynced: 0,
        requestCount: apiFootball.getRequestCount(),
      });
    }

    let synced = 0;
    let nextId = await getNextMatchId();

    for (const apiFix of apiFixtures) {
      const fields = mapApiFixtureToFields(apiFix, season);
      const providerFixtureId = fields.providerFixtureId;

      if (!providerFixtureId) continue;

      // Try to fetch predictions (may fail on free plan — gracefully skipped)
      try {
        const predictions = await apiFootball.getPredictionsByFixture(providerFixtureId);
        if (predictions && predictions.length > 0) {
          const pred = predictions[0];
          const percent = pred.predictions ? pred.predictions.percent : null;
          if (percent) {
            const homeWin = parseFloat(percent.home) || 0;
            const draw = parseFloat(percent.draw) || 0;
            const awayWin = parseFloat(percent.away) || 0;
            fields.probabilities = { homeWin, draw, awayWin };
            fields.team1.prob = homeWin;
            fields.team2.prob = awayWin;
            fields.drawProb = draw;
          }
        }
      } catch (_) {
        // Predictions not available — keep defaults
      }

      const existing = await Match.findOne({ providerFixtureId });

      if (existing) {
        // Update API-sourced fields, preserve WCai analysis fields
        const updateFields = {
          date: fields.date,
          time: fields.time,
          group: fields.group,
          round: fields.round,
          stage: fields.stage,
          status: fields.status,
          stadium: fields.stadium,
          venue: fields.venue,
          city: fields.city,
          homeTeam: fields.homeTeam,
          awayTeam: fields.awayTeam,
          homeTeamId: fields.homeTeamId,
          awayTeamId: fields.awayTeamId,
          'team1.name': fields.team1.name,
          'team1.code': fields.team1.code,
          'team2.name': fields.team2.name,
          'team2.code': fields.team2.code,
          score: fields.score,
          rawApiData: fields.rawApiData,
          lastSyncedAt: fields.lastSyncedAt,
          provider: 'api-football',
          sourceSeason: fields.sourceSeason,
          sourceType: fields.sourceType,
        };

        // Only update probabilities if we got real prediction data
        if (fields.probabilities && fields.probabilities.homeWin !== null) {
          updateFields.probabilities = fields.probabilities;
          updateFields['team1.prob'] = fields.team1.prob;
          updateFields['team2.prob'] = fields.team2.prob;
          updateFields.drawProb = fields.drawProb;
        }

        await Match.findOneAndUpdate(
          { providerFixtureId },
          { $set: updateFields },
          { new: true }
        );
      } else {
        // Create new match with a sequential id for frontend compatibility
        await Match.create({
          ...fields,
          id: nextId++,
          stadiumAtmosphere: '',
          xG1: 0,
          xG2: 0,
          aiConfidence: 50,
          intensity: 50,
          form1: [],
          form2: [],
          insight: `${fields.team1.name} vs ${fields.team2.name} — analysis pending.`,
          isTopGame: false,
        });
      }
      synced++;
    }

    console.log(`✅ API-Football fixtures synced: ${synced}`);
    res.status(200).json({
      success: true,
      fixturesSynced: synced,
      requestCount: apiFootball.getRequestCount(),
    });
  } catch (error) {
    console.error('❌ syncFixtures error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/standings?leagueId=&season=
 * Fetch standings and update each team's standing sub-document.
 */
const syncStandings = async (req, res) => {
  try {
    const { leagueId, season } = req.query;
    if (!leagueId || !season) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query params: leagueId, season',
      });
    }

    const apiStandings = await apiFootball.getStandingsByLeagueSeason(leagueId, season);

    if (apiStandings.length === 0) {
      console.warn('⚠️  API-Football returned 0 standings — skipping sync.');
      return res.status(200).json({
        success: true,
        message: 'API-Football returned no standings. Existing data preserved.',
        standingsSynced: 0,
        requestCount: apiFootball.getRequestCount(),
      });
    }

    let groupsProcessed = 0;
    let teamsUpdated = 0;

    // API-Football standings response: array of { league: { standings: [[...teams]] } }
    for (const standingItem of apiStandings) {
      const leagueData = standingItem.league || standingItem;
      const standingsGroups = leagueData.standings || [];

      for (const group of standingsGroups) {
        groupsProcessed++;
        for (const entry of group) {
          const providerTeamId = entry.team ? entry.team.id : null;
          if (!providerTeamId) continue;

          const standingData = {
            group: entry.group || '',
            rank: entry.rank || null,
            points: entry.points || 0,
            played: entry.all ? entry.all.played || 0 : 0,
            wins: entry.all ? entry.all.win || 0 : 0,
            draws: entry.all ? entry.all.draw || 0 : 0,
            losses: entry.all ? entry.all.lose || 0 : 0,
            goalsFor: entry.all && entry.all.goals ? entry.all.goals.for || 0 : 0,
            goalsAgainst: entry.all && entry.all.goals ? entry.all.goals.against || 0 : 0,
            goalDifference: entry.goalsDiff || 0,
            form: entry.form || '',
            qualificationStatus: entry.description || '',
          };

          // Update the team's standing and group
          const updated = await Team.findOneAndUpdate(
            { providerTeamId },
            {
              $set: {
                standing: standingData,
                group: standingData.group,
              },
            },
            { new: true }
          );

          if (updated) {
            teamsUpdated++;
          } else {
            console.warn(
              `⚠️  Team with providerTeamId ${providerTeamId} not found in DB for standings update.`
            );
          }
        }
      }
    }

    console.log(`✅ API-Football standings synced: ${groupsProcessed} groups, ${teamsUpdated} teams updated`);
    res.status(200).json({
      success: true,
      standingsSynced: groupsProcessed,
      teamsUpdated,
      requestCount: apiFootball.getRequestCount(),
    });
  } catch (error) {
    console.error('❌ syncStandings error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/squads?teamId=
 * Fetch squad for a specific team and update the team document.
 */
const syncSquads = async (req, res) => {
  try {
    const { teamId } = req.query;
    if (!teamId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query param: teamId',
      });
    }

    const apiSquads = await apiFootball.getSquadsByTeam(teamId);

    if (apiSquads.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'API-Football returned no squad data.',
        playersSynced: 0,
        requestCount: apiFootball.getRequestCount(),
      });
    }

    // API-Football returns array; first item has the players
    const squadData = apiSquads[0];
    const players = (squadData.players || []).map((p) => ({
      providerPlayerId: p.id || null,
      name: p.name || '',
      photo: p.photo || '',
      position: p.position || '',
      number: p.number || null,
      age: p.age || null,
      nationality: p.nationality || '',
    }));

    const updated = await Team.findOneAndUpdate(
      { providerTeamId: parseInt(teamId) },
      {
        $set: {
          squad: players,
          lastSyncedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Team with providerTeamId ${teamId} not found. Sync teams first.`,
      });
    }

    console.log(`✅ API-Football squad synced for team ${teamId}: ${players.length} players`);
    res.status(200).json({
      success: true,
      teamId: parseInt(teamId),
      playersSynced: players.length,
      requestCount: apiFootball.getRequestCount(),
    });
  } catch (error) {
    console.error('❌ syncSquads error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/fixture-lineups?fixtureId=
 * Fetch lineups for a fixture and store in the match document.
 */
const syncFixtureLineups = async (req, res) => {
  try {
    const { fixtureId } = req.query;
    if (!fixtureId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query param: fixtureId',
      });
    }

    const apiLineups = await apiFootball.getLineupsByFixture(fixtureId);

    if (apiLineups.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Lineups not available yet for this fixture.',
        requestCount: apiFootball.getRequestCount(),
      });
    }

    // Map lineup data: each item is a team's lineup
    const lineups = apiLineups.map((lineup) => ({
      teamId: lineup.team ? lineup.team.id : null,
      teamName: lineup.team ? lineup.team.name : '',
      formation: lineup.formation || '',
      startXI: (lineup.startXI || []).map((p) => ({
        name: p.player ? p.player.name : '',
        number: p.player ? p.player.number : null,
        pos: p.player ? p.player.pos : '',
        grid: p.player ? p.player.grid : '',
      })),
      substitutes: (lineup.substitutes || []).map((p) => ({
        name: p.player ? p.player.name : '',
        number: p.player ? p.player.number : null,
        pos: p.player ? p.player.pos : '',
      })),
      coach: lineup.coach ? lineup.coach.name : '',
    }));

    const updated = await Match.findOneAndUpdate(
      { providerFixtureId: parseInt(fixtureId) },
      {
        $set: {
          lineups,
          lastSyncedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Match with providerFixtureId ${fixtureId} not found. Sync fixtures first.`,
      });
    }

    console.log(`✅ API-Football lineups synced for fixture ${fixtureId}`);
    res.status(200).json({
      success: true,
      fixtureId: parseInt(fixtureId),
      teamsWithLineups: lineups.length,
      requestCount: apiFootball.getRequestCount(),
    });
  } catch (error) {
    console.error('❌ syncFixtureLineups error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/fixture-stats?fixtureId=
 * Fetch match statistics for a fixture and store in the match document.
 */
const syncFixtureStats = async (req, res) => {
  try {
    const { fixtureId } = req.query;
    if (!fixtureId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query param: fixtureId',
      });
    }

    const apiStats = await apiFootball.getFixtureStatistics(fixtureId);

    if (apiStats.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Statistics not available yet for this fixture.',
        requestCount: apiFootball.getRequestCount(),
      });
    }

    const updated = await Match.findOneAndUpdate(
      { providerFixtureId: parseInt(fixtureId) },
      {
        $set: {
          fixtureStats: apiStats,
          lastSyncedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Match with providerFixtureId ${fixtureId} not found. Sync fixtures first.`,
      });
    }

    console.log(`✅ API-Football stats synced for fixture ${fixtureId}`);
    res.status(200).json({
      success: true,
      fixtureId: parseInt(fixtureId),
      teamsWithStats: apiStats.length,
      requestCount: apiFootball.getRequestCount(),
    });
  } catch (error) {
    console.error('❌ syncFixtureStats error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/sync/api-football/all?leagueId=&season=
 * Orchestrate: syncTeams → syncFixtures → syncStandings
 * Returns a consolidated summary.
 */
const syncAllWorldCupData = async (req, res) => {
  try {
    const { leagueId, season } = req.query;
    if (!leagueId || !season) {
      return res.status(400).json({
        success: false,
        error: 'Missing required query params: leagueId, season',
      });
    }

    console.log(`\n🔄 Starting full API-Football sync: leagueId=${leagueId}, season=${season}`);
    const summary = {
      success: true,
      leagueId: parseInt(leagueId),
      season: parseInt(season),
      teamsSynced: 0,
      fixturesSynced: 0,
      standingsSynced: 0,
      errors: [],
    };

    // 1. Sync Teams
    try {
      console.log('\n── Step 1/3: Syncing teams...');
      const apiTeams = await apiFootball.getTeamsByLeagueSeason(leagueId, season);
      let teamCount = 0;
      if (apiTeams.length > 0) {
        let nextId = await getNextMatchId(); // not used here, but keeps pattern
        for (const apiTeam of apiTeams) {
          const fields = mapApiTeamToFields(apiTeam, season);
          if (!fields.providerTeamId) continue;

          const existingByProvider = await Team.findOne({ providerTeamId: fields.providerTeamId });
          const existingByCode = !existingByProvider
            ? await Team.findOne({ code: fields.code, sourceSeason: fields.sourceSeason })
            : null;

          if (existingByProvider) {
            await Team.findOneAndUpdate(
              { providerTeamId: fields.providerTeamId },
              {
                $set: {
                  name: fields.name,
                  country: fields.country,
                  flag: fields.flag,
                  logo: fields.logo,
                  venue: fields.venue,
                  rawApiData: fields.rawApiData,
                  lastSyncedAt: fields.lastSyncedAt,
                  provider: 'api-football',
                  sourceSeason: fields.sourceSeason,
                  sourceType: fields.sourceType,
                },
              }
            );
          } else if (existingByCode) {
            await Team.findOneAndUpdate(
              { code: fields.code, sourceSeason: fields.sourceSeason },
              {
                $set: {
                  providerTeamId: fields.providerTeamId,
                  name: fields.name,
                  country: fields.country,
                  flag: fields.flag,
                  logo: fields.logo,
                  venue: fields.venue,
                  rawApiData: fields.rawApiData,
                  lastSyncedAt: fields.lastSyncedAt,
                  provider: 'api-football',
                  sourceSeason: fields.sourceSeason,
                  sourceType: fields.sourceType,
                },
              }
            );
          } else {
            await Team.create({
              ...fields,
              rating: 65,
              winProb: '0%',
              qualProb: '0%',
              archetype: 'Unknown',
              archetypeDesc: 'Style analysis pending.',
              overview: `${fields.name} — tactical analysis will be generated.`,
              formation: '4-3-3',
              metrics: { attack: 50, control: 50, solidity: 50, resistance: 50, transitions: 50, depth: 50 },
              tactics: { buildup: 'TBD', attack: 'TBD', defense: 'TBD', transition: 'TBD', setpieces: 'TBD', weakness: 'TBD' },
              goalsScored: 0,
              goalsConceded: 0,
              cleanSheets: 0,
            });
          }
          teamCount++;
        }
      }
      summary.teamsSynced = teamCount;
      console.log(`   ✅ Teams synced: ${teamCount}`);
    } catch (err) {
      console.error(`   ❌ Teams sync error: ${err.message}`);
      summary.errors.push(`Teams: ${err.message}`);
    }

    // 2. Sync Fixtures
    try {
      console.log('\n── Step 2/3: Syncing fixtures...');
      const apiFixtures = await apiFootball.getFixturesByLeagueSeason(leagueId, season);
      let fixtureCount = 0;
      if (apiFixtures.length > 0) {
        let nextId = await getNextMatchId();
        for (const apiFix of apiFixtures) {
          const fields = mapApiFixtureToFields(apiFix, season);
          if (!fields.providerFixtureId) continue;

          const existing = await Match.findOne({ providerFixtureId: fields.providerFixtureId });
          if (existing) {
            await Match.findOneAndUpdate(
              { providerFixtureId: fields.providerFixtureId },
              {
                $set: {
                  date: fields.date,
                  time: fields.time,
                  group: fields.group,
                  round: fields.round,
                  stage: fields.stage,
                  status: fields.status,
                  stadium: fields.stadium,
                  venue: fields.venue,
                  city: fields.city,
                  homeTeam: fields.homeTeam,
                  awayTeam: fields.awayTeam,
                  homeTeamId: fields.homeTeamId,
                  awayTeamId: fields.awayTeamId,
                  'team1.name': fields.team1.name,
                  'team1.code': fields.team1.code,
                  'team2.name': fields.team2.name,
                  'team2.code': fields.team2.code,
                  score: fields.score,
                  rawApiData: fields.rawApiData,
                  lastSyncedAt: fields.lastSyncedAt,
                  provider: 'api-football',
                  sourceSeason: fields.sourceSeason,
                  sourceType: fields.sourceType,
                },
              }
            );
          } else {
            await Match.create({
              ...fields,
              id: nextId++,
              stadiumAtmosphere: '',
              xG1: 0,
              xG2: 0,
              aiConfidence: 50,
              intensity: 50,
              form1: [],
              form2: [],
              insight: `${fields.team1.name} vs ${fields.team2.name} — analysis pending.`,
              isTopGame: false,
            });
          }
          fixtureCount++;
        }
      }
      summary.fixturesSynced = fixtureCount;
      console.log(`   ✅ Fixtures synced: ${fixtureCount}`);
    } catch (err) {
      console.error(`   ❌ Fixtures sync error: ${err.message}`);
      summary.errors.push(`Fixtures: ${err.message}`);
    }

    // 3. Sync Standings
    try {
      console.log('\n── Step 3/3: Syncing standings...');
      const apiStandings = await apiFootball.getStandingsByLeagueSeason(leagueId, season);
      let groupCount = 0;
      if (apiStandings.length > 0) {
        for (const standingItem of apiStandings) {
          const leagueData = standingItem.league || standingItem;
          const standingsGroups = leagueData.standings || [];
          for (const group of standingsGroups) {
            groupCount++;
            for (const entry of group) {
              const providerTeamId = entry.team ? entry.team.id : null;
              if (!providerTeamId) continue;
              await Team.findOneAndUpdate(
                { providerTeamId },
                {
                  $set: {
                    standing: {
                      group: entry.group || '',
                      rank: entry.rank || null,
                      points: entry.points || 0,
                      played: entry.all ? entry.all.played || 0 : 0,
                      wins: entry.all ? entry.all.win || 0 : 0,
                      draws: entry.all ? entry.all.draw || 0 : 0,
                      losses: entry.all ? entry.all.lose || 0 : 0,
                      goalsFor: entry.all && entry.all.goals ? entry.all.goals.for || 0 : 0,
                      goalsAgainst: entry.all && entry.all.goals ? entry.all.goals.against || 0 : 0,
                      goalDifference: entry.goalsDiff || 0,
                      form: entry.form || '',
                      qualificationStatus: entry.description || '',
                    },
                    group: entry.group || '',
                  },
                }
              );
            }
          }
        }
      }
      summary.standingsSynced = groupCount;
      console.log(`   ✅ Standings synced: ${groupCount} groups`);
    } catch (err) {
      console.error(`   ❌ Standings sync error: ${err.message}`);
      summary.errors.push(`Standings: ${err.message}`);
    }

    console.log('\n🏁 API-Football sync completed successfully');
    console.log(`   Total API requests used: ${apiFootball.getRequestCount()}\n`);

    summary.requestCount = apiFootball.getRequestCount();
    res.status(200).json(summary);
  } catch (error) {
    console.error('❌ syncAllWorldCupData error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  searchLeagues,
  findWorldCup,
  syncTeams,
  syncFixtures,
  syncStandings,
  syncSquads,
  syncFixtureLineups,
  syncFixtureStats,
  syncAllWorldCupData,
};
