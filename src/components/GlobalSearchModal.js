/**
 * GLOBAL SEARCH MODAL
 * ===================
 * Command palette style search modal triggered by Ctrl+K
 * Features: Keyboard navigation, fuzzy matching, instant results display
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch, HighlightMatch } from '../hooks/useSearch';
import { SEARCH_INDEX } from '../config/searchIndex';
import './GlobalSearchModal.css';

// ============================================================================
// GLOBAL SEARCH MODAL COMPONENT
// ============================================================================

export default function GlobalSearchModal() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const resultsListRef = useRef(null);

  const { query, setQuery, results, clearSearch } = useSearch(SEARCH_INDEX, 10);

  // =========================================================================
  // KEYBOARD EVENT HANDLING
  // =========================================================================

  /**
   * Open modal on Ctrl+K or Cmd+K
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to open/close
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSelectedIndex(0);
      }

      // Only handle navigation keys if modal is open
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  /**
   * Focus input when modal opens
   */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  }, [isOpen]);

  /**
   * Scroll selected result into view
   */
  useEffect(() => {
    if (selectedIndex >= 0 && resultsListRef.current) {
      const selectedElement = resultsListRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  // =========================================================================
  // HANDLERS
  // =========================================================================

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(0);
    clearSearch();
  }, [clearSearch]);

  const handleSelectResult = useCallback(
    (result) => {
      navigate(result.route);
      handleClose();
    },
    [navigate, handleClose]
  );

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      setSelectedIndex(0); // Reset selection on new search
    },
    [setQuery]
  );

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // =========================================================================
  // RENDER
  // =========================================================================

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="search-modal-backdrop"
        onClick={handleBackdropClick}
        role="presentation"
      />

      {/* Modal */}
      <dialog
        ref={modalRef}
        className="search-modal"
        open
        role="dialog"
        aria-label="Search"
        aria-modal="true"
      >
        <div className="search-modal-content">
          {/* Search Input */}
          <div className="search-modal-input-container">
            <div className="search-icon">🔍</div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search learning modules... (Esc to close)"
              value={query}
              onChange={handleInputChange}
              className="search-modal-input"
              aria-label="Search"
              aria-describedby="search-results-hint"
            />
            {query && (
              <button
                className="search-modal-clear"
                onClick={() => setQuery('')}
                title="Clear search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <div className="search-keyboard-hint">
              <span className="kbd">⌘K</span> to toggle • <span className="kbd">↑↓</span> to
              navigate • <span className="kbd">Enter</span> to select • <span className="kbd">Esc</span> to close
            </div>
          </div>

          {/* Results */}
          <div className="search-results-container">
            {results.length > 0 ? (
              <>
                <ul
                  className="search-results-list"
                  ref={resultsListRef}
                  role="listbox"
                >
                  {results.map((result, index) => (
                    <li
                      key={result.id}
                      data-index={index}
                      className={`search-result-item ${
                        index === selectedIndex ? 'selected' : ''
                      }`}
                      role="option"
                      aria-selected={index === selectedIndex}
                      onClick={() => handleSelectResult(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="search-result-content">
                        <div className="search-result-title">
                          <HighlightMatch text={result.title} query={query} />
                        </div>
                        <div className="search-result-section">
                          {result.section}
                        </div>
                        {result.description && (
                          <div className="search-result-description">
                            {result.description.substring(0, 60)}
                            {result.description.length > 60 ? '...' : ''}
                          </div>
                        )}
                      </div>
                      <div className="search-result-route">
                        {result.route}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="search-results-footer">
                  Showing {results.length} result
                  {results.length !== 1 ? 's' : ''}
                </div>
              </>
            ) : query ? (
              <div className="search-no-results">
                <p>No results found for "{query}"</p>
                <p className="search-no-results-hint">
                  Try searching for different keywords or browse the sidebar
                </p>
              </div>
            ) : (
              <div className="search-empty-state">
                <p>Start typing to search...</p>
                <div className="search-popular-searches">
                  <h3>Popular searches:</h3>
                  <div className="popular-tags">
                    {['React basics', 'Performance', 'Lighthouse', 'Hooks', 'Advanced'].map(
                      (tag) => (
                        <button
                          key={tag}
                          className="popular-tag"
                          onClick={() => setQuery(tag)}
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
