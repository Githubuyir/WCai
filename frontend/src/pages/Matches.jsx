import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchesData as fallbackMatches, generateFlagSVG } from '../data/mockData';
import { getMatches } from '../api/api';

export default function Matches() {
  const navigate = useNavigate();

  // State variables
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('latest');
  const [visibleLimit, setVisibleLimit] = useState(12);

  // Fetch matches from API with local fallback
  useEffect(() => {
    setLoading(true);
    getMatches()
      .then((data) => {
        setMatches(data);
      })
      .catch((err) => {
        console.error("Backend API error or unreachable. Falling back to mock data.", err);
        setMatches(fallbackMatches);
      })
      .finally(() => setLoading(false));
  }, []);

  // Set document body class
  useEffect(() => {
    document.body.className = 'matches-body-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  // Filter and Sort Logic using useMemo
  const filteredMatches = useMemo(() => {
    // A. Apply Search Filter
    let items = matches.filter((m) => {
      const searchStr = `${m.team1.name} ${m.team1.code} ${m.team2.name} ${m.team2.code} ${m.stadium} ${m.group} ${m.date}`.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });

    // B. Apply Tab Filters
    if (currentFilter === 'today') {
      // Mock matches scheduled on the opening tournament date (Jun 12)
      items = items.filter((m) => m.date.includes('Jun 12'));
    } else if (currentFilter === 'upcoming') {
      items = items.filter((m) => m.status === 'Upcoming');
    } else if (currentFilter === 'completed') {
      items = [];
    } else if (currentFilter === 'top') {
      items = items.filter((m) => m.isTopGame);
    }

    // C. Apply Sorting
    if (currentSort === 'highest-confidence') {
      items.sort((a, b) => b.aiConfidence - a.aiConfidence);
    } else if (currentSort === 'most-competitive') {
      items.sort((a, b) => {
        const diffA = Math.abs(a.team1.prob - a.team2.prob);
        const diffB = Math.abs(b.team1.prob - b.team2.prob);
        return diffA - diffB;
      });
    } else if (currentSort === 'latest') {
      items.sort((a, b) => a.id - b.id);
    } else if (currentSort === 'trending') {
      items.sort((a, b) => b.intensity - a.intensity);
    }

    return items;
  }, [matches, searchQuery, currentFilter, currentSort]);

  // Featured Match: first top game, or first match overall in the filtered list
  const featuredMatch = useMemo(() => {
    if (filteredMatches.length === 0) return null;
    return filteredMatches.find((m) => m.isTopGame) || filteredMatches[0];
  }, [filteredMatches]);

  const isSearching = searchQuery.trim().length > 0;
  const displayLimit = isSearching ? filteredMatches.length : visibleLimit;
  const displayMatches = filteredMatches.slice(0, displayLimit);

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + 9);
  };

  const handleViewLess = () => {
    setVisibleLimit((prev) => Math.max(12, prev - 9));
  };

  const handleAnalyzeMatch = (matchId) => {
    // Smooth transition effect
    document.body.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'none';
      navigate(`/analysis/${matchId}`, { state: { from: 'matches' } });
    }, 400);
  };

  return (
    <main className="matches-page-content">
      {/* Compact Hero Header Section */}
      <section className="matches-hero-header">
        <div className="matches-hero-overlay"></div>
        <div className="matches-hero-grid-lines"></div>
        <div className="section-container matches-hero-container">
          <h1 className="matches-hero-title">World Cup <span className="cyan-highlight">Match Center</span></h1>
          <p className="matches-hero-subtitle">
            Explore AI-powered predictions, tactical insights, and live World Cup match intelligence.
          </p>
        </div>
      </section>

      {/* Interactive Filters and Search Row */}
      <section className="filters-section">
        <div className="section-container">
          <div className="filters-layout-row">
            
            {/* Filter Tabs Left */}
            <div className="filter-tabs-wrapper">
              <button 
                className={`filter-tab ${currentFilter === 'all' ? 'active' : ''}`}
                onClick={() => { setCurrentFilter('all'); setVisibleLimit(12); }}
              >
                All Matches
              </button>
              <button 
                className={`filter-tab ${currentFilter === 'today' ? 'active' : ''}`}
                onClick={() => { setCurrentFilter('today'); setVisibleLimit(12); }}
              >
                Today
              </button>
              <button 
                className={`filter-tab ${currentFilter === 'upcoming' ? 'active' : ''}`}
                onClick={() => { setCurrentFilter('upcoming'); setVisibleLimit(12); }}
              >
                Upcoming
              </button>
              <button 
                className={`filter-tab ${currentFilter === 'completed' ? 'active' : ''}`}
                onClick={() => { setCurrentFilter('completed'); setVisibleLimit(12); }}
              >
                Completed
              </button>
              <button 
                className={`filter-tab ${currentFilter === 'top' ? 'active' : ''}`}
                onClick={() => { setCurrentFilter('top'); setVisibleLimit(12); }}
              >
                Top Games
              </button>
              <button className="filter-tab disabled" disabled>
                Knockouts <span className="upcoming-indicator">Soon</span>
              </button>
              <button className="filter-tab disabled" disabled>
                Finals <span className="upcoming-indicator">Soon</span>
              </button>
            </div>

            {/* Search and Sort Right */}
            <div className="search-sort-wrapper">
              <div class="search-input-container">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  id="match-search" 
                  placeholder="Search matches or stadiums..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setVisibleLimit(12); }}
                />
              </div>
              
              <div className="sort-select-container">
                <select 
                  id="match-sort" 
                  className="sort-select"
                  value={currentSort}
                  onChange={(e) => setCurrentSort(e.target.value)}
                >
                  <option value="latest">Latest Fixtures</option>
                  <option value="highest-confidence">Highest Confidence</option>
                  <option value="most-competitive">Most Competitive</option>
                  <option value="trending">Trending Matches</option>
                </select>
                <svg className="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Top Featured Match Banner (Renders dynamically) */}
      {featuredMatch && (
        <section className="featured-match-section">
          <div className="section-container" id="featured-match-container">
            <div className={`featured-match-card stadium-${featuredMatch.stadiumAtmosphere}`}>
              <div className="card-stadium-bg"></div>
              <div className="card-glow-overlay"></div>
              
              <div className="featured-card-header">
                <span className="featured-badge">
                  <span className="pulse-ring"></span>
                  TOP MATCH
                </span>
                <span className="featured-group-label">{featuredMatch.group}</span>
              </div>

              <div className="featured-venue-info">
                <div className="info-item">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{featuredMatch.date.split(' - ')[0]}</span>
                </div>
                <div className="info-item">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{featuredMatch.date.split(' - ')[1]}</span>
                </div>
                <div className="info-item">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{featuredMatch.stadium}</span>
                </div>
              </div>

              <div className="featured-teams-row">
                {/* Team 1 */}
                <div className="featured-team left">
                  <div className="featured-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(featuredMatch.team1.code) }}></div>
                  <h3 className="featured-team-name">{featuredMatch.team1.name}</h3>
                  <span className="featured-prob">{featuredMatch.team1.prob}%</span>
                </div>

                {/* VS / Split Bar */}
                <div className="featured-vs-center">
                  <div className="vs-text">VS</div>
                  <div className="vs-draw-prob">Draw: {featuredMatch.drawProb}%</div>
                </div>

                {/* Team 2 */}
                <div className="featured-team right">
                  <div className="featured-flag" dangerouslySetInnerHTML={{ __html: generateFlagSVG(featuredMatch.team2.code) }}></div>
                  <h3 className="featured-team-name">{featuredMatch.team2.name}</h3>
                  <span className="featured-prob">{featuredMatch.team2.prob}%</span>
                </div>
              </div>

              {/* Glowing Progress Bar */}
              <div className="featured-probability-bar">
                <div className="probability-fill" style={{ width: `${featuredMatch.team1.prob}%` }}></div>
                <div className="probability-draw" style={{ left: `${featuredMatch.team1.prob}%`, width: `${featuredMatch.drawProb}%` }}></div>
              </div>

              <div className="featured-card-footer">
                <div className="featured-insight-box">
                  <span className="insight-label">AI Tactical Intelligence</span>
                  <p className="insight-content">“{featuredMatch.insight}”</p>
                </div>
                
                <div className="featured-stats-row">
                  <div className="featured-stat-box">
                    <span className="stat-lbl">xG Forecast</span>
                    <span className="stat-val">{featuredMatch.xG1} - {featuredMatch.xG2}</span>
                  </div>
                  <div className="featured-stat-box">
                    <span className="stat-lbl">AI Confidence</span>
                    <span className="stat-val text-cyan">{featuredMatch.aiConfidence}%</span>
                  </div>
                  <div className="featured-stat-box">
                    <span className="stat-lbl">Intensity</span>
                    <span className="stat-val">{featuredMatch.intensity}%</span>
                  </div>
                  <button className="btn-analyze-match" onClick={() => handleAnalyzeMatch(featuredMatch.id)}>
                    Analyze Match →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Responsive Match Cards Grid */}
      <section className="grid-section">
        <div className="section-container">
          <div className="matches-grid" id="matches-grid">
            {loading ? (
              <div className="no-matches-found" style={{ gridColumn: '1 / -1' }}>
                <div style={{ width: '36px', height: '36px', border: '3px solid rgba(0,255,255,0.15)', borderTop: '3px solid var(--primary-accent, #00e5ff)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}></div>
                <h3 className="no-matches-title">Loading Match Intelligence...</h3>
                <p className="no-matches-text">Fetching AI predictions from the neural network.</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : filteredMatches.length === 0 ? (
              <div className="no-matches-found" style={{ gridColumn: '1 / -1' }}>
                <svg className="no-matches-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <h3 className="no-matches-title">No Matches Match Your Search</h3>
                <p className="no-matches-text">Try adjusting your filters, query, or check another category.</p>
              </div>
            ) : (
              displayMatches.map((match, index) => {
                const dateParts = match.date.split(' - ');
                const dateString = dateParts[0];
                const timeString = dateParts[1];
                const stadiumParts = match.stadium.split(',');
                const stadiumNameShort = stadiumParts[0];
                const city = stadiumParts[1] || '';

                return (
                  <div 
                    key={match.id}
                    className="match-grid-card in-view"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="card-stadium-bg"></div>
                    <div className="card-glow-overlay"></div>
                    
                    <div className="card-header-row">
                      <span className="card-date-badge">{dateString}</span>
                      <span className="card-group">{match.group}</span>
                    </div>

                    <div className="card-teams-layout">
                      {/* Team 1 */}
                      <div className="card-team-box">
                        <div className="card-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team1.code) }}></div>
                        <span className="card-team-name">{match.team1.name}</span>
                        <span className="card-team-prob">{match.team1.prob}%</span>
                      </div>

                      {/* Divider VS */}
                      <div className="card-vs-divider">
                        <span className="vs-inner-text">VS</span>
                        <span className="vs-draw-percent">{match.drawProb}% Draw</span>
                      </div>

                      {/* Team 2 */}
                      <div className="card-team-box">
                        <div className="card-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(match.team2.code) }}></div>
                        <span className="card-team-name">{match.team2.name}</span>
                        <span className="card-team-prob">{match.team2.prob}%</span>
                      </div>
                    </div>

                    {/* Authentic Stadium Venue Bar */}
                    <div className="card-venue-bar">
                      <svg className="venue-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="card-venue-text">
                        {stadiumNameShort}{city ? ',' + city : ''} • {timeString}
                      </span>
                    </div>

                    {/* Tiny AI Insight */}
                    <div className="card-mini-insight">
                      <span className="insight-label">AI Tactical Predictor</span>
                      <p className="insight-content">“{match.insight}”</p>
                    </div>

                    {/* Progress probability line */}
                    <div className="card-probability-line">
                      <div className="prob-fill-left" style={{ width: `${match.team1.prob}%` }}></div>
                      <div className="prob-fill-draw" style={{ left: `${match.team1.prob}%`, width: `${match.drawProb}%` }}></div>
                    </div>

                    {/* Metrics Row */}
                    <div className="card-metrics-grid">
                      <div className="metric-col">
                        <span className="m-lbl">xG Est.</span>
                        <span className="m-val">{match.xG1} - {match.xG2}</span>
                      </div>
                      <div className="metric-col">
                        <span className="m-lbl">AI Conf.</span>
                        <span className="m-val text-cyan">{match.aiConfidence}%</span>
                      </div>
                      <div className="metric-col">
                        <span className="m-lbl">Intensity</span>
                        <span className="m-val">{match.intensity}%</span>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="card-action-row">
                      <div className="form-rows-wrapper">
                        <div className="form-row">
                          {match.form1.map((f, i) => (
                            <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`}>{f}</span>
                          ))}
                        </div>
                        <div className="form-row">
                          {match.form2.map((f, i) => (
                            <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`}>{f}</span>
                          ))}
                        </div>
                      </div>
                      <button className="btn-grid-analyze" onClick={() => handleAnalyzeMatch(match.id)}>
                        Analyze Match →
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Centered Load More Button */}
          {!isSearching && filteredMatches.length > 0 && (
            <div className="load-more-container">
              {filteredMatches.length > visibleLimit && (
                <button id="load-more-btn" className="btn-load-more" onClick={handleLoadMore}>
                  <span>Load More Matches</span>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              )}
              {visibleLimit > 12 && (
                <button id="view-less-btn" className="btn-view-less" onClick={handleViewLess}>
                  <span>View Less</span>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
