/**
 * COMPACT HEADER COMPONENT
 * =======================
 * Minimal header (56px max) with:
 * - Menu toggle button
 * - Branding/Logo
 * - Search trigger (Ctrl+K)
 * - No unnecessary chrome
 */

import React from 'react';
import '../styles/CompactHeader.css';

export default function CompactHeader({ onMenuClick, onSearchClick }) {
  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <header className="compact-header">
      <div className="header-content">
        {/* Menu Toggle */}
        <button 
          className="header-menu-btn" 
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          title="Toggle Sidebar (also hides on desktop when clicking content)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" />
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
            <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" />
          </svg>
        </button>

        {/* Branding */}
        <div className="header-brand">
          <h1>📚 React Learning Hub</h1>
        </div>

        {/* Search Trigger */}
        <button 
          className="header-search-btn"
          onClick={handleSearchClick}
          title="Global Search (Ctrl+K)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" />
          </svg>
          <span className="search-hint">Search or press Ctrl+K</span>
        </button>
      </div>
    </header>
  );
}
