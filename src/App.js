/*
 * Root Application Component: src/App.js
 *
 * Purpose:
 * This is the root component of the React Hooks & Core Concepts Educational
 * Application. It serves as a navigation hub that demonstrates:
 * 1. How to structure a large React application
 * 2. Component composition and hierarchy
 * 3. State management at the application level
 * 4. Tab-based navigation between different educational modules
 * 5. Lazy loading and code splitting patterns
 *
 * Key Concepts:
 * - Component composition
 * - Functional components
 * - JSX syntax
 * - State management with useState
 * - Conditional rendering
 * - CSS styling in React
 * - Component organization best practices
 *
 * Structure:
 * The application is organized into tabs, each demonstrating different React
 * concepts and hooks. Users can navigate between tabs to learn about each
 * concept in an isolated, focused manner.
 */

import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import StateManagementExample from './components/1-StateManagement';
import EffectHookExample from './components/2-EffectHook';
import ContextAPIExample from './components/3-ContextAPI';
import ReducerHookExample from './components/4-ReducerHook';
import CallbackMemoExample from './components/5-CallbackAndMemo';
import RefHookExample from './components/6-RefHook';
import ImperativeHandleExample from './components/7-ImperativeHandle';
import LayoutEffectExample from './components/8-LayoutEffectHook';
import CustomHooksExample from './components/9-CustomHooks';
import AdvancedPatternsExample from './components/10-AdvancedPatterns';
import RulesOfHooksExample from './components/11-RulesOfHooks';
import AdvancedFeaturesExample from './components/12-AdvancedFeatures';
import React18FeaturesExample from './components/13-React18Features';
import FormHandlingAndErrorsExample from './components/14-FormHandling';
import PerformanceOptimizationExample from './components/15-PerformanceOptimization';
import EnterpriseArchitectureExample from './components/16-EnterpriseArchitecture';
import StateManagementPatternsExample from './components/17-StateManagement';
import SystemDesignFrontendExample from './components/18-SystemDesign';
import TypeScriptAdvancedExample from './components/19-TypeScriptAdvanced';
import TestingStrategiesExample from './components/20-TestingStrategies';
import TechnicalLeadershipExample from './components/21-TechnicalLeadership';
import SystemDesignEnterpriseExample from './components/22-SystemDesignEnterprise';
import SecuritySecureDesignExample from './components/23-SecuritySecureDesign';
import ObservabilityProductionExample from './components/24-ObservabilityProduction';
import BusinessAcumenTechStrategyExample from './components/25-BusinessAcumenStrategy';
import CommunicationCrossTeamExample from './components/26-CommunicationCrossTeam';
import ProblemSolvingCriticalThinkingExample from './components/27-ProblemSolvingCritical';
import RefactoringTechDebtExample from './components/28-RefactoringTechDebt';
import AdvancedAsyncConcurrencyExample from './components/29-AdvancedAsyncConcurrency';
import ScalableFrontendArchitectureExample from './components/30-ScalableFrontendArchitecture';
import DSAMastery from './components/31-DSAMastery';
import DSAComprehensiveCurriculum from './components/32-DSAComprehensiveCurriculum';
import CodingPlatform from './components/coding-platform/CodingPlatform';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('useState');
  const [showHero, setShowHero] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    basics: true,
    intermediate: true,
    advanced: true,
    enterprise: true,
    staffEngineer: false,
    interviewPrep: false
  });

  // Organize topics by learning level
  const topicCategories = {
    basics: {
      label: 'React Fundamentals',
      icon: '📚',
      topics: [
        { id: 'useState', label: 'useState Hook', component: StateManagementExample },
        { id: 'useEffect', label: 'useEffect Hook', component: EffectHookExample },
        { id: 'useContext', label: 'useContext & Context API', component: ContextAPIExample }
      ]
    },
    intermediate: {
      label: 'Intermediate Concepts',
      icon: '🚀',
      topics: [
        { id: 'useReducer', label: 'useReducer Hook', component: ReducerHookExample },
        { id: 'useCallback', label: 'useCallback & useMemo', component: CallbackMemoExample },
        { id: 'useRef', label: 'useRef Hook', component: RefHookExample },
        { id: 'useImperativeHandle', label: 'useImperativeHandle', component: ImperativeHandleExample },
        { id: 'useLayoutEffect', label: 'useLayoutEffect Hook', component: LayoutEffectExample },
        { id: 'customHooks', label: 'Custom Hooks', component: CustomHooksExample }
      ]
    },
    advanced: {
      label: 'Advanced React Patterns',
      icon: '⚡',
      topics: [
        { id: 'advanced', label: 'Advanced Patterns', component: AdvancedPatternsExample },
        { id: 'rulesOfHooks', label: 'Rules of Hooks', component: RulesOfHooksExample },
        { id: 'advancedFeatures', label: 'Advanced Features', component: AdvancedFeaturesExample },
        { id: 'react18', label: 'React 18 Features', component: React18FeaturesExample },
        { id: 'forms', label: 'Form Handling', component: FormHandlingAndErrorsExample },
        { id: 'performance', label: 'Performance', component: PerformanceOptimizationExample }
      ]
    },
    enterprise: {
      label: 'Enterprise & System Design',
      icon: '🏢',
      topics: [
        { id: 'architecture', label: 'Enterprise Architecture', component: EnterpriseArchitectureExample },
        { id: 'stateManagement', label: 'State Management Patterns', component: StateManagementPatternsExample },
        { id: 'systemDesign', label: 'System Design', component: SystemDesignFrontendExample },
        { id: 'typescript', label: 'TypeScript & Advanced JS', component: TypeScriptAdvancedExample },
        { id: 'testing', label: 'Testing Strategies', component: TestingStrategiesExample }
      ]
    },
    staffEngineer: {
      label: '👔 Staff Engineer Leadership',
      icon: '👔',
      topics: [
        { id: 'leadership', label: 'Technical Leadership & Mentorship', component: TechnicalLeadershipExample },
        { id: 'scaleDesign', label: 'System Design at Enterprise Scale', component: SystemDesignEnterpriseExample },
        { id: 'security', label: 'Security & Secure Design', component: SecuritySecureDesignExample },
        { id: 'observability', label: 'Observability & Production Excellence', component: ObservabilityProductionExample },
        { id: 'business', label: 'Business Acumen & Technical Strategy', component: BusinessAcumenTechStrategyExample },
        { id: 'communication', label: 'Communication & Cross-Functional Leadership', component: CommunicationCrossTeamExample },
        { id: 'problemSolving', label: 'Problem-Solving & Critical Thinking', component: ProblemSolvingCriticalThinkingExample },
        { id: 'techDebt', label: 'Refactoring & Tech Debt Management', component: RefactoringTechDebtExample },
        { id: 'asyncConcurrency', label: 'Advanced Async Patterns & Concurrency', component: AdvancedAsyncConcurrencyExample },
        { id: 'scalableArch', label: 'Scalable Frontend Architecture', component: ScalableFrontendArchitectureExample }
      ]
    },
    interviewPrep: {
      label: '🎯 Interview Preparation',
      icon: '🎯',
      topics: [
        { id: 'codingPractice', label: 'Coding Practice Platform', component: CodingPlatform },
        { id: 'dsa', label: 'DSA Mastery: Zero to FAANG-Ready', component: DSAMastery },
        { id: 'dsaCurriculum', label: 'Comprehensive DSA Curriculum', component: DSAComprehensiveCurriculum }
      ]
    }
  };

  // Find all topics across categories
  const allTopics = Object.values(topicCategories)
    .reduce((acc, cat) => [...acc, ...cat.topics], []);

  const activeTabConfig = allTopics.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabConfig?.component || StateManagementExample;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setShowHero(false);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-wrapper">
      {/* Hero Section - First Time Visit */}
      {showHero && (
        <HeroSection 
          onExploreClick={() => {
            setShowHero(false);
            setActiveTab('useState');
          }}
        />
      )}

      {/* Main App Content */}
      <div className="app-container">
        {/* === Header Section === */}
        <header className="app-header">
          <div className="header-content">
            <button 
              className="header-logo"
              onClick={() => {
                setShowHero(true);
              }}
              aria-label="Go to home page"
            >
              <span className="logo-icon">⚛️</span>
              <span className="logo-text">React Learning Hub</span>
            </button>
            <p className="header-tagline">Master Modern React Development</p>
            
            {/* Hamburger Menu Button - Mobile Only */}
            <button 
              className="hamburger-menu"
              onClick={toggleSidebar}
              aria-label="Toggle navigation menu"
              aria-expanded={sidebarOpen}
              aria-controls="learning-path"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </header>

        <div className="app-layout">
          <div className="content-wrapper">
            {/* Backdrop for mobile menu */}
            {sidebarOpen && (
              <div 
                className="sidebar-backdrop"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              ></div>
            )}

            {/* === Sidebar Navigation === */}
            <nav className={`sidebar-nav ${sidebarOpen ? 'open' : ''}`} id="learning-path">
              <div className="sidebar-title">📖 Learning Path</div>
              <div className="sidebar-categories">
                {Object.entries(topicCategories).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="category-section">
                    <button
                      className={`category-header ${expandedCategories[categoryKey] ? 'expanded' : ''}`}
                      onClick={() => toggleCategory(categoryKey)}
                      aria-expanded={expandedCategories[categoryKey]}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-title">{category.label}</span>
                      <span className="category-arrow">▼</span>
                    </button>

                    {expandedCategories[categoryKey] && (
                      <div className="category-topics">
                        {category.topics.map((topic) => (
                          <button
                            key={topic.id}
                            className={`sidebar-button ${activeTab === topic.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(topic.id)}
                            aria-selected={activeTab === topic.id}
                            role="tab"
                          >
                            {topic.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* === Main Content Area === */}
            <main className="main-content">
              <div className="module-container">
                <ActiveComponent />
              </div>
            </main>
          </div>
        </div>

        {/* === Footer === */}
        <Footer />
      </div>
    </div>
  );
}

export default App;

/*
 * === Key Concepts Demonstrated in App.js ===
 *
 * 1. Functional Components:
 *    - App is a functional component, demonstrating the modern React paradigm
 *    - Hooks are used instead of class component lifecycle methods
 *
 * 2. Component Composition:
 *    - App imports and composes multiple child components
 *    - Each child is responsible for demonstrating a specific concept
 *    - This demonstrates composition over inheritance
 *
 * 3. State Management:
 *    - useState hook manages the active tab
 *    - Shows how local state drives UI changes
 *
 * 4. Conditional Rendering:
 *    - ActiveComponent is rendered conditionally based on activeTab
 *    - Different UIs are shown based on application state
 *
 * 5. List Rendering:
 *    - tabs.map() demonstrates rendering lists of elements
 *    - Similar pattern used throughout React applications
 *
 * 6. Event Handling:
 *    - onClick handler updates the state
 *    - Demonstrates the event flow: user action → state update → re-render
 *
 * 7. Accessibility (a11y):
 *    - Uses semantic HTML (nav, main, button)
 *    - Includes aria-selected and role attributes for screen readers
 *    - Demonstrates best practices for accessible React applications
 */
