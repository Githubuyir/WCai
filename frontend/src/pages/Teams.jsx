import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateFlagSVG } from '../data/mockData';
import { getTeams } from '../api/api';
import { teamsDatabase } from '../data/teamsData';

// Import local image assets for slideshow
import teamWinning1 from '../assets/team-winning-1.png';
import teamWinning2 from '../assets/team-winning-2.jpg';
import teamWinning3 from '../assets/team-winning-3.jpg';
import teamWinning4 from '../assets/team-winning-4.jpg';
import teamWinning5 from '../assets/team-winning-5.jpg';

// Hardcoded fallback for power rankings
const fallbackPowerRankings = [
  { rank: 1, name: "Argentina", code: "ARG", score: 94, prob: "18.5%", style: "Tiki-Taka Overloads", form: ["L", "W", "D", "W", "W"] },
  { rank: 2, name: "France", code: "FRA", score: 92, prob: "16.8%", style: "Vertical Transitions", form: ["W", "W", "D", "W", "W"] },
  { rank: 3, name: "Spain", code: "ESP", score: 89, prob: "15.2%", style: "Tiki-Taka Overloads", form: ["D", "W", "W", "W", "W"] },
  { rank: 4, name: "Portugal", code: "POR", score: 88, prob: "12.4%", style: "Technical Possession", form: ["W", "L", "D", "W", "W"] },
  { rank: 5, name: "Brazil", code: "BRA", score: 93, prob: "10.9%", style: "Lateral Wing Overload", form: ["L", "W", "W", "D", "L"] }
];

