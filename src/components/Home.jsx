import { Link } from 'react-router-dom'
import '../App.css'

export function Home() {
  return (
    <div className="landing-container">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Transform Content Across Languages</h1>
          <p className="hero-text">
            Revolutionize your global reach with AI-powered translations and blockchain-protected content distribution
          </p>
          <div className="cta-buttons">
            <Link to="/upload" className="primary-button">
              Start Creating
              <span className="button-icon">→</span>
            </Link>
            <Link to="/explore" className="secondary-button">
              Browse Library
            </Link>
          </div>
        </div>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-number">50+</span>
          <span className="stat-label">Languages Supported</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">100%</span>
          <span className="stat-label">IP Protection</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">24/7</span>
          <span className="stat-label">AI Translation</span>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Creators Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>AI Translation & Dubbing</h3>
            <p>Advanced neural networks ensure natural-sounding translations and perfect lip-sync dubbing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Blockchain Protection</h3>
            <p>Immutable proof of ownership and automated royalty distribution through smart contracts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Reach</h3>
            <p>Access international audiences with professional-grade translations in 50+ languages</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Creator Control</h3>
            <p>Full control over content distribution and monetization across all territories</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Your Journey to Global Content</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload</h3>
            <p>Share your video or text content in any format</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Select</h3>
            <p>Choose your target languages and translation style</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Transform</h3>
            <p>Let our AI work its magic on your content</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Launch</h3>
            <p>Publish and track your content's global performance</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Go Global?</h2>
          <p>Join creators worldwide who are breaking language barriers</p>
          <Link to="/register" className="primary-button">
            Get Started Free
            <span className="button-icon">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
