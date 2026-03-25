/**
 * SEARCH SYSTEM INTEGRATION GUIDE
 * ===============================
 * Complete implementation guide for sidebar and global search modal
 */

/**
 * STEP 1: Update App.js or your main layout component
 * 
 * Import the new components:
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GlobalSearchModal from './components/GlobalSearchModal';
import './App.css';

/**
 * STEP 2: Wrap your app with Router and add the search components
 */

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar with integrated search */}
        <Sidebar />

        {/* Global search modal (Ctrl+K to trigger) */}
        <GlobalSearchModal />

        {/* Main content area */}
        <main className="main-content">
          <Routes>
            {/* Add your route definitions here */}
            {/* Example: <Route path="/lighthouse" element={<LighthouseComponent />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

/**
 * STEP 3: Update App.css to support the layout
 */

/*
.app-layout {
  display: flex;
  height: 100vh;
  background: #f5f5f5;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background: white;
  padding: 20px;
}

*/

/**
 * FEATURE OVERVIEW
 * ================
 */

/**
 * SIDEBAR SEARCH (Always Visible)
 * ===============================
 * - Search input with real-time filtering
 * - Hierarchical category toggle (▶ icon expands/collapses)
 * - Auto-expand categories when search matches content
 * - Highlighted matched text (gold background)
 * - Result counter showing number of items
 * - Smooth animations and transitions
 * - Dark theme with cyan accents (#00d4ff)
 * 
 * Keyboard controls:
 * - Click category toggle to expand/collapse
 * - Click items to navigate
 * - Escape does NOT close sidebar
 */

/**
 * GLOBAL SEARCH MODAL (Command Palette)
 * ====================================
 * - Trigger: Ctrl+K (or Cmd+K on Mac)
 * - Modal centered on screen
 * - Fuzzy search across all indexed content
 * - Results ranked by relevance
 * - Text highlighting in results
 * - Shows title, section, route, and description
 * 
 * Keyboard controls:
 * - Ctrl+K: Open/close modal
 * - ↑↓: Navigate through results
 * - Enter: Select highlighted result and navigate
 * - Escape: Close modal
 * - Click result: Navigate and close
 * - Type to filter: Real-time filtering with debounce
 */

/**
 * SEARCH CAPABILITIES
 * ===================
 */

/**
 * 1. FUZZY MATCHING
 * Examples:
 * - "lcp" matches "Largest Contentful Paint"
 * - "perf" matches "Performance"
 * - "rh" matches "Rules of Hooks"
 * 
 * The algorithm finds non-contiguous character matches, so partial
 * abbreviations work perfectly for quick filtering.
 */

/**
 * 2. RELEVANCE RANKING
 * Scoring system:
 * - Title match: 100x weight
 * - Keywords match: 50x weight
 * - Section match: 20x weight
 * - Description match: 10x weight
 * 
 * Results are sorted by score, with highest matches first.
 */

/**
 * 3. HIERARCHICAL FILTERING
 * When searching in sidebar:
 * - Automatically expands parent categories containing matches
 * - Shows only matching items and their categories
 * - Remains expanded until user collapses or clears search
 * - Perfect for quick drilling into specific topics
 */

/**
 * 4. PERFORMANCE OPTIMIZATION
 * - 300ms debounce delay prevents excessive re-renders
 * - Memoized calculations (useMemo)
 * - Results limited to top 10 by default
 * - Lazy evaluation - only searches when needed
 */

/**
 * SEARCH INDEX STRUCTURE
 * ====================
 */

/**
 * Each searchable item has:
 * {
 *   id: 'unique-identifier',
 *   title: 'Display Title',
 *   route: '/path#anchor',
 *   section: 'Category Name',
 *   keywords: ['tag1', 'tag2', 'abbreviation'],
 *   description: 'Brief description for search results'
 * }
 * 
 * Current index includes:
 * - 10 React fundamentals (state, effects, context, etc.)
 * - 5 Lighthouse metrics (FCP, LCP, CLS, TBT, SI)
 * - 5 Lighthouse categories (performance, accessibility, SEO, etc.)
 * - Enterprise topics (system design, TypeScript, testing, etc.)
 * 
 * To add more items, see: src/config/searchIndex.js
 */

/**
 * DEEP LINKING SUPPORT
 * ===================
 */

/**
 * Routes support anchors for deep linking:
 * - /lighthouse#fcp → Scrolls to FCP section
 * - /lighthouse#lcp → Scrolls to LCP section
 * - /lighthouse#cls → Scrolls to CLS section
 * - /lighthouse#tbt → Scrolls to TBT section
 * - /lighthouse#si → Scrolls to Speed Index section
 * 
 * The route structure allows bookmarking specific sections.
 * Implement useEffect + useLocation hook to handle scroll-to behavior.
 */

/**
 * CUSTOMIZATION
 * =============
 */

/**
 * 1. CHANGE RESULT LIMIT
 * In GlobalSearchModal.js, modify:
 * const { query, setQuery, results } = useSearch(SEARCH_INDEX, 20);
 *                                                                   ^^
 * Change 10 to your desired limit
 */

/**
 * 2. CHANGE DEBOUNCE DELAY
 * In useSearch.js, modify:
 * const debouncedQuery = useDebounce(query, 500);
 *                                            ^^^
 * Change 300 to desired milliseconds
 */

/**
 * 3. ADD NEW SEARCH CATEGORIES
 * In Sidebar.js SIDEBAR_STRUCTURE, add new category:
 * {
 *   id: 'new-category',
 *   title: 'New Category',
 *   children: [
 *     { id: 'item1', title: 'Item 1', route: '/path', keywords: [] },
 *     { id: 'item2', title: 'Item 2', route: '/path', keywords: [] }
 *   ]
 * }
 */

/**
 * 4. CUSTOMIZE COLORS
 * Sidebar: Edit Sidebar.css (look for #00d4ff cyan color)
 * Modal: Edit GlobalSearchModal.css
 * 
 * Key colors:
 * - Primary accent: #00d4ff (cyan)
 * - Highlight: #ffd700 (gold)
 * - Dark background: #1a1a2e
 * - Text: #eaeaea (light gray)
 */

/**
 * TROUBLESHOOTING
 * ===============
 */

/**
 * Q: Sidebar is not visible
 * A: Ensure Router wraps both Sidebar and main content
 * 
 * Q: Modal doesn't open on Ctrl+K
 * A: Check that GlobalSearchModal is rendered in main App component
 * 
 * Q: Search results are empty
 * A: Verify SEARCH_INDEX is properly exported from searchIndex.js
 * 
 * Q: Highlighted text not showing
 * A: Check HighlightMatch component is imported from hooks/useSearch.js
 * 
 * Q: Navigation not working
 * A: Ensure route paths in search index match Route definitions
 */

/**
 * FILES CREATED
 * =============
 */

/**
 * New files:
 * - src/components/Sidebar.js (300+ lines)
 * - src/components/Sidebar.css (400+ lines)
 * - src/components/GlobalSearchModal.js (250+ lines)
 * - src/components/GlobalSearchModal.css (350+ lines)
 * - src/hooks/useSearch.js (updated with useSidebarSearch)
 * - src/config/searchIndex.js (40+ items)
 * 
 * Modified files:
 * - src/App.js (add Router, Sidebar, GlobalSearchModal)
 * - src/App.css (add layout styles)
 */

/**
 * DEPENDENCIES
 * ============
 * - React Router (react-router-dom)
 * - React 18+ (hooks)
 * - No external search libraries
 * - No UI frameworks (pure CSS)
 */

export default {};
