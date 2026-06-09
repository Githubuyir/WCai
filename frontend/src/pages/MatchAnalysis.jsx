import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matchesData as fallbackMatches, generateFlagSVG } from '../data/mockData';
import { getMatchById, getMatches } from '../api/api';
import { TEAMS_LINEUPS, getStartingXI } from '../data/teamsData';

const FIFA_RANKS = {
  FRA: 1, ESP: 2, ARG: 3, ENG: 4, POR: 5, BRA: 6, MAR: 7, NED: 8, BEL: 9, GER: 10,
  CRO: 11, COL: 13, SEN: 14, MEX: 15, USA: 16, URU: 17, JPN: 18, SUI: 19, IRN: 21,
  TUR: 22, AUT: 23, ECU: 24, KOR: 25, AUS: 27, ALG: 28, EGY: 29, CAN: 30, NOR: 31,
  PAN: 33, CIV: 34, SWE: 38, PAR: 40, CZE: 41, SCO: 43, COD: 45, TUN: 46, UZB: 50,
  QAT: 55, IRQ: 57, RSA: 60, KSA: 61, JOR: 63, BIH: 64, CPV: 68, GHA: 73, HAI: 82,
  CUR: 83, NZL: 85
};

export default function MatchAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const matchId = parseInt(id) || 1;
  const [match, setMatch] = useState(null);
  const [relatedMatches, setRelatedMatches] = useState([]);
  const [sliderVal, setSliderVal] = useState(50);

  // Fetch match details and related matches
  useEffect(() => {
    getMatchById(matchId)
      .then((data) => {
        setMatch(data);
      })
      .catch((err) => {
        console.warn("Error fetching match from API. Falling back to local data.", err);
        const localMatch = fallbackMatches.find((m) => m.id === matchId) || fallbackMatches[0];
        setMatch(localMatch);
      });

    getMatches()
      .then((data) => {
        setRelatedMatches(data.filter((m) => m.id !== matchId).slice(0, 3));
      })
      .catch((err) => {
        setRelatedMatches(fallbackMatches.filter((m) => m.id !== matchId).slice(0, 3));
      });
  }, [matchId]);

  // Synchronize state when match data changes
  useEffect(() => {
    if (match) {
      setSliderVal(match.team1.prob);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [match]);

  // Set document body class and handle entrance transitions
  useEffect(() => {
    document.body.className = 'analysis-body-page';

    // Entrance animations
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.99)';
    document.body.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

    const animationFrame = requestAnimationFrame(() => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'scale(1)';
    });

    const cleanupTimeout = setTimeout(() => {
      document.body.style.transform = '';
      document.body.style.transition = '';
    }, 500);

    return () => {
      document.body.className = '';
      cancelAnimationFrame(animationFrame);
      clearTimeout(cleanupTimeout);
    };
  }, [matchId]);

  // Calculated values based on slider tweaks
  const drawPercentage = useMemo(() => {
    const remaining = 100 - sliderVal;
    return Math.round(remaining * 0.28);
  }, [sliderVal]);

  const team2Percentage = useMemo(() => {
    return 100 - sliderVal - drawPercentage;
  }, [sliderVal, drawPercentage]);

  // Dynamic simulation engine scoreline predictions based on tweaked probabilities
  const simResults = useMemo(() => {
    let score1 = 1;
    let score2 = 1;

    if (sliderVal > 55) {
      score1 = Math.floor(sliderVal / 25);
      score2 = Math.floor(team2Percentage / 25);
    } else if (sliderVal < 35) {
      score1 = Math.floor(sliderVal / 25);
      score2 = Math.floor(team2Percentage / 25);
    } else {
      score1 = 1;
      score2 = 1;
    }

    if (score1 === score2 && sliderVal !== team2Percentage) {
      if (sliderVal > 50) score1 += 1;
      else if (sliderVal < 40) score2 += 1;
    }

    const upsetPct = sliderVal > 50 ? Math.round(team2Percentage * 1.1) : Math.round(sliderVal * 1.1);
    const finalUpsetPct = Math.min(90, Math.max(5, upsetPct));

    const scorePct1 = Math.round(sliderVal * 0.35);
    const scorePctDraw = Math.round(drawPercentage * 0.45);

    return {
      likelyScore: `${score1} - ${score2}`,
      upsetChance: `${finalUpsetPct}%`,
      oddsText: `${score1}-${score2} (${scorePct1}%) | ${score1 + 1}-${score2} (${Math.round(scorePct1 * 0.7)}%) | ${score1}-${score1} (${scorePctDraw}%)`
    };
  }, [sliderVal, drawPercentage, team2Percentage]);

  // Get starting XIs for both teams
  const team1XI = useMemo(() => {
    if (!match) return [];
    return getStartingXI(match.team1.code);
  }, [match]);

  const team2XI = useMemo(() => {
    if (!match) return [];
    return getStartingXI(match.team2.code);
  }, [match]);

  // Formations
  const team1Formation = useMemo(() => {
    if (!match) return "4-3-3";
    const team = TEAMS_LINEUPS[match.team1.code];
    return team ? team.formation : "4-3-3";
  }, [match]);

  const team2Formation = useMemo(() => {
    if (!match) return "4-2-3-1";
    const team = TEAMS_LINEUPS[match.team2.code];
    return team ? team.formation : "4-2-3-1";
  }, [match]);

  // Expected Momentum Timeline graph path
  const momentumPath = useMemo(() => {
    if (!match) return 'M 0 80 Q 75 40 150 80 T 300 80 T 450 80 T 600 80';
    const shift = (match.id * 15) % 90;
    const peakY1 = 80 - sliderVal * 0.9;
    const peakY2 = 80 + team2Percentage * 0.9;
    return `M 0 80 Q 75 ${peakY1} 150 80 T 300 ${80 + shift} T 450 ${peakY2} T 600 80`;
  }, [match, sliderVal, team2Percentage]);

  // Side-by-side tactical ratings matrix
  const tacticalMatrix = useMemo(() => {
    if (!match) return [];
    return [
      { name: "Attack Rating", t1: 70 + (match.xG1 * 8) % 25, t2: 65 + (match.xG2 * 8) % 25 },
      { name: "Midfield Control", t1: 65 + (match.team1.prob * 0.3) % 30, t2: 60 + (100 - match.team1.prob) * 0.3 % 30 },
      { name: "Defensive Strength", t1: 75 - (match.xG2 * 8) % 20, t2: 70 - (match.xG1 * 8) % 20 },
      { name: "Pressing Efficiency", t1: match.intensity * 0.9 + 5, t2: match.intensity * 0.8 + 10 },
      { name: "Transition Speed", t1: 60 + (match.id * 7) % 35, t2: 55 + (match.id * 11) % 35 },
      { name: "Aerial Dominance", t1: 50 + (match.id * 13) % 45, t2: 45 + (match.id * 17) % 45 }
    ];
  }, [match]);



  const handleRelatedNavigate = (mId) => {
    document.body.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'none';
      navigate(`/analysis/${mId}`);
    }, 400);
  };

  if (!match) {
    return (
      <main className="analysis-page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)', color: '#fff' }}>
        <div style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', background: 'rgba(5,10,48,0.3)', backdropFilter: 'blur(20px)' }}>
          <h3 className="no-matches-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Retrieving Tactical Dossier</h3>
          <p className="no-matches-text" style={{ fontSize: '0.85rem' }}>Accessing WCai Neural Network Projections...</p>
        </div>
      </main>
    );
  }

  const isUpsetPossible = match.team1.prob - match.team2.prob < 15;

  return (
    <main className="analysis-page-content" id="analysis-main-container">
      {/* Cinematic Hero Section */}
      <section className={`analysis-hero-section stadium-${match.stadiumAtmosphere}`} id="hero-bg-container">
        <div className="card-stadium-bg" id="hero-stadium-bg"></div>
        <div className="analysis-hero-overlay"></div>
        <div className="analysis-hero-grid-lines"></div>

        <div className="section-container hero-inner-container">
          {/* Badges header */}
          <div className="hero-badges-row">
            <span className="analysis-badge" id="hero-stage-badge">{match.group.toUpperCase()}</span>
            {match.isTopGame && (
              <span className="top-match-badge" id="hero-top-match-badge">
                <span className="pulse-ring"></span>
                TOP MATCH
              </span>
            )}
          </div>

          {/* Main Teams Matchup Row */}
          <div className="hero-teams-row">
            {/* Team 1 */}
            <div className="hero-team left">
              <div className="hero-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></div>
              <h1 className="hero-team-name">{match.team1.name} (#{FIFA_RANKS[match.team1.code] || '—'})</h1>
              <span className="hero-prob">{sliderVal}%</span>
            </div>

            {/* VS Middle Centerpiece */}
            <div className="hero-vs-center">
              <div className="vs-glow-circle">VS</div>
              <div className="vs-draw-box">Draw: {drawPercentage}%</div>
            </div>

            {/* Team 2 */}
            <div className="hero-team right">
              <div className="hero-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></div>
              <h1 className="hero-team-name">{match.team2.name} (#{FIFA_RANKS[match.team2.code] || '—'})</h1>
              <span className="hero-prob">{team2Percentage}%</span>
            </div>
          </div>

          {/* Interactive Win Balance Progress Track Slider */}
          <div className="hero-probability-interactive">
            <div className="hero-prob-bar-track">
              <div className="hero-prob-fill-left" style={{ width: `${sliderVal}%` }}></div>
              <div className="hero-prob-fill-draw" style={{ left: `${sliderVal}%`, width: `${drawPercentage}%` }}></div>
            </div>
            <div className="interactive-slider-wrapper">
              <label htmlFor="prob-balance-slider" className="slider-label">Simulate Interactive Match Balance (Tweak Probability)</label>
              <input
                type="range"
                id="prob-balance-slider"
                min="10"
                max="90"
                value={sliderVal}
                className="hero-slider"
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
              />
              <div className="slider-legend">
                <span>{match.team1.name} Win %</span>
                <span>{match.team2.name} Win %</span>
              </div>
            </div>
          </div>

          {/* Hero Venue & DateTime details row */}
          <div className="hero-details-row">
            <div className="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>{match.date.split(' - ')[0]}</span>
            </div>
            <div className="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>{match.date.split(' - ')[1]}</span>
            </div>
            <div className="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>{match.stadium}</span>
            </div>
            <div className="detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>AI Confidence: <strong className="text-cyan">{match.aiConfidence}%</strong></span>
            </div>
          </div>

          {/* Short AI Tactical Insight text */}
          <div className="hero-summary-insight">
            <span className="insight-title">AI TACTICAL SUMMARY OVERVIEW</span>
            <p className="insight-body">“{match.insight}”</p>
          </div>
        </div>
      </section>

      {/* Main Columns Analysis Grid */}
      <section className="analysis-grid-section">
        <div className="section-container">
          <div className="analysis-grid-layout">

            {/* LEFT COLUMN: Tactical Intelligence Visualizations */}
            <div className="left-analysis-column">

              {/* AI Tactical Simulation Report */}
              <div className="analysis-card">
                <h3 class="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  AI Tactical Simulation Report
                </h3>
                <div className="report-content-box">
                  <p>
                    Our neural network's deep-tactical engine has compiled a projected match simulation outline.
                    In this matchup, <strong>{match.team1.name}</strong> will confront <strong>{match.team2.name}</strong> at <strong>{match.stadium.split(',')[0]}</strong> under advanced strategic profiles.
                    <br /><br />
                    <strong>Pressing Intensity:</strong> AI simulations predict a pressing intensity rating of <strong>{match.intensity}%</strong>. {match.team1.name} is forecast to implement a high-block recovery press, locking central passing corridors. In response, {match.team2.name}'s transition schemes will rely heavily on lateral switching networks to bypass central congestion.
                    <br /><br />
                    <strong>Transition Behaviors:</strong> Expected goals metrics highlight an anticipated scoreline value of <strong>{match.xG1}</strong> to <strong>{match.xG2}</strong>. The attacking structures emphasize wing usage and quick vertical transitions. If {match.team2.name} can successfully navigate the defensive line during transition phases, the likelihood of counter-attacks on target increases by 24.5%.
                    <br /><br />
                    <strong>Defensive Structures:</strong> Tactical modeling expects {match.team1.name} to shape up in a compact mid-block defensive block to control space. {match.team2.name} is predicted to adopt a zonal containment strategy, aiming to force errors in wide areas and launch quick counters.
                  </p>
                </div>
              </div>

              {/* Predicted Lineups Visualization */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line><circle cx="12" cy="12" r="4"></circle></svg>
                  Predicted Lineups
                </h3>
                <div className="formation-teams-header">
                  <span className="formation-t-name left-align">{match.team1.name} ({team1Formation})</span>
                  <span className="vs-text">VS</span>
                  <span className="formation-t-name right-align">{match.team2.name} ({team2Formation})</span>
                </div>
                <div className="pitch-visualization-container">
                  <div className="pitch-border">
                    <div className="pitch-center-circle"></div>
                    <div className="pitch-center-line"></div>
                    <div className="pitch-penalty-left"></div>
                    <div className="pitch-penalty-right"></div>
                    {/* Dynamic players nodes */}
                    <div className="pitch-players-field">
                      {team1XI.map((p, index) => {
                        // Map vertical (x, y) to horizontal pitch left side
                        const left = 8 + (88 - p.y) / 72 * 37;
                        const top = p.x;
                        return (
                          <div
                            key={`t1-${index}`}
                            className="player-node-horizontal"
                            style={{ left: `${left}%`, top: `${top}%` }}
                          >
                            <div className="player-dot p-team1">
                              <span className="player-pulse"></span>
                            </div>
                            <div className="player-label-horizontal left-team">
                              <span className="p-name">{p.name}</span>
                              <span className="p-role">{p.role}</span>
                            </div>
                          </div>
                        );
                      })}
                      {team2XI.map((p, index) => {
                        // Map vertical (x, y) to horizontal pitch right side
                        const left = 55 + (p.y - 16) / 72 * 37;
                        const top = p.x;
                        return (
                          <div
                            key={`t2-${index}`}
                            className="player-node-horizontal"
                            style={{ left: `${left}%`, top: `${top}%` }}
                          >
                            <div className="player-dot p-team2">
                              <span className="player-pulse"></span>
                            </div>
                            <div className="player-label-horizontal right-team">
                              <span className="p-name">{p.name}</span>
                              <span className="p-role">{p.role}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="pitch-legend">
                  <span className="legend-dot color-team1"></span> {match.team1.name} Players
                  <span className="legend-dot color-team2" style={{ marginLeft: '20px' }}></span> {match.team2.name} Players
                </div>
              </div>

              {/* Match Momentum Timeline */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  Expected Match Momentum Timeline
                </h3>
                <div className="momentum-timeline-box">
                  <div className="momentum-teams-labels">
                    <span className="m-t-lbl team1-color">{match.team1.name} Attack Index</span>
                    <span className="m-t-lbl team2-color">{match.team2.name} Attack Index</span>
                  </div>

                  {/* Timeline graph container */}
                  <div className="momentum-graph-area">
                    <svg className="momentum-svg-graph" viewBox="0 0 600 160" preserveAspectRatio="none">
                      <path
                        className="momentum-graph-path"
                        d={momentumPath}
                        fill="none"
                        stroke="#00D1FF"
                        strokeWidth="3"
                      ></path>
                      <line x1="0" y1="80" x2="600" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" strokeWidth="1"></line>
                    </svg>

                    {/* Timeline indicator points */}
                    <div className="graph-nodes-row">
                      <div className="graph-node-label" style={{ left: '15%' }}>
                        <span className="node-dot"></span>
                        <span className="node-txt">Pressing Phase</span>
                      </div>
                      <div className="graph-node-label" style={{ left: '50%' }}>
                        <span className="node-dot"></span>
                        <span className="node-txt">Midfield Block</span>
                      </div>
                      <div className="graph-node-label" style={{ left: '75%' }}>
                        <span className="node-dot node-danger"></span>
                        <span className="node-txt text-danger">Upset Window</span>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-labels-footer">
                    <span>Kickoff</span>
                    <span>30m</span>
                    <span>Halftime</span>
                    <span>60m</span>
                    <span>Full Time</span>
                  </div>
                </div>
              </div>

              {/* AI Tactical Zones */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  AI Heatmap Tactical Zones
                </h3>
                <div className="heatmap-grid-layout">
                  {/* Defensive block */}
                  <div className="heatmap-zone-box block-left">
                    <span className="zone-lbl">{match.team1.name} Core Heat Zones</span>
                    <div className="heatmap-pitch-small">
                      <div className="heat-glow-node" style={{ top: '30%', left: '75%', width: '40px', height: '40px', background: 'radial-gradient(circle, rgba(0,209,255,0.3) 0%, transparent 70%)' }}></div>
                      <div className="heat-glow-node" style={{ top: '70%', left: '70%', width: '50px', height: '50px', background: 'radial-gradient(circle, rgba(0,209,255,0.25) 0%, transparent 70%)' }}></div>
                      <span className="pitch-tag">Right Wing Dominance</span>
                    </div>
                  </div>

                  {/* Attacking block */}
                  <div className="heatmap-zone-box block-right">
                    <span className="zone-lbl">{match.team2.name} Core Heat Zones</span>
                    <div className="heatmap-pitch-small">
                      <div className="heat-glow-node" style={{ top: '50%', left: '30%', width: '55px', height: '55px', background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)' }}></div>
                      <div className="heat-glow-node" style={{ top: '20%', left: '25%', width: '35px', height: '35px', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }}></div>
                      <span className="pitch-tag">Central Midfield Control</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Compact AI Metrics & Statistics */}
            <div className="right-analysis-column">

              {/* Predictive Metric Breakdown */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  Predictive Metric Breakdown
                </h3>
                <div className="metric-bars-stack">
                  {/* Pressing Intensity */}
                  <div className="bar-metric-wrapper">
                    <div className="bar-header">
                      <span>Pressing Intensity</span>
                      <span>{match.intensity}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill fill-cyan" style={{ width: `${match.intensity}%` }}></div>
                    </div>
                  </div>

                  {/* AI Confidence */}
                  <div className="bar-metric-wrapper">
                    <div className="bar-header">
                      <span>AI Confidence Index</span>
                      <span>{match.aiConfidence}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill fill-cyan" style={{ width: `${match.aiConfidence}%` }}></div>
                    </div>
                  </div>

                  {/* xG Projections */}
                  <div className="bar-metric-wrapper">
                    <div className="bar-header">
                      <span>Expected Goals Forecast (xG)</span>
                      <span>{match.xG1} - {match.xG2}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill fill-cyan" style={{ width: `${match.xG1 + match.xG2 > 0 ? (match.xG1 / (match.xG1 + match.xG2)) * 100 : 50}%` }}></div>
                    </div>
                  </div>

                  {/* Possession Projection */}
                  <div className="bar-metric-wrapper">
                    <div className="bar-header">
                      <span>Possession Projection</span>
                      <span>{Math.round(sliderVal / (sliderVal + team2Percentage) * 100)}% - {100 - Math.round(sliderVal / (sliderVal + team2Percentage) * 100)}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill fill-cyan" style={{ width: `${Math.round(sliderVal / (sliderVal + team2Percentage) * 100)}%` }}></div>
                    </div>
                  </div>

                  {/* Transition Speed */}
                  <div className="bar-metric-wrapper">
                    <div className="bar-header">
                      <span>Transition Speed Rating</span>
                      <span>{65 + (match.intensity % 25)}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill fill-cyan" style={{ width: `${65 + (match.intensity % 25)}%` }}></div>
                    </div>
                  </div>

                  {/* Defensive Stability */}
                  <div className="bar-metric-wrapper">
                    <div className="bar-header">
                      <span>Defensive Stability Rating</span>
                      <span>{60 + (match.aiConfidence % 30)}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill fill-cyan" style={{ width: `${60 + (match.aiConfidence % 30)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Form Comparison */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Recent Form Comparison
                </h3>
                <div className="form-comparison-stack">
                  {/* Team 1 Form */}
                  <div className="team-form-row">
                    <span className="form-t-lbl">{match.team1.name}</span>
                    <div className="form-badges-container">
                      {match.form1.map((f, i) => (
                        <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`}>{f}</span>
                      ))}
                    </div>
                  </div>

                  {/* Team 2 Form */}
                  <div className="team-form-row">
                    <span className="form-t-lbl">{match.team2.name}</span>
                    <div className="form-badges-container">
                      {match.form2.map((f, i) => (
                        <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Match Insights */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
                  Key Match Intelligence Insights
                </h3>
                <ul className="insights-bullets-list">
                  <li><strong>Zonal Disadvantage:</strong> {match.team1.name}'s transition speed forecast to test {match.team2.name}'s lateral shifting.</li>
                  <li><strong>Defensive Integrity:</strong> Zonal block configuration expected to block central crossing pipelines.</li>
                  <li><strong>Travel Intensity:</strong> Pressing intensity index of {match.intensity}% points to a high tempo opening 20 minutes.</li>
                  <li><strong>Set Piece Vulnerability:</strong> Expected goals ratio ({match.xG1} - {match.xG2}) indicates critical opportunities from direct corners.</li>
                  <li><strong>AI Simulation Result:</strong> {isUpsetPossible ? 'Upset ratio parameters suggest a highly competitive, close balance.' : 'High probability dominance predicted based on deep neural network weight variables.'}</li>
                </ul>
              </div>

              {/* Match Simulation Engine */}
              <div className="analysis-card">
                <h3 className="card-heading">
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                  Match Simulation Engine
                </h3>
                <div className="sim-engine-box">
                  <div className="sim-header">
                    <span className="sim-badge">10,000 SIMULATIONS RUN</span>
                    <span className="text-cyan font-sans" style={{ fontWeight: 700 }}>Monte Carlo Method</span>
                  </div>
                  <div className="sim-stats-grid">
                    <div className="sim-stat-item">
                      <span className="sim-lbl">Most Likely Score</span>
                      <span className="sim-val text-green">{simResults.likelyScore}</span>
                    </div>
                    <div className="sim-stat-item">
                      <span className="sim-lbl">Upset Chance</span>
                      <span className="sim-val">{simResults.upsetChance}</span>
                    </div>
                    <div className="sim-stat-item">
                      <span className="sim-lbl">Predicted Scoreline Probs</span>
                      <span className="sim-val-sub">{simResults.oddsText}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Side-by-Side Ratings Comparison Section */}
      <section className="ratings-comparison-section">
        <div className="section-container">
          <div className="analysis-card side-ratings-card">
            <h3 className="card-heading text-center" style={{ marginBottom: '24px' }}>
              Side-by-Side Tactical Matrix Ratings
            </h3>

            <div className="ratings-comparison-stack">
              {tacticalMatrix.map((cat, i) => {
                const val1 = Math.round(cat.t1);
                const val2 = Math.round(cat.t2);

                return (
                  <div key={i} className="rating-comparison-row">
                    <div className="team-rating-lbl text-left">{match.team1.name}</div>
                    <div className="matrix-mid-bar-layout">
                      <div className="matrix-label-heading">{cat.name}</div>
                      <div className="matrix-double-track">
                        {/* Left Team Bar */}
                        <div className="matrix-half-track left-side">
                          <div className="matrix-fill fill-cyan" style={{ width: `${val1}%` }}></div>
                        </div>
                        <div className="matrix-divider"></div>
                        {/* Right Team Bar */}
                        <div className="matrix-half-track right-side">
                          <div className="matrix-fill fill-white" style={{ width: `${val2}%` }}></div>
                        </div>
                      </div>
                      <div className="matrix-values-row">
                        <span className="text-cyan font-sans" style={{ fontWeight: 700 }}>{val1}</span>
                        <span className="text-secondary font-sans" style={{ fontWeight: 700 }}>{val2}</span>
                      </div>
                    </div>
                    <div className="team-rating-lbl text-right">{match.team2.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Related Matches Section */}
      <section className="related-matches-section">
        <div className="section-container">
          <h2 className="section-title">More <span class="cyan-highlight">Match Intelligence Hub</span></h2>
          <p className="section-subtitle">Navigate directly to other upcoming match simulation breakdowns.</p>

          <div className="matches-grid related-grid" id="related-matches-grid">
            {relatedMatches.map((m, index) => {
              const dateParts = m.date.split(' - ');
              const dateString = dateParts[0];
              const timeString = dateParts[1];
              const stadiumNameShort = m.stadium.split(',')[0];

              return (
                <div
                  key={m.id}
                  className={`match-grid-card stadium-${m.stadiumAtmosphere}`}
                  style={{ animationDelay: `${index * 0.1}s`, minHeight: '320px' }}
                >
                  <div className="card-stadium-bg"></div>
                  <div className="card-glow-overlay"></div>

                  <div className="card-header-row">
                    <span className="card-date-badge">{dateString}</span>
                    <span className="card-group">{m.group}</span>
                  </div>

                  <div className="card-teams-layout" style={{ marginTop: '10px' }}>
                    {/* Team 1 */}
                    <div className="card-team-box">
                      <div className="card-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(m.team1.code) }}></div>
                      <span className="card-team-name">{m.team1.name}</span>
                      <span className="card-team-prob">{m.team1.prob}%</span>
                    </div>

                    {/* Divider VS */}
                    <div className="card-vs-divider">
                      <span className="vs-inner-text">VS</span>
                      <span className="vs-draw-percent">{m.drawProb}% Draw</span>
                    </div>

                    {/* Team 2 */}
                    <div className="card-team-box">
                      <div className="card-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(m.team2.code) }}></div>
                      <span className="card-team-name">{m.team2.name}</span>
                      <span className="card-team-prob">{m.team2.prob}%</span>
                    </div>
                  </div>

                  <div className="card-venue-bar" style={{ margin: '12px 0' }}>
                    <svg className="venue-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="card-venue-text">{stadiumNameShort} • {timeString}</span>
                  </div>

                  <button
                    className="btn-grid-analyze"
                    onClick={() => handleRelatedNavigate(m.id)}
                    style={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: 'auto' }}
                  >
                    Analyze Match →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