export default function Teams() {
  const navigate = useNavigate();

  // State for modal
  const [selectedTeamCode, setSelectedTeamCode] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  // State for API-driven power rankings
  const [powerRankingsData, setPowerRankingsData] = useState(fallbackPowerRankings);
  const [rankingsLoading, setRankingsLoading] = useState(true);
  const [rankingsError, setRankingsError] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [expandedGroups, setExpandedGroups] = useState({
    "Group A": true
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Standings page setup
  useEffect(() => {
    document.body.className = 'teams-body-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  // Fetch teams from API, map to power rankings format
  useEffect(() => {
    setRankingsLoading(true);
    setRankingsError(null);
    getTeams()
      .then((apiTeams) => {
        // Sort by powerRank (lowest = best) and take top 5
        const sorted = [...apiTeams].sort((a, b) => (a.powerRank || 99) - (b.powerRank || 99));
        const top5 = sorted.slice(0, 5).map((t, i) => ({
          rank: i + 1,
          name: t.name,
          code: t.code,
          score: t.rating || 0,
          prob: t.winProb || '–',
          style: t.archetype || 'N/A',
          form: t.form || ['–', '–', '–', '–', '–']
        }));
        setPowerRankingsData(top5);
      })
      .catch((err) => {
        console.warn("Error fetching teams from API. Using fallback data.", err);
        setRankingsError("Could not connect to server. Showing cached data.");
        setPowerRankingsData(fallbackPowerRankings);
      })
      .finally(() => setRankingsLoading(false));
  }, []);

  // 1. Floating Particles Data (generate once)
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 60; i++) {
      list.push({
        size: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${Math.random() * 10 + 10}s`
      });
    }
    return list;
  }, []);

  // 3. World Cup Groups Data (dynamically resolved from teamsDatabase to ensure 100% Q% and rating consistency)
  const groupsData = useMemo(() => {
    const standingsConfig = {
      "Group A": [
        { code: "MEX", gd: 4, pts: 7 },
        { code: "KOR", gd: 2, pts: 5 },
        { code: "RSA", gd: 1, pts: 4 },
        { code: "CZE", gd: -7, pts: 1 }
      ],
      "Group B": [
        { code: "SUI", gd: 5, pts: 7 },
        { code: "CAN", gd: 2, pts: 6 },
        { code: "BIH", gd: -1, pts: 3 },
        { code: "QAT", gd: -6, pts: 1 }
      ],
      "Group C": [
        { code: "BRA", gd: 8, pts: 9 },
        { code: "MAR", gd: 3, pts: 6 },
        { code: "SCO", gd: -3, pts: 3 },
        { code: "HAI", gd: -8, pts: 0 }
      ],
      "Group D": [
        { code: "USA", gd: 5, pts: 7 },
        { code: "AUS", gd: 1, pts: 5 },
        { code: "TUR", gd: 0, pts: 4 },
        { code: "PAR", gd: -6, pts: 0 }
      ],
      "Group E": [
        { code: "GER", gd: 9, pts: 9 },
        { code: "ECU", gd: 2, pts: 6 },
        { code: "CIV", gd: -2, pts: 3 },
        { code: "CUR", gd: -9, pts: 0 }
      ],
      "Group F": [
        { code: "NED", gd: 4, pts: 7 },
        { code: "JPN", gd: 3, pts: 6 },
        { code: "SWE", gd: -1, pts: 4 },
        { code: "TUN", gd: -6, pts: 0 }
      ],
      "Group G": [
        { code: "BEL", gd: 4, pts: 7 },
        { code: "EGY", gd: 2, pts: 6 },
        { code: "IRN", gd: -2, pts: 3 },
        { code: "NZL", gd: -4, pts: 1 }
      ],
      "Group H": [
        { code: "ESP", gd: 6, pts: 7 },
        { code: "URU", gd: 3, pts: 6 },
        { code: "KSA", gd: -4, pts: 3 },
        { code: "CPV", gd: -5, pts: 1 }
      ],
      "Group I": [
        { code: "FRA", gd: 8, pts: 9 },
        { code: "SEN", gd: 2, pts: 6 },
        { code: "NOR", gd: -3, pts: 3 },
        { code: "IRQ", gd: -7, pts: 0 }
      ],
      "Group J": [
        { code: "ARG", gd: 9, pts: 9 },
        { code: "ALG", gd: 0, pts: 4 },
        { code: "AUT", gd: -2, pts: 3 },
        { code: "JOR", gd: -7, pts: 1 }
      ],
      "Group K": [
        { code: "POR", gd: 5, pts: 7 },
        { code: "COL", gd: 3, pts: 6 },
        { code: "UZB", gd: -3, pts: 3 },
        { code: "COD", gd: -5, pts: 1 }
      ],
      "Group L": [
        { code: "ENG", gd: 5, pts: 7 },
        { code: "CRO", gd: 3, pts: 6 },
        { code: "GHA", gd: -2, pts: 3 },
        { code: "PAN", gd: -6, pts: 1 }
      ]
    };

    const result = {};
    for (const groupName of Object.keys(standingsConfig)) {
      result[groupName] = standingsConfig[groupName].map(item => {
        const dbTeam = teamsDatabase[item.code];
        if (!dbTeam) {
          return {
            name: item.code,
            code: item.code,
            tactical: "Balanced Possession",
            form: [],
            gd: item.gd,
            pts: item.pts,
            rating: 70,
            qual: 50,
            players: []
          };
        }

        const qualPct = parseInt(dbTeam.qualProb) || 50;

        return {
          name: dbTeam.name,
          code: item.code,
          tactical: dbTeam.archetype,
          form: dbTeam.form,
          gd: item.gd,
          pts: item.pts,
          rating: dbTeam.rating,
          qual: qualPct,
          stats: {
            Attack: dbTeam.metrics?.attack || 70,
            Midfield: dbTeam.metrics?.control || 70,
            Defense: dbTeam.metrics?.solidity || 70
          },
          players: (dbTeam.players || []).map((p, i) => ({
            num: i === 0 ? 9 : (i === 1 ? 8 : 4),
            name: p.name,
            role: p.role?.split(' / ')[0] || p.role
          }))
        };
      });
    }
    return result;
  }, []);

  // 4. Dark Horse Predictions Data (Updated to feature Norway, Japan, USA, and Türkiye)
  const darkHorsesData = [
    {
      name: "Norway",
      code: "NOR",
      upsetIndex: "84%",
      style: "Direct Attacking & Target Play",
      qualProb: "48%",
      advantage: "Haaland Elite Goal Threat & Ødegaard Playmaking",
      stadium: "bela",
      summary: "With Erling Haaland's devastating goal threat and Martin Ødegaard's elite playmaking, Norway has the firepower to break down elite defenses and orchestrate surprise victories in knockout rounds."
    },
    {
      name: "Japan",
      code: "JPN",
      upsetIndex: "85%",
      style: "High Intensity Counter-Press",
      qualProb: "86%",
      advantage: "Unmatched Pressing Recovery Rates & Tactical Discipline",
      stadium: "sofi",
      summary: "Japan's high-intensity counter-pressing and elite fitness allow them to recover possession rapidly in the final third, creating severe tactical disruptions for possession-oriented tournament favorites."
    },
    {
      name: "USA",
      code: "USA",
      upsetIndex: "82%",
      style: "High Press & Direct Verticals",
      qualProb: "90%",
      advantage: "Home Pitch Advantage & High Intensity Wing Play",
      stadium: "lumen",
      summary: "Playing in front of energetic home crowds, the USA combines aggressive vertical transitions with high flank overloads, making their matches highly explosive and difficult to control."
    },
    {
      name: "Türkiye",
      code: "TUR",
      upsetIndex: "81%",
      style: "Technical Possession & Wing Press",
      qualProb: "62%",
      advantage: "Dynamic Wing Inversions & Midfield Aggression",
      stadium: "akron",
      summary: "Türkiye is primed for upsets thanks to high transition speed and technical playmakers who exploit spaces between opponent central defensive pairs."
    }
  ];

    // Helper to find team data
  const selectedTeam = useMemo(() => {
    if (!selectedTeamCode) return null;
    for (const groupName in groupsData) {
      const match = groupsData[groupName].find(t => t.code === selectedTeamCode);
      if (match) return match;
    }
    return null;
  }, [selectedTeamCode, groupsData]);

  // Helper to calculate W, D, L from points
  const getWDL = (pts) => {
    if (pts === 9) return { w: 3, d: 0, l: 0 };
    if (pts === 7) return { w: 2, d: 1, l: 0 };
    if (pts === 6) return { w: 2, d: 0, l: 1 };
    if (pts === 5) return { w: 1, d: 2, l: 0 };
    if (pts === 4) return { w: 1, d: 1, l: 1 };
    if (pts === 3) return { w: 1, d: 0, l: 2 };
    if (pts === 2) return { w: 0, d: 2, l: 1 };
    if (pts === 1) return { w: 0, d: 1, l: 2 };
    return { w: 0, d: 0, l: 3 };
  };

  const handleOpenModal = (code) => {
    setSelectedTeamCode(code);
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setSelectedTeamCode(null);
  };

  const handleAnalyzeTeamDossier = (code) => {
    // Navigate to Team Analysis page
    navigate(`/team-analysis?team=${code}`);
  };

  // Set Pitch Tag Area based on style in modal
  const pitchTagText = useMemo(() => {
    if (!selectedTeam) return "";
    const tactical = selectedTeam.tactical.toLowerCase();
    if (tactical.includes('wing')) return "Overloading Flanks Focus";
    if (tactical.includes('low block')) return "Compact Box Containment";
    if (tactical.includes('press')) return "High-Line Opponent Half Recovery";
    return "Central Passing Networks";
  }, [selectedTeam]);

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

      {/* Compact Hero Section */}
      <section className="teams-hero-section">
        {/* Image Slideshow Background */}
        <div className="hero-slideshow">
          <div className="slide" style={{ backgroundImage: `url(${teamWinning1})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning2})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning3})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning4})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning5})` }}></div>
        </div>

        <div className="teams-hero-glow"></div>
        <div className="section-container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-content" style={{ textAlign: 'left', maxWidth: '800px', margin: 0 }}>
            <h1 className="hero-title" style={{ fontSize: '2.8rem', fontWeight: 850, color: '#fff', marginBottom: '16px', letterSpacing: '-0.5px', textShadow: '0 4px 20px rgba(0,0,0,0.65)', textAlign: 'left' }}>
              World Cup Teams Intelligence
            </h1>
            <p className="hero-description" style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'left' }}>
              Explore AI-powered tactical profiles, qualification projections, team strength analysis, and tournament intelligence for every nation competing in the 2026 FIFA World Cup.
            </p>
          </div>
        </div>
      </section>

      {/* AI Power Rankings */}
      <section className="rankings-section">
        <div className="section-container">
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <div className="header-left">
              <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '6px', textAlign: 'left' }}>AI Power Rankings</h2>
              <p className="section-subtitle" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>Projected strongest contenders based on tactical balance, squad depth, form, and AI simulation models.</p>
            </div>
          </div>

          {isMobile ? (
            <div className="mobile-rankings-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {rankingsError && (
                <div style={{ padding: '8px 14px', marginBottom: '8px', borderRadius: '8px', background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.15)', color: 'rgba(255,200,50,0.8)', fontSize: '0.78rem', textAlign: 'center' }}>
                  ⚠ {rankingsError}
                </div>
              )}
              {rankingsLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', border: '3px solid rgba(0,255,255,0.12)', borderTop: '3px solid var(--primary-accent, #00e5ff)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Loading Power Rankings...</span>
                </div>
              ) : (
                powerRankingsData.map((team) => (
                  <div key={team.rank} className="mobile-rank-card" onClick={() => handleOpenModal(team.code)} style={{ background: 'rgba(5, 10, 48, 0.45)', border: '1px solid rgba(0, 240, 255, 0.15)', borderRadius: '12px', padding: '14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-accent)' }}>#{team.rank}</span>
                        <div style={{ width: '28px', height: '18px', borderRadius: '2px', overflow: 'hidden', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                        <span style={{ fontSize: '1rem', fontWeight: 750, color: '#fff' }}>{team.name}</span>
                      </div>
                      <span className="rating-pill" style={{ background: 'rgba(0, 209, 255, 0.1)', border: '1px solid rgba(0, 209, 255, 0.25)', color: 'var(--primary-accent)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>AI: {team.score}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '8px', fontSize: '0.82rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tactical Style</div>
                        <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{team.style}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Title Prob</div>
                        <div style={{ color: 'var(--secondary-accent)', fontWeight: 800 }}>{team.prob}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', width: '38px' }}>Form</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {team.form.map((f, i) => (
                          <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800 }}>{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="rankings-glass-card">
              <div className="rankings-header-row">
                <span>Rank</span>
                <span>Flag</span>
                <span>Nation</span>
                <span>AI Rating</span>
                <span>Title Prob</span>
                <span>Tactical Style</span>
                <span>Recent Form</span>
              </div>
              <div className="rankings-list" id="rankings-list-container">
                {rankingsError && (
                  <div style={{ padding: '8px 14px', marginBottom: '8px', borderRadius: '8px', background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.15)', color: 'rgba(255,200,50,0.8)', fontSize: '0.78rem', textAlign: 'center' }}>
                    ⚠ {rankingsError}
                  </div>
                )}
                {rankingsLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid rgba(0,255,255,0.12)', borderTop: '3px solid var(--primary-accent, #00e5ff)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Loading Power Rankings...</span>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                ) : (
                  powerRankingsData.map((team) => {
                    const isTopThree = team.rank <= 3 ? 'top-three' : '';
                    return (
                      <div key={team.rank} className={`ranking-row ${isTopThree}`} onClick={() => handleOpenModal(team.code)} style={{ cursor: 'pointer' }}>
                        <span className="ranking-num">{team.rank}</span>
                        <div className="ranking-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                        <span className="ranking-name">{team.name}</span>
                        <span className="ranking-score">{team.score}</span>
                        <span className="ranking-prob">{team.prob}</span>
                        <div><span className="ranking-identity">{team.style}</span></div>
                        <div className="ranking-trend-container">
                          {team.form.map((f, i) => (
                            <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`}>{f}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Group Standings Grid */}
      <section className="groups-section">
        <div className="section-container">
          <div className="section-header-left" style={{ marginBottom: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px', textAlign: 'left' }}>World Cup Groups & Standings</h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: 0, textAlign: 'left' }}>Explore the qualification prospects, predicted group results, tactical configurations, and AI ratings for all 48 participating countries.</p>
          </div>

          <div className="groups-grid" id="groups-grid-container">
            {Object.keys(groupsData).sort().map((groupName) => {
              const teams = groupsData[groupName];

              return (
                <div key={groupName} className="group-card">
                  {isMobile ? (
                    <div 
                      className="group-card-header mobile-accordion-header" 
                      onClick={() => toggleGroup(groupName)}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}
                    >
                      <h3 className="group-title-name" style={{ margin: 0, fontSize: '1rem' }}>{groupName}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', fontWeight: 800 }}>
                        {expandedGroups[groupName] ? '▲' : '▼'}
                      </span>
                    </div>
                  ) : (
                    <div className="group-card-header">
                      <h3 className="group-title-name">{groupName}</h3>
                      <div className="group-meta-stats">
                        <span>W</span>
                        <span>D</span>
                        <span>L</span>
                        <span>GD</span>
                        <span>Pts</span>
                        <span className="qual-header">Q%</span>
                        <span style={{ textAlign: 'right' }}>Tactics</span>
                      </div>
                    </div>
                  )}

                  {(!isMobile || expandedGroups[groupName]) && (
                    <div className="group-teams-stack" style={{ transition: 'all 0.3s ease' }}>
                      {isMobile ? (
                        <div className="mobile-teams-table" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 26px 26px 26px 36px 36px 44px', padding: '8px 4px', fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <span>Team</span>
                            <span style={{ textAlign: 'center' }}>W</span>
                            <span style={{ textAlign: 'center' }}>D</span>
                            <span style={{ textAlign: 'center' }}>L</span>
                            <span style={{ textAlign: 'center' }}>GD</span>
                            <span style={{ textAlign: 'center' }}>Pts</span>
                            <span style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>More</span>
                          </div>
                          {teams.map((team, index) => {
                            const isProjectedQualify = index < 2 ? 'projected-qualify' : '';
                            const { w: winVal, d: drawVal, l: lossVal } = getWDL(team.pts);
                            return (
                              <div key={team.code} className={`team-row-card ${isProjectedQualify}`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 26px 26px 26px 36px 36px 44px', alignItems: 'center', padding: '8px 4px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', minWidth: 0 }} onClick={() => handleOpenModal(team.code)}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                    <div style={{ width: '18px', height: '12px', borderRadius: '1px', overflow: 'hidden', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{team.name}</span>
                                  </div>
                                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginLeft: '24px' }}>AI {team.rating} / Q {team.qual}%</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{winVal}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{drawVal}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{lossVal}</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{team.gd > 0 ? '+' + team.gd : team.gd}</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', textAlign: 'center' }}>{team.pts}</span>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  <span 
                                    onClick={() => handleAnalyzeTeamDossier(team.code)}
                                    style={{ color: 'var(--primary-accent)', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', width: '34px', height: '34px', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.12)', borderRadius: '50%' }}
                                  >
                                    →
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        teams.map((team, index) => {
                          const isProjectedQualify = index < 2 ? 'projected-qualify' : '';
                          const { w, d, l } = getWDL(team.pts);

                          return (
                            <div key={team.code} className={`team-row-card ${isProjectedQualify}`}>
                              <div className="team-info-left" onClick={() => handleOpenModal(team.code)} style={{ cursor: 'pointer' }}>
                                <div className="team-flag-holder" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                                <div className="team-name-wrapper">
                                  <span className="team-display-name">{team.name}</span>
                                  <span className="team-ai-pill">AI {team.rating}</span>
                                </div>
                              </div>

                              <div className="team-details-right">
                                <span className="team-metric-val">{w}</span>
                                <span className="team-metric-val">{d}</span>
                                <span className="team-metric-val">{l}</span>
                                <span className="team-metric-val gd-val">{team.gd > 0 ? '+' + team.gd : team.gd}</span>
                                <span className="team-metric-val points-val">{team.pts}</span>
                                <span className="team-metric-val prob-val">{team.qual}%</span>

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  <button className="btn-analyze-team" onClick={() => handleAnalyzeTeamDossier(team.code)}>
                                    <span className="btn-text">Analyze</span> <span>→</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Horse Predictions */}
      <section className="dark-horse-section">
        <div className="section-container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <div className="header-left">
              <h2 className="section-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '6px', textAlign: 'left' }}>Dark Horse Predictions</h2>
              <p className="section-subtitle" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>Teams with the highest upset potential according to WCai’s tactical intelligence engine.</p>
            </div>
          </div>

          <div className="dark-horse-grid" id="dark-horse-grid-container">
            {darkHorsesData.map((team) => (
              <div
                key={team.code}
                className={`dark-horse-card stadium-${team.stadium}`}
                onClick={() => handleOpenModal(team.code)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-stadium-bg"></div>
                <div className="card-glow-overlay"></div>

                <div className="dh-header">
                  <div className="dh-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                  <span className="dh-upset-badge">Upset potential</span>
                </div>

                <div className="dh-title-row">
                  <h3 className="dh-name">{team.name}</h3>
                  <span className="dh-identity-label">{team.style}</span>
                </div>

                <p className="dh-summary">{team.summary}</p>

                <div className="dh-metrics-stack">
                  <div className="dh-metric-item">
                    <span className="dh-metric-lbl">AI Upset Index</span>
                    <span className="dh-metric-val cyan">{team.upsetIndex}</span>
                  </div>
                  <div className="dh-metric-item">
                    <span className="dh-metric-lbl">Qual Probability</span>
                    <span className="dh-metric-val green">{team.qualProb}</span>
                  </div>
                  <div className="dh-metric-item">
                    <span className="dh-metric-lbl">Key Advantage</span>
                    <span className="dh-metric-val" style={{ fontSize: '0.8rem', fontWeight: 500, textAlign: 'right', maxWidth: '180px' }}>
                      {team.advantage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Tactical Breakdown Modal */}
      {selectedTeam && (
        <div
          className={`tactical-modal-overlay ${modalActive ? 'active' : ''}`}
          id="tactical-profile-modal"
          onClick={(e) => { if (e.target.id === 'tactical-profile-modal') handleCloseModal(); }}
        >
          <div className="tactical-modal-card">
            <button className="modal-close-btn" id="modal-close-btn" aria-label="Close modal" onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style={{ width: '18px', height: '18px' }}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header-section">
              <div className="modal-flag-box" dangerouslySetInnerHTML={{ __html: generateFlagSVG(selectedTeam.code) }}></div>
              <div className="modal-title-text">
                <h3 className="modal-team-title" id="modal-team-name">{selectedTeam.name}</h3>
                <span className="modal-tactical-label" id="modal-tactical-style">{selectedTeam.tactical}</span>
              </div>
            </div>

            <div className="modal-grid-layout">
              {/* Left: Squad Ratings */}
              <div className="modal-column-box">
                <h4 className="modal-heading">Squad Ratings</h4>
                <div className="modal-bars-stack" id="modal-squad-ratings">
                  {Object.keys(selectedTeam.stats).map((key) => {
                    const ratingVal = selectedTeam.stats[key];
                    return (
                      <div key={key} className="modal-bar-wrapper">
                        <div className="modal-bar-header">
                          <span>{key} Rating</span>
                          <span>{ratingVal}%</span>
                        </div>
                        <div className="modal-bar-track">
                          <div className="modal-bar-fill" style={{ width: `${ratingVal}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Center: Attack Focus Zone */}
              <div className="modal-column-box">
                <h4 className="modal-heading">AI Attack Focus zones</h4>
                <div className="heatmap-pitch-small" style={{ height: '180px', width: '100%' }}>
                  <div className="heat-glow-node" id="modal-heat-node-1" style={{ top: '30%', left: '75%', width: '45px', height: '45px', background: 'radial-gradient(circle, rgba(0,209,255,0.3) 0%, transparent 70%)' }}></div>
                  <div className="heat-glow-node" id="modal-heat-node-2" style={{ top: '65%', left: '70%', width: '35px', height: '35px', background: 'radial-gradient(circle, rgba(0,209,255,0.2) 0%, transparent 70%)' }}></div>
                  <span className="pitch-tag" id="modal-pitch-tag" style={{ bottom: '8px', left: '8px' }}>
                    {pitchTagText}
                  </span>
                </div>
              </div>

              {/* Right: Key Players */}
              <div className="modal-column-box">
                <h4 className="modal-heading">AI Key Players</h4>
                <div className="modal-key-players-list" id="modal-key-players">
                  {selectedTeam.players.map((p) => (
                    <div key={p.num} className="key-player-row">
                      <div className="kp-number-circle">{p.num}</div>
                      <div className="kp-details">
                        <span className="kp-name">{p.name}</span>
                        <span className="kp-role">{p.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
