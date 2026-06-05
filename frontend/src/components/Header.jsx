import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAnalysisPage = location.pathname.startsWith('/analysis');
  const isTeamAnalysisPage = location.pathname.startsWith('/team-analysis');

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Add scrolled class logic on header when scrolled
  useEffect(() => {
    const headerEl = document.querySelector('.header');
    if (!headerEl) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  if (isAnalysisPage) {
    const isFromHome = location.state?.from === 'home';
    const backText = isFromHome ? 'Back To Home' : 'Back To Matches';
    const backTarget = isFromHome ? '/' : '/matches';

    return (
      <header className="header analysis-header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-wc">WC</span><span className="logo-ai">ai</span>
        </div>
        <div className="header-action">
          <button className="btn-back-matches" onClick={() => {
            document.body.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            document.body.style.opacity = '0';
            document.body.style.transform = 'scale(0.98)';
            setTimeout(() => {
              document.body.style.opacity = '1';
              document.body.style.transform = 'none';
              navigate(backTarget);
            }, 400);
          }}>
            <svg className="btn-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{backText}</span>
          </button>
        </div>
      </header>
    );
  }

  if (isTeamAnalysisPage) {
    return (
      <header className="header analysis-header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-wc">WC</span><span className="logo-ai">ai</span>
        </div>
        <div className="header-action">
          <button className="btn-back-matches" onClick={() => {
            document.body.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            document.body.style.opacity = '0';
            document.body.style.transform = 'scale(0.98)';
            setTimeout(() => {
              document.body.style.opacity = '1';
              document.body.style.transform = 'none';
              navigate('/teams');
            }, 400);
          }}>
            <svg className="btn-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back To Teams</span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-wc">WC</span><span className="logo-ai">ai</span>
        </div>

        <nav className="nav-container nav-desktop">
          <div className="nav-pill-wrapper">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
            <NavLink to="/matches" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Matches</NavLink>
            <NavLink to="/teams" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Teams</NavLink>
            <NavLink to="/insights" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Insights</NavLink>
          </div>
        </nav>

        <div className="header-right-group">
          <div className="header-action">
            <div className="live-badge">
              <span className="live-badge-dot"></span>
              <span className="live-badge-text">LIVE</span>
            </div>
          </div>
          
          {/* Mobile hamburger button */}
          <button
            className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile slide-out nav */}
      <div className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <nav className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <NavLink to="/" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Home</NavLink>
          <NavLink to="/matches" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Matches</NavLink>
          <NavLink to="/teams" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Teams</NavLink>
          <NavLink to="/insights" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Insights</NavLink>
        </nav>
      </div>
    </>
  );
}
