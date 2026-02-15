import { useState } from 'react'
import './App.css'
import CPRTimer from './CPRTimer'
import UserProfile from './UserProfile'
import EmergencyGuide from './EmergencyGuide'
import EmergencySOS from './EmergencySOS'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCPRTimer, setShowCPRTimer] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showEmergencySOS, setShowEmergencySOS] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">FirstHelp</div>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <button
            className="nav-btn active"
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button
            className="nav-btn"
            onClick={() => scrollToSection('guide')}
          >
            Guide
          </button>
          <button
            className="nav-btn"
            onClick={() => scrollToSection('help')}
          >
            Help
          </button>
          <button
            className="nav-btn"
            onClick={() => setShowUserProfile(true)}
          >
            Login
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>⚡</span>
            <span>Emergency Assistance When You Need It</span>
          </div>

          <h1>Your Trusted First Aid Companion</h1>

          <p className="hero-subtitle">
            FirstHelp provides instant, step-by-step guidance for emergency situations.
            From minor injuries to critical care, we're here to help you respond with confidence
            when every second counts.
          </p>

          <div className="hero-cta">
            <button className="cta-primary" onClick={() => setShowCPRTimer(true)}>
              🚨 CPR Emergency Timer
            </button>
            <button className="cta-secondary" onClick={() => scrollToSection('guide')}>
              Learn More
            </button>
          </div>

          <div className="hero-icon">
            🚑
          </div>
        </div>
      </section>

      {/* Emergency Guide Section */}
      <section id="guide">
        <EmergencyGuide />
      </section>

      {/* Help Section */}
      <section id="help" className="features" style={{ background: '#F8F9FA' }}>
        <div className="section-header">
          <span className="section-tag">Need Assistance?</span>
          <h2 className="section-title">We're Here to Help</h2>
          <p className="section-subtitle">
            Whether you're learning first aid or need immediate guidance,
            FirstHelp makes emergency response accessible to everyone
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>Emergency Contacts</h3>
            <p>
              Quick dial buttons for local emergency services. One-tap access to ambulance,
              fire, and police with automatic location sharing.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Learning Resources</h3>
            <p>
              Comprehensive tutorials and videos to build your first aid knowledge.
              Interactive quizzes help you prepare for real emergencies.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Community Support</h3>
            <p>
              Connect with trained first aiders and medical professionals.
              Share experiences and get advice from our supportive community.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">❤️‍🩹 FirstHelp</div>
          <p className="footer-description">
            Empowering everyone with the knowledge and confidence to save lives.
            Because every second counts in an emergency.
          </p>

          <div className="footer-links">
            <a href="#about">About Us</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p>&copy; 2026 FirstHelp. All rights reserved. Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>

      {/* CPR Timer Modal */}
      {showCPRTimer && <CPRTimer onClose={() => setShowCPRTimer(false)} />}

      {/* User Profile Modal */}
      {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}

      {/* Emergency SOS Modal */}
      {showEmergencySOS && <EmergencySOS onClose={() => setShowEmergencySOS(false)} />}

      {/* Floating Emergency SOS Button */}
      <button
        className="floating-sos-btn"
        onClick={() => setShowEmergencySOS(true)}
        title="Emergency SOS"
      >
        🆘
      </button>
    </div>
  )
}

export default App
