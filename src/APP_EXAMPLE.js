/**
 * APP.JS COMPLETE EXAMPLE
 * ======================
 * Full example of how to integrate sidebar and search modal into your main App component
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GlobalSearchModal from './components/GlobalSearchModal';

// Import your page components here
// import LighthousePage from './pages/LighthousePage';
// import StatePage from './pages/StatePage';
// import EffectsPage from './pages/EffectsPage';

import './App.css';

/**
 * Main App Component
 * Should be wrapped with Router in index.js or main entry point
 */
function App() {
  const location = useLocation();

  return (
    <div className="app-layout">
      {/* Sidebar with integrated search - always visible */}
      <Sidebar />

      {/* Global search modal - triggered by Ctrl+K */}
      <GlobalSearchModal />

      {/* Main content area */}
      <main className="main-content">
        <Routes>
          {/* Add your routes here */}
          {/* Example routes structure based on search index */}

          {/* React Basics */}
          {/* <Route path="/state" element={<StateManagement />} /> */}
          {/* <Route path="/effects" element={<EffectHook />} /> */}
          {/* <Route path="/context" element={<ContextAPI />} /> */}
          {/* <Route path="/reducer" element={<ReducerHook />} /> */}
          {/* <Route path="/ref" element={<RefHook />} /> */}

          {/* React Optimization */}
          {/* <Route path="/callback-memo" element={<CallbackAndMemo />} /> */}
          {/* <Route path="/performance" element={<PerformanceOptimization />} /> */}

          {/* Advanced React */}
          {/* <Route path="/imperative" element={<ImperativeHandle />} /> */}
          {/* <Route path="/layout-effect" element={<LayoutEffectHook />} /> */}
          {/* <Route path="/custom-hooks" element={<CustomHooks />} /> */}
          {/* <Route path="/advanced-patterns" element={<AdvancedPatterns />} /> */}
          {/* <Route path="/rules-of-hooks" element={<RulesOfHooks />} /> */}

          {/* Performance & Lighthouse */}
          {/* <Route path="/lighthouse" element={<LighthouseGuide />} /> */}

          {/* Enterprise Topics */}
          {/* <Route path="/state-mgmt-advanced" element={<StateManagementAdvanced />} /> */}
          {/* <Route path="/system-design" element={<SystemDesign />} /> */}
          {/* <Route path="/typescript-advanced" element={<TypeScriptAdvanced />} /> */}

          {/* Quality & Production */}
          {/* <Route path="/testing" element={<TestingStrategies />} /> */}
          {/* <Route path="/security" element={<Security />} /> */}
          {/* <Route path="/observability" element={<Observability />} /> */}

          {/* Default route */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * Placeholder Dashboard Component
 * Replace with your actual dashboard or home page
 */
function Dashboard() {
  return (
    <div className="page-content">
      <h1>🚀 Performance Learning Hub</h1>
      <p>Welcome to your comprehensive learning platform for React performance optimization.</p>
      
      <div className="getting-started">
        <h2>Getting Started</h2>
        <ul>
          <li>
            <strong>Browse Sidebar:</strong> Click categories on the left to explore topics
          </li>
          <li>
            <strong>Quick Search:</strong> Press <code>Ctrl+K</code> (or <code>Cmd+K</code> on Mac) to open the search modal
          </li>
          <li>
            <strong>Search Sidebar:</strong> Type in the search box to filter categories
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Use arrow keys and Enter in the search modal
          </li>
        </ul>
      </div>

      <div className="features">
        <h2>Key Features</h2>
        <ul>
          <li>📚 Comprehensive learning modules across React and performance topics</li>
          <li>🔍 Fuzzy search with intelligent ranking</li>
          <li>⌨️ Full keyboard navigation support</li>
          <li>🎯 Deep linking to specific sections</li>
          <li>🚀 Production-ready performance optimizations</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

/**
 * HOW TO USE IN index.js or main entry point:
 * 
 * import React from 'react';
 * import ReactDOM from 'react-dom/client';
 * import { BrowserRouter } from 'react-router-dom';
 * import App from './App';
 * 
 * const root = ReactDOM.createRoot(document.getElementById('root'));
 * root.render(
 *   <React.StrictMode>
 *     <BrowserRouter>
 *       <App />
 *     </BrowserRouter>
 *   </React.StrictMode>
 * );
 */
