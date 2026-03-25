/**
 * MAIN CONTENT CONTAINER
 * =====================
 * Optimized for content visibility:
 * - Responsive width (75-85% on desktop)
 * - Max-width constraint (1100-1300px)
 * - Proper vertical rhythm
 * - Minimal padding/margins
 * - Auto-collapse sidebar on click outside
 */

import React from 'react';
import { useLayout } from './ResponsiveLayout';
import '../styles/MainContentContainer.css';

export default function MainContentContainer({ children }) {
  const { sidebarExpanded, collapseSidebar } = useLayout();

  // Close sidebar when clicking on content (mobile-friendly)
  const handleClick = () => {
    if (sidebarExpanded) {
      collapseSidebar();
    }
  };

  return (
    <main className="main-content-container" onClick={handleClick}>
      <div className="content-wrapper">
        {children}
      </div>
    </main>
  );
}
