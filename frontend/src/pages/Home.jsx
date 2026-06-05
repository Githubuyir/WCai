import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchesData as fallbackMatches, generateFlagSVG } from '../data/mockData';
import { getMatches } from '../api/api';

export default function Home() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [activeGroup, setActiveGroup] = useState('A');
  const [tableOpacity, setTableOpacity] = useState(1);
  const [tableTransform, setTableTransform] = useState('translateY(0)');
  const carouselTrackRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Fetch matches from API with local fallback
  useEffect(() => {
    getMatches()
      .then((data) => {
        setMatches(data);
      })
      .catch((err) => {
        console.error("Backend API error or unreachable on Home. Falling back to mock data.", err);
        setMatches(fallbackMatches);
      });
  }, []);

  const handleAnalyzeMatch = (matchId) => {
    // Smooth transition effect
    document.body.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'none';
      navigate(`/analysis/${matchId}`, { state: { from: 'home' } });
    }, 400);
  };

  // Body styling class matching original static html page
  useEffect(() => {
    // No specific body class for index.html, but let's clear other pages' body classes
    document.body.className = '';
  }, []);

  // Standings data
  const groupStandings = {
    A: [
      { team: 'Mexico', code: 'MEX', p: 3, w: 2, d: 1, l: 0, gd: '+3', pts: 7, form: ['W', 'D', 'W'], rating: '8.4' },
      { team: 'South Korea', code: 'KOR', p: 3, w: 2, d: 0, l: 1, gd: '+1', pts: 6, form: ['W', 'L', 'W'], rating: '7.9' },
      { team: 'Czechia', code: 'CZE', p: 3, w: 1, d: 1, l: 1, gd: '0', pts: 4, form: ['L', 'D', 'W'], rating: '7.2' },
      { team: 'South Africa', code: 'RSA', p: 3, w: 0, d: 0, l: 3, gd: '-4', pts: 0, form: ['L', 'L', 'L'], rating: '6.5' }
    ],
    B: [
      { team: 'Canada', code: 'CAN', p: 3, w: 2, d: 1, l: 0, gd: '+4', pts: 7, form: ['W', 'W', 'D'], rating: '8.2' },
      { team: 'Switzerland', code: 'SUI', p: 3, w: 1, d: 2, l: 0, gd: '+2', pts: 5, form: ['D', 'W', 'D'], rating: '8.0' },
      { team: 'Bosnia', code: 'BIH', p: 3, w: 1, d: 0, l: 2, gd: '-2', pts: 3, form: ['L', 'L', 'W'], rating: '7.1' },
      { team: 'Qatar', code: 'QAT', p: 3, w: 0, d: 1, l: 2, gd: '-4', pts: 1, form: ['L', 'D', 'L'], rating: '6.4' }
    ],
    C: [
      { team: 'Brazil', code: 'BRA', p: 3, w: 3, d: 0, l: 0, gd: '+6', pts: 9, form: ['W', 'W', 'W'], rating: '9.2' },
      { team: 'Morocco', code: 'MAR', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['W', 'L', 'W'], rating: '8.1' },
      { team: 'Scotland', code: 'SCO', p: 3, w: 1, d: 0, l: 2, gd: '-2', pts: 3, form: ['L', 'W', 'L'], rating: '7.3' },
      { team: 'Haiti', code: 'HAI', p: 3, w: 0, d: 0, l: 3, gd: '-6', pts: 0, form: ['L', 'L', 'L'], rating: '6.0' }
    ],
    D: [
      { team: 'United States', code: 'USA', p: 3, w: 2, d: 1, l: 0, gd: '+3', pts: 7, form: ['W', 'D', 'W'], rating: '8.5' },
      { team: 'Australia', code: 'AUS', p: 3, w: 1, d: 2, l: 0, gd: '+1', pts: 5, form: ['D', 'W', 'D'], rating: '7.7' },
      { team: 'Türkiye', code: 'TUR', p: 3, w: 1, d: 0, l: 2, gd: '-1', pts: 3, form: ['L', 'L', 'W'], rating: '7.5' },
      { team: 'Paraguay', code: 'PAR', p: 3, w: 0, d: 1, l: 2, gd: '-3', pts: 1, form: ['L', 'D', 'L'], rating: '6.9' }
    ],
    E: [
      { team: 'Germany', code: 'GER', p: 3, w: 2, d: 1, l: 0, gd: '+4', pts: 7, form: ['W', 'D', 'W'], rating: '8.7' },
      { team: 'Ecuador', code: 'ECU', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['L', 'W', 'W'], rating: '7.8' },
      { team: 'Ivory Coast', code: 'CIV', p: 3, w: 1, d: 1, l: 1, gd: '0', pts: 4, form: ['W', 'D', 'L'], rating: '7.4' },
      { team: 'Curaçao', code: 'CUR', p: 3, w: 0, d: 0, l: 3, gd: '-6', pts: 0, form: ['L', 'L', 'L'], rating: '6.2' }
    ],
    F: [
      { team: 'Netherlands', code: 'NED', p: 3, w: 2, d: 1, l: 0, gd: '+3', pts: 7, form: ['W', 'D', 'W'], rating: '8.3' },
      { team: 'Japan', code: 'JPN', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['W', 'L', 'W'], rating: '8.1' },
      { team: 'Sweden', code: 'SWE', p: 3, w: 1, d: 1, l: 1, gd: '0', pts: 4, form: ['L', 'W', 'D'], rating: '7.6' },
      { team: 'Tunisia', code: 'TUN', p: 3, w: 0, d: 0, l: 3, gd: '-5', pts: 0, form: ['L', 'L', 'L'], rating: '6.8' }
    ],
    G: [
      { team: 'Belgium', code: 'BEL', p: 3, w: 2, d: 1, l: 0, gd: '+3', pts: 7, form: ['W', 'D', 'W'], rating: '8.4' },
      { team: 'Egypt', code: 'EGY', p: 3, w: 1, d: 2, l: 0, gd: '+1', pts: 5, form: ['D', 'W', 'D'], rating: '7.7' },
      { team: 'Iran', code: 'IRN', p: 3, w: 1, d: 0, l: 2, gd: '-1', pts: 3, form: ['L', 'L', 'W'], rating: '7.0' },
      { team: 'New Zealand', code: 'NZL', p: 3, w: 0, d: 1, l: 2, gd: '-3', pts: 1, form: ['L', 'D', 'L'], rating: '6.3' }
    ],
    H: [
      { team: 'Spain', code: 'ESP', p: 3, w: 2, d: 1, l: 0, gd: '+5', pts: 7, form: ['W', 'W', 'D'], rating: '8.9' },
      { team: 'Uruguay', code: 'URU', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['L', 'W', 'W'], rating: '8.2' },
      { team: 'Saudi Arabia', code: 'KSA', p: 3, w: 1, d: 0, l: 2, gd: '-3', pts: 3, form: ['W', 'L', 'L'], rating: '7.1' },
      { team: 'Cabo Verde', code: 'CPV', p: 3, w: 0, d: 1, l: 2, gd: '-4', pts: 1, form: ['L', 'D', 'L'], rating: '6.6' }
    ],
    I: [
      { team: 'France', code: 'FRA', p: 3, w: 3, d: 0, l: 0, gd: '+7', pts: 9, form: ['W', 'W', 'W'], rating: '9.3' },
      { team: 'Senegal', code: 'SEN', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['W', 'L', 'W'], rating: '7.9' },
      { team: 'Norway', code: 'NOR', p: 3, w: 1, d: 0, l: 2, gd: '-3', pts: 3, form: ['L', 'W', 'L'], rating: '7.8' },
      { team: 'Iraq', code: 'IRQ', p: 3, w: 0, d: 0, l: 3, gd: '-6', pts: 0, form: ['L', 'L', 'L'], rating: '6.5' }
    ],
    J: [
      { team: 'Argentina', code: 'ARG', p: 3, w: 3, d: 0, l: 0, gd: '+8', pts: 9, form: ['W', 'W', 'W'], rating: '9.4' },
      { team: 'Austria', code: 'AUT', p: 3, w: 1, d: 1, l: 1, gd: '0', pts: 4, form: ['L', 'W', 'D'], rating: '7.7' },
      { team: 'Algeria', code: 'ALG', p: 3, w: 1, d: 1, l: 1, gd: '-1', pts: 4, form: ['W', 'D', 'L'], rating: '7.6' },
      { team: 'Jordan', code: 'JOR', p: 3, w: 0, d: 0, l: 3, gd: '-7', pts: 0, form: ['L', 'L', 'L'], rating: '6.3' }
    ],
    K: [
      { team: 'Portugal', code: 'POR', p: 3, w: 2, d: 1, l: 0, gd: '+4', pts: 7, form: ['W', 'D', 'W'], rating: '8.8' },
      { team: 'Colombia', code: 'COL', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['L', 'W', 'W'], rating: '8.3' },
      { team: 'Uzbekistan', code: 'UZB', p: 3, w: 1, d: 0, l: 2, gd: '-2', pts: 3, form: ['W', 'L', 'L'], rating: '7.0' },
      { team: 'DR Congo', code: 'COD', p: 3, w: 0, d: 1, l: 2, gd: '-4', pts: 1, form: ['L', 'D', 'L'], rating: '6.7' }
    ],
    L: [
      { team: 'England', code: 'ENG', p: 3, w: 2, d: 1, l: 0, gd: '+5', pts: 7, form: ['W', 'D', 'W'], rating: '8.9' },
      { team: 'Croatia', code: 'CRO', p: 3, w: 2, d: 0, l: 1, gd: '+2', pts: 6, form: ['W', 'L', 'W'], rating: '8.2' },
      { team: 'Ghana', code: 'GHA', p: 3, w: 1, d: 0, l: 2, gd: '-3', pts: 3, form: ['L', 'W', 'L'], rating: '7.4' },
      { team: 'Panama', code: 'PAN', p: 3, w: 0, d: 1, l: 2, gd: '-4', pts: 1, form: ['L', 'D', 'L'], rating: '6.8' }
    ]
  };

  const handleGroupTabChange = (group) => {
    setTableOpacity(0);
    setTableTransform('translateY(4px)');
    setTimeout(() => {
      setActiveGroup(group);
      setTableOpacity(1);
      setTableTransform('translateY(0)');
    }, 150);
  };

  // Carousel scroll and edge fade logic
  useEffect(() => {
    const track = carouselTrackRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 338;

    const onPrev = () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    const onNext = () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);

    const toggleButtons = () => {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const container = track.parentElement;

      if (scrollLeft <= 10) {
        prevBtn.style.opacity = '0.3';
        prevBtn.style.pointerEvents = 'none';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
      }

      if (scrollLeft >= maxScroll - 10) {
        nextBtn.style.opacity = '0.3';
        nextBtn.style.pointerEvents = 'none';
      } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
      }

      if (container) {
        const canScrollLeft = scrollLeft > 10;
        const canScrollRight = scrollLeft < maxScroll - 10;

        if (canScrollLeft && canScrollRight) {
          container.className = 'carousel-track-container fade-both';
        } else if (canScrollRight) {
          container.className = 'carousel-track-container fade-right-only';
        } else if (canScrollLeft) {
          container.className = 'carousel-track-container fade-left-only';
        } else {
          container.className = 'carousel-track-container fade-none';
        }
      }
    };

    track.addEventListener('scroll', toggleButtons);
    setTimeout(toggleButtons, 400);

    return () => {
      prevBtn.removeEventListener('click', onPrev);
      nextBtn.removeEventListener('click', onNext);
      track.removeEventListener('scroll', toggleButtons);
    };
  }, [matches]);

  // Intersection Observer for match cards progress bars & entry animation
  useEffect(() => {
    if (matches.length === 0) return;
    const cards = document.querySelectorAll('.match-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add('in-view');
          const prob = card.getAttribute('data-prob');
          const fill = card.querySelector('.prob-bar-fill');
          if (fill && prob) {
            setTimeout(() => {
              fill.style.width = `${prob}%`;
            }, 100);
          }
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [matches]);

  // Intersection Observer for workflow items & overview cards
  useEffect(() => {
    const items = document.querySelectorAll('.workflow-item, .stat-mini-card, .standings-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <main className="hero-section">
        <video className="hero-bg-video" autoPlay loop muted playsInline>
          <source src="https://res.cloudinary.com/dgj2wznuq/video/upload/v178004095/wc_video_final_vxouo0.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="watermark-mask"></div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-subtitle-tag">PREDICT - ANALYZE - SIMULATE</div>
            <h1 className="hero-title">
              AI Intelligence For The<br />
              <span className="headline-animated">World’s Biggest Stage.</span>
            </h1>
            <p className="hero-description">
              Experience the 2026 World Cup through AI-powered tactical insights, simulations, and predictive analysis.
            </p>
            <div className="hero-ctas">
              <span className="btn-primary" onClick={() => navigate('/matches')} style={{ cursor: 'pointer' }}>
                <span>Explore Predictions</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
              <span className="btn-secondary" onClick={() => navigate('/insights#simulator')} style={{ cursor: 'pointer' }}>
                <span>Run Simulation</span>
                <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="hero-visual-empty"></div>
        </div>
      </main>

      {/* Featured Match Predictions Section */}
      <section className="match-intelligence-section" id="matches-carousel">
        <div className="section-container">
          <div className="section-header">
            <div className="header-left">
              <h2 className="section-title">Featured Match Intelligence</h2>
              <p className="section-subtitle">Curated AI insights, tactical analysis and win probabilities for World Cup fixtures.</p>
            </div>
            <div className="header-right">
              <span className="btn-view-all" onClick={() => navigate('/matches')} style={{ cursor: 'pointer' }}>
                <span>View All Matches</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>

          <div className="carousel-wrapper">
            <button className="carousel-btn prev-btn" ref={prevBtnRef} aria-label="Previous Matches">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="carousel-track-container">
              <div className="carousel-track" ref={carouselTrackRef}>
                {matches.slice(0, 6).map((match) => {
                  const isTopMatch = match.isTopGame;
                  const pressingLevel = match.intensity > 85 ? 'High' : match.intensity > 76 ? 'Medium' : 'Low';
                  
                  return (
                    <div 
                      key={match.id} 
                      className={`match-card ${isTopMatch ? 'featured' : ''}`} 
                      data-prob={match.team1.prob}
                    >
                      {isTopMatch && <div className="card-badge">★ TOP MATCH</div>}
                      <div className="card-status-row">
                        <span className="match-time">{match.date.replace(' 2026,', '').replace(' (IST)', '')}</span>
                        <span className={`schedule-dot ${isTopMatch ? 'live-pulse' : ''}`}></span>
                      </div>
                      <div className="teams-row">
                        <div className="team">
                          <div className="flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></div>
                          <span className="team-name">{match.team1.code}</span>
                        </div>
                        <div className="vs-divider">VS</div>
                        <div className="team">
                          <div className="flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></div>
                          <span className="team-name">{match.team2.code}</span>
                        </div>
                      </div>
                      <div className="prob-container">
                        <div className="prob-label">Win Probability</div>
                        <div className="prob-bar-track">
                          <div className="prob-bar-fill"></div>
                        </div>
                        <div className="prob-pcts">
                          <span className="prob-pct cyan">{match.team1.prob}%</span>
                          <span className="prob-pct">{match.team2.prob}%</span>
                        </div>
                      </div>
                      <div className="ai-insight">
                        <svg className="sparkle-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
                        </svg>
                        <p className="insight-text">{match.insight}</p>
                      </div>
                      <div className="stats-row">
                        <div className="stat-col">
                          <span className="stat-lbl">xG</span>
                          <span className="stat-val">{match.xG1} - {match.xG2}</span>
                        </div>
                        <div className="stat-col">
                          <span className="stat-lbl">Pressing</span>
                          <span className="stat-val">{pressingLevel}</span>
                        </div>
                        <div className="stat-col">
                          <span className="stat-lbl">Confidence</span>
                          <span className="stat-val">{match.aiConfidence}%</span>
                        </div>
                      </div>
                      <span className="btn-analyze" onClick={() => handleAnalyzeMatch(match.id)} style={{ cursor: 'pointer' }}>
                        <span>Analyze Match</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>

            <button className="carousel-btn next-btn" ref={nextBtnRef} aria-label="Next Matches">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* AI Intelligence Section (How WCai Predicts The Game) */}
      <section className="ai-intelligence-section" id="how-it-works">
        <div className="globe-video-wrapper">
          <div className="globe-video-container">
            <video className="globe-bg-video" autoPlay loop muted playsInline>
              <source src="https://res.cloudinary.com/dgj2wznuq/video/upload/v1780053756/wc_globe_video_lgqdos.mp4" type="video/mp4" />
            </video>
            <div className="globe-watermark-mask"></div>
          </div>
          <div className="globe-video-overlay"></div>
        </div>

        <div className="section-container">
          <div className="intelligence-layout">
            <div className="intelligence-left">
              <h2 className="intelligence-title">How <span className="cyan-highlight">WCai</span><br />Predicts The Game.</h2>
              <p className="intelligence-subtitle">
                WCai combines tactical analysis, simulation models, match data and AI-generated insights to explain how World Cup matches may unfold.
              </p>

              <div className="workflow-timeline">
                <div className="timeline-line"></div>

                {/* Step 1 */}
                <div className="workflow-item">
                  <div className="timeline-node">
                    <span className="step-num">01</span>
                    <div className="node-dot"></div>
                  </div>
                  <div className="workflow-card">
                    <div className="workflow-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                      </svg>
                    </div>
                    <div className="workflow-info">
                      <h3 className="workflow-card-title">Match Data Processing</h3>
                      <p className="workflow-card-desc">We collect and clean massive datasets from world-class sources in real time.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="workflow-item">
                  <div className="timeline-node">
                    <span className="step-num">02</span>
                    <div className="node-dot"></div>
                  </div>
                  <div className="workflow-card">
                    <div className="workflow-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path>
                      </svg>
                    </div>
                    <div className="workflow-info">
                      <h3 className="workflow-card-title">Tactical Pattern Detection</h3>
                      <p className="workflow-card-desc">AI models analyze formations, player movements and historical behavior.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="workflow-item">
                  <div className="timeline-node">
                    <span className="step-num">03</span>
                    <div className="node-dot"></div>
                  </div>
                  <div className="workflow-card">
                    <div className="workflow-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                        <line x1="9" y1="1" x2="9" y2="4"></line>
                        <line x1="15" y1="1" x2="15" y2="4"></line>
                        <line x1="9" y1="20" x2="9" y2="23"></line>
                        <line x1="15" y1="20" x2="15" y2="23"></line>
                        <line x1="20" y1="9" x2="23" y2="9"></line>
                        <line x1="20" y1="15" x2="23" y2="15"></line>
                        <line x1="1.5" y1="9" x2="4.5" y2="9"></line>
                        <line x1="1.5" y1="15" x2="4.5" y2="15"></line>
                      </svg>
                    </div>
                    <div className="workflow-info">
                      <h3 className="workflow-card-title">AI Prediction Engine</h3>
                      <p className="workflow-card-desc">Advanced machine learning predicts outcomes, probabilities and key events.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="workflow-item">
                  <div className="timeline-node">
                    <span className="step-num">04</span>
                    <div className="node-dot"></div>
                  </div>
                  <div className="workflow-card">
                    <div className="workflow-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <div className="workflow-info">
                      <h3 className="workflow-card-title">Simulation & Insights</h3>
                      <p className="workflow-card-desc">Thousands of simulations generate tactical insights coaches and fans can trust.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="intelligence-right"></div>
          </div>
        </div>
      </section>

      {/* World Cup Overview Section */}
      <section className="overview-section" id="overview">
        <div className="section-container">
          <div className="overview-header">
            <h2 className="section-title">World Cup <span className="cyan-highlight">Overview</span></h2>
            <p className="section-subtitle">
              Track standings, team performance, qualification progress, and live World Cup statistics powered by AI-driven analytics.
            </p>
          </div>

          <div className="overview-layout">
            {/* Left Side: Stats Grid & Chart */}
            <div className="overview-left">
              <div className="stats-grid">
                
                {/* Stats Card 1: Matches Played */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Matches Completed</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">48 <span className="mini-total">/ 104</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,20 Q15,10 30,18 T60,5 T90,12 L100,8" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 2: Highest Scoring Team */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Highest Scoring Team</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">Argentina <span className="mini-meta">10 gls</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,15 Q25,8 50,22 T100,5" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 3: Highest Win Probability */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Highest Win Prob.</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">Brazil <span className="mini-meta">76%</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,22 Q30,12 60,8 T100,2" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 4: Dark Horse Prediction */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Dark Horse Prediction</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">Morocco <span className="mini-meta">Index: High</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,20 Q20,22 40,5 T80,18 L100,4" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 5: Avg Goals Per Match */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Avg Goals Per Match</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">2.85 <span className="mini-meta">per game</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,15 Q35,18 70,5 T100,12" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 6: Most Aggressive Press */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Most Aggressive Press</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">USA <span className="mini-meta">PPDA 7.2</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,5 Q30,22 60,10 T100,15" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 7: Top Goalscorer */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Top Goalscorer</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">K. Mbappé <span className="mini-meta">5 goals</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,20 Q20,10 40,2 T70,18 L100,5" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 8: Top Assist */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Top Assist</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 8 8 12 12 16"></polyline>
                        <line x1="16" y1="12" x2="8" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">K. De Bruyne <span className="mini-meta">4 asts</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,15 Q30,5 60,22 T100,8" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

                {/* Stats Card 9: Top Saves */}
                <div className="stat-mini-card">
                  <div className="mini-card-header">
                    <span className="mini-label">Top Saves</span>
                    <div className="mini-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mini-value">M. Maignan <span className="mini-meta">18 saves</span></div>
                  <div className="mini-chart">
                    <svg viewBox="0 0 100 25" className="sparkline-mini">
                      <path d="M0,5 Q20,18 40,8 T80,22 L100,10" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Point Standings Table */}
            <div className="overview-right">
              <div className="standings-card">
                <h3 className="standings-card-title">Group Standings</h3>

                <div className="groups-tabs-wrapper">
                  <div className="groups-tabs">
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((g) => (
                      <button
                        key={g}
                        className={`group-tab ${activeGroup === g ? 'active' : ''}`}
                        onClick={() => handleGroupTabChange(g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="table-container">
                  <table className="standings-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>Pts</th>
                        <th>Form</th>
                        <th className="rating-header">AI Rating</th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        opacity: tableOpacity,
                        transform: tableTransform,
                        transition: 'opacity 0.15s ease, transform 0.15s ease'
                      }}
                    >
                      {groupStandings[activeGroup].map((team, idx) => {
                        const isQualified = idx < 2;
                        const isThird = idx === 2;
                        let zoneClass = '';
                        if (isQualified) zoneClass = 'zone-qualify';
                        else if (isThird) zoneClass = 'zone-third';

                        return (
                          <tr key={team.code} className={`standings-row ${zoneClass}`}>
                            <td className="pos-col">{idx + 1}</td>
                            <td className="team-col" onClick={() => navigate(`/team-analysis?team=${team.code}`)} style={{ cursor: 'pointer' }}>
                              <div className="table-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }} />
                              <span className="table-team-name">{team.team}</span>
                            </td>
                            <td>{team.p}</td>
                            <td>{team.w}</td>
                            <td>{team.d}</td>
                            <td>{team.l}</td>
                            <td>{team.gd}</td>
                            <td className="pts-col">{team.pts}</td>
                            <td>
                              <div className="form-row">
                                {team.form.map((f, i) => {
                                  let fClass = 'form-d';
                                  if (f === 'W') fClass = 'form-w';
                                  if (f === 'L') fClass = 'form-l';
                                  return <span key={i} className={`form-badge ${fClass}`}>{f}</span>;
                                })}
                              </div>
                            </td>
                            <td className="rating-col">
                              <span className="rating-pill">{team.rating}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="standings-legend">
                  <span className="legend-item"><span className="legend-dot qualify"></span> Qualification Zone</span>
                  <span className="legend-item"><span className="legend-dot third"></span> Playoff Contender</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
