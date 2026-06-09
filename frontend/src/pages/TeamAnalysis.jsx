import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { matchesData, generateFlagSVG } from '../data/mockData';
import { getTeamByCode } from '../api/api';
import { TEAMS_LINEUPS, REAL_TEAMS_DATA, getStartingXI, teamsDatabase } from '../data/teamsData';

// Import local image assets for hero backgrounds
import argentinaHero from '../assets/argentina-hero.jpg';
import belgiumHero from '../assets/belgium-hero.png';
import brazilHero from '../assets/brazil-hero.jpg';
import canadaHero from '../assets/canada-hero.jpg';
import englandHero from '../assets/england-hero.jpg';
import franceHero from '../assets/france-hero.jpg';
import germanyHero from '../assets/germany-hero.jpg';
import mexicoHero from '../assets/mexico-hero.png';
import netherlandsHero from '../assets/netherlands-hero.png';
import portugalHero from '../assets/portugal-hero.png';
import spainHero from '../assets/spain-hero.png';
import usaHero from '../assets/usa-hero.png';
import stadiumBg from '../assets/stadium.png';

const heroImages = {
  ARG: argentinaHero,
  BEL: belgiumHero,
  BRA: brazilHero,
  CAN: canadaHero,
  ENG: englandHero,
  FRA: franceHero,
  GER: germanyHero,
  MEX: mexicoHero,
  NED: netherlandsHero,
  POR: portugalHero,
  ESP: spainHero,
  USA: usaHero,
};

