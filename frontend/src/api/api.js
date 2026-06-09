/**
 * WCai API Helper
 * Centralised fetch wrapper for all backend endpoints.
 * Falls back gracefully so the UI never breaks if the backend is down.
 */

const API_BASE = import.meta.env.VITE_API_URL || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://${window.location.hostname}:5001/api`
    : `${window.location.origin}/api`
);

/**
 * Generic fetcher with timeout & error normalisation.
 * @param {string} path - API path, e.g. "/matches"
 * @param {object} [opts] - fetch options
 * @returns {Promise<any>}
 */
async function apiFetch(path, opts = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 s timeout

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...opts,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err; // let callers handle fallback
  }
}

/* ------------------------------------------------------------------ */
/*  Public helpers                                                     */
/* ------------------------------------------------------------------ */

/** Fetch all matches. */
export async function getMatches() {
  return apiFetch('/matches');
}

/** Fetch a single match by its numeric id. */
export async function getMatchById(id) {
  return apiFetch(`/matches/${id}`);
}

/** Fetch all teams. */
export async function getTeams() {
  return apiFetch('/teams');
}

/** Fetch a single team by code (e.g. "ARG"). */
export async function getTeamByCode(code) {
  return apiFetch(`/teams/${code}`);
}

/** Fetch insights (hero metrics, tactical evolution, matchup intelligence, narrative insights). */
export async function getInsights() {
  return apiFetch('/insights');
}

/** Re-export the base URL for any component that still uses raw fetch. */
export { API_BASE as API_URL };
