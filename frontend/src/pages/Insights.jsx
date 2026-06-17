import React, { useState, useEffect, useMemo } from 'react';
import { generateFlagSVG } from '../data/mockData';
import { getInsights } from '../api/api';

// Fallback data (mirrors the seed) used when the backend is unavailable
const fallbackInsights = {
  heroMetrics: {
    simulationsRun: "2.4M",
    tacticalSystems: 48,
    predictionConfidence: "87%",
    volatilityIndex: "Moderate"
  },
  tacticalEvolution: [
    { title: "High Press Systems", trend: "+21%", summary: "High recovery counter-pressing increased significantly in knockout simulations, limiting transition time for midfield pivots." },
    { title: "Compact Mid-Blocks", trend: "+14%", summary: "Deep and mid zonal blocks are neutralizing possession teams by overloading central passing channels and forcing wide crosses." },
    { title: "Transition Efficiency", trend: "+18%", summary: "Direct transitions into deep vertical runs are registering the highest increase in conversion rate across simulations." },
    { title: "Wide Overload xG", trend: "+26%", summary: "Attacking strategies creating overloads in wide spaces and half-spaces are producing 26% higher quality shot opportunities." }
  ],
  matchupIntelligence: [
    { category: "BEST ATTACK", team: "Brazil", code: "BRA", emoji: "🇧🇷", score: 96.8, summary: "Fluid horizontal rotations, high xG generation in zone 14, and individual overload profiles from half-spaces make Brazil's system the tournament's most lethal attacking threat." },
    { category: "MOST AGGRESSIVE PRESS", team: "Germany", code: "GER", emoji: "🇩🇪", score: 94.2, summary: "Germany leads simulations in low PPDA (Passes Per Defensive Action) scores, enforcing extremely fast ball-recovery times in the opponent's final third." },
    { category: "STRONGEST MIDFIELD CONTROL", team: "Spain", code: "ESP", emoji: "🇪🇸", score: 95.5, summary: "Exceptional pass completion under high pressure (88.4%) and structural resting defense shapes keep Spain in control of central transition spaces." },
    { category: "HIGHEST TRANSITION SPEED", team: "France", code: "FRA", emoji: "🇫🇷", score: 93.8, summary: "Averaging 4.8 seconds from defensive ball recovery to final third entries. Explores vertical spaces with high-pace wing systems." },
    { category: "MOST DEFENSIVELY STABLE", team: "Portugal", code: "POR", emoji: "🇵🇹", score: 92.4, summary: "Low opposition xG allowed inside the box. Portuguese compact mid-block defensive lines show minimal spacing gaps under sustained pressure." },
    { category: "MOST UNPREDICTABLE TEAM", team: "Canada", code: "CAN", emoji: "🇨🇦", score: 88.9, summary: "High variation of formations (switching between 3-5-2 and 4-3-3 mid-game) makes tactical preparation difficult for opponents in current projections." }
  ],
  narrativeInsights: [
    { topic: "TACTICAL ANALYSIS", title: "Youth Dynamics vs Veteran Systems", summary: "Our models suggest that squads with an average age below 26 are significantly outperforming veteran-heavy squads. High-intensity pressing and physical durability over 90+ minutes are playing a greater role than positional experience on the hot pitches of the 2026 World Cup." },
    { topic: "TOURNAMENT EVOLUTION", title: "The Slow Death of Pure Possession", summary: "Possession volume is losing its correlation to win probability. The tournament model indicates compact, defensively solid mid-blocks that control spaces rather than the ball are generating the highest margin of efficiency, waiting for vertical transition triggers to strike." },
    { topic: "NATION PROFILES", title: "South American Transition Dominance", summary: "South American teams (Brazil, Argentina, Uruguay) are setting record-high transition efficiency ratings. Midfield recovery rates coupled with immediate direct progression mean they bypass traditional build-up phases, exposing opponents' unorganized backlines." },
    { topic: "xG TELEMETRY", title: "Exploiting the Half-Spaces", summary: "Overload setups in wide areas and half-spaces are generating the highest xG patterns. Systems that pull fullbacks out of position and use inverted wingers to thread diagonal passes between CB-FB channels are breaking low blocks at a 26% higher success rate." }
  ]
};

// SVG icon components for tactical evolution cards (kept as JSX to preserve existing visuals)
const trendIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 2.1l4 4-4 4M3 22v-6c0-1.1.9-2 2-2h12"/><polyline points="7 21 3 17 7 13"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
];

// Mini pitch visuals for each tactical evolution card (kept as JSX to preserve existing visuals)
const trendVisuals = [
  <div className="trend-visual-field"><div className="mini-pitch-texture"></div><div className="visual-arrow" style={{ top: '25%', left: '30%', width: '40px', transform: 'rotate(-15deg)', borderTop: '1.5px dashed var(--primary-accent)' }}></div><div className="visual-arrow" style={{ top: '75%', left: '30%', width: '40px', transform: 'rotate(15deg)', borderTop: '1.5px dashed var(--primary-accent)' }}></div><div className="visual-node active" style={{ top: '50%', left: '55%' }}></div><div className="visual-node" style={{ top: '30%', left: '75%' }}></div><div className="visual-node" style={{ top: '70%', left: '75%' }}></div></div>,
  <div className="trend-visual-field"><div className="mini-pitch-texture"></div><div style={{ position: 'absolute', top: '20%', left: '40%', width: '25%', height: '60%', border: '1px dashed rgba(0, 209, 255, 0.4)', borderRadius: '4px', background: 'rgba(0, 209, 255, 0.03)' }}></div><div className="visual-node active" style={{ top: '35%', left: '48%' }}></div><div className="visual-node active" style={{ top: '65%', left: '48%' }}></div><div className="visual-node active" style={{ top: '50%', left: '58%' }}></div></div>,
  <div className="trend-visual-field"><div className="mini-pitch-texture"></div><div className="visual-arrow" style={{ top: '48%', left: '20%', width: '180px', borderTop: '2px solid var(--primary-accent)' }}></div><div className="visual-node" style={{ top: '50%', left: '20%' }}></div><div className="visual-node active" style={{ top: '50%', left: '80%', width: '12px', height: '12px', boxShadow: '0 0 12px #00D1FF' }}></div></div>,
  <div className="trend-visual-field"><div className="mini-pitch-texture"></div><div style={{ position: 'absolute', top: '15%', left: '70%', width: '25px', height: '25px', borderRadius: '50%', border: '1.5px solid rgba(0, 209, 255, 0.4)', background: 'rgba(0, 209, 255, 0.05)', animation: 'heat-pulse 2s infinite ease-in-out' }}></div><div style={{ position: 'absolute', top: '70%', left: '70%', width: '25px', height: '25px', borderRadius: '50%', border: '1.5px solid rgba(0, 209, 255, 0.4)', background: 'rgba(0, 209, 255, 0.05)', animation: 'heat-pulse 2s infinite ease-in-out 1s' }}></div><div className="visual-node" style={{ top: '25%', left: '75%' }}></div><div className="visual-node active" style={{ top: '75%', left: '75%' }}></div></div>
];

