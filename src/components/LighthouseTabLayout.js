/**
 * LIGHTHOUSE TAB LAYOUT
 * ====================
 * Tab-based organization for Lighthouse sections:
 * - Performance (Core Web Vitals)
 * - Accessibility
 * - Best Practices
 * - SEO
 * 
 * Each metric as collapsible card for space efficiency
 */

import React, { useState, useMemo } from 'react';
import '../styles/LighthouseTabLayout.css';

const TABS = [
  { id: 'performance', label: '⚡ Performance', icon: '📊' },
  { id: 'accessibility', label: '♿ Accessibility', icon: '🎯' },
  { id: 'best-practices', label: '✅ Best Practices', icon: '🛡️' },
  { id: 'seo', label: '🔍 SEO', icon: '📈' },
];

export default function LighthouseTabLayout({ 
  children,
  metrics = [],
  activeTab = 'performance'
}) {
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const [expandedMetrics, setExpandedMetrics] = useState(new Set());

  const toggleMetric = (metricId) => {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricId)) {
      newExpanded.delete(metricId);
    } else {
      newExpanded.add(metricId);
    }
    setExpandedMetrics(newExpanded);
  };

  const filteredMetrics = useMemo(() => {
    return metrics.filter(m => m.category === selectedTab);
  }, [metrics, selectedTab]);

  return (
    <div className="lighthouse-tab-layout">
      {/* Tab Navigation */}
      <div className="lighthouse-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Custom children for tab content */}
        {children && React.cloneElement(children, { activeTab: selectedTab })}

        {/* Metric Cards (if metrics provided) */}
        {metrics.length > 0 && (
          <div className="metrics-grid">
            {filteredMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                metric={metric}
                isExpanded={expandedMetrics.has(metric.id)}
                onToggle={() => toggleMetric(metric.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * METRIC CARD COMPONENT
 * ====================
 * Collapsible card for individual metrics
 */
function MetricCard({ metric, isExpanded, onToggle }) {
  return (
    <div className={`metric-card ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="metric-header" onClick={onToggle}>
        <div className="metric-title">
          <span className="metric-name">{metric.name}</span>
          <span className={`metric-score score-${metric.score >= 90 ? 'good' : metric.score >= 50 ? 'moderate' : 'poor'}`}>
            {metric.score}
          </span>
        </div>
        <button className="metric-toggle" aria-label="Toggle details">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="metric-details">
          <div className="metric-explanation">
            <h4>What is this?</h4>
            <p>{metric.explanation}</p>
          </div>

          {metric.threshold && (
            <div className="metric-threshold">
              <h4>Thresholds</h4>
              <div className="threshold-row">
                <span className="threshold-label">✓ Good:</span>
                <span className="threshold-value">{metric.threshold.good}</span>
              </div>
              <div className="threshold-row">
                <span className="threshold-label">⚠ Fair:</span>
                <span className="threshold-value">{metric.threshold.fair}</span>
              </div>
              <div className="threshold-row">
                <span className="threshold-label">✗ Poor:</span>
                <span className="threshold-value">{metric.threshold.poor}</span>
              </div>
            </div>
          )}

          {metric.fixes && metric.fixes.length > 0 && (
            <div className="metric-fixes">
              <h4>How to Fix</h4>
              <ul className="fixes-list">
                {metric.fixes.map((fix, idx) => (
                  <li key={idx}>{fix}</li>
                ))}
              </ul>
            </div>
          )}

          {metric.codeExample && (
            <div className="metric-code">
              <h4>Code Example</h4>
              <pre><code>{metric.codeExample}</code></pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { MetricCard };
