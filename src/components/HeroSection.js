/**
 * LANDING PAGE / HERO SECTION
 * =========================
 * Creates an inviting, trustworthy first impression
 * Designed to encourage exploration and learning
 */

import React from 'react';
import './HeroSection.css';

export default function HeroSection({ onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* Main Headline - Trust & Safety */}
          <h1 className="hero-title">Learn React The Right Way</h1>
          
          <p className="hero-subtitle">
            A comprehensive, guided journey through modern React development—from fundamentals to enterprise-level architecture
          </p>

          {/* Trust Signals */}
          <div className="trust-signals">
            <div className="trust-signal">
              <span className="trust-icon">📚</span>
              <div>
                <strong>30+ Modules</strong>
                <p>Complete coverage of React concepts</p>
              </div>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">⚡</span>
              <div>
                <strong>Hands-On Examples</strong>
                <p>Interactive, well-documented code</p>
              </div>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">🎯</span>
              <div>
                <strong>Structured Learning</strong>
                <p>Learn at your own pace, any level</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg"
              onClick={onExploreClick}
              aria-label="Start exploring the React learning modules"
            >
              <span className="btn-icon">→</span>
              Start Learning
            </button>
            
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => document.getElementById('learning-path')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Learning Path
            </button>
          </div>

          {/* Quick Stats */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">30+</span>
              <span className="stat-label">Topics</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Staff Engineer Topics</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free & Open</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