export default function Insights() {
  const [insightsData, setInsightsData] = useState(fallbackInsights);
  const [insightsLoading, setInsightsLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeRound, setActiveRound] = useState('r32');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch insights from API
  useEffect(() => {
    setInsightsLoading(true);
    getInsights()
      .then((data) => {
        setInsightsData(data);
      })
      .catch((err) => {
        console.warn('Error fetching insights from API. Using fallback data.', err);
        setInsightsData(fallbackInsights);
      })
      .finally(() => setInsightsLoading(false));
  }, []);

  // Set document body class and handle simulator scroll from hash
  useEffect(() => {
    document.body.className = 'insights-body-page';

    const handleScrollToSim = () => {
      if (window.location.hash === '#simulator') {
        const el = document.querySelector('.simulator-section');
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    handleScrollToSim();

    return () => {
      document.body.className = '';
    };
  }, []);

  // 1. Floating Particles Generator
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 45; i++) {
      list.push({
        size: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${Math.random() * 12 + 10}s`
      });
    }
    return list;
  }, []);

  // 2. Bracket Constants & Helpers
  const teamWeights = useMemo(() => ({
    ARG: 94, BRA: 93, FRA: 92, GER: 91, ESP: 89, ENG: 89, POR: 88, NED: 87,
    BEL: 86, URU: 84, MAR: 84, USA: 83, JPN: 83, CRO: 83, MEX: 82, COL: 82,
    SUI: 81, SEN: 81, ECU: 80, EGY: 80, AUT: 80, TUR: 79, NOR: 79, ALG: 79,
    KOR: 78, CIV: 78, SWE: 78, CAN: 77, GHA: 76, SCO: 75, AUS: 75, IRN: 74,
    KSA: 73, UZB: 73, JOR: 73, BIH: 72, RSA: 71
  }), []);

  const teamNames = useMemo(() => ({
    ARG: 'Argentina', BRA: 'Brazil', FRA: 'France', GER: 'Germany', ESP: 'Spain', ENG: 'England', POR: 'Portugal', NED: 'Netherlands',
    BEL: 'Belgium', URU: 'Uruguay', MAR: 'Morocco', USA: 'USA', JPN: 'Japan', CRO: 'Croatia', MEX: 'Mexico', COL: 'Colombia',
    SUI: 'Switzerland', SEN: 'Senegal', ECU: 'Ecuador', EGY: 'Egypt', AUT: 'Austria', TUR: 'Türkiye', NOR: 'Norway', ALG: 'Algeria',
    KOR: 'Korea Republic', CIV: 'Cote d\'Ivoire', SWE: 'Sweden', CAN: 'Canada', GHA: 'Ghana', SCO: 'Scotland', AUS: 'Australia', IRN: 'IR Iran',
    KSA: 'Saudi Arabia', UZB: 'Uzbekistan', JOR: 'Jordan', BIH: 'Bosnia & Herz.', RSA: 'South Africa'
  }), []);

  const groupStandings = useMemo(() => ({
    A: { winner: { code: 'MEX', name: 'Mexico' }, runnerUp: { code: 'KOR', name: 'Korea Republic' }, third: { code: 'RSA', name: 'South Africa', rating: 71 } },
    B: { winner: { code: 'SUI', name: 'Switzerland' }, runnerUp: { code: 'CAN', name: 'Canada' }, third: { code: 'BIH', name: 'Bosnia & Herz.', rating: 72 } },
    C: { winner: { code: 'BRA', name: 'Brazil' }, runnerUp: { code: 'MAR', name: 'Morocco' }, third: { code: 'SCO', name: 'Scotland', rating: 75 } },
    D: { winner: { code: 'USA', name: 'USA' }, runnerUp: { code: 'AUS', name: 'Australia' }, third: { code: 'TUR', name: 'Türkiye', rating: 79 } },
    E: { winner: { code: 'GER', name: 'Germany' }, runnerUp: { code: 'ECU', name: 'Ecuador' }, third: { code: 'CIV', name: 'Cote d\'Ivoire', rating: 78 } },
    F: { winner: { code: 'NED', name: 'Netherlands' }, runnerUp: { code: 'JPN', name: 'Japan' }, third: { code: 'SWE', name: 'Sweden', rating: 78 } },
    G: { winner: { code: 'BEL', name: 'Belgium' }, runnerUp: { code: 'EGY', name: 'Egypt' }, third: { code: 'IRN', name: 'IR Iran', rating: 74 } },
    H: { winner: { code: 'ESP', name: 'Spain' }, runnerUp: { code: 'URU', name: 'Uruguay' }, third: { code: 'KSA', name: 'Saudi Arabia', rating: 73 } },
    I: { winner: { code: 'NOR', name: 'Norway' }, runnerUp: { code: 'FRA', name: 'France' }, third: { code: 'SEN', name: 'Senegal', rating: 81 } },
    J: { winner: { code: 'ARG', name: 'Argentina' }, runnerUp: { code: 'AUT', name: 'Austria' }, third: { code: 'JOR', name: 'Jordan', rating: 73 } },
    K: { winner: { code: 'POR', name: 'Portugal' }, runnerUp: { code: 'COL', name: 'Colombia' }, third: { code: 'UZB', name: 'Uzbekistan', rating: 73 } },
    L: { winner: { code: 'ENG', name: 'England' }, runnerUp: { code: 'CRO', name: 'Croatia' }, third: { code: 'GHA', name: 'Ghana', rating: 76 } }
  }), []);

  const thirdPlaceSlots = useMemo(() => [
    { matchId: 74, groups: ['A', 'B', 'C', 'D', 'F'] },
    { matchId: 77, groups: ['C', 'D', 'F', 'G', 'H'] },
    { matchId: 79, groups: ['C', 'E', 'F', 'H', 'I'] },
    { matchId: 80, groups: ['E', 'H', 'I', 'J', 'K'] },
    { matchId: 81, groups: ['B', 'E', 'F', 'I', 'J'] },
    { matchId: 82, groups: ['A', 'E', 'H', 'I', 'J'] },
    { matchId: 85, groups: ['E', 'F', 'G', 'I', 'J'] },
    { matchId: 87, groups: ['D', 'E', 'I', 'J', 'L'] }
  ], []);

  // Backtracking third-place team allocator
  const thirdPlaceAllocation = useMemo(() => {
    const thirds = Object.keys(groupStandings).map(g => ({
      group: g,
      code: groupStandings[g].third.code,
      name: groupStandings[g].third.name,
      rating: groupStandings[g].third.rating
    }));
    thirds.sort((a, b) => b.rating - a.rating);

    const assignment = {};
    
    function backtrack(slotIdx, usedCodes) {
      if (slotIdx === thirdPlaceSlots.length) return true;
      const slot = thirdPlaceSlots[slotIdx];
      
      for (let team of thirds) {
        if (usedCodes.has(team.code)) continue;
        if (slot.groups.includes(team.group)) {
          assignment[slot.matchId] = { code: team.code, name: team.name };
          usedCodes.add(team.code);
          
          if (backtrack(slotIdx + 1, usedCodes)) {
            return true;
          }
          
          usedCodes.delete(team.code);
          delete assignment[slot.matchId];
        }
      }
      return false;
    }

    const success = backtrack(0, new Set());
    if (success) return assignment;
    
    // Fallback if backtracking fails
    const fallback = {};
    thirdPlaceSlots.forEach(slot => {
      const bestEligible = thirds.find(t => slot.groups.includes(t.group));
      fallback[slot.matchId] = bestEligible ? { code: bestEligible.code, name: bestEligible.name } : { code: 'RSA', name: 'South Africa' };
    });
    return fallback;
  }, [groupStandings, thirdPlaceSlots]);

  const matchDestinations = useMemo(() => ({
    73: { matchId: 90, slot: 'team1' },
    74: { matchId: 89, slot: 'team1' },
    75: { matchId: 90, slot: 'team2' },
    76: { matchId: 91, slot: 'team1' },
    77: { matchId: 89, slot: 'team2' },
    78: { matchId: 91, slot: 'team2' },
    79: { matchId: 92, slot: 'team1' },
    80: { matchId: 92, slot: 'team2' },
    81: { matchId: 94, slot: 'team1' },
    82: { matchId: 94, slot: 'team2' },
    83: { matchId: 93, slot: 'team1' },
    84: { matchId: 93, slot: 'team2' },
    85: { matchId: 96, slot: 'team1' },
    86: { matchId: 95, slot: 'team1' },
    87: { matchId: 96, slot: 'team2' },
    88: { matchId: 95, slot: 'team2' },
    
    89: { matchId: 97, slot: 'team1' },
    90: { matchId: 97, slot: 'team2' },
    91: { matchId: 99, slot: 'team1' },
    92: { matchId: 99, slot: 'team2' },
    93: { matchId: 98, slot: 'team1' },
    94: { matchId: 98, slot: 'team2' },
    95: { matchId: 100, slot: 'team1' },
    96: { matchId: 100, slot: 'team2' },
    
    97: { matchId: 101, slot: 'team1' },
    98: { matchId: 101, slot: 'team2' },
    99: { matchId: 102, slot: 'team1' },
    100: { matchId: 102, slot: 'team2' },
    
    101: { matchId: 104, slot: 'team1' },
    102: { matchId: 104, slot: 'team2' }
  }), []);

  // Elo rating calculator
  const calculateMatchupProbs = (t1, t2) => {
    if (!t1 || !t2) return { prob1: 50, prob2: 50 };
    const w1 = teamWeights[t1.code] || 70;
    const w2 = teamWeights[t2.code] || 70;
    
    const ratio = w1 / (w1 + w2);
    const prob1 = Math.round(ratio * 100);
    const prob2 = 100 - prob1;
    return { prob1, prob2 };
  };

  const initialMatches = useMemo(() => {
    const initial = {
      // Round of 32
      73: { id: 73, round: 'r32', team1: groupStandings.A.runnerUp, team2: groupStandings.B.runnerUp, winner: null },
      74: { id: 74, round: 'r32', team1: groupStandings.E.winner, team2: thirdPlaceAllocation[74], winner: null },
      75: { id: 75, round: 'r32', team1: groupStandings.F.winner, team2: groupStandings.C.runnerUp, winner: null },
      76: { id: 76, round: 'r32', team1: groupStandings.C.winner, team2: groupStandings.F.runnerUp, winner: null },
      77: { id: 77, round: 'r32', team1: groupStandings.I.winner, team2: thirdPlaceAllocation[77], winner: null },
      78: { id: 78, round: 'r32', team1: groupStandings.E.runnerUp, team2: groupStandings.I.runnerUp, winner: null },
      79: { id: 79, round: 'r32', team1: groupStandings.A.winner, team2: thirdPlaceAllocation[79], winner: null },
      80: { id: 80, round: 'r32', team1: groupStandings.L.winner, team2: thirdPlaceAllocation[80], winner: null },
      81: { id: 81, round: 'r32', team1: groupStandings.D.winner, team2: thirdPlaceAllocation[81], winner: null },
      82: { id: 82, round: 'r32', team1: groupStandings.G.winner, team2: thirdPlaceAllocation[82], winner: null },
      83: { id: 83, round: 'r32', team1: groupStandings.K.runnerUp, team2: groupStandings.L.runnerUp, winner: null },
      84: { id: 84, round: 'r32', team1: groupStandings.H.winner, team2: groupStandings.J.runnerUp, winner: null },
      85: { id: 85, round: 'r32', team1: groupStandings.B.winner, team2: thirdPlaceAllocation[85], winner: null },
      86: { id: 86, round: 'r32', team1: groupStandings.J.winner, team2: groupStandings.H.runnerUp, winner: null },
      87: { id: 87, round: 'r32', team1: groupStandings.K.winner, team2: thirdPlaceAllocation[87], winner: null },
      88: { id: 88, round: 'r32', team1: groupStandings.D.runnerUp, team2: groupStandings.G.runnerUp, winner: null },

      // Round of 16
      89: { id: 89, round: 'r16', team1: null, team2: null, winner: null },
      90: { id: 90, round: 'r16', team1: null, team2: null, winner: null },
      91: { id: 91, round: 'r16', team1: null, team2: null, winner: null },
      92: { id: 92, round: 'r16', team1: null, team2: null, winner: null },
      93: { id: 93, round: 'r16', team1: null, team2: null, winner: null },
      94: { id: 94, round: 'r16', team1: null, team2: null, winner: null },
      95: { id: 95, round: 'r16', team1: null, team2: null, winner: null },
      96: { id: 96, round: 'r16', team1: null, team2: null, winner: null },

      // Quarter Finals
      97: { id: 97, round: 'qf', team1: null, team2: null, winner: null },
      98: { id: 98, round: 'qf', team1: null, team2: null, winner: null },
      99: { id: 99, round: 'qf', team1: null, team2: null, winner: null },
      100: { id: 100, round: 'qf', team1: null, team2: null, winner: null },

      // Semi Finals
      101: { id: 101, round: 'sf', team1: null, team2: null, winner: null },
      102: { id: 102, round: 'sf', team1: null, team2: null, winner: null },

      // Final
      104: { id: 104, round: 'final', team1: null, team2: null, winner: null }
    };

    // Initialize probabilities for Round of 32
    for (let id = 73; id <= 88; id++) {
      const match = initial[id];
      const probs = calculateMatchupProbs(match.team1, match.team2);
      match.team1.prob = probs.prob1;
      match.team2.prob = probs.prob2;
    }

    return initial;
  }, [groupStandings, thirdPlaceAllocation]);

  // Matches State
  const [matches, setMatches] = useState(initialMatches);

  // Reset simulator
  const handleReset = () => {
    setMatches(initialMatches);
  };

  // Propagation of winner function
  const propagateWinner = (currentMatches, matchId, winner) => {
    const updated = { ...currentMatches };
    
    const dest = matchDestinations[matchId];
    if (dest) {
      const destMatch = { ...updated[dest.matchId] };
      const oldTeam = destMatch[dest.slot];
      
      if (!oldTeam || oldTeam.code !== (winner ? winner.code : null)) {
        destMatch[dest.slot] = winner ? { code: winner.code, name: winner.name } : null;
        
        // Invalidate downstream winner if slot changed
        if (destMatch.winner) {
          destMatch.winner = null;
        }
        
        // Recalculate probabilities
        if (destMatch.team1 && destMatch.team2) {
          const probs = calculateMatchupProbs(destMatch.team1, destMatch.team2);
          destMatch.team1 = { ...destMatch.team1, prob: probs.prob1 };
          destMatch.team2 = { ...destMatch.team2, prob: probs.prob2 };
        }
        
        updated[dest.matchId] = destMatch;
        return propagateWinner(updated, dest.matchId, null);
      }
    }
    return updated;
  };

  // Click handler for team slots
  const handleSlotClick = (matchId, teamIdx) => {
    const match = matches[matchId];
    if (!match.team1 || !match.team2) return;
    
    const selectedTeam = teamIdx === 0 ? match.team1 : match.team2;
    if (match.winner && match.winner.code === selectedTeam.code) return;

    let updatedMatches = { ...matches };
    updatedMatches[matchId] = {
      ...match,
      winner: { code: selectedTeam.code, name: selectedTeam.name }
    };

    updatedMatches = propagateWinner(updatedMatches, matchId, { code: selectedTeam.code, name: selectedTeam.name });
    setMatches(updatedMatches);
  };

  // Dynamic Telemetry Calculations
  // Dynamic Telemetry Calculations
  const getMatchProb = (match, teamCode) => {
    if (!match) return 50;
    if (match.team1 && match.team2) {
      return match.team1.code === teamCode ? (match.team1.prob || 50) : (match.team2.prob || 50);
    }
    return 50;
  };

  const calculateCupProb = (code) => {
    // If eliminated, return 0
    for (let id in matches) {
      const m = matches[id];
      if (m.winner && m.winner.code !== code) {
        if ((m.team1 && m.team1.code === code) || (m.team2 && m.team2.code === code)) {
          return 0;
        }
      }
    }
    
    // If Champion
    if (matches[104].winner && matches[104].winner.code === code) {
      return 100;
    }
    
    const baseProbs = {
      ARG: 16, BRA: 14, FRA: 13, GER: 11, ESP: 10, ENG: 9, POR: 8, NED: 6,
      BEL: 5, URU: 4, MAR: 4, USA: 3, JPN: 3, CRO: 3, MEX: 2, COL: 2
    };
    
    let currentRound = 'r32';
    let currentMatch = null;
    
    // Check R16
    for (let id of [89,90,91,92,93,94,95,96]) {
      const m = matches[id];
      if (m && ((m.team1 && m.team1.code === code) || (m.team2 && m.team2.code === code))) {
        currentRound = 'r16';
        currentMatch = m;
      }
    }
    
    // Check QF
    for (let id of [97,98,99,100]) {
      const m = matches[id];
      if (m && ((m.team1 && m.team1.code === code) || (m.team2 && m.team2.code === code))) {
        currentRound = 'qf';
        currentMatch = m;
      }
    }
    
    // Check SF
    for (let id of [101,102]) {
      const m = matches[id];
      if (m && ((m.team1 && m.team1.code === code) || (m.team2 && m.team2.code === code))) {
        currentRound = 'sf';
        currentMatch = m;
      }
    }
    
    // Check Final
    const fm = matches[104];
    if (fm && ((fm.team1 && fm.team1.code === code) || (fm.team2 && fm.team2.code === code))) {
      currentRound = 'final';
      currentMatch = fm;
    }
    
    const w = teamWeights[code] || 70;
    
    if (currentRound === 'final') {
      return getMatchProb(fm, code);
    }
    
    if (currentRound === 'sf') {
      const sfProb = getMatchProb(currentMatch, code);
      const estFinalProb = w / (w + 88);
      return Math.round(sfProb * estFinalProb * 0.95);
    }
    
    if (currentRound === 'qf') {
      const qfProb = getMatchProb(currentMatch, code);
      const estSfProb = w / (w + 86);
      const estFinalProb = w / (w + 88);
      return Math.round(qfProb * estSfProb * estFinalProb * 0.90);
    }
    
    if (currentRound === 'r16') {
      const r16Prob = getMatchProb(currentMatch, code);
      const estQfProb = w / (w + 84);
      const estSfProb = w / (w + 86);
      const estFinalProb = w / (w + 88);
      return Math.round(r16Prob * estQfProb * estSfProb * estFinalProb * 0.85);
    }
    
    return baseProbs[code] || 1;
  };

  // Memoized Winner Odds and Upset count
  const telemetryData = useMemo(() => {
    const activeCodes = Object.keys(teamWeights).filter(code => {
      for (let id in matches) {
        const m = matches[id];
        if (m.winner && m.winner.code !== code) {
          if ((m.team1 && m.team1.code === code) || (m.team2 && m.team2.code === code)) {
            return false;
          }
        }
      }
      return true;
    });

    const teamProbs = activeCodes.map(code => ({
      code,
      name: teamNames[code] || code,
      prob: calculateCupProb(code)
    }));
    
    teamProbs.sort((a, b) => b.prob - a.prob);
    const top3 = teamProbs.slice(0, 3);
    const leadingTeam = top3[0] ? top3[0].code : 'BRA';

    // Count upsets
    let upsetCount = 0;
    let biggestUpset = null;
    let maxUpsetDiff = 0;

    for (let id in matches) {
      const m = matches[id];
      if (m.winner && m.team1 && m.team2) {
        const w1 = teamWeights[m.team1.code] || 70;
        const w2 = teamWeights[m.team2.code] || 70;
        
        const isUpset1 = m.winner.code === m.team1.code && w1 < w2;
        const isUpset2 = m.winner.code === m.team2.code && w2 < w1;

        if (isUpset1 || isUpset2) {
          upsetCount++;
          const diff = Math.abs(w1 - w2);
          if (diff > maxUpsetDiff) {
            maxUpsetDiff = diff;
            biggestUpset = {
              winner: m.winner,
              loser: m.winner.code === m.team1.code ? m.team2 : m.team1
            };
          }
        }
      }
    }

    const upsetRisk = Math.min(18 + upsetCount * 6, 85);
    const confidence = Math.max(87 - upsetCount * 3, 45);
    const volatility = upsetCount === 0 ? 'Low' : upsetCount <= 2 ? 'Moderate' : 'High';

    // Route Flow mapping
    let r16Opponent = 'TBD';
    let qfOpponent = 'TBD';
    let sfOpponent = 'TBD';

    let r32MatchId = null;
    for (let id = 73; id <= 88; id++) {
      const m = matches[id];
      if ((m.team1 && m.team1.code === leadingTeam) || (m.team2 && m.team2.code === leadingTeam)) {
        r32MatchId = id;
        break;
      }
    }

    if (r32MatchId) {
      const r16Dest = matchDestinations[r32MatchId];
      if (r16Dest) {
        const siblingR32Id = Object.keys(matchDestinations).find(key => 
          parseInt(key) !== r32MatchId && 
          matchDestinations[key].matchId === r16Dest.matchId &&
          parseInt(key) >= 73 && parseInt(key) <= 88
        );
        if (siblingR32Id) {
          const sibMatch = matches[siblingR32Id];
          if (sibMatch.winner) r16Opponent = sibMatch.winner.name;
          else r16Opponent = (sibMatch.team1 && sibMatch.team2) ? `${sibMatch.team1.code}/${sibMatch.team2.code}` : 'TBD';
        }
      }

      const qfDest = matchDestinations[r16Dest.matchId];
      if (qfDest) {
        const siblingR16Id = Object.keys(matchDestinations).find(key => 
          parseInt(key) !== r16Dest.matchId && 
          matchDestinations[key].matchId === qfDest.matchId &&
          parseInt(key) >= 89 && parseInt(key) <= 96
        );
        if (siblingR16Id) {
          const sibMatch = matches[siblingR16Id];
          if (sibMatch.winner) qfOpponent = sibMatch.winner.name;
          else qfOpponent = (sibMatch.team1 && sibMatch.team2) ? `${sibMatch.team1.code}/${sibMatch.team2.code}` : 'TBD';
        }
      }

      const sfDest = matchDestinations[qfDest.matchId];
      if (sfDest) {
        const siblingQFId = Object.keys(matchDestinations).find(key => 
          parseInt(key) !== qfDest.matchId && 
          matchDestinations[key].matchId === sfDest.matchId &&
          parseInt(key) >= 97 && parseInt(key) <= 100
        );
        if (siblingQFId) {
          const sibMatch = matches[siblingQFId];
          if (sibMatch.winner) sfOpponent = sibMatch.winner.name;
          else sfOpponent = (sibMatch.team1 && sibMatch.team2) ? `${sibMatch.team1.code}/${sibMatch.team2.code}` : 'TBD';
        }
      }
    }

    // Bullet insights
    let bullet1 = "No upsets projected yet. Top seeds are predicted to progress through standard paths.";
    if (biggestUpset) {
      let branchFav = 'FRA';
      if (biggestUpset.loser.code === 'BRA') branchFav = 'FRA';
      else if (biggestUpset.loser.code === 'FRA') branchFav = 'BRA';
      else if (biggestUpset.loser.code === 'GER') branchFav = 'POR';
      else branchFav = top3[0] ? top3[0].code : 'FRA';
      const favName = teamNames[branchFav] || branchFav;
      const favProb = teamProbs.find(t => t.code === branchFav)?.prob || 10;
      bullet1 = `<span>${biggestUpset.winner.name}</span>'s upset over <span>${biggestUpset.loser.name}</span> increases <span>${favName}</span>'s title odds to <span>${favProb}%</span>.`;
    }

    let easiestTeam = 'GER';
    if (top3[0] && top3[0].code !== 'BRA') {
      easiestTeam = top3[0].code;
    } else if (top3[1]) {
      easiestTeam = top3[1].code;
    }
    const bullet2 = `<span>${teamNames[easiestTeam] || easiestTeam}</span> now has the easiest projected route to the final.`;

    const topHalfCodes = ['KOR', 'CAN', 'GER', 'TUR', 'NED', 'MAR', 'FRA', 'IRN', 'USA', 'CIV', 'BEL', 'NOR', 'COL', 'CRO', 'ESP', 'ALG'];
    const bottomHalfCodes = ['BRA', 'JPN', 'ECU', 'SEN', 'MEX', 'SCO', 'ENG', 'AUT', 'SUI', 'SWE', 'ARG', 'URU', 'POR', 'GHA', 'AUS', 'EGY'];
    
    const topHalfLeader = teamProbs.find(t => topHalfCodes.includes(t.code)) || { name: 'France', code: 'FRA' };
    const bottomHalfLeader = teamProbs.find(t => bottomHalfCodes.includes(t.code)) || { name: 'Brazil', code: 'BRA' };
    const bullet3 = `<span>${topHalfLeader.name} vs ${bottomHalfLeader.name}</span> becomes the most likely final matchup.`;

    const bullet4 = upsetCount === 0 
      ? "Tournament volatility remains low based on standard seed paths."
      : "Tournament volatility rises after multiple upset selections.";

    return {
      top3,
      leadingTeam,
      upsetRisk,
      confidence,
      volatility,
      route: { r16: r16Opponent, qf: qfOpponent, sf: sfOpponent },
      insights: [bullet1, bullet2, bullet3, bullet4]
    };
  }, [matches, teamWeights, teamNames, calculateMatchupProbs]);

  // Match Slot Renderer helper
  const renderBracketMatch = (matchId) => {
    const match = matches[matchId];
    const isWinnerSlot0 = match.winner && match.winner.code === (match.team1 ? match.team1.code : null);
    const isLoserSlot0 = match.winner && match.winner.code !== (match.team1 ? match.team1.code : null);
    const isWinnerSlot1 = match.winner && match.winner.code === (match.team2 ? match.team2.code : null);
    const isLoserSlot1 = match.winner && match.winner.code !== (match.team2 ? match.team2.code : null);

    return (
      <div 
        className={`bracket-match-node ${(!match.team1 || !match.team2) ? 'empty' : ''}`}
        data-match-id={matchId}
      >
        {/* Slot 0 */}
        <div 
          className={`team-slot ${isWinnerSlot0 ? 'winner' : ''} ${isLoserSlot0 ? 'loser' : ''}`}
          onClick={() => handleSlotClick(matchId, 0)}
          data-team-idx="0"
        >
          <span className="slot-flag" dangerouslySetInnerHTML={{ __html: match.team1 ? generateFlagSVG(match.team1.code) : '' }}></span>
          <span className="slot-name">{match.team1 ? match.team1.name : 'TBD'}</span>
          <span className="slot-prob">{match.team1 && match.team1.prob ? `${match.team1.prob}%` : '-'}</span>
        </div>

        {/* Slot 1 */}
        <div 
          className={`team-slot ${isWinnerSlot1 ? 'winner' : ''} ${isLoserSlot1 ? 'loser' : ''}`}
          onClick={() => handleSlotClick(matchId, 1)}
          data-team-idx="1"
        >
          <span className="slot-flag" dangerouslySetInnerHTML={{ __html: match.team2 ? generateFlagSVG(match.team2.code) : '' }}></span>
          <span className="slot-name">{match.team2 ? match.team2.name : 'TBD'}</span>
          <span className="slot-prob">{match.team2 && match.team2.prob ? `${match.team2.prob}%` : '-'}</span>
        </div>
      </div>
    );
  };

  const volatilityColor = useMemo(() => {
    if (telemetryData.volatility === 'Low') return '#34c759';
    if (telemetryData.volatility === 'Moderate') return 'var(--primary-accent)';
    return '#ff3b30';
  }, [telemetryData.volatility]);

  const renderTrendingFeed = () => {
    const feedItems = [
      { title: "ARGENTINA ODDS UP", text: "Win probability rises to 18.5% after latest squad simulation runs.", trend: "+1.2%", status: "up" },
      { title: "GERMANY PRESS ALERT", text: "PPDA index drops to 8.2, confirming the most aggressive high-press in tournament history.", trend: "-0.4", status: "down" },
      { title: "NORWAY SHOCK VALUES", text: "Upset potential spikes to 84% with Haaland predicted to score 4+ goals in group stage.", trend: "+8%", status: "up" },
      { title: "SPAIN POSSESSION RATIOS", text: "Midfield control metrics reach a stable 95.5%, highest pass accuracy under pressure.", trend: "+0.8%", status: "up" },
      { title: "FRANCE VERTICAL TRANSITIONS", text: "Direct progression rates clocked at 4.8s from recovery to box entry.", trend: "+3.2%", status: "up" }
    ];

    return (
      <section className="trending-feed-section">
        <div className="section-container">
          <div className="section-header-left" style={{ marginBottom: '24px', textAlign: 'left' }}>
            <h2 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>Trending Intelligence Feed</h2>
            <p className="section-subtitle" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Live updates and tactical alerts generated by the simulation database.</p>
          </div>
          
          <div className="trending-carousel-track">
            {feedItems.map((item, idx) => (
              <div key={idx} className="trending-feed-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--primary-accent)' }}>{item.title}</span>
                  <span className={`trend-badge-${item.status}`} style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: item.status === 'up' ? 'rgba(52,199,89,0.08)' : 'rgba(255,59,48,0.08)', border: item.status === 'up' ? '1px solid rgba(52,199,89,0.2)' : '1px solid rgba(255,59,48,0.2)', color: item.status === 'up' ? '#34c759' : '#ff3b30' }}>
                    {item.trend}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderSimulator = () => {
    return (
      <section className="simulator-section">

        <div className="section-container">
          <div className="simulator-intro-header" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px', textAlign: 'left' }}>Interactive AI Tournament Simulator</h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: 0, textAlign: 'left' }}>Select your match winners to project custom bracket trees, live tournament volatility, and AI title probabilities.</p>
          </div>

          <div className="simulator-workspace-layout">
            
            {/* Left Side: Interactive Bracket Tree */}
            <div className="bracket-tree-container">
              <p className="simulator-note" style={{ fontSize: '0.76rem', color: 'var(--primary-accent)', margin: '0 0 20px 4px', opacity: 0.85, lineHeight: 1.45, borderLeft: '2px solid var(--primary-accent)', paddingLeft: '10px' }}>
                Projected Round of 32 generated from WCai’s AI group-stage standings and best third-place qualification model. Bracket will update with real qualified teams once tournament data is available.
              </p>

              {/* Mobile Round Tabs Selector */}
              {isMobile && (
                <div className="mobile-round-tabs" style={{ display: 'flex', overflowX: 'auto', gap: '8px', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {[
                    { key: 'r32', label: 'R32' },
                    { key: 'r16', label: 'R16' },
                    { key: 'qf', label: 'QF' },
                    { key: 'sf', label: 'SF' },
                    { key: 'final', label: 'Final' },
                    { key: 'champion', label: 'Champ' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveRound(tab.key)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: activeRound === tab.key ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)',
                        background: activeRound === tab.key ? 'rgba(0, 209, 255, 0.1)' : 'rgba(5, 10, 48, 0.4)',
                        color: activeRound === tab.key ? 'var(--primary-accent)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="bracket-match-list">
                <div className="bracket-scroll-wrapper">
                <div className="bracket-rounds-container">
                  
                  {/* ROUND OF 32 */}
                  {(!isMobile || activeRound === 'r32') && (
                    <div className="bracket-round" data-round="r32">
                      <div className="round-header-label">ROUND OF 32</div>
                      <div className="round-matches-list">
                        {renderBracketMatch(74)}
                        {renderBracketMatch(77)}
                        {renderBracketMatch(73)}
                        {renderBracketMatch(75)}
                        {renderBracketMatch(83)}
                        {renderBracketMatch(84)}
                        {renderBracketMatch(81)}
                        {renderBracketMatch(82)}
                        {renderBracketMatch(76)}
                        {renderBracketMatch(78)}
                        {renderBracketMatch(79)}
                        {renderBracketMatch(80)}
                        {renderBracketMatch(86)}
                        {renderBracketMatch(88)}
                        {renderBracketMatch(85)}
                        {renderBracketMatch(87)}
                      </div>
                    </div>
                  )}

                  {/* ROUND OF 16 */}
                  {(!isMobile || activeRound === 'r16') && (
                    <div className="bracket-round" data-round="r16">
                      <div className="round-header-label">ROUND OF 16</div>
                      <div className="round-matches-list">
                        {renderBracketMatch(89)}
                        {renderBracketMatch(90)}
                        {renderBracketMatch(93)}
                        {renderBracketMatch(94)}
                        {renderBracketMatch(91)}
                        {renderBracketMatch(92)}
                        {renderBracketMatch(95)}
                        {renderBracketMatch(96)}
                      </div>
                    </div>
                  )}

                  {/* QUARTER FINALS */}
                  {(!isMobile || activeRound === 'qf') && (
                    <div className="bracket-round" data-round="qf">
                      <div className="round-header-label">QUARTER FINALS</div>
                      <div className="round-matches-list">
                        {renderBracketMatch(97)}
                        {renderBracketMatch(98)}
                        {renderBracketMatch(99)}
                        {renderBracketMatch(100)}
                      </div>
                    </div>
                  )}

                  {/* SEMI FINALS */}
                  {(!isMobile || activeRound === 'sf') && (
                    <div className="bracket-round" data-round="sf">
                      <div className="round-header-label">SEMI FINALS</div>
                      <div className="round-matches-list">
                        {renderBracketMatch(101)}
                        {renderBracketMatch(102)}
                      </div>
                    </div>
                  )}

                  {/* FINAL */}
                  {(!isMobile || activeRound === 'final') && (
                    <div className="bracket-round" data-round="final">
                      <div className="round-header-label">FINAL</div>
                      <div className="round-matches-list">
                        {renderBracketMatch(104)}
                      </div>
                    </div>
                  )}

                  {/* CHAMPION */}
                  {(!isMobile || activeRound === 'champion') && (
                    <div className="bracket-round" data-round="champion">
                      <div className="round-header-label">AI CHAMPION</div>
                      <div className="champ-display-box" id="champ-display" style={{ 
                        borderColor: matches[104].winner ? 'var(--primary-accent)' : 'rgba(255,255,255,0.08)',
                        boxShadow: matches[104].winner ? '0 12px 40px rgba(0, 209, 255, 0.3)' : 'none'
                      }}>
                        <div className="champ-trophy">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2H6c-1.103 0-2 .897-2 2v3c0 1.996 1.462 3.653 3.393 3.945C8.257 12.186 9.99 13 12 13s3.743-.814 4.607-2.055C18.538 10.653 20 8.996 20 7V4c0-1.103-.897-2-2-2zM6 7V4h2v3c0 .802-.132 1.571-.371 2.274C6.671 8.877 6 8.026 6 7zm12 0c0 1.026-.671 1.877-1.629 2.274.239-.703.371-1.472.371-2.274V4h2v3zm-6 13h-2v2h4v-2h-2zm4-4H8v2h8v-2zm-3-3v3h2v-3h-2z"/>
                          </svg>
                        </div>
                        <div className="champ-flag" id="flag-champ" dangerouslySetInnerHTML={{ __html: matches[104].winner ? generateFlagSVG(matches[104].winner.code) : '' }}></div>
                        <div className="champ-name" id="name-champ">{matches[104].winner ? matches[104].winner.name : 'TBD'}</div>
                        <div className="champ-label">AI PROJECTED WINNER</div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

            {/* Right Side: Live AI Output Panel & Commentary */}
            <div className="simulator-telemetry-panel">
              <div className="panel-header-row">
                <h3 className="panel-title">AI Tournament Telemetry</h3>
                <button className="btn-reset-simulator" id="reset-sim-btn" onClick={handleReset}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style={{ width: '14px', height: '14px' }}>
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  <span>Reset Bracket</span>
                </button>
              </div>

              {/* 1. Tournament Winner Odds */}
              <div className="telemetry-panel-card" id="card-winner-prob" style={{ marginBottom: '16px' }}>
                <div className="panel-card-lbl">Tournament Winner Odds</div>
                <div className="telemetry-winner-list" id="winner-odds-list-container">
                  {telemetryData.top3.map((t, idx) => (
                    <div key={idx} className="winner-odds-row">
                      <div className="winner-odds-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(t.code) }}></div>
                      <span className="winner-odds-name">{t.code}</span>
                      <div className="winner-odds-bar-container">
                        <div className="winner-odds-bar-fill" style={{ width: `${t.prob}%` }}></div>
                      </div>
                      <span className="winner-odds-pct">{t.prob}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Toughest Projected Route */}
              <div className="telemetry-panel-card" style={{ marginBottom: '16px' }}>
                <div className="panel-card-lbl">Toughest Projected Route</div>
                <div className="panel-card-route-flow" id="toughest-route-flow">
                  <div className="route-step">
                    <span className="route-flag-code">{telemetryData.leadingTeam}</span>
                    <span className="step-num">R16</span>
                    <span className="step-lbl" id="route-r16">{telemetryData.route.r16}</span>
                  </div>
                  <div className="route-arrow">→</div>
                  <div className="route-step">
                    <span className="step-num">QF</span>
                    <span className="step-lbl" id="route-qf">{telemetryData.route.qf}</span>
                  </div>
                  <div className="route-arrow">→</div>
                  <div className="route-step">
                    <span className="step-num">SF</span>
                    <span className="step-lbl" id="route-sf">{telemetryData.route.sf}</span>
                  </div>
                </div>
              </div>

              {/* 3. Simulation Metrics */}
              <div className="telemetry-panel-card" style={{ marginBottom: '16px' }}>
                <div className="panel-card-lbl">Simulation Metrics</div>
                <div className="telemetry-three-stats">
                  <div className="panel-stat-box">
                    <span className="stat-lbl" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Confidence</span>
                    <span className="stat-num" id="stat-confidence-pct" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>{telemetryData.confidence}%</span>
                  </div>
                  <div className="panel-stat-box">
                    <span className="stat-lbl" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Volatility</span>
                    <span className="stat-num" id="stat-volatility-level" style={{ fontSize: '1.35rem', fontWeight: 800, color: volatilityColor }}>{telemetryData.volatility}</span>
                  </div>
                  <div className="panel-stat-box">
                    <span className="stat-lbl" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Upset Risk</span>
                    <span className="stat-num" id="stat-upset-pct" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>{telemetryData.upsetRisk}%</span>
                  </div>
                </div>
              </div>

              {/* 4. Simulation Insights */}
              <div className="telemetry-summary-panel">
                <div className="summary-panel-header">
                  <span className="summary-panel-dot"></span>
                  <span className="summary-panel-header-text">Simulation Insights</span>
                </div>
                <div className="simulation-insights-list" id="simulation-insights-container">
                  {telemetryData.insights.map((insight, idx) => (
                    <div key={idx} className="insight-bullet-item" dangerouslySetInnerHTML={{ __html: insight }}></div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderTacticalEvolution = () => {
    return (
      <section className="tactical-evolution-section">
        <div className="section-container">
          <div className="section-header-left" style={{ marginBottom: '40px', textAlign: 'left' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Global Tactical Evolution</h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: 0 }}>AI-detected tactical trends emerging throughout the tournament.</p>
          </div>

          <div className="tactical-trends-grid">
            {insightsData.tacticalEvolution.map((card, idx) => (
              <div key={idx} className="tactical-trend-card revealed">
                <div className="trend-card-header">
                  <div className="trend-icon-box">
                    {trendIcons[idx] || trendIcons[0]}
                  </div>
                  <div className="trend-shift-badge positive">{card.trend}</div>
                </div>
                <h3 className="trend-title">{card.title}</h3>
                <p className="trend-desc">{card.summary}</p>
                {trendVisuals[idx] || trendVisuals[0]}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderMatchupIntelligence = () => {
    return (
      <section className="matchup-intelligence-section">
        <div className="section-container">
          <div className="section-header-left" style={{ marginBottom: '40px', textAlign: 'left' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>AI Matchup Intelligence</h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: 0 }}>National team superlatives modeled by our tactical simulation network.</p>
          </div>

          <div className="superlatives-grid">
            {insightsData.matchupIntelligence.map((card, idx) => (
              <div key={idx} className="superlative-card revealed">
                <div className="superlative-label">{card.category}</div>
                <div className="superlative-team-row">
                  <span className="superlative-flag font-flag">{card.emoji || ''}</span>
                  <span className="superlative-team-name">{card.team}</span>
                  <span className="superlative-val cyan">{card.score}</span>
                </div>
                <p className="superlative-desc">{card.summary}</p>
                <div className="superlative-visual">
                  <div className="hud-mini-bar" style={{ width: `${card.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderNarrativeInsights = () => {
    return (
      <section className="narrative-insights-section">
        <div className="section-container">
          <div className="section-header-left" style={{ marginBottom: '40px', textAlign: 'left' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>AI Narrative Insights</h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: 0 }}>Qualitative tactical storytelling and tournament trends generated by the WCai narrative model.</p>
          </div>

          <div className="narratives-grid">
            {insightsData.narrativeInsights.map((card, idx) => (
              <div key={idx} className="narrative-card-item revealed">
                <div className="narrative-glow"></div>
                <span className="narrative-topic">{card.topic}</span>
                <h3 className="narrative-title">{card.title}</h3>
                <p className="narrative-summary">{card.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      {/* Dotted Vector Dot Map Background */}
      <div className="world-map-svg-bg">
        <svg viewBox="0 0 1000 500" fill="none" stroke="var(--primary-accent)" strokeWidth="1.2" strokeLinecap="round">
          {/* North America */}
          <path d="M 120 100 L 220 100 L 260 180 L 200 240 L 180 200 Z" strokeDasharray="2,6" />
          <path d="M 100 120 L 200 120 L 230 180 L 190 220 Z" strokeDasharray="1,5" />
          {/* South America */}
          <path d="M 210 250 L 260 270 L 290 350 L 240 430 L 220 400 Z" strokeDasharray="2,6" />
          <path d="M 220 270 L 260 290 L 270 360 L 240 400 Z" strokeDasharray="1,5" />
          {/* Europe */}
          <path d="M 450 110 L 520 100 L 540 160 L 480 180 Z" strokeDasharray="2,6" />
          {/* Africa */}
          <path d="M 460 200 L 530 210 L 570 280 L 530 380 L 490 340 L 470 240 Z" strokeDasharray="2,6" />
          <path d="M 480 220 L 530 230 L 550 290 L 520 340 Z" strokeDasharray="1,5" />
          {/* Asia */}
          <path d="M 540 100 L 750 90 L 820 180 L 790 260 L 680 280 L 580 200 Z" strokeDasharray="2,6" />
          <path d="M 580 120 L 730 110 L 780 180 L 740 250 L 640 240 Z" strokeDasharray="1,5" />
          {/* Australia */}
          <path d="M 760 330 L 830 340 L 820 400 L 750 380 Z" strokeDasharray="2,6" />
          
          {/* Abstract AI Tactical Overlay Paths (glowing lines) */}
          <path className="glowing-tactical-path" d="M 180 150 Q 300 200 480 140 T 680 160" stroke="#00D1FF" strokeWidth="1.5" opacity="0.35" strokeDasharray="4 8" />
          <path className="glowing-tactical-path" d="M 250 330 Q 380 250 500 240 T 780 200" stroke="#00D1FF" stroke-width="1" opacity="0.25" strokeDasharray="3 6" />
        </svg>
      </div>

      {/* Floating Particles Overlay Container */}
      <div className="teams-page-particles" id="particles-container">
        {particles.map((p, idx) => (
          <div 
            key={idx}
            className="floating-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="insights-hero-section">
        {/* Background Video Visual */}
        <video className="insights-hero-bg-video" autoPlay loop muted playsInline>
          <source src="https://res.cloudinary.com/dgj2wznuq/video/upload/v1780475787/football_motion_uuoslk.mp4" type="video/mp4" />
        </video>
        <div className="insights-video-overlay"></div>

        <div className="section-container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="insights-hero-grid">
            {/* Left Side: Content */}
            <div className="insights-hero-left">
              <h1 className="insights-hero-title">
                AI World Cup <span className="cyan-highlight">Intelligence</span>
              </h1>
              <p className="insights-hero-description">
                Explore AI-generated tactical evolution, tournament simulations, advanced matchup intelligence, and dynamic World Cup narratives powered by WCai’s football intelligence engine.
              </p>
            </div>

            {/* Right Side: Floating Telemetry Cards */}
            <div className="insights-hero-right">
              <div className="telemetry-cards-wrapper">
                <div className="telemetry-card card-float-1">
                  <div className="telemetry-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div className="telemetry-data">
                    <span className="telemetry-val">{insightsData.heroMetrics.simulationsRun}</span>
                    <span className="telemetry-lbl">Simulations Run</span>
                  </div>
                </div>

                <div className="telemetry-card card-float-2">
                  <div className="telemetry-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                      <line x1="15" y1="3" x2="15" y2="21"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="3" y1="15" x2="21" y2="15"/>
                    </svg>
                  </div>
                  <div className="telemetry-data">
                    <span className="telemetry-val">{insightsData.heroMetrics.tacticalSystems}</span>
                    <span className="telemetry-lbl">Tactical Systems</span>
                  </div>
                </div>

                <div className="telemetry-card card-float-3">
                  <div className="telemetry-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                      <polyline points="2 17 12 22 22 17"/>
                      <polyline points="2 12 12 17 22 12"/>
                    </svg>
                  </div>
                  <div className="telemetry-data">
                    <span className="telemetry-val">{insightsData.heroMetrics.predictionConfidence}</span>
                    <span className="telemetry-lbl">Confidence</span>
                  </div>
                </div>

                <div className="telemetry-card card-float-4">
                  <div className="telemetry-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div className="telemetry-data">
                    <span className="telemetry-val">{insightsData.heroMetrics.volatilityIndex}</span>
                    <span className="telemetry-lbl">Volatility Index</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isMobile ? (
        <>
          {renderSimulator()}
          {renderTrendingFeed()}
          {renderMatchupIntelligence()}
          {renderTacticalEvolution()}
          {renderNarrativeInsights()}
        </>
      ) : (
        <>
          {renderTacticalEvolution()}
          {renderSimulator()}
          {renderMatchupIntelligence()}
          {renderNarrativeInsights()}
        </>
      )}
    </>
  );
}
