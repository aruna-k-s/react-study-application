/**
 * COLLAPSIBLE SIDEBAR COMPONENT
 * =============================
 * Features:
 * - Compact mode: 60px width (icons only)
 * - Expanded mode: 240px width (icons + labels)
 * - Searchable navigation
 * - Active route highlighting
 * - Scrollable content
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayout } from './ResponsiveLayout';
import '../styles/CollapsibleSidebar.css';

// Navigation items with icons and routes
const SIDEBAR_ITEMS = [
  { icon: '⚛️', label: 'State Management', route: '/state', searchTerms: ['state', 'management'] },
  { icon: '🪝', label: 'Effect Hook', route: '/effects', searchTerms: ['effect', 'side effect'] },
  { icon: '🎨', label: 'Context API', route: '/context', searchTerms: ['context', 'api'] },
  { icon: '⚙️', label: 'Reducer Hook', route: '/reducer', searchTerms: ['reducer', 'complex state'] },
  { icon: '📞', label: 'Callback & Memo', route: '/callback-memo', searchTerms: ['callback', 'memo', 'performance'] },
  { icon: '📌', label: 'Ref Hook', route: '/ref', searchTerms: ['ref', 'reference'] },
  { icon: '🎛️', label: 'Imperative Handle', route: '/imperative', searchTerms: ['imperative', 'handle'] },
  { icon: '📐', label: 'Layout Effect', route: '/layout-effect', searchTerms: ['layout', 'effect'] },
  { icon: '🔧', label: 'Custom Hooks', route: '/custom-hooks', searchTerms: ['custom', 'hooks'] },
  { icon: '🎨', label: 'Advanced Patterns', route: '/advanced-patterns', searchTerms: ['patterns', 'hoc', 'render props'] },
  { icon: '🚀', label: 'Performance', route: '/performance', searchTerms: ['performance', 'optimization'] },
  { icon: '🎓', label: 'Advanced Features', route: '/advanced-features', searchTerms: ['features', 'advanced'] },
  { icon: '⚡', label: 'React 18', route: '/react18', searchTerms: ['react 18', 'features'] },
  { icon: '📋', label: 'Forms', route: '/forms', searchTerms: ['forms', 'handling'] },
  { icon: '🔍', label: 'Lighthouse', route: '/lighthouse', searchTerms: ['lighthouse', 'performance', 'audit'] },
  { icon: '🏗️', label: 'Architecture', route: '/scalable-architecture', searchTerms: ['architecture', 'scalable'] },
];

export default function CollapsibleSidebar({ isExpanded }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapseSidebar } = useLayout();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return SIDEBAR_ITEMS;
    
    const term = searchTerm.toLowerCase();
    return SIDEBAR_ITEMS.filter(item =>
      item.label.toLowerCase().includes(term) ||
      item.searchTerms.some(t => t.includes(term))
    );
  }, [searchTerm]);

  const handleNavigate = (route) => {
    navigate(route);
    collapseSidebar(); // Auto-collapse after navigation
  };

  const isActive = (route) => location.pathname === route;

  return (
    <aside className={`collapsible-sidebar ${isExpanded ? 'expanded' : 'compact'}`}>
      {/* Search Input - Always visible when expanded */}
      {isExpanded && (
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sidebar-search-input"
          />
        </div>
      )}

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {filteredItems.map((item) => (
          <button
            key={item.route}
            className={`sidebar-item ${isActive(item.route) ? 'active' : ''}`}
            onClick={() => handleNavigate(item.route)}
            title={isExpanded ? '' : item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {isExpanded && <span className="sidebar-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Empty State */}
      {isExpanded && filteredItems.length === 0 && (
        <div className="sidebar-empty">
          <p>No topics found</p>
        </div>
      )}
    </aside>
  );
}
