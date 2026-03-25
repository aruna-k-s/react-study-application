/**
 * SIDEBAR WITH SEARCH
 * ===================
 * Sidebar with integrated search, hierarchical filtering, and navigation
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarSearch, HighlightMatch } from '../hooks/useSearch';
import './Sidebar.css';

/**
 * Sidebar Menu Structure with categories and items
 */
const SIDEBAR_STRUCTURE = [
  {
    id: 'react-basics',
    title: 'React Basics',
    children: [
      { id: 'state', title: 'State Management', route: '/state', keywords: ['state'] },
      { id: 'effects', title: 'Effect Hook', route: '/effects', keywords: ['effects'] },
      { id: 'context', title: 'Context API', route: '/context', keywords: ['context'] },
      { id: 'reducer', title: 'Reducer Hook', route: '/reducer', keywords: ['reducer'] },
      { id: 'ref', title: 'Ref Hook', route: '/ref', keywords: ['ref'] },
    ],
  },
  {
    id: 'optimization',
    title: 'React Optimization',
    children: [
      {
        id: 'callback-memo',
        title: 'Callback & Memo',
        route: '/callback-memo',
        keywords: ['performance'],
      },
      {
        id: 'perf-opt',
        title: 'Performance Optimization',
        route: '/performance',
        keywords: ['optimization'],
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced React',
    children: [
      {
        id: 'imperative',
        title: 'Imperative Handle',
        route: '/imperative',
        keywords: ['advanced'],
      },
      {
        id: 'layout-effect',
        title: 'Layout Effect Hook',
        route: '/layout-effect',
        keywords: ['advanced'],
      },
      {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        route: '/custom-hooks',
        keywords: ['hooks'],
      },
      {
        id: 'patterns',
        title: 'Advanced Patterns',
        route: '/advanced-patterns',
        keywords: ['patterns'],
      },
      {
        id: 'rules',
        title: 'Rules of Hooks',
        route: '/rules-of-hooks',
        keywords: ['rules'],
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance & Web Vitals',
    children: [
      {
        id: 'lighthouse',
        title: 'Lighthouse Guide',
        route: '/lighthouse',
        keywords: ['lighthouse', 'performance', 'audit'],
      },
      {
        id: 'lighthouse-metrics',
        title: 'Core Web Vitals',
        isCategory: true,
        children: [
          {
            id: 'fcp',
            title: 'First Contentful Paint',
            route: '/lighthouse#fcp',
            keywords: ['fcp', 'metric'],
          },
          {
            id: 'lcp',
            title: 'Largest Contentful Paint',
            route: '/lighthouse#lcp',
            keywords: ['lcp', 'metric'],
          },
          {
            id: 'cls',
            title: 'Cumulative Layout Shift',
            route: '/lighthouse#cls',
            keywords: ['cls', 'metric'],
          },
          {
            id: 'tbt',
            title: 'Total Blocking Time',
            route: '/lighthouse#tbt',
            keywords: ['tbt', 'metric'],
          },
          {
            id: 'si',
            title: 'Speed Index',
            route: '/lighthouse#si',
            keywords: ['si', 'metric'],
          },
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Level',
    children: [
      {
        id: 'state-adv',
        title: 'State Management (Advanced)',
        route: '/state-mgmt-advanced',
        keywords: ['advanced', 'enterprise'],
      },
      {
        id: 'system-design',
        title: 'System Design',
        route: '/system-design',
        keywords: ['design', 'architecture'],
      },
      {
        id: 'typescript',
        title: 'TypeScript Advanced',
        route: '/typescript-advanced',
        keywords: ['typescript'],
      },
    ],
  },
  {
    id: 'quality',
    title: 'Quality & Production',
    children: [
      {
        id: 'testing',
        title: 'Testing Strategies',
        route: '/testing',
        keywords: ['testing', 'quality'],
      },
      {
        id: 'security',
        title: 'Security & Secure Design',
        route: '/security',
        keywords: ['security'],
      },
      {
        id: 'observability',
        title: 'Observability & Production',
        route: '/observability',
        keywords: ['monitoring'],
      },
    ],
  },
];

// ============================================================================
// SIDEBAR ITEM COMPONENT
// ============================================================================

function SidebarItem({ item, query, depth = 1, parentExpanded = true }) {
  const location = useLocation();
  const isActive = location.pathname === item.route;

  if (item.isCategory) {
    // Category item - not clickable, just visual grouping
    return (
      <div className="sidebar-category-item">
        <span className="category-label">{item.title}</span>
        {item.children && (
          <ul className="sidebar-sublist">
            {item.children.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                query={query}
                depth={depth + 1}
                parentExpanded={parentExpanded}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <li key={item.id} className={`sidebar-item ${depth > 1 ? 'nested' : ''}`}>
      <Link
        to={item.route}
        className={`sidebar-link ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        <span className="sidebar-icon">🔗</span>
        <span className="sidebar-title">
          <HighlightMatch text={item.title} query={query} />
        </span>
      </Link>
    </li>
  );
}

// ============================================================================
// CATEGORY SECTION COMPONENT
// ============================================================================

function CategorySection({ category, query, expandedSections, onToggle }) {
  const isExpanded = expandedSections.has(category.id);
  const matchingChildren =
    query &&
    category.children?.filter(
      (child) =>
        child.title.toLowerCase().includes(query.toLowerCase()) ||
        child.keywords?.some((kw) => kw.toLowerCase().includes(query.toLowerCase()))
    );

  // Auto-expand if has matching children
  const shouldShow =
    !query ||
    matchingChildren?.length > 0 ||
    category.title.toLowerCase().includes(query.toLowerCase());

  if (!shouldShow && query) {
    return null;
  }

  return (
    <li key={category.id} className="sidebar-category">
      <button
        className="sidebar-category-toggle"
        onClick={() => onToggle(category.id)}
        aria-expanded={isExpanded}
      >
        <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
          ▶
        </span>
        <HighlightMatch text={category.title} query={query} />
        {category.children && (
          <span className="item-count">{category.children.length}</span>
        )}
      </button>

      {isExpanded && category.children && (
        <ul className="sidebar-sublist">
          {category.children.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              query={query}
              depth={2}
              parentExpanded={isExpanded}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

export default function Sidebar() {
  const { query, setQuery, expandedSections, toggleSection } =
    useSidebarSearch(SIDEBAR_STRUCTURE);
  const [showClearButton, setShowClearButton] = useState(false);
  const location = useLocation();

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    setShowClearButton(value.length > 0);
  }, [setQuery]);

  const handleClear = useCallback(() => {
    setQuery('');
    setShowClearButton(false);
  }, [setQuery]);

  // Auto-expand all categories on mount
  React.useEffect(() => {
    const allSectionIds = new Set(SIDEBAR_STRUCTURE.map((cat) => cat.id));
    // Uncomment to start expanded:
    // Object.keys(allSectionIds).forEach(id => expandedSections.add(id));
  }, []);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h1 className="sidebar-title">📚 Learning Modules</h1>
      </div>

      {/* Search Input */}
      <div className="sidebar-search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="🔍 Search modules..."
            value={query}
            onChange={handleSearchChange}
            className="sidebar-search-input"
            aria-label="Search learning modules"
          />
          {showClearButton && (
            <button
              className="clear-search-btn"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {query && (
          <p className="search-hint">
            Found {SIDEBAR_STRUCTURE.reduce((count, cat) => {
              if (!cat.children) return count;
              const matching = cat.children.filter(
                (child) =>
                  child.title.toLowerCase().includes(query.toLowerCase()) ||
                  child.keywords?.some((kw) =>
                    kw.toLowerCase().includes(query.toLowerCase())
                  )
              );
              return count + matching.length;
            }, 0)}{' '}
            result{query ? 's' : ''}
          </p>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav" role="navigation">
        <ul className="sidebar-menu">
          {SIDEBAR_STRUCTURE.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              query={query}
              expandedSections={expandedSections}
              onToggle={toggleSection}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="version-info">v1.0 • Performance Learning Hub</p>
      </div>
    </aside>
  );
}
