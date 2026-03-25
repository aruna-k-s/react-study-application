/**
 * LIGHTHOUSE OPTIMIZATION LEARNING MODULE
 * ========================================
 * A comprehensive educational feature that teaches students how to:
 * - Understand Lighthouse metrics deeply
 * - Analyze performance issues
 * - Implement fixes with code examples
 * - Monitor performance improvements
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './31-LighthouseOptimization.css';

// ============================================================================
// 1. DATA STRUCTURES & MOCK LIGHTHOUSE REPORT
// ============================================================================

const MOCK_LIGHTHOUSE_REPORT = {
  fetchTime: new Date().toISOString(),
  url: 'https://example-app.com',
  categories: {
    performance: {
      score: 64,
      weight: 0.3,
      metrics: {
        fcp: { value: 1800, threshold: 1800, good: 1800, poor: 3000 },
        lcp: { value: 3500, threshold: 2500, good: 2500, poor: 4000 },
        cls: { value: 0.15, threshold: 0.1, good: 0.1, poor: 0.25 },
        tbt: { value: 250, threshold: 300, good: 300, poor: 600 },
        si: { value: 3200, threshold: 3800, good: 3800, poor: 5800 },
      },
      issues: [
        {
          id: 'large-bundles',
          title: 'Reduce JavaScript Bundles',
          type: 'critical',
          impact: 850,
          savings: '45%',
          rootCause: 'Monolithic bundle without code splitting',
          affectedUsers: ['Mobile 4G', 'Slower devices'],
        },
        {
          id: 'unoptimized-images',
          title: 'Optimize Images (WebP, modern formats)',
          type: 'critical',
          impact: 320,
          savings: '35%',
          rootCause: 'Large PNG/JPG files without compression',
          affectedUsers: ['All users', '3G networks'],
        },
        {
          id: 'render-blocking',
          title: 'Eliminate render-blocking resources',
          type: 'moderate',
          impact: 180,
          savings: '12%',
          rootCause: 'Synchronous CSS/JS loading in head',
          affectedUsers: ['Mobile users'],
        },
        {
          id: 'unused-css',
          title: 'Remove unused CSS',
          type: 'moderate',
          impact: 85,
          savings: '8%',
          rootCause: 'Unused Tailwind/Bootstrap classes',
          affectedUsers: ['First load'],
        },
        {
          id: 'layout-shift',
          title: 'Fix Cumulative Layout Shift (CLS)',
          type: 'moderate',
          impact: 150,
          savings: '0.05 points',
          rootCause: 'Images/ads without fixed dimensions',
          affectedUsers: ['Desktop & mobile'],
        },
      ],
    },
    accessibility: {
      score: 78,
      issues: ['Missing alt text', 'Low contrast', 'No ARIA labels'],
    },
    bestPractices: {
      score: 82,
      issues: ['Mixed HTTP/HTTPS', 'Outdated libraries'],
    },
    seo: {
      score: 91,
      issues: ['Mobile friendly', 'Valid meta tags'],
    },
    pwa: {
      score: 45,
      issues: ['No service worker', 'No manifest.json'],
    },
  },
};

// ============================================================================
// 2. METRIC DEFINITIONS - Deep 5W+1H Analysis
// ============================================================================

const METRICS_DEFINITION = {
  fcp: {
    name: 'First Contentful Paint (FCP)',
    what: 'Time when browser renders first visible DOM content (text, image, canvas)',
    why: 'Users judge performance in first 1 second. Poor FCP = high bounce rate',
    where: 'Originates from: Large JS parsing, render-blocking CSS, blocked main thread',
    when: 'Occurs during page load (critical for perceived performance)',
    who: 'Affects all users equally, but Mobile 4G heavily impacted',
    how: [
      'Defer non-critical CSS loading',
      'Remove render-blocking JavaScript',
      'Inline critical CSS',
      'Compress images',
      'Use modern image formats (WebP)',
    ],
    threshold: { good: '≤1.8s', poor: '≥3.0s' },
    businessImpact: 'Every 1s delay = 7% conversion drop (e-commerce)',
  },

  lcp: {
    name: 'Largest Contentful Paint (LCP)',
    what: 'Time when the largest visual element becomes visible',
    why: 'Users perceive this as load completion time. Biggest factor in perceived performance',
    where: 'Usually caused by: Large images, slow APIs, unoptimized fonts, late-loaded content',
    when: 'Measured up to 4.5 seconds from interaction start',
    who: 'Affects: Mobile users most, users on 3G/4G, users with slow CPUs',
    how: [
      'Lazy load images below fold',
      'Use CDN for media delivery',
      'Implement dynamic imports',
      'Cache API responses',
      'Optimize server response time',
    ],
    threshold: { good: '≤2.5s', poor: '≥4.0s' },
    businessImpact: 'Core Web Vital: directly affects SEO ranking',
  },

  cls: {
    name: 'Cumulative Layout Shift (CLS)',
    what: 'Unexpected pixel movement of DOM elements during load & interaction',
    why: 'Causes clicks on wrong targets (e.g., clicking ad instead of button)',
    where: 'Caused by: Images/iframes/ads without size, late-loaded fonts, poorly-sized elements',
    when: 'Occurs during load and first 500ms of interaction',
    who: 'Affects: Mobile users most, users with slow devices, users on mobile networks',
    how: [
      'Set explicit width/height on images & iframes',
      'Avoid inserting DOM above existing content',
      'Use transform animations (not layout changes)',
      'Preload critical fonts',
      'Reserve space for dynamic content',
    ],
    threshold: { good: '≤0.1', poor: '≥0.25' },
    businessImpact: 'Causes accidental clicks, poor UX, reduced conversions',
  },

  tbt: {
    name: 'Total Blocking Time (TBT)',
    what: 'Sum of time when main thread is blocked (>50ms tasks)',
    why: 'Blocks user interactions: clicks, scrolls, keyboard input feel slow',
    where: 'Caused by: Heavy JavaScript execution, long event handlers, memory leaks',
    when: 'Measured during First Input to Interactive (5s window)',
    who: 'Affects: Mobile users, users with mid-range devices, users with extensions',
    how: [
      'Break up long tasks (>50ms)',
      'Use requestIdleCallback() for non-urgent work',
      'Implement Web Workers for heavy computation',
      'Avoid large re-renders',
      'Debounce event handlers',
    ],
    threshold: { good: '≤300ms', poor: '≥600ms' },
    businessImpact: 'Poor interactivity = frustration + abandonment',
  },

  si: {
    name: 'Speed Index (SI)',
    what: 'Average time at which visible parts of the page are rendered',
    why: 'Measures perceived speed across the entire page',
    where: 'Affected by: All performance factors (JS, CSS, images, fonts, network)',
    when: 'Measured from navigation start to visual completion',
    who: 'Especially affects: Users on mobile networks, users with slow devices',
    how: [
      'Minimize Critical Rendering Path',
      'Optimize all above metrics (FCP, LCP, etc)',
      'Progressive enhancement',
      'Skeleton screens for perceived performance',
      'Optimize rendering pipeline',
    ],
    threshold: { good: '≤3.8s', poor: '≥5.8s' },
    businessImpact: 'Overall perceived performance score',
  },
};

// ============================================================================
// 3. OPTIMIZATION PLAYBOOK - Code-level fixes
// ============================================================================

const OPTIMIZATION_PLAYBOOK = {
  large_bundles: {
    title: 'Fix: Large JavaScript Bundles',
    severity: 'CRITICAL',
    expectedSavings: '45%',
    before: `
// ❌ BAD: Monolithic bundle loaded upfront
import HeavyChart from './components/HeavyChart';
import DataProcessor from './components/DataProcessor';
import Visualizer from './components/Visualizer';

export default function Dashboard() {
  return (
    <div>
      <HeavyChart data={data} />
      <DataProcessor />
      <Visualizer />
    </div>
  );
}
    `.trim(),
    after: `
// ✅ GOOD: Code splitting with React.lazy
import React, { Suspense } from 'react';

const HeavyChart = React.lazy(() => import('./components/HeavyChart'));
const DataProcessor = React.lazy(() => import('./components/DataProcessor'));
const Visualizer = React.lazy(() => import('./components/Visualizer'));

const LoadingFallback = () => <div style={{ padding: '20px' }}>Loading...</div>;

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <HeavyChart data={data} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <DataProcessor />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Visualizer />
      </Suspense>
    </div>
  );
}
    `.trim(),
    tradeoffs: 'Trade-off: Initial load faster but stanza waterfalls when loading lazy components',
    technique: 'Route-based code splitting + Component-level lazy loading',
  },

  image_optimization: {
    title: 'Fix: Unoptimized Images',
    severity: 'CRITICAL',
    expectedSavings: '35%',
    before: `
// ❌ BAD: Large images, no format selection
<img 
  src="product-photo.jpg" 
  alt="Product"
  width="800"
  height="600"
  style={{ width: '100%' }}
/>
    `.trim(),
    after: `
// ✅ GOOD: Responsive images with modern formats
<picture>
  <source 
    srcSet="product-photo.webp,
            product-photo-2x.webp 2x" 
    type="image/webp"
  />
  <source 
    srcSet="product-photo.jpg,
            product-photo-2x.jpg 2x" 
    type="image/jpeg"
  />
  <img
    src="product-photo.jpg"
    alt="Product"
    width="800"
    height="600"
    loading="lazy"
    style={{ width: '100%', height: 'auto' }}
  />
</picture>
    `.trim(),
    tradeoffs: 'Trade-off: More HTML code + need to generate WebP versions',
    technique: 'WebP format + Responsive images + Lazy loading + Proper sizing',
  },

  render_blocking: {
    title: 'Fix: Render-Blocking Resources',
    severity: 'MODERATE',
    expectedSavings: '12%',
    before: `
<!-- ❌ BAD: Render-blocking CSS & JS in head -->
<head>
  <link rel="stylesheet" href="styles.css">
  <script src="bundle.js"></script>
</head>
<body>
  <div id="root"></div>
</body>
    `.trim(),
    after: `
<!-- ✅ GOOD: Async/defer + critical CSS inline -->
<head>
  <style>
    /* Critical CSS for above-the-fold content */
    body { font-family: sans-serif; }
    .hero { display: flex; }
  </style>
  <link rel="preload" href="styles.css" as="style">
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
</head>
<body>
  <div id="root"></div>
  <script src="bundle.js" async defer></script>
