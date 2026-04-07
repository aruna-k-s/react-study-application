/**
 * CodingPlatform Main Component
 * 
 * Main container for the coding practice platform
 * Manages the three-panel layout:
 * - Problem Panel (left)
 * - Code Editor (right-top)
 * - Output Panel (right-bottom)
 */

import React, { useState, useEffect } from 'react';
import { CodingPlatformProvider, useCodingPlatform } from '../../context/CodingPlatformContext';
import ProblemPanel from './ProblemPanel';
import CodeEditorPanel from './CodeEditorPanel';
import OutputPanel from './OutputPanel';
import './CodingPlatform.css';

function CodingPlatformContent() {
  const { selectProblem, problems, currentProblemId } = useCodingPlatform();
  const [divider1Pos, setDivider1Pos] = useState(40);
  const [divider2Pos, setDivider2Pos] = useState(60);
  const [isDraggingH, setIsDraggingH] = useState(false);
  const [isDraggingV, setIsDraggingV] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [isEditorFullView, setIsEditorFullView] = useState(false);
  const [isProblemMinimized, setIsProblemMinimized] = useState(false);
  const [fullViewDividerPos, setFullViewDividerPos] = useState(50);

  // Initialize with first problem
  useEffect(() => {
    selectProblem(1);
  }, [selectProblem]);

  const handleMouseDownH = () => {
    setIsDraggingH(true);
  };

  const handleMouseDownV = () => {
    setIsDraggingV(true);
  };

  const handleFullViewDividerDown = () => {
    setIsDraggingH(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingH) {
        // Check if we're in fullscreen mode
        const fullviewContainer = document.querySelector('.fullview-container');
        const platform = document.querySelector('.coding-platform');
        
        if (fullviewContainer) {
          const rect = fullviewContainer.getBoundingClientRect();
          const newPos = ((e.clientX - rect.left) / rect.width) * 100;
          if (newPos > 20 && newPos < 80) {
            setFullViewDividerPos(newPos);
          }
        } else if (platform) {
          const rect = platform.getBoundingClientRect();
          const newPos = ((e.clientX - rect.left) / rect.width) * 100;
          if (newPos > 20 && newPos < 80) {
            setDivider1Pos(newPos);
          }
        }
      }

      if (isDraggingV) {
        const rightPanel = document.querySelector('.right-panel');
        if (rightPanel) {
          const rect = rightPanel.getBoundingClientRect();
          const newPos = ((e.clientY - rect.top) / rect.height) * 100;
          if (newPos > 20 && newPos < 80) {
            setDivider2Pos(newPos);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingH(false);
      setIsDraggingV(false);
    };

    if (isDraggingH || isDraggingV) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingH, isDraggingV]);

  return (
    <div className="coding-platform">
      {/* Problem Selector */}
      <div className="problem-selector">
        <label htmlFor="problem-dropdown">Select Problem:</label>
        <select
          id="problem-dropdown"
          value={currentProblemId}
          onChange={(e) => selectProblem(parseInt(e.target.value))}
          className="problem-dropdown"
        >
          {problems.map((problem) => (
            <option key={problem.id} value={problem.id}>
              {problem.id}. {problem.title} ({problem.difficulty})
            </option>
          ))}
        </select>
        
        <div className="view-controls">
          <button
            className="view-btn"
            onClick={() => setIsProblemMinimized(!isProblemMinimized)}
            title={isProblemMinimized ? 'Expand problem' : 'Minimize problem'}
            aria-label="Toggle problem panel"
          >
            {isProblemMinimized ? '◀ Show' : '▶ Hide'}
          </button>
          
          <button
            className="view-btn"
            onClick={() => setIsFullView(!isFullView)}
            title={isFullView ? 'Exit full view' : 'Full view mode'}
            aria-label="Toggle full view"
          >
            {isFullView ? '⛔ Exit' : '⛶ Full'}
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      {!isFullView && (
        <div className="platform-container">
          {/* Left Panel: Problem Description */}
          {!isProblemMinimized && (
            <>
              <div
                className="left-panel"
                style={{ width: `${divider1Pos}%` }}
              >
                <ProblemPanel />
              </div>

              {/* Horizontal Divider */}
              <div
                className={`divider horizontal ${isDraggingH ? 'dragging' : ''}`}
                onMouseDown={handleMouseDownH}
                role="separator"
                aria-orientation="vertical"
              />
            </>
          )}

          {/* Minimized Problem Panel Tab */}
          {isProblemMinimized && (
            <div 
              className="left-panel-minimized" 
              onClick={() => setIsProblemMinimized(false)}
              title="Click to expand problem"
            >
              <span className="minimize-label">≡ Problem</span>
            </div>
          )}

          {/* Right Panel: Editor + Output */}
          <div
            className="right-panel"
            style={{ width: isProblemMinimized ? '100%' : `${100 - divider1Pos}%` }}
          >
            {/* Top: Code Editor */}
            <div
              className="editor-section"
              style={{ height: `${divider2Pos}%` }}
            >
              <CodeEditorPanel />
            </div>

            {/* Vertical Divider */}
            <div
              className={`divider vertical ${isDraggingV ? 'dragging' : ''}`}
              onMouseDown={handleMouseDownV}
              role="separator"
              aria-orientation="horizontal"
            />

            {/* Bottom: Output */}
            <div
              className="output-section"
              style={{ height: `${100 - divider2Pos}%` }}
            >
              <OutputPanel />
            </div>
          </div>
        </div>
      )}

      {/* Full View Mode */}
      {isFullView && (
        <div className="fullview-overlay">
          <div className="fullview-container">
            <div className="fullview-header">
              <h3>{problems.find(p => p.id === currentProblemId)?.title || 'Problem'}</h3>
              <div className="fullview-controls">
                {!isEditorFullView && (
                  <button
                    className="fullview-editor-toggle"
                    onClick={() => setIsEditorFullView(!isEditorFullView)}
                    title="Editor fullscreen"
                    aria-label="Toggle editor fullscreen"
                  >
                    {isEditorFullView ? '◀ Show Problem' : '▶ Hide Problem'}
                  </button>
                )}
                {isEditorFullView && (
                  <button
                    className="fullview-editor-toggle"
                    onClick={() => setIsEditorFullView(false)}
                    title="Show problem panel"
                    aria-label="Show problem panel"
                  >
                    ◀ Show Problem
                  </button>
                )}
                <button
                  className="fullview-close"
                  onClick={() => {
                    setIsFullView(false);
                    setIsEditorFullView(false);
                  }}
                  aria-label="Close full view"
                  title="Close full view"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="fullview-content">
              {!isEditorFullView ? (
                <>
                  {/* Problem on Left */}
                  <div 
                    className="fullview-problem"
                    style={{ width: `${fullViewDividerPos}%` }}
                  >
                    <ProblemPanel />
                  </div>
                  
                  {/* Divider */}
                  <div 
                    className="fullview-divider"
                    onMouseDown={() => setIsDraggingH(true)}
                    role="separator"
                    aria-orientation="vertical"
                  />
                  
                  {/* Editor on Right */}
                  <div 
                    className="fullview-editor"
                    style={{ width: `${100 - fullViewDividerPos}%` }}
                  >
                    <CodeEditorPanel />
                  </div>
                </>
              ) : (
                /* Editor Only */
                <div className="fullview-editor-full">
                  <CodeEditorPanel />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CodingPlatform() {
  return (
    <CodingPlatformProvider>
      <CodingPlatformContent />
    </CodingPlatformProvider>
  );
}