export default function TeamAnalysis() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teamCode = (searchParams.get('team') || 'BRA').toUpperCase();

  // Helper: Find team group
  const findTeamGroup = (code) => {
    const match = matchesData.find(m => m.team1.code === code || m.team2.code === code);
    if (match) return match.group;

    const topGroups = {
      'MEX': 'Group A', 'KOR': 'Group A', 'RSA': 'Group A', 'CZE': 'Group A',
      'CAN': 'Group B', 'BIH': 'Group B', 'QAT': 'Group B', 'SUI': 'Group B',
      'BRA': 'Group C', 'MAR': 'Group C', 'SCO': 'Group C', 'HAI': 'Group C',
      'USA': 'Group D', 'AUS': 'Group D', 'TUR': 'Group D', 'PAR': 'Group D',
      'GER': 'Group E', 'ECU': 'Group E', 'CIV': 'Group E', 'CUR': 'Group E',
      'NED': 'Group F', 'JPN': 'Group F', 'SWE': 'Group F', 'TUN': 'Group F',
      'BEL': 'Group G', 'EGY': 'Group G', 'IRN': 'Group G', 'NZL': 'Group G',
      'ESP': 'Group H', 'URU': 'Group H', 'KSA': 'Group H', 'CPV': 'Group H',
      'FRA': 'Group I', 'SEN': 'Group I', 'NOR': 'Group I', 'IRQ': 'Group I',
      'ARG': 'Group J', 'ALG': 'Group J', 'AUT': 'Group J', 'JOR': 'Group J',
      'POR': 'Group K', 'COL': 'Group K', 'UZB': 'Group K', 'COD': 'Group K',
      'ENG': 'Group L', 'CRO': 'Group L', 'GHA': 'Group L', 'PAN': 'Group L'
    };
    return topGroups[code] || 'Group Stage';
  };

  // Helper: Simple deterministic hash function based on team code string to seed fallbacks
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  // Resolve teamData via State and Effect
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    getTeamByCode(teamCode)
      .then((data) => {
        const lineupInfo = TEAMS_LINEUPS[teamCode];
        if (lineupInfo) {
          data.formation = lineupInfo.formation;
          data.coach = lineupInfo.coach;
          data.startingXI = getStartingXI(teamCode);
        }
        setTeamData(data);
      })
      .catch((err) => {
        console.warn("Error fetching team from API. Falling back to local data.", err);
        const fallbackTeam = teamsDatabase[teamCode];
        if (fallbackTeam) {
          const lineupInfo = TEAMS_LINEUPS[teamCode];
          if (lineupInfo) {
            fallbackTeam.formation = lineupInfo.formation;
            fallbackTeam.coach = lineupInfo.coach;
            fallbackTeam.startingXI = getStartingXI(teamCode);
          }
        }
        setTeamData(fallbackTeam || null);
      });
  }, [teamCode]);

  // Handle transitions and top-scrolling
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (teamData) {
      document.title = `WCai - ${teamData.name} AI Intelligence Dossier`;
    }
  }, [teamCode, teamData]);

  // Strength metrics comparison bars labels
  const metricsLabels = {
    attack: "Attack Rating",
    control: "Midfield Control",
    solidity: "Defensive Solidity",
    resistance: "Press Resistance",
    transitions: "Transition Speed",
    depth: "Squad Depth"
  };

  // SVG Momentum coordinates mapper
  const momentumPaths = useMemo(() => {
    if (!teamData || !teamData.momentum) return { lineD: '', areaD: '' };
    const data = teamData.momentum;
    const points = data.map((val, idx) => {
      const x = idx * 100;
      const y = 90 - ((val - 50) / 50) * 70;
      return { x, y };
    });

    const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${lineD} L 400 100 L 0 100 Z`;
    return { lineD, areaD };
  }, [teamData?.momentum]);

  // Heat node position generator based on archetype
  const heatspots = useMemo(() => {
    if (!teamData || !teamData.archetype) {
      return [
        { left: 50, top: 32, size: 95, op: 0.28 },
        { left: 25, top: 25, size: 70, op: 0.2 },
        { left: 75, top: 25, size: 70, op: 0.2 }
      ];
    }
    if (teamData.archetype.includes("Wing")) {
      return [
        { left: 15, top: 30, size: 85, op: 0.25 },
        { left: 85, top: 35, size: 75, op: 0.2 },
        { left: 50, top: 80, size: 50, op: 0.1 }
      ];
    } else if (teamData.archetype.includes("Possession")) {
      return [
        { left: 50, top: 50, size: 100, op: 0.25 },
        { left: 50, top: 30, size: 75, op: 0.18 },
        { left: 50, top: 75, size: 60, op: 0.15 }
      ];
    } else if (teamData.archetype.includes("Counter")) {
      return [
        { left: 50, top: 78, size: 110, op: 0.3 },
        { left: 20, top: 40, size: 70, op: 0.15 },
        { left: 80, top: 40, size: 70, op: 0.15 }
      ];
    } else {
      return [
        { left: 50, top: 32, size: 95, op: 0.28 },
        { left: 25, top: 25, size: 70, op: 0.2 },
        { left: 75, top: 25, size: 70, op: 0.2 }
      ];
    }
  }, [teamData?.archetype]);

  const pitchTagText = useMemo(() => {
    if (!teamData || !teamData.tactics || !teamData.tactics.attack) return "Central Passing Networks";
    const tactical = teamData.tactics.attack.toLowerCase();
    if (tactical.includes('wing')) return "Overloading Flanks Focus";
    if (tactical.includes('low block') || tactical.includes('counter')) return "Compact Box Containment";
    if (tactical.includes('press')) return "High-Line Opponent Half Recovery";
    return "Central Passing Networks";
  }, [teamData?.tactics?.attack]);

  const handleSimilarNavigate = (sCode) => {
    navigate(`/team-analysis?team=${sCode}`);
  };

  const backdropStyle = useMemo(() => {
    const imageFile = heroImages[teamCode];
    if (imageFile) {
      return {
        backgroundImage: `url(${imageFile})`,
      };
    } else {
      return {
        backgroundImage: `url(${stadiumBg})`,
        opacity: '0.07'
      };
    }
  }, [teamCode]);

  if (!teamData) {
    return (
      <main className="analysis-page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)', color: '#fff' }}>
        <div style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', background: 'rgba(5,10,48,0.3)', backdropFilter: 'blur(20px)' }}>
          <h3 className="no-matches-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Retrieving Team Dossier</h3>
          <p className="no-matches-text" style={{ fontSize: '0.85rem' }}>Accessing WCai Team Intelligence Database...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="analysis-page-content" style={{ paddingTop: 0 }}>
      
      {/* Cinematic Hero Section */}
      <section className="analysis-hero-section" id="team-hero-container" style={{ position: 'relative', minHeight: '640px', display: 'flex', alignItems: 'center', paddingTop: '130px', paddingBottom: '50px', overflow: 'hidden', borderBottom: '1px solid rgba(0, 240, 255, 0.15)' }}>
        <div className="analysis-hero-cover" id="hero-backdrop-img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center 25%', zIndex: 1, pointerEvents: 'none', filter: 'blur(0.5px) brightness(0.6) saturate(1.15)', ...backdropStyle }}></div>
        <div className="analysis-hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(2,4,18,0.3) 40%, rgba(2,4,18,0.7) 100%), linear-gradient(to bottom, rgba(5,10,48,0.1) 0%, rgba(2,4,18,0.85) 100%), radial-gradient(circle at center, transparent, rgba(0,0,0,0.4))', zIndex: 2, pointerEvents: 'none' }}></div>
        
        <div className="section-container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="dossier-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left side Metadata */}
            <div className="hero-left-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="dossier-flag-wrapper" id="hero-flag" style={{ width: '60px', height: '38px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(teamCode) }}></div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="dossier-rank-badge" id="hero-group-label" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-accent)', background: 'rgba(0,209,255,0.08)', border: '1px solid rgba(0,209,255,0.2)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                      {teamData.group}
                    </span>
                    {teamData.isDarkHorse && (
                      <span className="dossier-dark-horse" id="hero-dh-badge" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#ff3b30', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                        DARK HORSE
                      </span>
                    )}
                  </div>
                  <h1 className="dossier-team-name" id="hero-team-name" style={{ fontSize: '2.8rem', fontWeight: 855, color: '#fff', margin: '4px 0 0 0', letterSpacing: '-0.8px', lineHeight: 1.1, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {teamData.name}
                  </h1>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div className="hero-meta-stat">
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>FIFA RANK</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }} id="hero-fifa-rank">
                    {teamData.fifaRank}
                  </div>
                </div>
                <div className="hero-meta-stat">
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>AI POWER RANK</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-accent)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }} id="hero-ai-rank">
                    {teamData.powerRank ? `#${teamData.powerRank}` : 'N/A'}
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: '2.5px solid var(--primary-accent)', paddingLeft: '16px' }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>AI Tactical Overview</h2>
                <p className="hero-description" id="hero-tactical-desc" style={{ fontSize: '0.96rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, maxWidth: '520px', textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
                  {teamData.overview}
                </p>
              </div>
            </div>

            {/* Right side probabilities */}
            <div className="hero-right-col" style={{ display: 'flex', justifyContent: 'flex-end', gap: '32px' }}>
              <div className="prob-box-large" style={{ textAlign: 'center', background: 'rgba(5,10,48,0.45)', border: '1px solid rgba(0,209,255,0.2)', padding: '24px', borderRadius: '16px', backdropFilter: 'blur(12px)', minWidth: '140px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>WIN CUP PROB</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-accent)', lineHeight: 1 }} id="hero-win-prob">
                  {teamData.winProb}
                </div>
              </div>
              <div className="prob-box-large" style={{ textAlign: 'center', background: 'rgba(5,10,48,0.45)', border: '1px solid rgba(0,209,255,0.2)', padding: '24px', borderRadius: '16px', backdropFilter: 'blur(12px)', minWidth: '140px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>STAGE QUAL PROB</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--secondary-accent)', lineHeight: 1 }} id="hero-qual-prob">
                  {teamData.qualProb}
                </div>
              </div>
            </div>

          </div>

          {/* AI Tactical Archetype Callout Card inside Hero */}
          <div className="archetype-card" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(5,10,48,0.35) 0%, rgba(2,4,18,0.55) 100%)', border: '1px solid rgba(0, 209, 255, 0.18)', borderRadius: '16px', padding: '28px 32px', backdropFilter: 'blur(15px)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', marginTop: '35px' }}>
            <div className="archetype-pulse-glow" style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,209,255,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>AI Tactical Classification</div>
            <h2 className="archetype-title" id="dossier-archetype-name" style={{ fontSize: '1.9rem', fontWeight: 850, color: '#fff', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
              {teamData.archetype}
            </h2>
            <p className="archetype-desc" id="dossier-archetype-desc" style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: '0 0 18px 0', lineHeight: 1.5 }}>
              {teamData.archetypeDesc}
            </p>
            <div className="archetype-tags" id="dossier-archetype-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {teamData.tags.map((t, idx) => (
                <span key={idx} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '4px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Dossier Content Layout */}
      <div className="section-container" style={{ marginTop: '40px' }}>

        {/* Two Column Layout: Pitch & Tactical Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '72px' }} className="dossier-split-layout">
          
          {/* Left: Starting XI Pitch */}
          <section className="starting-xi-section">
            <div className="analysis-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 className="card-heading" style={{ marginBottom: '8px' }}>
                <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line><circle cx="12" cy="12" r="4"></circle></svg>
                Predicted Starting XI
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', gap: '15px' }} id="dossier-formation-label">
                <span>Formation: {teamData.formation}</span>
                {teamData.coach && <span>Coach: {teamData.coach}</span>}
              </div>
              
              {/* Vertical Tactical Pitch */}
              <div className="tactical-pitch-vertical" style={{ position: 'relative', flex: 1, minHeight: '480px', background: 'rgba(5,10,48,0.25)', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', backdropFilter: 'blur(5px)' }}>
                <div className="pitch-line-top" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 0, borderTop: '1.5px solid rgba(255,255,255,0.06)' }}></div>
                <div className="pitch-line-bottom" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 0, borderBottom: '1.5px solid rgba(255,255,255,0.06)' }}></div>
                <div className="pitch-center-circle-vertical" style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', border: '1.5px solid rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}></div>
                <div className="pitch-center-line-vertical" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '1.5px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
                
                {/* Penalty Area Top */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '180px', height: '75px', border: '1.5px solid rgba(255,255,255,0.05)', borderTop: 'none', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '25px', border: '1.5px solid rgba(255,255,255,0.05)', borderTop: 'none', pointerEvents: 'none' }}></div>
                
                {/* Penalty Area Bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '180px', height: '75px', border: '1.5px solid rgba(255,255,255,0.05)', borderBottom: 'none', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '25px', border: '1.5px solid rgba(255,255,255,0.05)', borderBottom: 'none', pointerEvents: 'none' }}></div>
                
                {/* Player nodes container */}
                <div className="pitch-players-vertical-container" id="dossier-pitch-players" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                  {teamData.startingXI.map((p, idx) => (
                    <div 
                      key={idx} 
                      className="pitch-player-node" 
                      style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
                    >
                      <div className="player-dot" style={{ position: 'relative', width: '14px', height: '14px', background: 'var(--primary-accent)', border: '2px solid #fff', borderRadius: '50%', boxShadow: '0 0 10px var(--primary-accent)', transition: 'transform 0.3s ease' }}>
                        <span className="player-pulse" style={{ position: 'absolute', top: '-4px', left: '-4px', right: '-4px', bottom: '-4px', border: '1.5px solid var(--primary-accent)', borderRadius: '50%', opacity: 0.6, animation: 'player-ring-pulse 2s infinite ease-out' }}></span>
                      </div>
                      <div className="player-label-name" style={{ fontSize: '0.72rem', fontWeight: 750, color: '#fff', textShadow: '0 2px 5px rgba(0,0,0,0.95)', marginTop: '4px', whiteSpace: 'nowrap', fontFamily: 'var(--font-main)', textAlign: 'center' }}>
                        {p.name}
                        {p.isCaptain && (
                          <span className="captain-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px', fontSize: '0.5rem', fontWeight: 800, background: '#ff3b30', color: '#fff', borderRadius: '50%', marginLeft: '3px', verticalAlign: 'middle', lineHeight: 1 }}>C</span>
                        )}
                      </div>
                      <div className="player-label-role" style={{ fontSize: '0.55rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: '1px' }}>
                        {p.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right: Team Strengths & Analytics */}
          <section className="strength-metrics-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="analysis-card">
              <h3 className="card-heading">
                <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                AI Team Strength Metrics
              </h3>
              
              <div className="dossier-metrics-list" id="dossier-strength-metrics" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {Object.keys(teamData.metrics).map((key) => {
                  const rating = teamData.metrics[key];
                  return (
                    <div key={key} className="metric-row-stat" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', fontWeight: 750 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{metricsLabels[key]}</span>
                        <span style={{ color: 'var(--primary-accent)', fontWeight: 800 }}>{rating}%</span>
                      </div>
                      <div className="strength-bar-track" style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                        <div className="strength-bar-fill" style={{ width: `${rating}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-accent) 0%, #00f0ff 100%)', borderRadius: '3px', boxShadow: '0 0 8px rgba(0,209,255,0.4)' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heat Zones Pitch */}
            <div className="analysis-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 className="card-heading" style={{ marginBottom: '12px' }}>
                <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
                AI Tactical Heat Zones
              </h3>
              <div style={{ position: 'relative', flex: 1, minHeight: '200px', background: 'rgba(5,10,48,0.2)', border: '1.5px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }} id="dossier-heatmap-pitch">
                <div className="heatmap-small-vertical" style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {/* Center circle & penalty outlines */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '50px', border: '1px solid rgba(255,255,255,0.03)', borderTop: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '50px', border: '1px solid rgba(255,255,255,0.03)', borderBottom: 'none' }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '1px solid rgba(255,255,255,0.03)' }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: '70px', height: '70px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }}></div>
                  
                  {/* Dynamic heat rings */}
                  <div className="dossier-heat-rings" id="dossier-heat-node-container" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                    {heatspots.map((h, i) => (
                      <div 
                        key={i}
                        className="heat-spot-node" 
                        style={{ position: 'absolute', left: `${h.left}%`, top: `${h.top}%`, width: `${h.size}px`, height: `${h.size}px`, background: `radial-gradient(circle, rgba(0,209,255,${h.op}) 0%, transparent 70%)`, transform: 'translate(-50%, -50%)', pointerEvents: 'none', borderRadius: '50%', animation: 'heat-pulse 4s infinite ease-in-out' }}
                      ></div>
                    ))}
                  </div>
                  <span className="pitch-tag" id="modal-pitch-tag" style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
                    {pitchTagText}
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Tactical Details breakdown */}
        <section className="tactical-dossier-details" style={{ marginBottom: '72px' }}>
          <div className="analysis-card">
            <h3 className="card-heading" style={{ marginBottom: '24px' }}>
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              AI Tactical Identity Analysis
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="dossier-split-layout">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Build-up Structure</h4>
                  <p id="tactical-buildup" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.buildup}
                  </p>
                </div>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Attacking Philosophy</h4>
                  <p id="tactical-attack" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.attack}
                  </p>
                </div>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Pressing & Defensive Behavior</h4>
                  <p id="tactical-press" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.defense}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Transition Speed</h4>
                  <p id="tactical-transition" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.transition}
                  </p>
                </div>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Set Piece Threat</h4>
                  <p id="tactical-setpieces" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.setpieces}
                  </p>
                </div>
                <div className="tactical-detail-block" style={{ background: 'rgba(255, 59, 48, 0.03)', border: '1.5px dashed rgba(255, 59, 48, 0.12)', padding: '12px 16px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ff3b30', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>AI-Identified Weaknesses</h4>
                  <p id="tactical-weakness" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.weakness}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Players Section */}
        <section className="key-players-section" style={{ marginBottom: '72px' }}>
          <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '20px', textAlign: 'left', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            AI Key Players Profile
          </h3>
          
          <div className="players-grid" id="dossier-players-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {teamData.players.map((p, idx) => (
              <div 
                key={idx}
                className="player-card-hud" 
                style={{ background: 'rgba(5,10,48,0.3)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', backdropFilter: 'blur(10px)', transition: 'border-color 0.3s ease, transform 0.3s ease', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,209,255,0.08)', border: '1px solid rgba(0,209,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-accent)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style={{ width: '14px', height: '14px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{p.name}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.3px' }}>{p.role}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 750 }}>AI SCORE</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--primary-accent)' }}>{p.score}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', fontSize: '0.85rem', lineStyle: 1.4, color: 'var(--text-secondary)' }}>
                  {p.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Form & Momentum */}
        <section className="form-momentum-section" style={{ marginBottom: '40px' }}>
          <div className="analysis-card">
            <h3 className="card-heading" style={{ marginBottom: '24px' }}>
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Recent Form & AI Momentum Analysis
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px' }} className="dossier-split-layout">
              
              {/* Left: Match history metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 750, color: '#fff' }}>Last 5 Matches:</span>
                  <div id="dossier-form-badges" style={{ display: 'flex', gap: '6px' }}>
                    {teamData.form.map((f, idx) => (
                      <span key={idx} className={`mini-form-badge m-badge-${f.toLowerCase()}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>{f}</span>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>GOALS SCORED</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 850, color: '#fff' }} id="form-goals-scored">
                      {teamData.goalsScored}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>GOALS CONCEDED</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--text-secondary)' }} id="form-goals-conceded">
                      {teamData.goalsConceded}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>CLEAN SHEETS</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--secondary-accent)' }} id="form-clean-sheets">
                      {teamData.cleanSheets}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Momentum trend line SVG */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 750, color: '#fff', marginBottom: '12px' }}>AI Momentum Trend Timeline:</div>
                <div style={{ height: '120px', background: 'rgba(5,10,48,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', overflow: 'hidden', padding: '12px 0' }}>
                  <svg viewBox="0 0 400 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="momentum-fade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path id="dossier-momentum-area" d={momentumPaths.areaD} fill="url(#momentum-fade)"></path>
                    <path id="dossier-momentum-line" d={momentumPaths.lineD} fill="none" stroke="#00D1FF" strokeWidth="2"></path>
                    <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.04)" strokeDasharray="4"></line>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Related Teams Section */}
        <section className="related-teams-section" style={{ marginBottom: '80px' }}>
          <h3 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px', textAlign: 'left', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Similar Tactical Profiles
          </h3>
          <div className="similar-grid" id="dossier-similar-teams" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {teamData.similar.map((s, idx) => (
              <div 
                key={idx}
                className="similar-team-card" 
                onClick={() => handleSimilarNavigate(s.code)} 
                style={{ background: 'rgba(5,10,48,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.25s ease' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '28px', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(s.code) }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{s.name}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.archetype}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', fontWeight: 750, textTransform: 'uppercase' }}>MATCH</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 855, color: 'var(--secondary-accent)' }}>{s.sim}%</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
