/**
 * FOOTER COMPONENT
 * ===============
 * Professional footer with learning resources and trust signals
 */

import React from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Column 1: About */}
          <div className="footer-section">
            <h3 className="footer-title">About</h3>
            <p className="footer-text">
              A comprehensive React learning platform designed for students and developers who want to master modern front-end development from fundamentals to enterprise architecture.
            </p>
          </div>

          {/* Column 2: Learning Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Learning Path</h3>
            <ul className="footer-links">
              <li><a href="#basics">React Fundamentals</a></li>
              <li><a href="#intermediate">Intermediate Patterns</a></li>
              <li><a href="#advanced">Advanced Topics</a></li>
              <li><a href="#enterprise">Enterprise Architecture</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#getting-started">Getting Started</a></li>
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#examples">Code Examples</a></li>
              <li><a href="#best-practices">Best Practices</a></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#feedback">Feedback</a></li>
              <li><a href="#report">Report Issue</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer - Trust Signals */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} React Learning Hub. All rights reserved.
            </p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-badges">
              <span className="badge badge-open">✓ Open Source</span>
              <span className="badge badge-safe">✓ Safe & Secure</span>
              <span className="badge badge-free">✓ 100% Free</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