</body>
    `.trim(),
    tradeoffs: 'Trade-off: FOUC (Flash of Unstyled Content) if not handled properly',
    technique: 'Critical CSS inlining + Async/Defer scripts + Resource hints',
  },

  layout_shift: {
    title: 'Fix: Cumulative Layout Shift',
    severity: 'MODERATE',
    expectedSavings: '0.05-0.1 CLS',
    before: `
// ❌ BAD: Image without reserved space causes shift
<div className="image-container">
  <img 
    src="photo.jpg" 
    alt="Photo"
    style={{ width: '100%' }}
  />
</div>
    `.trim(),
    after: `
// ✅ GOOD: Container with aspect-ratio reservation
<div 
  className="image-container"
  style={{
    aspectRatio: '16 / 9',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden'
  }}
>
  <img 
    src="photo.jpg" 
    alt="Photo"
    style={{ 
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
    loading="lazy"
  />
</div>
    `.trim(),
    tradeoffs: 'Trade-off: Must know aspect ratio beforehand',
    technique: 'Container queries + aspect-ratio CSS + Explicit dimensions',
  },

  main_thread_blocking: {
    title: 'Fix: Main Thread Blocking (TBT)',
    severity: 'MODERATE',
    expectedSavings: '200-300ms',
    before: `
// ❌ BAD: Long processing blocks main thread
function handleDataProcessing(largeDataSet) {
  let result = [];
  for (let i = 0; i < largeDataSet.length; i++) {
    result.push(processItem(largeDataSet[i])); // Heavy operation
  }
  updateUI(result);
}
    `.trim(),
    after: `
// ✅ GOOD: Break into chunks with requestIdleCallback
function handleDataProcessing(largeDataSet) {
  let index = 0;
  let result = [];

  function processChunk() {
    const endIndex = Math.min(index + 100, largeDataSet.length);
    
    for (let i = index; i < endIndex; i++) {
      result.push(processItem(largeDataSet[i]));
    }
    
    index = endIndex;

    if (index < largeDataSet.length) {
      requestIdleCallback(processChunk, { timeout: 1000 });
    } else {
      updateUI(result);
    }
  }

  requestIdleCallback(processChunk);
}
    `.trim(),
    tradeoffs: 'Trade-off: Slower perceived completion but better UX during process',
    technique: 'Task chunking + requestIdleCallback + Progressive rendering',
  },
};

// ============================================================================
// 4. COMPONENT: SCORING DASHBOARD
// ============================================================================

function ScoringDashboard({ report }) {
  const getScoreColor = (score) => {
    if (score >= 90) return '#0cce6b'; // Green
    if (score >= 50) return '#ffa400'; // Orange
    return '#ff4e42'; // Red
  };

  const getScoreInterpretation = (score, category) => {
    if (score >= 90) return '✓ Excellent - This is good!';
    if (score >= 50)
      return '⚠ Needs improvement. Work on the issues below.';
    return '✗ Poor - Take action immediately.';
  };

  return (
    <div className="lighthouse-dashboard">
      <h2>📊 Lighthouse Audit Overview</h2>
      <p className="audit-date">
        Audited: {new Date(report.fetchTime).toLocaleString()}
      </p>

      <div className="scores-grid">
        {Object.entries(report.categories).map(([key, category]) => (
          <div key={key} className="score-card">
            <div className="score-circle">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getScoreColor(category.score)}
                  strokeWidth="2"
                  strokeDasharray={`${(category.score / 100) * 282.7} 282.7`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="score">{category.score}</span>
            </div>
            <h3>
              {key === 'performance'
                ? '⚡ Performance'
                : key === 'accessibility'
                ? '♿ Accessibility'
                : key === 'bestPractices'
                ? '✓ Best Practices'
                : key === 'seo'
                ? '🔍 SEO'
                : '📱 PWA'}
            </h3>
            <p className="interpretation">
              {getScoreInterpretation(category.score, key)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 5. COMPONENT: METRICS DEEP DIVE (5W+1H Analysis)
// ============================================================================

function MetricsDeepDive() {
  const [selectedMetric, setSelectedMetric] = useState('fcp');

  const metric = METRICS_DEFINITION[selectedMetric];

  return (
    <div className="metrics-section">
      <h2>📈 Deep Dive: Core Web Vitals (5W + 1H Analysis)</h2>

      <div className="metrics-selector">
        {Object.entries(METRICS_DEFINITION).map(([key, def]) => (
          <button
            key={key}
            className={`metric-btn ${selectedMetric === key ? 'active' : ''}`}
            onClick={() => setSelectedMetric(key)}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="metric-card" id={selectedMetric}>
        <h3>{metric.name}</h3>

        <div className="metric-analysis">
          <div className="analysis-item">
            <strong>❓ WHAT it measures:</strong>
            <p>{metric.what}</p>
          </div>

          <div className="analysis-item">
            <strong>💡 WHY it matters:</strong>
            <p>{metric.why}</p>
            <p className="sub-text">
              <em>Business Impact: {metric.businessImpact}</em>
            </p>
          </div>

          <div className="analysis-item">
            <strong>📍 WHERE it originates:</strong>
            <p>{metric.where}</p>
          </div>

          <div className="analysis-item">
            <strong>⏱️ WHEN it occurs:</strong>
            <p>{metric.when}</p>
          </div>

          <div className="analysis-item">
            <strong>👥 WHO is affected:</strong>
            <p>{metric.who}</p>
          </div>

          <div className="analysis-item">
            <strong>🔧 HOW to fix it:</strong>
            <ul className="how-list">
              {metric.how.map((technique, idx) => (
                <li key={idx}>{technique}</li>
              ))}
            </ul>
          </div>

          <div className="threshold-info">
            <p>
              <strong>✓ Good Threshold:</strong> {metric.threshold.good}
            </p>
            <p>
              <strong>✗ Poor Threshold:</strong> {metric.threshold.poor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. COMPONENT: ISSUES BREAKDOWN & CATEGORIZATION
// ============================================================================

function IssuesBreakdown({ report }) {
  const [expandedIssue, setExpandedIssue] = useState(null);

  const issues = report.categories.performance.issues;
  const critical = issues.filter((i) => i.type === 'critical');
  const moderate = issues.filter((i) => i.type === 'moderate');

  const IssueCard = ({ issue }) => (
    <div
      className={`issue-card ${issue.type}`}
      onClick={() =>
        setExpandedIssue(expandedIssue === issue.id ? null : issue.id)
      }
    >
      <div className="issue-header">
        <div>
          <span className={`severity-badge ${issue.type}`}>
            {issue.type.toUpperCase()}
          </span>
          <span className="issue-title">{issue.title}</span>
        </div>
        <span className="impact-badge">Impact: {issue.impact}ms</span>
      </div>

      {expandedIssue === issue.id && (
        <div className="issue-details">
          <div className="detail-row">
            <strong>Root Cause:</strong>
            <span>{issue.rootCause}</span>
          </div>
          <div className="detail-row">
            <strong>Potential Savings:</strong>
            <span>{issue.savings}</span>
          </div>
          <div className="detail-row">
            <strong>Affected Users:</strong>
            <div className="affected-users">
              {issue.affectedUsers.map((user, idx) => (
                <span key={idx} className="user-tag">
                  {user}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="issues-section">
      <h2>🎯 Issues Breakdown & Prioritization</h2>

      <div className="issues-summary">
        <div className="summary-stat critical">
          <span className="count">{critical.length}</span>
          <span>Critical Issues</span>
        </div>
        <div className="summary-stat moderate">
          <span className="count">{moderate.length}</span>
          <span>Moderate Issues</span>
        </div>
        <div className="summary-stat">
          <span className="count">{critical.reduce((acc, i) => acc + i.impact, 0)}ms</span>
          <span>Total Potential Gain</span>
        </div>
      </div>

      <div className="issues-list">
        <div className="issues-group">
          <h3 className="group-title critical-title">
            🔴 Critical - Fix Immediately
          </h3>
          {critical.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        <div className="issues-group">
          <h3 className="group-title moderate-title">
            🟡 Moderate - Important to Address
          </h3>
          {moderate.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. COMPONENT: OPTIMIZATION PLAYBOOK
// ============================================================================

function OptimizationPlaybook() {
  const [expandedFix, setExpandedFix] = useState(null);

  return (
    <div className="playbook-section">
      <h2>🛠️ Optimization Playbook: Code-Level Fixes</h2>
      <p className="section-description">
        Click each issue to see exact code fixes, before/after comparison, and
        trade-offs.
      </p>

      <div className="fixes-list">
        {Object.entries(OPTIMIZATION_PLAYBOOK).map(([key, fix]) => (
          <div key={key} className="fix-card">
            <div
              className="fix-header"
              onClick={() =>
                setExpandedFix(expandedFix === key ? null : key)
              }
            >
              <div>
                <span className={`severity-badge ${fix.severity.toLowerCase()}`}>
                  {fix.severity}
                </span>
                <h3>{fix.title}</h3>
              </div>
              <span className="savings">💰 {fix.expectedSavings}</span>
            </div>

            {expandedFix === key && (
              <div className="fix-details">
                <div className="comparison">
                  <div className="code-block">
                    <span className="label">❌ BEFORE (Unoptimized):</span>
                    <pre>{fix.before}</pre>
                  </div>

                  <div className="arrow">→</div>

                  <div className="code-block">
                    <span className="label">✅ AFTER (Optimized):</span>
                    <pre>{fix.after}</pre>
                  </div>
                </div>

                <div className="fix-info">
                  <div className="info-item">
                    <strong>🔄 Trade-offs:</strong>
                    <p>{fix.tradeoffs}</p>
                  </div>
                  <div className="info-item">
                    <strong>📚 Technique Used:</strong>
                    <p>{fix.technique}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 8. COMPONENT: ARCHITECTURE INSIGHTS
// ============================================================================

function ArchitectureInsights() {
  const insights = [
    {
      category: 'Bundling Strategy',
      image: '📦',
      points: [
        'Monolithic bundles block initial render',
        'Code splitting by route reduces TTI',
        'Dynamic imports load on-demand',
        'Tree-shaking removes dead code',
      ],
    },
    {
      category: 'SSR vs CSR Trade-offs',
      image: '🔄',
      points: [
        'SSR: Better FCP (server renders HTML)',
        'CSR: Better TTI (faster JS execution)',
        'Hydration: Both FCP & TTI benefits',
        'Choose based on your audience',
      ],
    },
    {
      category: 'Caching Strategy',
      image: '💾',
      points: [
        'Browser cache: Reduce network requests',
        'Service Worker cache: Offline support',
        'HTTP caching headers: Control cache duration',
        'CDN cache: Serve from edge',
      ],
    },
    {
      category: 'Image Optimization',
      image: '🖼️',
      points: [
        'WebP format: 25-35% smaller than JPEG',
        'Responsive images: Right size for device',
        'Lazy loading: Defer off-screen images',
        'AVIF: Even better compression (nascent)',
      ],
    },
    {
      category: 'Resource Prioritization',
      image: '⭐',
      points: [
        '<link rel="preload">: Critical resources',
        '<link rel="prefetch">: Future navigation',
        '<link rel="dns-prefetch">: Third-party domains',
        'Preconnect: Warm up connections early',
      ],
    },
    {
      category: 'Rendering Pipeline',
      image: '🎨',
      points: [
        'Critical Rendering Path: Minimize CRP',
        'CSSOM vs DOM: Parse CSS in parallel',
        'Paint: Only repaint changed areas',
        'Composite: GPU acceleration for transforms',
      ],
    },
  ];

  return (
    <div className="architecture-section">
      <h2>🏗️ Architecture Insights: Design Decisions Impact Performance</h2>
      <p className="section-description">
        Understanding how architecture choices affect Lighthouse metrics:
      </p>

      <div className="insights-grid">
        {insights.map((insight, idx) => (
          <div key={idx} className="insight-card">
            <h3>
              <span className="image">{insight.image}</span>
              {insight.category}
            </h3>
            <ul>
              {insight.points.map((point, pidx) => (
                <li key={pidx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="architecture-flow">
        <h3>🔗 How It All Connects</h3>
        <div className="flow-diagram">
          <p className="flow-box">User Request</p>
          <p className="arrow">↓</p>
          <p className="flow-box">
            DNS Lookup (dns-prefetch) → TCP Connection (preconnect)
          </p>
          <p className="arrow">↓</p>
          <p className="flow-box">
            HTML received & parsed (Critical Rendering Path)
          </p>
          <p className="arrow">↓</p>
          <p className="flow-box">
            FCP: First paint | LCP: Largest content paint
          </p>
          <p className="arrow">↓</p>
          <p className="flow-box">TBT: Main thread blocking | CLS: Layout shifts</p>
          <p className="arrow">↓</p>
          <p className="flow-box">SI: Speed Index (overall perceived performance)</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 9. MAIN COMPONENT: Lighthouse Optimization Module
// ============================================================================

export default function LighthouseOptimization() {
  const location = useLocation();

  // Handle anchor navigation for deep links (#fcp, #lcp, #cls, #tbt, #si)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1); // remove # 
      const element = document.getElementById(id);
      if (element) {
        // Use setTimeout to ensure DOM has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [location.hash]);

  return (
    <div className="lighthouse-module">
      <div className="module-header">
        <h1>🚀 Lighthouse Report Deep Dive & Optimization Guide</h1>
        <p>
          Learn to analyze, diagnose, and fix performance issues like a senior
          engineer
        </p>
      </div>

      {/* Section 1: Overview Dashboard */}
      <section className="module-section" id="overview">
        <ScoringDashboard report={MOCK_LIGHTHOUSE_REPORT} />
      </section>

      {/* Section 2: Metrics Deep Dive */}
      <section className="module-section" id="metrics">
        <MetricsDeepDive />
      </section>

      {/* Section 3: Issues Breakdown */}
      <section className="module-section" id="issues">
        <IssuesBreakdown report={MOCK_LIGHTHOUSE_REPORT} />
      </section>

      {/* Section 4: Optimization Playbook */}
      <section className="module-section" id="playbook">
        <OptimizationPlaybook />
      </section>

      {/* Section 5: Architecture Insights */}
      <section className="module-section" id="architecture">
        <ArchitectureInsights />
      </section>

      {/* Learning Summary */}
      <section className="module-section learning-summary">
        <h2>📚 Key Takeaways</h2>
        <div className="takeaways">
          <div className="takeaway-item">
            <strong>🎯 Metrics Matter:</strong> FCP, LCP, CLS, TBT, SI directly
            impact user satisfaction and business metrics (conversions, SEO rank)
          </div>
          <div className="takeaway-item">
            <strong>🔍 Root Cause Analysis:</strong> Always dig deeper into
            WHERE issues originate, not just WHAT the symptoms are
          </div>
          <div className="takeaway-item">
            <strong>👥 User-Centric:</strong> Different users (mobile vs
            desktop, 3G vs 5G) experience different issues
          </div>
          <div className="takeaway-item">
            <strong>⚙️ Architecture Matters:</strong> Design decisions
            (bundling, SSR, caching) affect performance more than premature
            optimization
          </div>
          <div className="takeaway-item">
            <strong>✅ Actionable Fixes:</strong> Always have code examples and
            measurable impact for each optimization
          </div>
          <div className="takeaway-item">
            <strong>🔄 Iterative Process:</strong> Performance optimization is
            continuous; monitor, identify, fix, repeat
          </div>
        </div>
      </section>
    </div>
  );
}
