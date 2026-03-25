/**
 * CUSTOM SEARCH HOOK
 * ==================
 * Efficient search with debouncing, fuzzy matching, and memoization
 * Production-grade search functionality
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// ============================================================================
// FUZZY MATCHING ALGORITHM
// ============================================================================

/**
 * Fuzzy search match - checks if query matches target string
 * Allows characters to be non-contiguous
 * Example: "lcp" matches "Largest Contentful Paint"
 *
 * @param {string} query - Search query
 * @param {string} target - String to search in
 * @returns {number} Score (0 = no match, higher = better match)
 */
function fuzzyMatch(query, target) {
  const queryLower = query.toLowerCase();
  const targetLower = target.toLowerCase();

  if (!queryLower) return 1;
  if (!targetLower.includes(queryLower)) {
    // Try fuzzy matching
    let queryIndex = 0;
    let targetIndex = 0;
    let score = 0;

    while (queryIndex < queryLower.length && targetIndex < targetLower.length) {
      if (queryLower[queryIndex] === targetLower[targetIndex]) {
        score++;
        queryIndex++;
      }
      targetIndex++;
    }

    // Must match all query characters
    return queryIndex === queryLower.length ? score : 0;
  }

  // Exact substring match - highest score
  return targetLower.length / queryLower.length;
}

/**
 * Calculate match score for search result
 * Prioritizes: title > keywords > description
 */
function scoreMatch(query, item) {
  if (!query) return 0;

  const titleScore = fuzzyMatch(query, item.title) * 100;
  const keywordsScore =
    item.keywords.reduce((max, kw) => Math.max(max, fuzzyMatch(query, kw)), 0) *
    50;
  const descriptionScore = fuzzyMatch(query, item.description) * 10;
  const sectionScore = fuzzyMatch(query, item.section) * 20;

  return titleScore + keywordsScore + descriptionScore + sectionScore;
}

/**
 * Highlight matched text in string
 * Returns array of matched positions
 */
function getMatchPositions(query, text) {
  if (!query) return [];

  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  const positions = [];

  // Find exact matches first
  let startIndex = 0;
  let index;
  while ((index = textLower.indexOf(queryLower, startIndex)) !== -1) {
    positions.push({ start: index, end: index + queryLower.length });
    startIndex = index + 1;
  }

  return positions;
}

/**
 * Format highlighted text
 */
export function HighlightMatch({ text, query }) {
  const positions = getMatchPositions(query, text);

  if (positions.length === 0) {
    return <span>{text}</span>;
  }

  const parts = [];
  let lastIndex = 0;

  positions.forEach(({ start, end }, idx) => {
    if (start > lastIndex) {
      parts.push(<span key={`text-${idx}`}>{text.slice(lastIndex, start)}</span>);
    }
    parts.push(
      <span key={`match-${idx}`} style={{ backgroundColor: '#ffd700', fontWeight: 'bold' }}>
        {text.slice(start, end)}
      </span>
    );
    lastIndex = end;
  });

  if (lastIndex < text.length) {
    parts.push(
      <span key="text-end">{text.slice(lastIndex)}</span>
    );
  }

  return <span>{parts}</span>;
}

// ============================================================================
// DEBOUNCE UTILITY
// ============================================================================

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// CUSTOM SEARCH HOOK
// ============================================================================

/**
 * useSearch - Complete search functionality
 *
 * Features:
 * - Fuzzy matching
 * - Debouncing (300ms)
 * - Memoized filtering
 * - Result ranking by relevance
 * - Optional result limit
 * - Highlight support
 *
 * @param {Array} items - Items to search (e.g., SEARCH_INDEX)
 * @param {number} resultLimit - Max results to return (default: 10)
 * @returns {Object} { query, setQuery, results, isLoading, debouncedQuery }
 */
export function useSearch(items = [], resultLimit = 10) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce query for optimized filtering
  const debouncedQuery = useDebounce(query, 300);

  // Memoized search results - only recomputes when debouncedQuery or items change
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    setIsLoading(true);

    // Score all items
    const scored = items
      .map((item) => ({
        ...item,
        score: scoreMatch(debouncedQuery, item),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, resultLimit);

    setIsLoading(false);

    return scored;
  }, [debouncedQuery, items, resultLimit]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery: handleSearch,
    clearSearch,
    results,
    isLoading,
    debouncedQuery,
    hasResults: results.length > 0,
    resultCount: results.length,
  };
}

// ============================================================================
// SIDEBAR SEARCH HOOK (HIERARCHICAL)
// ============================================================================

/**
 * useSidebarSearch - Search with menu hierarchy support
 * Expands parent items if children match
 *
 * @param {Array} sidebarItems - Sidebar menu items with hierarchy
 * @returns {Object} Filtered items with expanded state
 */
export function useSidebarSearch(sidebarItems = []) {
  const [query, setQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set());

  const debouncedQuery = useDebounce(query, 300);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return sidebarItems;
    }

    const newExpandedSections = new Set();
    const queryLower = debouncedQuery.toLowerCase();

    // Filter items and expand parents if children match
    const filtered = sidebarItems.map((category) => {
      const filteredChildren = category.children?.filter((item) => {
        const titleMatch = fuzzyMatch(debouncedQuery, item.title) > 0;
        const keywordMatch = item.keywords?.some(
          (kw) => fuzzyMatch(debouncedQuery, kw) > 0
        );
        return titleMatch || keywordMatch;
      });

      const categoryMatch = fuzzyMatch(debouncedQuery, category.title) > 0;

      // Expand if category matches or children match
      if (categoryMatch || (filteredChildren && filteredChildren.length > 0)) {
        newExpandedSections.add(category.id);
      }

      return {
        ...category,
        children: filteredChildren || category.children,
        visible: categoryMatch || (filteredChildren && filteredChildren.length > 0),
      };
    });

    setExpandedSections(newExpandedSections);
    return filtered.filter((cat) => cat.visible);
  }, [debouncedQuery, sidebarItems]);

  const toggleSection = useCallback((sectionId) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  return {
    query,
    setQuery,
    filteredItems,
    expandedSections,
    toggleSection,
    debouncedQuery,
  };
}

export default useSearch;
