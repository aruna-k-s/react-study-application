/**
 * RESPONSIVE LAYOUT WRAPPER
 * ========================
 * Main layout component that coordinates:
 * - Collapsible sidebar (60px compact, 240px expanded)
 * - Slim header (56px max)
 * - Main content area (responsive, 75-85% width)
 */

import React, { useState, createContext, useContext } from 'react';
import CompactHeader from './CompactHeader';
import CollapsibleSidebar from './CollapsibleSidebar';
import MainContentContainer from './MainContentContainer';
import '../styles/ResponsiveLayout.css';

// Layout context for sharing sidebar state
const LayoutContext = createContext();

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
};

export default function ResponsiveLayout({ children }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  const collapseSidebar = () => {
    setSidebarExpanded(false);
  };

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  return (
    <LayoutContext.Provider value={{ 
      sidebarExpanded, 
      toggleSidebar, 
      collapseSidebar,
      activeRoute,
      setActiveRoute
    }}>
      <div className="responsive-layout">
        {/* Header */}
        <CompactHeader 
          onMenuClick={toggleSidebar} 
          onSearchClick={toggleSearch}
        />

        {/* Main Layout Container */}
        <div className="layout-container">
          {/* Sidebar */}
          <CollapsibleSidebar isExpanded={sidebarExpanded} />

          {/* Content Area */}
          <MainContentContainer>
            {children}
          </MainContentContainer>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
