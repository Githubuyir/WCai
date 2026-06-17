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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sliderExpanded, setSliderExpanded] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setShowStickyHeader(window.scrollY > 420);
      } else {
        setShowStickyHeader(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isCompleted = match.status === 'Completed' || match.status === 'Full Time';

  if (isCompleted) {
    const predVsReality = match.predictionVsReality || {
      probabilities: { homeWin: 52, draw: 13, awayWin: 35 },
      aiOutcome: "Prediction Correct",
      why: "Mexico’s pressing advantage and attacking efficiency matched the pre-match model expectation."
    };
    const summaryText = match.summaryText || "";
    const timelineEvents = match.timelineEvents || [];
    const statsDetails = match.statsDetails || [];
    const lineupDetails = match.lineupDetails || {
      team1: { name: "Mexico", formation: "4-1-4-1", coach: "Javier Aguirre", players: [] },
      team2: { name: "South Africa", formation: "5-3-2", coach: "Hugo Broos", players: [] }
    };
    const substitutesList = match.substitutesList || { team1: [], team2: [] };
    const playerOfTheMatch = match.playerOfTheMatch || { name: "Julián Quiñones", rating: 8.8, reason: "" };
    const tacticalReviews = match.tacticalReviews || {
      team1: { title: "", positives: [], improvements: [] },
      team2: { title: "", positives: [], negatives: [], improvements: [] }
    };

    const getRatingColor = (rating) => {
      if (rating >= 8.0) return 'var(--primary-accent)';
      if (rating >= 7.0) return '#00e678';
      if (rating >= 6.0) return '#f0aa00';
      return '#ff4646';
    };

    const getHorizontalCoords = (team, formation, index, number) => {
      if (team === 'team1') {
        if (match.id === 14) {
          const coords14 = [
            [8, 50],   // 0: GK (Courtois)
            [20, 82],  // 1: RB (Meunier)
            [20, 62],  // 2: RCB (Ngoy)
            [20, 38],  // 3: LCB (Mechele)
            [20, 18],  // 4: LB (Castagne)
            [30, 62],  // 5: RDM (Onana)
            [30, 38],  // 6: LDM (Tielemans)
            [38, 50],  // 7: CAM (De Bruyne)
            [38, 82],  // 8: RW (Trossard)
            [38, 18],  // 9: LW (Doku)
            [46, 50]   // 10: CF (De Ketelaere)
          ];
          return coords14[index] || [20, 50];
        }
        if (match.id === 15) {
          const coords15 = [
            [8, 50],   // 0: GK (Al Owais)
            [20, 82],  // 1: RB (Abdulhamid)
            [20, 62],  // 2: RCB (Al Amri)
            [20, 38],  // 3: LCB (Al Tambakti)
            [20, 18],  // 4: LB (Al-Harbi)
            [34, 82],  // 5: RM (Al Shamat)
            [32, 62],  // 6: RCM (Kanno)
            [32, 38],  // 7: LCM (Alkhaibari)
            [34, 18],  // 8: LM (Al-Dawsari)
            [44, 38],  // 9: LCF (Al-Juwayr)
            [44, 62]   // 10: RCF (Al-Buraikan)
          ];
          return coords15[index] || [20, 50];
        }
        if (match.id === 16) {
          const coords16 = [
            [8, 50],   // 0: GK (Beiranvand)
            [20, 82],  // 1: RB (Rezaeian)
            [20, 62],  // 2: RCB (Khalilzadeh)
            [20, 38],  // 3: LCB (Nemati)
            [20, 18],  // 4: LB (Mohammadi)
            [38, 82],  // 5: LM (Mohebi)
            [30, 62],  // 6: RCM (Ghoddos)
            [30, 38],  // 7: LCM (Ezatolahi)
            [38, 18],  // 8: RM (Yousefi)
            [46, 62],  // 9: RCF (Moghanlou)
            [46, 38]   // 10: LCF (Taremi)
          ];
          return coords16[index] || [20, 50];
        }
        if (match.id === 17) {
          const coords17 = [
            [8, 50],   // 0: GK (Maignan)
            [20, 82],  // 1: RB (Koundé)
            [20, 62],  // 2: RCB (Upamecano)
            [20, 38],  // 3: LCB (Saliba)
            [20, 18],  // 4: LB (Hernández)
            [30, 62],  // 5: RDM (Tchouaméni)
            [30, 38],  // 6: LDM (Rabiot)
            [38, 82],  // 7: RW/RAM (Olise)
            [38, 50],  // 8: CAM (Dembélé)
            [38, 18],  // 9: LW/LAM (Doué)
            [46, 50]   // 10: CF (Mbappé)
          ];
          return coords17[index] || [20, 50];
        }
        if (match.id === 18) {
          const coords18 = [
            [8, 50],   // 0: GK (Hassan)
            [20, 82],  // 1: RB (Ali)
            [20, 62],  // 2: RCB (Tahseen)
            [20, 38],  // 3: LCB (Hashem)
            [20, 18],  // 4: LB (Doski)
            [38, 82],  // 5: RM (Bayesh)
            [30, 62],  // 6: RCM (Ismael)
            [30, 38],  // 7: LCM (Al-Ammari)
            [38, 18],  // 8: LM (Jasim)
            [44, 38],  // 9: LS (Al Hamadi)
            [44, 62]   // 10: RS (Hussein)
          ];
          return coords18[index] || [20, 50];
        }
        if (match.id === 19) {
          const coords19 = [
            [8, 50],   // 0: GK (Martínez)
            [20, 82],  // 1: RB (Montiel)
            [20, 62],  // 2: RCB (Romero)
            [20, 38],  // 3: LCB (Martínez)
            [20, 18],  // 4: LB (Medina)
            [30, 82],  // 5: RCM (De Paul)
            [30, 38],  // 6: LCM (Mac Allister)
            [30, 62],  // 7: DM (Fernández)
            [38, 18],  // 8: RW (Almada)
            [46, 50],  // 9: CF (Martínez)
            [38, 82]   // 10: LW (Messi)
          ];
          return coords19[index] || [20, 50];
        }
        if (match.id === 20) {
          const coords20 = [
            [8, 50],   // 0: GK (Schlager)
            [20, 82],  // 1: RB (Posch)
            [20, 62],  // 2: RCB (Lienhart)
            [20, 38],  // 3: LCB (Alaba)
            [20, 18],  // 4: LB (Mwene)
            [30, 62],  // 5: RDM (Seiwald)
            [30, 38],  // 6: LDM (Laimer)
            [38, 82],  // 7: RAM (Schmid)
            [38, 50],  // 8: CAM (Schlager)
            [38, 18],  // 9: LAM (Sabitzer)
            [46, 50]   // 10: CF (Kalajdzic)
          ];
          return coords20[index] || [20, 50];
        }
        const coords = [
          [8, 50],
          [20, 82],
          [20, 62],
          [20, 38],
          [20, 18],
          [30, 50],
          [38, 82],
          [38, 62],
          [38, 38],
          [38, 18],
          [46, 50]
        ];
        if (formation === '4-2-3-1') {
          const coordsKOR = [
            [8, 50],
            [20, 38],
            [20, 82],
            [20, 62],
            [20, 18],
            [38, 18],
            [38, 50],
            [30, 62],
            [30, 38],
            [46, 50],
            [38, 82]
          ];
          return coordsKOR[index] || [20, 50];
        }
        if (formation === '4-4-2') {
          const coords442 = [
            [8, 50],   // GK
            [20, 82],  // RB (Doué)
            [20, 38],  // LCB (Agbadou)
            [20, 18],  // LB (Konan)
            [20, 62],  // RCB (Singo)
            [38, 62],  // RCM (Kessié)
            [38, 38],  // LCM (Fofana)
            [38, 82],  // RM (Diomandé)
            [38, 18],  // LM (Touré)
            [46, 62],  // RS (Pépé)
            [46, 38]   // LS (Wahi)
          ];
          return coords442[index] || [20, 50];
        }
        if (formation === '4-1-2-3') {
          const coords4123 = [
            [8, 50],   // GK
            [20, 82],  // RB (Llorente)
            [20, 62],  // RCB (Cubarsí)
            [20, 38],  // LCB (Laporte)
            [20, 18],  // LB (Cucurella)
            [30, 50],  // DM (Rodri)
            [38, 72],  // RCM (Ruiz)
            [38, 28],  // LCM (Pedri)
            [46, 82],  // RW (Ferran)
            [46, 50],  // CF (Oyarzabal)
            [46, 18]   // LW (Gavi)
          ];
          return coords4123[index] || [20, 50];
        }
        return coords[index] || [20, 50];
      } else {
        if (match.id === 14) {
          const coords14 = [
            [92, 50],  // 0: GK (Shobeir)
            [80, 82],  // 1: LB (El Fotouh)
            [80, 62],  // 2: LCB (Fathi)
            [80, 38],  // 3: RCB (Ibrahim)
            [80, 18],  // 4: RB (Hany)
            [70, 62],  // 5: RDM (Ateya)
            [62, 50],  // 6: CAM (Salah)
            [62, 82],  // 7: LW (Ashour)
            [70, 38],  // 8: LDM (Lasheen)
            [62, 18],  // 9: RW (Ziko)
            [54, 50]   // 10: CF (Marmoush)
          ];
          return coords14[index] || [80, 50];
        }
        if (match.id === 15) {
          const coords15 = [
            [92, 50],  // 0: GK (Muslera)
            [80, 82],  // 1: LB (Viña)
            [80, 62],  // 2: LCB (Olivera)
            [80, 38],  // 3: RCB (Cáceres)
            [80, 18],  // 4: RB (Varela)
            [68, 62],  // 5: LCM (Bentancur)
            [68, 38],  // 6: RCM (Ugarte)
            [66, 82],  // 7: LM (Araújo)
            [66, 18],  // 8: RM (Valverde)
            [56, 62],  // 9: LCF (Núñez)
            [56, 38]   // 10: RCF (Viñas)
          ];
          return coords15[index] || [80, 50];
        }
        if (match.id === 16) {
          const coords16 = [
            [92, 50],  // 0: GK (Crocombe)
            [80, 82],  // 1: LB (Cacace)
            [80, 62],  // 2: LCB (Boxall)
            [80, 38],  // 3: RCB (Surman)
            [80, 18],  // 4: RB (Payne)
            [70, 62],  // 5: RDM (Stamenic)
            [70, 38],  // 6: LDM (Bell)
            [62, 18],  // 7: RM (McCowatt)
            [62, 50],  // 8: CAM (Singh)
            [62, 82],  // 9: LM (Just)
            [54, 50]   // 10: CF (Wood)
          ];
          return coords16[index] || [80, 50];
        }
        if (match.id === 17) {
          const coords17 = [
            [92, 50],  // 0: GK (Mendy)
            [80, 82],  // 1: RB (Diouf)
            [80, 62],  // 2: RCB (Niakhaté)
            [80, 38],  // 3: LCB (Koulibaly)
            [80, 18],  // 4: LB (Diatta)
            [70, 68],  // 5: RCM (26 Gueye)
            [70, 32],  // 6: LCM (5 Gueye)
            [72, 50],  // 7: DM (Camara)
            [62, 82],  // 8: RW (Sarr)
            [62, 18],  // 9: LW (Mané)
            [54, 50]   // 10: CF (Jackson)
          ];
          return coords17[index] || [80, 50];
        }
        if (match.id === 18) {
          const coords18 = [
            [92, 50],  // 0: GK (Nyland)
            [80, 82],  // 1: LB (Møller Wolfe)
            [80, 62],  // 2: LCB (Heggem)
            [80, 38],  // 3: RCB (Ajer)
            [80, 18],  // 4: RB (Ryerson)
            [70, 68],  // 5: LCM (Aursnes)
            [72, 50],  // 6: CM (Berge)
            [62, 82],  // 7: LW (Nusa)
            [70, 32],  // 8: RCM (Ødegaard)
            [62, 18],  // 9: RW (Sørloth)
            [54, 50]   // 10: CF (Haaland)
          ];
          return coords18[index] || [80, 50];
        }
        if (match.id === 19) {
          const coords19 = [
            [92, 50],  // 0: GK (Zidane)
            [80, 82],  // 1: LB (Aït Nouri)
            [80, 62],  // 2: LCB (Bensebaini)
            [80, 38],  // 3: RCB (Mandi)
            [80, 18],  // 4: RB (Belghali)
            [62, 82],  // 5: LW (Chaïbi)
            [70, 68],  // 6: LCM (Bentaleb)
            [70, 32],  // 7: RCM (Boudaoui)
            [72, 50],  // 8: DM (Maza)
            [62, 18],  // 9: RW (Hadj Moussa)
            [54, 50]   // 10: CF (Gouiri)
          ];
          return coords19[index] || [80, 50];
        }
        if (match.id === 20) {
          const coords20 = [
            [92, 50],  // 0: GK (Abulaila)
            [80, 25],  // 1: LCB (Taha)
            [80, 50],  // 2: CB (Al-Arab)
            [80, 75],  // 3: RCB (Nasib)
            [70, 85],  // 4: RWB (Haddad)
            [70, 15],  // 5: LWB (Abualnadi)
            [70, 38],  // 6: LCM (Al-Rawabdeh)
            [70, 62],  // 7: RCM (Al Rashdan)
            [62, 25],  // 8: LF/LW (Fakhouri)
            [54, 50],  // 9: CF (Olwan)
            [62, 75]   // 10: RF/RW (Tamari)
          ];
          return coords20[index] || [80, 50];
        }
        const coords = [
          [92, 50],
          [80, 18],
          [80, 34],
          [80, 50],
          [80, 66],
          [80, 82],
          [70, 32],
          [70, 50],
          [70, 68],
          [58, 38],
          [58, 62]
        ];
        if (formation === '3-4-2-1') {
          const coordsCZE = [
            [92, 50],
            [80, 62],
            [80, 50],
            [70, 18],
            [62, 32],
            [70, 38],
            [70, 62],
            [70, 82],
            [62, 68],
            [54, 50],
            [80, 38]
          ];
          return coordsCZE[index] || [80, 50];
        }
        if (formation === '3-5-2') {
          const coords352 = [
            [92, 50],  // GK
            [80, 82],  // LCB (Hincapié)
            [80, 18],  // RCB (Pacho)
            [80, 50],  // CB (Ordóñez)
            [70, 82],  // LWB (Minda)
            [70, 66],  // LCM (Vite)
            [70, 50],  // CM (Caicedo)
            [70, 34],  // RCM (Franco)
            [70, 18],  // RWB (Yeboah)
            [58, 30],  // LS (Plata)
            [58, 50]   // RS (Valencia)
          ];
          return coords352[index] || [80, 50];
        }
        if (formation === '4-2-3-1') {
          const coords4231 = [
            [92, 50],  // GK
            [80, 82],  // LB (Cabral 13)
            [80, 62],  // LCB (Borges)
            [80, 38],  // RCB (Lopes)
            [80, 18],  // RB (Moreira)
            [70, 18],  // RM (Mendes)
            [70, 34],  // RDM (Duarte 15)
            [70, 50],  // LDM (Pina)
            [70, 82],  // LM (Cabral 7)
            [61, 50],  // CF (Livramento)
            [70, 66]   // CAM (Monteiro)
          ];
          return coords4231[index] || [80, 50];
        }
        return coords[index] || [80, 50];
      }
    };

    const getVerticalCoords = (team, formation, index, number) => {
      if (team === 'team1') {
        if (match.id === 14) {
          const coords14v = [
            [50, 7],    // 0: GK (Courtois)
            [80, 16],   // 1: RB (Meunier)
            [60, 16],   // 2: RCB (Ngoy)
            [40, 16],   // 3: LCB (Mechele)
            [20, 16],   // 4: LB (Castagne)
            [65, 28],   // 5: RDM (Onana)
            [35, 28],   // 6: LDM (Tielemans)
            [50, 36],   // 7: CAM (De Bruyne)
            [80, 44],   // 8: RW (Trossard)
            [20, 44],   // 9: LW (Doku)
            [50, 44]    // 10: CF (De Ketelaere)
          ];
          return coords14v[index] || [50, 20];
        }
        if (match.id === 15) {
          const coords15v = [
            [50, 7],    // 0: GK (Al Owais)
            [80, 16],   // 1: RB (Abdulhamid)
            [60, 16],   // 2: RCB (Al Amri)
            [40, 16],   // 3: LCB (Al Tambakti)
            [20, 16],   // 4: LB (Al-Harbi)
            [80, 30],   // 5: RM (Al Shamat)
            [60, 30],   // 6: RCM (Kanno)
            [40, 30],   // 7: LCM (Alkhaibari)
            [20, 30],   // 8: LM (Al-Dawsari)
            [40, 44],   // 9: LCF (Al-Juwayr)
            [60, 44]    // 10: RCF (Al-Buraikan)
          ];
          return coords15v[index] || [50, 20];
        }
        if (match.id === 16) {
          const coords16v = [
            [50, 7],    // 0: GK (Beiranvand)
            [80, 16],   // 1: RB (Rezaeian)
            [60, 16],   // 2: RCB (Khalilzadeh)
            [40, 16],   // 3: LCB (Nemati)
            [20, 16],   // 4: LB (Mohammadi)
            [20, 44],   // 5: LM (Mohebi)
            [65, 28],   // 6: RCM (Ghoddos)
            [35, 28],   // 7: LCM (Ezatolahi)
            [80, 44],   // 8: RM (Yousefi)
            [65, 44],   // 9: RCF (Moghanlou)
            [35, 44]    // 10: LCF (Taremi)
          ];
          return coords16v[index] || [50, 20];
        }
        if (match.id === 17) {
          const coords17v = [
            [50, 7],    // 0: GK (Maignan)
            [80, 16],   // 1: RB (Koundé)
            [60, 16],   // 2: RCB (Upamecano)
            [40, 16],   // 3: LCB (Saliba)
            [20, 16],   // 4: LB (Hernández)
            [65, 28],   // 5: RDM (Tchouaméni)
            [35, 28],   // 6: LDM (Rabiot)
            [80, 44],   // 7: RW/RAM (Olise)
            [50, 36],   // 8: CAM (Dembélé)
            [20, 44],   // 9: LW/LAM (Doué)
            [50, 44]    // 10: CF (Mbappé)
          ];
          return coords17v[index] || [50, 20];
        }
        if (match.id === 18) {
          const coords18v = [
            [50, 7],    // 0: GK (Hassan)
            [80, 16],   // 1: RB (Ali)
            [60, 16],   // 2: RCB (Tahseen)
            [40, 16],   // 3: LCB (Hashem)
            [20, 16],   // 4: LB (Doski)
            [80, 30],   // 5: RM (Bayesh)
            [60, 28],   // 6: RCM (Ismael)
            [40, 28],   // 7: LCM (Al-Ammari)
            [20, 30],   // 8: LM (Jasim)
            [40, 44],   // 9: LS (Al Hamadi)
            [60, 44]    // 10: RS (Hussein)
          ];
          return coords18v[index] || [50, 20];
        }
        if (match.id === 19) {
          const coords19v = [
            [50, 7],    // 0: GK (Martínez)
            [80, 16],   // 1: RB (Montiel)
            [60, 16],   // 2: RCB (Romero)
            [40, 16],   // 3: LCB (Martínez)
            [20, 16],   // 4: LB (Medina)
            [65, 28],   // 5: RCM (De Paul)
            [35, 28],   // 6: LCM (Mac Allister)
            [50, 24],   // 7: DM (Fernández)
            [80, 44],   // 8: RW (Almada)
            [50, 44],   // 9: CF (Martínez)
            [20, 44]    // 10: LW (Messi)
          ];
          return coords19v[index] || [50, 20];
        }
        if (match.id === 20) {
          const coords20v = [
            [50, 7],    // 0: GK (Schlager)
            [80, 16],   // 1: RB (Posch)
            [60, 16],   // 2: RCB (Lienhart)
            [40, 16],   // 3: LCB (Alaba)
            [20, 16],   // 4: LB (Mwene)
            [60, 28],   // 5: RDM (Seiwald)
            [40, 28],   // 6: LDM (Laimer)
            [80, 36],   // 7: RAM (Schmid)
            [50, 32],   // 8: CAM (Schlager)
            [20, 36],   // 9: LAM (Sabitzer)
            [50, 44]    // 10: CF (Kalajdzic)
          ];
          return coords20v[index] || [50, 20];
        }
        const coords = [
          [50, 7],
          [80, 16],
          [60, 16],
          [40, 16],
          [20, 16],
          [50, 26],
          [80, 36],
          [60, 36],
          [40, 36],
          [20, 36],
          [50, 44]
        ];
        if (formation === '4-4-2') {
          const coords442 = [
            [50, 7],   // GK
            [80, 16],  // RB (Doué)
            [60, 16],  // LCB (Agbadou)
            [40, 16],  // LB (Konan)
            [20, 16],  // RCB (Singo)
            [65, 30],  // RCM (Kessié)
            [35, 30],  // LCM (Fofana)
            [80, 30],  // RM (Diomandé)
            [20, 30],  // LM (Touré)
            [60, 44],  // RS (Pépé)
            [40, 44]   // LS (Wahi)
          ];
          return coords442[index] || [50, 20];
        }
        if (formation === '4-1-2-3') {
          const coords4123 = [
            [50, 7],   // GK
            [80, 16],  // RB (Llorente)
            [60, 16],  // RCB (Cubarsí)
            [40, 16],  // LCB (Laporte)
            [20, 16],  // LB (Cucurella)
            [50, 24],  // DM (Rodri)
            [65, 32],  // RCM (Ruiz)
            [35, 32],  // LCM (Pedri)
            [80, 44],  // RW (Ferran)
            [50, 44],  // CF (Oyarzabal)
            [20, 44]   // LW (Gavi)
          ];
          return coords4123[index] || [50, 20];
        }
        return coords[index] || [50, 20];
      } else {
        if (match.id === 14) {
          const coords14v = [
            [50, 93],   // 0: GK (Shobeir)
            [80, 84],   // 1: LB (El Fotouh)
            [60, 84],   // 2: LCB (Fathi)
            [40, 84],   // 3: RCB (Ibrahim)
            [20, 84],   // 4: RB (Hany)
            [65, 72],   // 5: RDM (Ateya)
            [50, 64],   // 6: CAM (Salah)
            [80, 64],   // 7: LW (Ashour)
            [35, 72],   // 8: LDM (Lasheen)
            [20, 64],   // 9: RW (Ziko)
            [50, 56]    // 10: CF (Marmoush)
          ];
          return coords14v[index] || [50, 80];
        }
        if (match.id === 15) {
          const coords15v = [
            [50, 93],   // 0: GK (Muslera)
            [80, 84],   // 1: LB (Viña)
            [60, 84],   // 2: LCB (Olivera)
            [40, 84],   // 3: RCB (Cáceres)
            [20, 84],   // 4: RB (Varela)
            [60, 70],   // 5: LCM (Bentancur)
            [40, 70],   // 6: RCM (Ugarte)
            [80, 70],   // 7: LM (Araújo)
            [20, 70],   // 8: RM (Valverde)
            [60, 56],   // 9: LCF (Núñez)
            [40, 56]    // 10: RCF (Viñas)
          ];
          return coords15v[index] || [50, 80];
        }
        if (match.id === 16) {
          const coords16v = [
            [50, 93],   // 0: GK (Crocombe)
            [80, 84],   // 1: LB (Cacace)
            [60, 84],   // 2: LCB (Boxall)
            [40, 84],   // 3: RCB (Surman)
            [20, 84],   // 4: RB (Payne)
            [65, 72],   // 5: RDM (Stamenic)
            [35, 72],   // 6: LDM (Bell)
            [20, 64],   // 7: RM (McCowatt)
            [50, 64],   // 8: CAM (Singh)
            [80, 64],   // 9: LM (Just)
            [50, 56]    // 10: CF (Wood)
          ];
          return coords16v[index] || [50, 80];
        }
        if (match.id === 17) {
          const coords17v = [
            [50, 93],   // 0: GK (Mendy)
            [20, 84],   // 1: RB (Diouf)
            [40, 84],   // 2: RCB (Niakhaté)
            [60, 84],   // 3: LCB (Koulibaly)
            [80, 84],   // 4: LB (Diatta)
            [35, 72],   // 5: RCM (26 Gueye)
            [65, 72],   // 6: LCM (5 Gueye)
            [50, 76],   // 7: DM (Camara)
            [20, 64],   // 8: RW (Sarr)
            [80, 64],   // 9: LW (Mané)
            [50, 56]    // 10: CF (Jackson)
          ];
          return coords17v[index] || [50, 80];
        }
        if (match.id === 18) {
          const coords18v = [
            [50, 93],   // 0: GK (Nyland)
            [80, 84],   // 1: LB (Møller Wolfe)
            [60, 84],   // 2: LCB (Heggem)
            [40, 84],   // 3: RCB (Ajer)
            [20, 84],   // 4: RB (Ryerson)
            [65, 72],   // 5: LCM (Aursnes)
            [50, 76],   // 6: CM (Berge)
            [80, 64],   // 7: LW (Nusa)
            [35, 72],   // 8: RCM (Ødegaard)
            [20, 64],   // 9: RW (Sørloth)
            [50, 56]    // 10: CF (Haaland)
          ];
          return coords18v[index] || [50, 80];
        }
        if (match.id === 19) {
          const coords19v = [
            [50, 93],   // 0: GK (Zidane)
            [80, 84],   // 1: LB (Aït Nouri)
            [60, 84],   // 2: LCB (Bensebaini)
            [40, 84],   // 3: RCB (Mandi)
            [20, 84],   // 4: RB (Belghali)
            [80, 64],   // 5: LW (Chaïbi)
            [65, 72],   // 6: LCM (Bentaleb)
            [35, 72],   // 7: RCM (Boudaoui)
            [50, 76],   // 8: DM (Maza)
            [20, 64],   // 9: RW (Hadj Moussa)
            [50, 56]    // 10: CF (Gouiri)
          ];
          return coords19v[index] || [50, 80];
        }
        if (match.id === 20) {
          const coords20v = [
            [50, 93],   // 0: GK (Abulaila)
            [65, 84],   // 1: LCB (Taha)
            [50, 84],   // 2: CB (Al-Arab)
            [35, 84],   // 3: RCB (Nasib)
            [20, 74],   // 4: RWB (Haddad)
            [80, 74],   // 5: LWB (Abualnadi)
            [60, 76],   // 6: LCM (Al-Rawabdeh)
            [40, 76],   // 7: RCM (Al Rashdan)
            [75, 62],   // 8: LF/LW (Fakhouri)
            [50, 56],   // 9: CF (Olwan)
            [25, 62]    // 10: RF/RW (Tamari)
          ];
          return coords20v[index] || [50, 80];
        }
        const coords = [
          [50, 93],
          [20, 84],
          [35, 84],
          [50, 84],
          [65, 84],
          [80, 84],
          [35, 74],
          [50, 74],
          [65, 74],
          [40, 64],
          [60, 64]
        ];
        if (formation === '3-5-2') {
          const coords352 = [
            [50, 93],  // GK
            [30, 84],  // LCB (Hincapié)
            [70, 84],  // RCB (Pacho)
            [50, 84],  // CB (Ordóñez)
            [20, 72],  // LWB (Minda)
            [35, 72],  // LCM (Vite)
            [50, 72],  // CM (Caicedo)
            [65, 72],  // RCM (Franco)
            [80, 72],  // RWB (Yeboah)
            [40, 58],  // LS (Plata)
            [60, 58]   // RS (Valencia)
          ];
          return coords352[index] || [50, 80];
        }
        if (formation === '4-2-3-1') {
          const coords4231 = [
            [50, 93],  // GK
            [20, 84],  // LB (Cabral 13)
            [40, 84],  // LCB (Borges)
            [60, 84],  // RCB (Lopes)
            [80, 84],  // RB (Moreira)
            [80, 72],  // RM (Mendes)
            [65, 72],  // RDM (Duarte 15)
            [50, 72],  // LDM (Pina)
            [20, 72],  // LM (Cabral 7)
            [50, 58],  // CF (Livramento)
            [35, 72]   // CAM (Monteiro)
          ];
          return coords4231[index] || [50, 80];
        }
        return coords[index] || [50, 80];
      }
    };

    const dateParts = match.date.split(' - ');
    const dateString = dateParts[0];
    const timeString = dateParts[1] ? dateParts[1].replace(' (IST)', '') : '';

    return (
      <main className="analysis-page-content" id="analysis-main-container">
        {/* Cinematic Completed Hero Section */}
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

            {/* Main Result Panel */}
            <div className="completed-hero-score-wrapper">
              <div className="completed-hero-team left">
                <span className="completed-hero-team-name">{match.team1.name}</span>
                <div className="completed-hero-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></div>
              </div>
              <div className="completed-hero-score-center">
                <span className="completed-hero-score-numbers">
                  {match.goals1} - {match.goals2}
                </span>
                <span className="completed-hero-ft-badge">Full Time</span>
              </div>
              <div className="completed-hero-team right">
                <div className="completed-hero-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></div>
                <span className="completed-hero-team-name">{match.team2.name}</span>
              </div>
            </div>

            {/* Goalscorers Sub-panel */}
            <div className="completed-hero-scorers-row">
              <div className="completed-hero-scorers-left">
                {(match.scorers1 || []).map((scorer, i) => (
                  <div key={i}>{scorer}</div>
                ))}
              </div>
              <div className="completed-hero-scorers-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px' }}>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <div className="completed-hero-scorers-right">
                {(match.scorers2 || []).map((scorer, i) => (
                  <div key={i}>{scorer}</div>
                ))}
              </div>
            </div>

            {/* Hero details row */}
            <div className="hero-details-row" style={{ marginTop: '24px' }}>
              <div className="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>{dateString}</span>
              </div>
              <div className="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>{timeString} (IST)</span>
              </div>
              <div className="detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{match.stadium}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Prediction vs Reality & Match Summary Grid */}
        <section className="analysis-grid-section" style={{ paddingTop: '32px' }}>
          <div className="section-container">
            <div className="analysis-grid-layout" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', display: 'grid' }}>
              
              {/* Prediction vs Reality Block */}
              <div className="analysis-card pred-reality-card">
                <h3 className="card-heading" style={{ marginBottom: '16px' }}>
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12"></polygon></svg>
                  Prediction Before Match
                </h3>
                <div className="pred-reality-probs-row">
                  <span>{match.team1.name} <strong className="pred-probability-highlight">{predVsReality.probabilities.homeWin}%</strong></span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>Draw <strong>{predVsReality.probabilities.draw}%</strong></span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>{match.team2.name} <strong>{predVsReality.probabilities.awayWin}%</strong></span>
                </div>

                <div className="pred-reality-blocks">
                  <div className="ai-outcome-box">
                    <span className="ai-outcome-lbl">AI Outcome</span>
                    <span className="ai-outcome-val">{predVsReality.aiOutcome}</span>
                  </div>
                  <div className="ai-why-explanation-box">
                    <span className="ai-why-lbl">Why</span>
                    <p className="ai-why-txt">{predVsReality.why}</p>
                  </div>
                </div>
              </div>

              {/* Match Summary Block */}
              <div className="analysis-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="card-heading" style={{ marginBottom: '16px' }}>
                  <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                  Match Summary
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
                  {summaryText}
                </p>
                {match.matchNote && (
                  <div className="completed-match-note" style={{ background: 'rgba(0, 240, 255, 0.03)', borderLeft: '3px solid var(--primary-accent)', padding: '10px 12px', borderRadius: '4px', marginTop: '16px' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-accent)', marginBottom: '4px', letterSpacing: '0.5px' }}>Key Match Note</span>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.4, color: 'var(--text-secondary)', margin: 0 }}>{match.matchNote}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Timeline & Tactical Match Stats Section */}
        <section className="analysis-grid-section" style={{ paddingTop: '0' }}>
          <div className="section-container">
            <div className="analysis-grid-layout">
              
              {/* LEFT COLUMN: Match Timeline */}
              <div className="left-analysis-column">
                <div className="analysis-card timeline-card">
                  <h3 className="card-heading" style={{ marginBottom: '16px' }}>
                    <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Match Timeline
                  </h3>

                  <div className="vertical-timeline">
                    {timelineEvents.map((evt, i) => {
                      const isRed = evt.type === 'red_card';
                      const isFT = evt.type === 'full_time';

                      return (
                        <div key={i} className="timeline-event-row">
                          <div className={`timeline-marker-dot ${isRed ? 'red-card' : isFT ? 'full-time' : ''}`}></div>
                          <div className="timeline-event-body">
                            <div className="timeline-event-left">
                              <span className={`timeline-event-minute ${isRed ? 'red-card' : isFT ? 'full-time' : ''}`}>{evt.minute}</span>
                              <span className="timeline-event-text">
                                <strong>{evt.player}</strong> {evt.player ? '— ' : ''}{evt.detail}
                              </span>
                            </div>
                            <div className="timeline-event-icon-badge">
                              {evt.type === 'goal' && (
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', color: '#fff' }}>
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                  <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                              )}
                              {evt.type === 'own_goal' && (
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', color: '#ff4d4d', background: '#fff', borderRadius: '50%' }}>
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                  <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                              )}
                              {evt.type === 'red_card' && (
                                <div style={{ width: '10px', height: '14px', background: '#ff3333', borderRadius: '1.5px', boxShadow: '0 0 5px rgba(255, 51, 51, 0.5)' }}></div>
                              )}
                              {evt.type === 'yellow_card' && (
                                <div style={{ width: '10px', height: '14px', background: '#ffcc00', borderRadius: '1.5px', boxShadow: '0 0 5px rgba(255, 204, 0, 0.5)' }}></div>
                              )}
                              {isFT && (
                                <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#00ff88', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.25)', padding: '2px 6px', borderRadius: '4px' }}>FT</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Match Stats */}
              <div className="right-analysis-column">
                <div className="analysis-card">
                  <h3 className="card-heading" style={{ marginBottom: '20px' }}>
                    <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                    Match Stats
                  </h3>

                  <div className="dual-stats-wrapper">
                    {statsDetails.map((stat, i) => (
                      <div key={i} className="dual-stat-row">
                        <div className="dual-stat-header">
                          <span className="dual-stat-team-val left">{stat.team1}</span>
                          <span className="dual-stat-name">{stat.name}</span>
                          <span className="dual-stat-team-val right">{stat.team2}</span>
                        </div>
                        <div className="dual-stat-slider-track">
                          <div className="dual-stat-fill-left" style={{ width: `${stat.ratio1}%` }}></div>
                          <div className="dual-stat-divider"></div>
                          <div className="dual-stat-fill-right" style={{ width: `${stat.ratio2}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Lineups & Player Ratings Section */}
        <section className="ratings-comparison-section" style={{ paddingTop: '0' }}>
          <div className="section-container">
            <div className="analysis-card" style={{ padding: '24px' }}>
              <h3 className="card-heading text-center" style={{ margin: '0 0 8px 0', fontSize: '1.25rem', justifyContent: 'center' }}>Lineups & Player Ratings</h3>
              <p className="section-subtitle text-center" style={{ margin: '0 0 24px 0', fontSize: '0.85rem' }}>
                {lineupDetails.team1.name} ({lineupDetails.team1.formation}) vs {lineupDetails.team2.name} ({lineupDetails.team2.formation}) lineups and player ratings
              </p>

              {/* Glassmorphic Outlined Football Pitch */}
              <div className="dark-glassmorphic-pitch">
                <div className="pitch-lines-overlay">
                  <div className="pitch-outer-border"></div>
                  <div className="pitch-halfway-line"></div>
                  <div className="pitch-center-circle-horizontal"></div>
                  <div className="pitch-center-spot"></div>
                  <div className="pitch-penalty-area-left"></div>
                  <div className="pitch-penalty-area-right"></div>
                </div>

                <div className="pitch-players-field-completed">
                  {/* Mexico Players */}
                  {lineupDetails.team1.players.map((p, index) => {
                    const coords = isMobile 
                      ? getVerticalCoords('team1', lineupDetails.team1.formation, index, p.number)
                      : getHorizontalCoords('team1', lineupDetails.team1.formation, index, p.number);
                    const ratingColor = getRatingColor(p.rating);

                    return (
                      <div
                        key={`lineup-mex-${index}`}
                        className="completed-player-node team-mex"
                        style={{ left: `${coords[0]}%`, top: `${coords[1]}%` }}
                      >
                        <div className={`completed-player-circle ${p.isPotm ? 'potm-highlight' : ''}`}>
                          {p.number}
                          {p.rating !== null && p.rating !== undefined ? (
                            <span 
                              className="completed-player-rating-badge"
                              style={{ background: ratingColor }}
                            >
                              {p.rating.toFixed(1)}{p.isHighlight ? ' ★' : ''}
                            </span>
                          ) : (
                            <span 
                              className="completed-player-rating-badge"
                              style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}
                            >
                              —
                            </span>
                          )}

                          {/* Top-Left: Substitution Minute & Arrow */}
                          {p.events.find(e => e.type === 'sub_off') && (
                            <span className="completed-player-sub-minute-badge" style={{
                              position: 'absolute',
                              top: '-12px',
                              left: '-16px',
                              background: 'rgba(5, 10, 48, 0.95)',
                              color: '#fff',
                              fontSize: '0.62rem',
                              fontWeight: 900,
                              padding: '2px 5px',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                              zIndex: 4,
                              border: '1.5px solid rgba(255, 255, 255, 0.15)'
                            }}>
                              <span style={{
                                width: '9px',
                                height: '9px',
                                background: '#ff3333',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1px'
                              }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" style={{ width: '100%', height: '100%' }}>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                              </span>
                              {p.events.find(e => e.type === 'sub_off').minute}
                            </span>
                          )}

                          {/* Bottom-Left: Captain & Injury */}
                          <div className="completed-player-left-extra-icons" style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '-6px',
                            display: 'flex',
                            gap: '2px',
                            zIndex: 3
                          }}>
                            {p.isCaptain && (
                              <span className="player-captain-badge" style={{
                                width: '12px',
                                height: '12px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#000',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.55rem',
                                fontWeight: 950,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(0,0,0,0.15)'
                              }}>
                                C
                              </span>
                            )}
                            {p.events.find(e => e.type === 'injury') && (
                              <span className="player-injury-badge" style={{
                                width: '12px',
                                height: '12px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#ff3333',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(0,0,0,0.15)'
                              }}>
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '8px', height: '8px' }}>
                                  <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z" />
                                </svg>
                              </span>
                            )}
                          </div>

                          {/* Bottom-Right: Goals, Cards, Assists */}
                          <div className="completed-player-event-icons">
                            {p.events.map((evt, idx) => (
                              <React.Fragment key={idx}>
                                {evt.type === 'goal' && (
                                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '11px', height: '11px', color: '#fff', background: '#000', borderRadius: '50%' }}>
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                    <circle cx="12" cy="12" r="4"></circle>
                                  </svg>
                                )}
                                {evt.type === 'own_goal' && (
                                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '11px', height: '11px', color: '#ff4d4d', background: '#fff', borderRadius: '50%' }}>
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                    <circle cx="12" cy="12" r="4"></circle>
                                  </svg>
                                )}
                                {evt.type === 'assist' && (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '11px', height: '11px', color: '#00ff88', background: '#000', borderRadius: '50%', padding: '1px' }}>
                                    <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M4 12h16M16 8l4 4-4 4" />
                                  </svg>
                                )}
                                {evt.type === 'red_card' && (
                                  <div style={{ width: '8px', height: '11px', background: '#ff3333', borderRadius: '1px' }}></div>
                                )}
                                {evt.type === 'yellow_card' && (
                                  <div style={{ width: '8px', height: '11px', background: '#ffcc00', borderRadius: '1px' }}></div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <span className="completed-player-name-label">
                          {p.isCaptain && <span style={{ color: '#ffd700', marginRight: '3px' }}>©</span>}
                          {p.name}
                        </span>
                      </div>
                    );
                  })}

                  {/* South Africa Players */}
                  {lineupDetails.team2.players.map((p, index) => {
                    const coords = isMobile 
                      ? getVerticalCoords('team2', lineupDetails.team2.formation, index, p.number)
                      : getHorizontalCoords('team2', lineupDetails.team2.formation, index, p.number);
                    const ratingColor = getRatingColor(p.rating);

                    return (
                      <div
                        key={`lineup-rsa-${index}`}
                        className="completed-player-node team-rsa"
                        style={{ left: `${coords[0]}%`, top: `${coords[1]}%` }}
                      >
                        <div className="completed-player-circle">
                          {p.number}
                          {p.rating !== null && p.rating !== undefined ? (
                            <span 
                              className="completed-player-rating-badge"
                              style={{ background: ratingColor }}
                            >
                              {p.rating.toFixed(1)}{p.isHighlight ? ' ★' : ''}
                            </span>
                          ) : (
                            <span 
                              className="completed-player-rating-badge"
                              style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}
                            >
                              —
                            </span>
                          )}

                          {/* Top-Left: Substitution Minute & Arrow */}
                          {p.events.find(e => e.type === 'sub_off') && (
                            <span className="completed-player-sub-minute-badge" style={{
                              position: 'absolute',
                              top: '-12px',
                              left: '-16px',
                              background: 'rgba(5, 10, 48, 0.95)',
                              color: '#fff',
                              fontSize: '0.62rem',
                              fontWeight: 900,
                              padding: '2px 5px',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                              zIndex: 4,
                              border: '1.5px solid rgba(255, 255, 255, 0.15)'
                            }}>
                              <span style={{
                                width: '9px',
                                height: '9px',
                                background: '#ff3333',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1px'
                              }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" style={{ width: '100%', height: '100%' }}>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                              </span>
                              {p.events.find(e => e.type === 'sub_off').minute}
                            </span>
                          )}

                          {/* Bottom-Left: Captain & Injury */}
                          <div className="completed-player-left-extra-icons" style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '-6px',
                            display: 'flex',
                            gap: '2px',
                            zIndex: 3
                          }}>
                            {p.isCaptain && (
                              <span className="player-captain-badge" style={{
                                width: '12px',
                                height: '12px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#000',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.55rem',
                                fontWeight: 950,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(0,0,0,0.15)'
                              }}>
                                C
                              </span>
                            )}
                            {p.events.find(e => e.type === 'injury') && (
                              <span className="player-injury-badge" style={{
                                width: '12px',
                                height: '12px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#ff3333',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                border: '1px solid rgba(0,0,0,0.15)'
                              }}>
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '8px', height: '8px' }}>
                                  <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z" />
                                </svg>
                              </span>
                            )}
                          </div>

                          {/* Bottom-Right: Goals, Cards, Assists */}
                          <div className="completed-player-event-icons">
                            {p.events.map((evt, idx) => (
                              <React.Fragment key={idx}>
                                {evt.type === 'goal' && (
                                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '11px', height: '11px', color: '#fff', background: '#000', borderRadius: '50%' }}>
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                    <circle cx="12" cy="12" r="4"></circle>
                                  </svg>
                                )}
                                {evt.type === 'own_goal' && (
                                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '11px', height: '11px', color: '#ff4d4d', background: '#fff', borderRadius: '50%' }}>
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                    <circle cx="12" cy="12" r="4"></circle>
                                  </svg>
                                )}
                                {evt.type === 'assist' && (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '11px', height: '11px', color: '#00ff88', background: '#000', borderRadius: '50%', padding: '1px' }}>
                                    <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M4 12h16M16 8l4 4-4 4" />
                                  </svg>
                                )}
                                {evt.type === 'red_card' && (
                                  <div style={{ width: '8px', height: '11px', background: '#ff3333', borderRadius: '1px' }}></div>
                                )}
                                {evt.type === 'yellow_card' && (
                                  <div style={{ width: '8px', height: '11px', background: '#ffcc00', borderRadius: '1px' }}></div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <span className="completed-player-name-label">
                          {p.isCaptain && <span style={{ color: '#ffd700', marginRight: '3px' }}>©</span>}
                          {p.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pitch Coaches legend bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>Coach: <strong style={{ color: '#fff' }}>{lineupDetails.team1.coach}</strong></span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Coach</span>
                <span>Coach: <strong style={{ color: '#fff' }}>{lineupDetails.team2.coach}</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Substitutes Box Section */}
        <section className="analysis-grid-section" style={{ paddingTop: '0' }}>
          <div className="section-container">
            <div className="analysis-card timeline-card">
              <h3 className="card-heading" style={{ marginBottom: '20px', justifyContent: 'center' }}>
                Substitutes
              </h3>

              <div className="subs-split-layout">
                {/* Mexico Subs */}
                <div className="subs-column">
                  <div className="subs-team-header">
                    <span style={{ width: '20px', height: '14px', borderRadius: '1.5px', overflow: 'hidden', display: 'inline-flex' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></span>
                    <span>{lineupDetails.team1.name} Subs</span>
                  </div>
                  {(substitutesList.team1 || []).map((sub, i) => {
                    const ratingColor = getRatingColor(sub.rating);
                    return (
                      <div key={i} className="sub-player-card-row">
                        <div className="sub-player-left">
                          {sub.rating !== null && sub.rating !== undefined ? (
                            <span className="sub-rating-pill" style={{ background: ratingColor }}>{sub.rating.toFixed(1)}</span>
                          ) : (
                            <span className="sub-rating-pill" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}>—</span>
                          )}
                          <span className="sub-shirt-number">{sub.number}</span>
                          <div className="sub-name-role">
                            <span className="sub-player-name-txt">{sub.name}</span>
                            <span className="sub-player-role-txt">{sub.role}</span>
                          </div>
                        </div>
                        <div className="sub-player-right-events">
                          {sub.events && sub.events.map((evt, idx) => (
                            <React.Fragment key={idx}>
                              {evt.type === 'goal' && (
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', color: '#fff', marginRight: '6px' }}>
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                  <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                              )}
                              {evt.type === 'own_goal' && (
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', color: '#ff4d4d', background: '#fff', borderRadius: '50%', marginRight: '6px' }}>
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                  <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                              )}
                              {evt.type === 'assist' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '12px', height: '12px', color: '#00ff88', marginRight: '6px' }}>
                                  <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M4 12h16M16 8l4 4-4 4" />
                                </svg>
                              )}
                              {evt.type === 'yellow_card' && (
                                <div style={{ width: '10px', height: '14px', background: '#ffcc00', borderRadius: '1.5px', marginRight: '6px', boxShadow: '0 0 5px rgba(255, 204, 0, 0.5)' }}></div>
                              )}
                              {evt.type === 'red_card' && (
                                <div style={{ width: '10px', height: '14px', background: '#ff3333', borderRadius: '1.5px', marginRight: '6px', boxShadow: '0 0 5px rgba(255, 51, 51, 0.5)' }}></div>
                              )}
                            </React.Fragment>
                          ))}
                          <span className="sub-in-minute-badge">{sub.minute}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* South Africa Subs */}
                <div className="subs-column">
                  <div className="subs-team-header">
                    <span style={{ width: '20px', height: '14px', borderRadius: '1.5px', overflow: 'hidden', display: 'inline-flex' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></span>
                    <span>{lineupDetails.team2.name} Subs</span>
                  </div>
                  {(substitutesList.team2 || []).map((sub, i) => {
                    const ratingColor = getRatingColor(sub.rating);
                    return (
                      <div key={i} className="sub-player-card-row">
                        <div className="sub-player-left">
                          {sub.rating !== null && sub.rating !== undefined ? (
                            <span className="sub-rating-pill" style={{ background: ratingColor }}>{sub.rating.toFixed(1)}</span>
                          ) : (
                            <span className="sub-rating-pill" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}>—</span>
                          )}
                          <span className="sub-shirt-number">{sub.number}</span>
                          <div className="sub-name-role">
                            <span className="sub-player-name-txt">{sub.name}</span>
                            <span className="sub-player-role-txt">{sub.role}</span>
                          </div>
                        </div>
                        <div className="sub-player-right-events">
                          {sub.events && sub.events.map((evt, idx) => (
                            <React.Fragment key={idx}>
                              {evt.type === 'goal' && (
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', color: '#fff', marginRight: '6px' }}>
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                  <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                              )}
                              {evt.type === 'own_goal' && (
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '12px', height: '12px', color: '#ff4d4d', background: '#fff', borderRadius: '50%', marginRight: '6px' }}>
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                                  <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                              )}
                              {evt.type === 'assist' && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '12px', height: '12px', color: '#00ff88', marginRight: '6px' }}>
                                  <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1M4 12h16M16 8l4 4-4 4" />
                                </svg>
                              )}
                              {evt.type === 'yellow_card' && (
                                <div style={{ width: '10px', height: '14px', background: '#ffcc00', borderRadius: '1.5px', marginRight: '6px', boxShadow: '0 0 5px rgba(255, 204, 0, 0.5)' }}></div>
                              )}
                              {evt.type === 'red_card' && (
                                <div style={{ width: '10px', height: '14px', background: '#ff3333', borderRadius: '1.5px', marginRight: '6px', boxShadow: '0 0 5px rgba(255, 51, 51, 0.5)' }}></div>
                              )}
                            </React.Fragment>
                          ))}
                          <span className="sub-in-minute-badge rsa-sub">{sub.minute}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Player of the Match Highlights */}
        <section className="analysis-grid-section" style={{ paddingTop: '0' }}>
          <div className="section-container">
            <div className="analysis-card potm-card">
              <div className="potm-layout">
                <div className="potm-badge-wrapper">
                  <svg className="potm-star-gold" viewBox="0 0 24 24" fill="currentColor" style={{ width: '40px', height: '40px' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span className="potm-badge-text">MOTM</span>
                </div>
                <div className="potm-details-box">
                  <div className="potm-name-rating-row">
                    <span className="potm-name">{playerOfTheMatch.name}</span>
                    <span className="potm-rating-val">
                      {playerOfTheMatch.rating !== null && playerOfTheMatch.rating !== undefined ? playerOfTheMatch.rating.toFixed(1) : '—'}
                    </span>
                  </div>
                  <p className="potm-reason-text">
                    <strong>Reason: </strong> {playerOfTheMatch.reason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tactical Review Cards */}
        <section className="analysis-grid-section" style={{ paddingTop: '0' }}>
          <div className="section-container">
            <h3 className="card-heading text-center" style={{ margin: '0 0 24px 0', fontSize: '1.25rem', justifyContent: 'center' }}>Tactical Review</h3>
            
            <div className="tactical-reviews-split-grid">
              
              {/* Mexico Review */}
              <div className="tactical-review-column-card mex-border">
                <h4 className="tactical-review-team-title">
                  {tacticalReviews.team1.title}
                </h4>

                <div className="tactical-review-sub-block">
                  <span className="tactical-review-sub-heading positives">The Positives</span>
                  <ul className="tactical-review-bullets-list">
                    {(tacticalReviews.team1.positives || []).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="tactical-review-sub-block">
                  <span className="tactical-review-sub-heading negatives-improve">Areas to Improve</span>
                  <ul className="tactical-review-bullets-list">
                    {(tacticalReviews.team1.improvements || []).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* South Africa Review */}
              <div className="tactical-review-column-card rsa-border">
                <h4 className="tactical-review-team-title">
                  {tacticalReviews.team2.title}
                </h4>

                <div className="tactical-review-sub-block">
                  <span className="tactical-review-sub-heading positives">The Positives</span>
                  <ul className="tactical-review-bullets-list">
                    {(tacticalReviews.team2.positives || []).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="tactical-review-sub-block">
                  <span className="tactical-review-sub-heading negatives-improve">
                    {tacticalReviews.team2.improvements ? "Areas to Improve" : "The Negatives"}
                  </span>
                  <ul className="tactical-review-bullets-list">
                    {(tacticalReviews.team2.improvements || tacticalReviews.team2.negatives || []).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* More Match Intelligence Hub (Related matches) */}
        <section className="related-matches-section">
          <div className="section-container">
            <h2 className="section-title">More <span className="cyan-highlight">Match Intelligence Hub</span></h2>
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

  return (
    <main className="analysis-page-content" id="analysis-main-container">
      {/* Sticky Mini Match Header */}
      {showStickyHeader && (
        <div className="sticky-mini-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, background: 'rgba(5, 10, 48, 0.95)', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 16px', gap: '8px', backdropFilter: 'blur(10px)', animation: 'slideDown 0.25s ease-out' }}>
          <style>{`
            @keyframes slideDown {
              from { transform: translateY(-100%); }
              to { transform: translateY(0); }
            }
          `}</style>
          <div className="sticky-team left" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '24px', height: '16px', borderRadius: '2px', overflow: 'hidden', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{match.team1.name}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 950, color: 'var(--primary-accent)' }}>{sliderVal}%</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>vs</span>
          <div className="sticky-team right" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 950, color: 'var(--secondary-accent)' }}>{team2Percentage}%</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{match.team2.name}</span>
            <span style={{ width: '24px', height: '16px', borderRadius: '2px', overflow: 'hidden', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></span>
          </div>
        </div>
      )}

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
          {isMobile ? (
            <div className="mobile-hero-matchup-container">
              <div className="mobile-matchup-row">
                {/* Left Team block */}
                <div className="mobile-team-block left">
                  <div className="mobile-flag-name-row">
                    <div className="mobile-hero-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></div>
                    <span className="mobile-hero-team-name">{match.team1.name}</span>
                    <span className="mobile-fifa-rank">#{FIFA_RANKS[match.team1.code] || '—'}</span>
                  </div>
                  <span className="mobile-prob-val cyan">{sliderVal}%</span>
                </div>

                {/* VS Block */}
                <div className="mobile-vs-block">
                  <div className="mobile-vs-text">VS</div>
                  <div className="mobile-draw-text">Draw {drawPercentage}%</div>
                </div>

                {/* Right Team block */}
                <div className="mobile-team-block right">
                  <div className="mobile-flag-name-row">
                    <span className="mobile-fifa-rank">#{FIFA_RANKS[match.team2.code] || '—'}</span>
                    <span className="mobile-hero-team-name">{match.team2.name}</span>
                    <div className="mobile-hero-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></div>
                  </div>
                  <span className="mobile-prob-val white">{team2Percentage}%</span>
                </div>
              </div>
            </div>
          ) : (
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
          )}

          {/* Interactive Win Balance Progress Track Slider */}
          <div className="hero-probability-interactive">
            <div className="hero-prob-bar-track">
              <div className="hero-prob-fill-left" style={{ width: `${sliderVal}%` }}></div>
              <div className="hero-prob-fill-draw" style={{ left: `${sliderVal}%`, width: `${drawPercentage}%` }}></div>
            </div>
            {isMobile ? (
              <div className="mobile-slider-collapse-container" style={{ width: '100%' }}>
                <button 
                  className="btn-slider-toggle" 
                  onClick={() => setSliderExpanded(!sliderExpanded)}
                  style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5, 10, 48, 0.45)', border: '1px solid rgba(0, 240, 255, 0.18)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', marginTop: '10px', outline: 'none' }}
                >
                  <span style={{ fontWeight: 700 }}>{sliderExpanded ? '▼' : '▶'} Interactive Simulator</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.65 }}>Tap to expand</span>
                </button>
                {sliderExpanded && (
                  <div className="interactive-slider-wrapper" style={{ marginTop: '14px' }}>
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
                )}
              </div>
            ) : (
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
            )}
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
                  {isMobile ? (
                    <div className="mobile-report-cards" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pressing Intensity</span>
                          <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--primary-accent)' }}>{match.intensity}%</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>{match.team1.name} expected to dominate high recoveries.</p>
                      </div>
                      <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Transition Play</span>
                          <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--primary-accent)' }}>{match.xG1} - {match.xG2} xG</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>Attacking structures emphasize rapid vertical transitions.</p>
                      </div>
                      <div className="report-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Defensive Shape</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#fff' }}>Compact</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>{match.team1.name} mid-block vs {match.team2.name} zonal containment.</p>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
                {isMobile ? (
                  <div className="tactical-pitch-vertical-wrapper" style={{ position: 'relative', width: '100%', height: '480px', background: 'rgba(5,10,48,0.25)', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', backdropFilter: 'blur(5px)', margin: '10px 0' }}>
                    <div className="pitch-center-circle-vertical" style={{ position: 'absolute', top: '50%', left: '50%', width: '90px', height: '90px', border: '1.5px solid rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}></div>
                    <div className="pitch-center-line-vertical" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '1.5px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
                    
                    {/* Penalty Area Top */}
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '160px', height: '65px', border: '1.5px solid rgba(255,255,255,0.05)', borderTop: 'none', pointerEvents: 'none' }}></div>
                    {/* Penalty Area Bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '160px', height: '65px', border: '1.5px solid rgba(255,255,255,0.05)', borderBottom: 'none', pointerEvents: 'none' }}></div>
                    
                    {/* Player nodes container */}
                    <div className="pitch-players-vertical-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                      {/* Team 1: Home team starting from TOP (GK at top, attacks downward) */}
                      {team1XI.map((p, index) => {
                        const left = p.x;
                        const top = 6 + ((88 - p.y) / 72) * 38;
                        return (
                          <div
                            key={`t1-${index}`}
                            className="pitch-player-node"
                            style={{ position: 'absolute', left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
                          >
                            <div className="player-dot" style={{ position: 'relative', width: '8px', height: '8px', background: 'var(--primary-accent)', border: '1px solid #fff', borderRadius: '50%', boxShadow: '0 0 6px var(--primary-accent)' }}></div>
                            <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#fff', textShadow: '0 1px 3px #000', marginTop: '2px', whiteSpace: 'nowrap' }}>{p.name.split(' ').pop()}</span>
                          </div>
                        );
                      })}
                      {/* Team 2: Away team starting from BOTTOM (GK at bottom, attacks upward) */}
                      {team2XI.map((p, index) => {
                        const left = p.x;
                        const top = 56 + ((p.y - 16) / 72) * 38;
                        return (
                          <div
                            key={`t2-${index}`}
                            className="pitch-player-node"
                            style={{ position: 'absolute', left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
                          >
                            <div className="player-dot" style={{ position: 'relative', width: '8px', height: '8px', background: '#ffffff', border: '1px solid var(--primary-accent)', borderRadius: '50%', boxShadow: '0 0 6px rgba(255,255,255,0.4)' }}></div>
                            <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#fff', textShadow: '0 1px 3px #000', marginTop: '2px', whiteSpace: 'nowrap' }}>{p.name.split(' ').pop()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="pitch-visualization-container">
                    <div className="pitch-border">
                      <div className="pitch-center-circle"></div>
                      <div className="pitch-center-line"></div>
                      <div className="pitch-penalty-left"></div>
                      <div className="pitch-penalty-right"></div>
                      {/* Dynamic players nodes */}
                      <div className="pitch-players-field">
                        {team1XI.map((p, index) => {
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
                )}
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

            {isMobile ? (
              <div className="mobile-matrix-stack" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {tacticalMatrix.map((cat, i) => {
                  const val1 = Math.round(cat.t1);
                  const val2 = Math.round(cat.t2);
                  const metricNameShort = cat.name.replace(" Rating", "").replace(" Strength", "").replace(" Control", "").replace(" Efficiency", "").replace(" Speed", "").replace(" Dominance", "");
                  return (
                    <div key={i} className="mobile-matrix-row" style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '10px' }}>
                      <div className="mobile-matrix-label" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{metricNameShort}</div>
                      <div className="mobile-matrix-team-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="bar-team-code" style={{ fontSize: '0.7rem', fontWeight: 700, width: '30px', color: 'var(--text-muted)' }}>{match.team1.code}</span>
                        <span className="bar-team-val cyan" style={{ fontSize: '0.78rem', fontWeight: 800, width: '24px', color: 'var(--primary-accent)' }}>{val1}</span>
                        <div className="mini-bar-track" style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div className="mini-bar-fill fill-cyan" style={{ height: '100%', background: 'var(--primary-accent)', width: `${val1}%` }}></div>
                        </div>
                      </div>
                      <div className="mobile-matrix-team-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="bar-team-code" style={{ fontSize: '0.7rem', fontWeight: 700, width: '30px', color: 'var(--text-muted)' }}>{match.team2.code}</span>
                        <span className="bar-team-val white" style={{ fontSize: '0.78rem', fontWeight: 800, width: '24px', color: '#fff' }}>{val2}</span>
                        <div className="mini-bar-track" style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div className="mini-bar-fill fill-white" style={{ height: '100%', background: '#fff', width: `${val2}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
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
            )}
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
