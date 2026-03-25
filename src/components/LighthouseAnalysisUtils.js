/**
 * LIGHTHOUSE ANALYSIS UTILITIES
 * ==============================
 * Helper functions for parsing, analyzing, and optimization suggestions based on Lighthouse data
 * Real-world utilities a developer would use in production
 */

// ============================================================================
// 1. LIGHTHOUSE DATA PARSER
// ============================================================================

/**
 * Parse raw Lighthouse JSON report and extract key metrics
 * @param {Object} lighthouseReport - Raw Lighthouse JSON report
 * @returns {Object} Parsed metrics with scores and thresholds
 */
export function parseLighthouseReport(lighthouseReport) {
  const { categories, audits } = lighthouseReport;

  return {
    scores: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
      pwa: Math.round(categories.pwa.score * 100),
    },
    metrics: {
      fcp: audits['first-contentful-paint']?.numericValue || 0,
      lcp: audits['largest-contentful-paint']?.numericValue || 0,
      cls: audits['cumulative-layout-shift']?.numericValue || 0,
      tbt: audits['total-blocking-time']?.numericValue || 0,
      si: audits['speed-index']?.numericValue || 0,
    },
    audits: audits,
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// 2. METRIC THRESHOLD CHECKER
// ============================================================================

const METRIC_THRESHOLDS = {
  fcp: { good: 1800, poor: 3000 },
  lcp: { good: 2500, poor: 4000 },
  cls: { good: 0.1, poor: 0.25 },
  tbt: { good: 300, poor: 600 },
  si: { good: 3800, poor: 5800 },
};

const SCORE_THRESHOLDS = {
  good: 90,
  needs_improvement: 50,
  poor: 0,
};

/**
 * Determine metric status (good/average/poor)
 * @param {string} metricName - Name of metric (fcp, lcp, cls, etc)
 * @param {number} value - Actual value
 * @returns {Object} Status and color coding
 */
export function getMetricStatus(metricName, value) {
  const thresholds = METRIC_THRESHOLDS[metricName];
  if (!thresholds) return { status: 'unknown', color: '#gray' };

  if (value <= thresholds.good) {
    return { status: 'good', color: '#0cce6b', label: '✓' };
  } else if (value > thresholds.good && value < thresholds.poor) {
    return { status: 'average', color: '#ffa400', label: '⚠' };
  } else {
    return { status: 'poor', color: '#ff4e42', label: '✗' };
  }
}

/**
 * Get score interpretation
 * @param {number} score - Score 0-100
 * @returns {Object} Score interpretation
 */
export function getScoreInterpretation(score) {
  if (score >= SCORE_THRESHOLDS.good) {
    return {
      level: 'excellent',
      color: '#0cce6b',
      message: '✓ Excellent - This is good!',
      actionItems: 0,
    };
  } else if (score >= SCORE_THRESHOLDS.needs_improvement) {
    return {
      level: 'needs_improvement',
      color: '#ffa400',
      message: '⚠ Needs improvement. Work on the issues below.',
      actionItems: 3,
    };
  } else {
    return {
      level: 'poor',
      color: '#ff4e42',
      message: '✗ Poor - Take action immediately.',
      actionItems: 5,
    };
  }
}

// ============================================================================
// 3. ISSUE PRIORITIZATION ENGINE
// ============================================================================

/**
 * Extract and categorize issues from Lighthouse report
 * @param {Object} report - Parsed Lighthouse report
 * @returns {Array} Issues sorted by priority and impact
 */
export function extractAndPrioritizeIssues(report) {
  const { audits } = report;

  const criticalAudits = [
    'unused-javascript',
    'largest-contentful-paint',
    'first-contentful-paint',
    'cumulative-layout-shift',
    'total-blocking-time',
    'render-blocking-resources',
    'unused-css',
    'images-responsive',
    'image-aspect-ratio',
  ];

  const issues = [];

  Object.entries(audits).forEach(([auditId, audit]) => {
    if (audit.score === 1) return; // Passed audits

    const severity = criticalAudits.includes(auditId) ? 'critical' : 'moderate';
    const impact = calculateAuditImpact(audit);

    issues.push({
      id: auditId,
      title: audit.title,
      description: audit.description,
      severity,
      impact,
      details: audit.details,
      score: audit.score,
    });
  });

  // Sort by severity then impact
  return issues.sort((a, b) => {
    if (a.severity !== b.severity) {
      return a.severity === 'critical' ? -1 : 1;
    }
    return b.impact - a.impact;
  });
}

/**
 * Calculate impact score for an audit
 * Range: 0-100 (arbitrary but relative)
 */
function calculateAuditImpact(audit) {
  // Higher weightings for metrics that affect Core Web Vitals
  const coreWebVitalWeights = {
    'largest-contentful-paint': 25,
    'cumulative-layout-shift': 25,
    'total-blocking-time': 20,
    'first-contentful-paint': 20,
    'speed-index': 15,
  };

  const weight = coreWebVitalWeights[audit.id] || 5;
  return (1 - audit.score) * weight;
}

// ============================================================================
// 4. PERFORMANCE ESTIMATION
// ============================================================================

/**
 * Estimate performance improvements from fixing issues
 * @param {Array} issues - List of issues
 * @returns {Object} Before/after estimates
 */
export function estimatePerformanceGains(issues) {
  let totalSavingsMs = 0;
  let clsSavings = 0;

  const fixableIssues = issues.filter((issue) => {
    return [
      'unused-javascript',
      'render-blocking-resources',
      'unused-css',
      'images-responsive',
      'offscreen-images',
    ].includes(issue.id);
  });

  fixableIssues.forEach((issue) => {
    // Rough estimation based on issue type
    const estimations = {
      'unused-javascript': 150,
      'render-blocking-resources': 200,
      'unused-css': 50,
      'images-responsive': 300,
      'offscreen-images': 400,
    };

    totalSavingsMs += estimations[issue.id] || 50;
  });

  return {
    estimatedMs: totalSavingsMs,
    estimatedPercent: Math.round((totalSavingsMs / 3000) * 100),
    fixableIssues: fixableIssues.length,
    message: `Fixing these issues could save ~${totalSavingsMs}ms of load time`,
  };
}

// ============================================================================
// 5. ARCHITECTURE PATTERN SUGGESTIONS
// ============================================================================

/**
 * Suggest architectural improvements based on issues
 * @param {Array} issues - List of issues
 * @param {Object} metrics - Performance metrics
 * @returns {Array} Architecture suggestions
 */
export function getSuggestedArchitecturePatterns(issues, metrics) {
  const suggestions = [];

  // Check for bundling issues
  if (issues.some((i) => i.id === 'unused-javascript')) {
    suggestions.push({
      category: 'Bundling Strategy',
      suggestion: 'Implement route-based code splitting',
      impact: 'Reduces initial bundle by 40-50%',
      difficulty: 'medium',
      timeEstimate: '2-4 hours',
      code: `
// Use React.lazy for component splitting
const Page = React.lazy(() => import('./pages/Page'));
      `.trim(),
    });
  }

  // Check for image optimization
  if (issues.some((i) => i.id === 'images-responsive')) {
    suggestions.push({
      category: 'Image Optimization',
      suggestion: 'Implement WebP + responsive images',
      impact: 'Reduces image payload by 30-40%',
      difficulty: 'easy',
      timeEstimate: '1-2 hours',
      code: `
<picture>
  <source srcSet="image.webp" type="image/webp">
  <img src="image.jpg" alt="Image">
</picture>
      `.trim(),
    });
  }

  // Check for render-blocking
  if (issues.some((i) => i.id === 'render-blocking-resources')) {
    suggestions.push({
      category: 'Resource Loading',
      suggestion: 'Defer non-critical CSS/JS loading',
      impact: 'FCP improves by 20-30%',
      difficulty: 'easy',
      timeEstimate: '30 mins - 1 hour',
      code: `
// In HTML head
<link rel="preload" href="critical.css" as="style">
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<script async src="bundle.js"></script>
      `.trim(),
    });
  }

  // Check CLS issues
  if (metrics.cls > 0.25) {
    suggestions.push({
      category: 'Layout Stability',
      suggestion: 'Reserve space for images using aspect-ratio',
      impact: 'CLS reduces by 0.1-0.15',
      difficulty: 'easy',
      timeEstimate: '30 mins - 1 hour',
      code: `
<img 
  style={{
    aspectRatio: '16/9',
    width: '100%',
    height: 'auto'
  }}
  src="image.jpg" 
  alt="Image"
/>
      `.trim(),
    });
  }

  return suggestions;
}

// ============================================================================
// 6. COMPARATIVE ANALYSIS
// ============================================================================

/**
 * Compare two Lighthouse reports to track improvements
 * @param {Object} beforeReport - Previous report
 * @param {Object} afterReport - Current report
 * @returns {Object} Comparison analysis
 */
export function compareReports(beforeReport, afterReport) {
  const comparison = {
    scores: {},
    metrics: {},
    improvement: {},
    overallTrend: 'improved',
  };

  // Compare scores
  Object.keys(beforeReport.scores).forEach((category) => {
    const before = beforeReport.scores[category];
    const after = afterReport.scores[category];
    const change = after - before;

    comparison.scores[category] = {
      before,
      after,
      change,
      percentChange: ((change / before) * 100).toFixed(1),
    };

    if (change < 0) comparison.overallTrend = 'regression';
  });

  // Compare metrics
  Object.keys(beforeReport.metrics).forEach((metric) => {
    const before = beforeReport.metrics[metric];
    const after = afterReport.metrics[metric];
    const change = after - before;

    comparison.metrics[metric] = {
      before,
      after,
      change,
      percentChange: ((change / before) * 100).toFixed(1),
    };
  });

  return comparison;
}

// ============================================================================
// 7. PERFORMANCE BUDGETING
// ============================================================================

/**
 * Generate performance budget recommendations
 * @param {Object} report - Lighthouse report
 * @returns {Object} Performance budget
 */
export function generatePerformanceBudget(report) {
  const { metrics } = report;

  return {
    bundles: {
      js: '150KB', // Recommended JS bundle size
      css: '30KB', // Recommended CSS size
      total: '200KB',
      rationale:
        'Keeps initial load under 2MB on 3G networks for most users',
    },
    metrics: {
      fcp: '< 1.8s',
      lcp: '< 2.5s',
      cls: '< 0.1',
      tbt: '< 300ms',
      si: '< 3.8s',
    },
    images: {
      maxSize: '100KB per image',
      formats: 'Use WebP with JPEG fallback',
      minCompression:
        'Minimum 50% when compared to unoptimized original',
    },
    thirdParty: {
      maxScripts: 5,
      recommendedSize: '< 50KB total',
      loadMethod: 'Deferred or async',
    },
  };
}

// ============================================================================
// 8. RECOMMENDATIONS ENGINE
// ============================================================================

/**
 * Generate specific action items based on report
 * @param {Array} issues - List of issues
 * @param {Object} metrics - Performance metrics
 * @returns {Array} Prioritized action items
 */
export function generateActionItems(issues, metrics) {
  const actions = [];

  // Priority 1: Fix critical issues
  const critical = issues.filter((i) => i.severity === 'critical');
  if (critical.length > 0) {
    actions.push({
      priority: 1,
      timeframe: 'This week',
      items: critical.slice(0, 3).map((i) => ({
        action: i.title,
        detail: i.description,
        effort: 'high',
      })),
    });
  }

  // Priority 2: Improve Core Web Vitals
  if (metrics.lcp > 2500 || metrics.cls > 0.1 || metrics.tbt > 300) {
    actions.push({
      priority: 2,
      timeframe: 'Next 2 weeks',
      items: [
        {
          action: 'Optimize images and lazy load offscreen content',
          detail: 'Improves LCP by 500-1000ms',
          effort: 'medium',
        },
        {
          action: 'Code split heavy components',
          detail: 'Reduces TBT by deferring non-critical code',
          effort: 'medium',
        },
      ],
    });
  }

  // Priority 3: Polish remaining issues
  actions.push({
    priority: 3,
    timeframe: 'Next sprint',
    items: issues
      .filter((i) => i.severity === 'moderate')
      .slice(0, 3)
      .map((i) => ({
        action: i.title,
        detail: i.description,
        effort: 'low',
      })),
  });

  return actions;
}

// ============================================================================
// 9. EXPORT FOR REPORTING
// ============================================================================

/**
 * Generate markdown report of Lighthouse analysis
 * @param {Object} report - Parsed Lighthouse report
 * @param {Array} issues - List of issues
 * @returns {string} Markdown formatted report
 */
export function generateMarkdownReport(report, issues) {
  const { scores, metrics } = report;

  const markdown = `
# Lighthouse Performance Report

## Summary
Generated: ${report.timestamp}

### Scores
- **Performance:** ${scores.performance}/100
- **Accessibility:** ${scores.accessibility}/100
- **Best Practices:** ${scores.bestPractices}/100
- **SEO:** ${scores.seo}/100
- **PWA:** ${scores.pwa}/100

### Core Web Vitals
- **FCP:** ${metrics.fcp}ms
- **LCP:** ${metrics.lcp}ms
- **CLS:** ${metrics.cls}
- **TBT:** ${metrics.tbt}ms
- **SI:** ${metrics.si}ms

## Issues Found

### Critical (${issues.filter((i) => i.severity === 'critical').length})
${issues
  .filter((i) => i.severity === 'critical')
  .map((i) => `- ${i.title}: ${i.description}`)
  .join('\n')}

### Moderate (${issues.filter((i) => i.severity === 'moderate').length})
${issues
  .filter((i) => i.severity === 'moderate')
  .map((i) => `- ${i.title}: ${i.description}`)
  .join('\n')}

---
*Report generated automatically for performance monitoring*
  `.trim();

  return markdown;
}

// ============================================================================
// 10. REAL-TIME MONITORING
// ============================================================================

/**
 * Performance monitoring helper for tracking metrics over time
 */
export class PerformanceMonitor {
  constructor() {
    this.snapshots = [];
  }

  /**
   * Record a performance snapshot
   */
  record(report) {
    this.snapshots.push({
      timestamp: new Date(),
      report: report,
    });
  }

  /**
   * Get performance trend over time
   */
  getTrend() {
    if (this.snapshots.length < 2) {
      return { trend: 'insufficient_data', snapshots: this.snapshots.length };
    }

    const first = this.snapshots[0].report.scores.performance;
    const latest = this.snapshots[this.snapshots.length - 1].report.scores
      .performance;
    const trend = latest > first ? 'improving' : latest < first ? 'degrading' : 'stable';

    return {
      trend,
      startScore: first,
      currentScore: latest,
      improvement: latest - first,
      snapshots: this.snapshots.length,
    };
  }

  /**
   * Clear old snapshots
   */
  clearOlderThan(hours) {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    this.snapshots = this.snapshots.filter((s) => s.timestamp > cutoff);
  }
}

export default {
  parseLighthouseReport,
  getMetricStatus,
  getScoreInterpretation,
  extractAndPrioritizeIssues,
  estimatePerformanceGains,
  getSuggestedArchitecturePatterns,
  compareReports,
  generatePerformanceBudget,
  generateActionItems,
  generateMarkdownReport,
  PerformanceMonitor,
};
