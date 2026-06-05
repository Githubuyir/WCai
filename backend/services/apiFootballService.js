const axios = require('axios');

// ─── Request counter for rate-limit awareness ────────────────────────
let requestCount = 0;

// ─── Validate env vars at module load ────────────────────────────────
const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = process.env.FOOTBALL_API_BASE_URL || 'https://v3.football.api-sports.io';

if (!API_KEY) {
  console.warn(
    '\n⚠️  WARNING: FOOTBALL_API_KEY is not set in .env — API-Football calls will fail.\n'
  );
}

// ─── Axios client ────────────────────────────────────────────────────
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apisports-key': API_KEY || '',
  },
  timeout: 15000, // 15 s
});

// ─── Shared request helper ───────────────────────────────────────────
async function apiRequest(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error(
      'FOOTBALL_API_KEY is missing. Add it to backend/.env before calling API-Football.'
    );
  }

  requestCount += 1;
  const paramStr = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  console.log(
    `📡 API-Football request #${requestCount}: GET ${endpoint}${paramStr ? '?' + paramStr : ''}`
  );

  try {
    const response = await client.get(endpoint, { params });

    // API-Football wraps errors inside response.data.errors
    const data = response.data;

    if (data.errors && Object.keys(data.errors).length > 0) {
      const errMessages = Object.values(data.errors).join('; ');

      // Rate-limit detection
      if (errMessages.toLowerCase().includes('rate limit')) {
        throw new Error(`API-Football rate limit exceeded: ${errMessages}`);
      }
      // Invalid / missing key
      if (
        errMessages.toLowerCase().includes('key') ||
        errMessages.toLowerCase().includes('token')
      ) {
        throw new Error(`API-Football authentication error: ${errMessages}`);
      }
      throw new Error(`API-Football error: ${errMessages}`);
    }

    // Empty response guard
    if (!data.response || data.response.length === 0) {
      console.warn(
        `⚠️  API-Football returned empty data for ${endpoint} ${JSON.stringify(params)}`
      );
      return [];
    }

    return data.response;
  } catch (error) {
    // HTTP 429 rate-limit
    if (error.response && error.response.status === 429) {
      throw new Error(
        'API-Football rate limit exceeded (HTTP 429). Wait before retrying.'
      );
    }
    // HTTP 403 / 401
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      throw new Error(
        `API-Football authentication failed (HTTP ${error.response.status}). Check your API key.`
      );
    }
    // Network / timeout
    if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
      throw new Error(
        `API-Football network error (${error.code}). Check your internet connection.`
      );
    }
    // Re-throw our own descriptive errors as-is
    if (error.message && error.message.startsWith('API-Football')) {
      throw error;
    }
    throw new Error(`API-Football request failed: ${error.message}`);
  }
}

// ─── Service functions ───────────────────────────────────────────────

/**
 * Search leagues by name / keyword.
 * @param {string} search - e.g. "world cup"
 */
async function searchLeagues(search) {
  return apiRequest('/leagues', { search });
}

/**
 * Get teams in a league + season.
 */
async function getTeamsByLeagueSeason(leagueId, season) {
  return apiRequest('/teams', { league: leagueId, season });
}

/**
 * Get fixtures (matches) for a league + season.
 */
async function getFixturesByLeagueSeason(leagueId, season) {
  return apiRequest('/fixtures', { league: leagueId, season });
}

/**
 * Get standings (group tables) for a league + season.
 */
async function getStandingsByLeagueSeason(leagueId, season) {
  return apiRequest('/standings', { league: leagueId, season });
}

/**
 * Get squad / player list for a team.
 */
async function getSquadsByTeam(teamId) {
  return apiRequest('/players/squads', { team: teamId });
}

/**
 * Get lineups for a specific fixture.
 */
async function getLineupsByFixture(fixtureId) {
  return apiRequest('/fixtures/lineups', { fixture: fixtureId });
}

/**
 * Get match statistics for a specific fixture.
 */
async function getFixtureStatistics(fixtureId) {
  return apiRequest('/fixtures/statistics', { fixture: fixtureId });
}

/**
 * Get predictions for a specific fixture (may not be available on free plan).
 */
async function getPredictionsByFixture(fixtureId) {
  try {
    return await apiRequest('/predictions', { fixture: fixtureId });
  } catch (err) {
    console.warn(
      `⚠️  Predictions not available for fixture ${fixtureId}: ${err.message}`
    );
    return [];
  }
}

/**
 * Helper: search for FIFA World Cup and filter for the 2026 season.
 * Returns the best-match league object (not saved to DB).
 */
async function findWorldCupLeague() {
  const leagues = await apiRequest('/leagues', { search: 'world cup' });

  // Filter for the men's FIFA World Cup
  const candidates = leagues.filter((item) => {
    const l = item.league;
    const name = (l.name || '').toLowerCase();
    const type = (l.type || '').toLowerCase();
    // Prefer "World Cup" with type "Cup", exclude women/U-17/U-20/qualifications
    return (
      name.includes('world cup') &&
      !name.includes('women') &&
      !name.includes('u-17') &&
      !name.includes('u-20') &&
      !name.includes('u17') &&
      !name.includes('u20') &&
      !name.includes('qualification') &&
      type === 'cup'
    );
  });

  if (candidates.length === 0) {
    return null;
  }

  // Try to find one that has 2026 in its seasons
  const with2026 = candidates.find((item) =>
    (item.seasons || []).some((s) => String(s.year) === '2026')
  );

  const best = with2026 || candidates[0];

  return {
    leagueId: best.league.id,
    name: best.league.name,
    logo: best.league.logo,
    country: best.country ? best.country.name : null,
    type: best.league.type,
    availableSeasons: (best.seasons || []).map((s) => s.year),
    has2026: (best.seasons || []).some((s) => String(s.year) === '2026'),
  };
}

/**
 * Return current request count for monitoring.
 */
function getRequestCount() {
  return requestCount;
}

module.exports = {
  searchLeagues,
  getTeamsByLeagueSeason,
  getFixturesByLeagueSeason,
  getStandingsByLeagueSeason,
  getSquadsByTeam,
  getLineupsByFixture,
  getFixtureStatistics,
  getPredictionsByFixture,
  findWorldCupLeague,
  getRequestCount,
};
