/**
 * CENTRALIZED SEARCH INDEX
 * ========================
 * Complete searchable index for all app modules
 * Includes Lighthouse and all performance metrics
 */

export const SEARCH_INDEX = [
  // ============================================================================
  // REACT FUNDAMENTALS
  // ============================================================================
  {
    id: 'state-mgmt',
    title: 'State Management',
    route: '/state',
    section: 'React Basics',
    keywords: ['state', 'usestate', 'component', 'render'],
    description: 'Manage component state with hooks. Learn useState fundamentals.',
  },
  {
    id: 'effect-hook',
    title: 'Effect Hook',
    route: '/effects',
    section: 'React Basics',
    keywords: ['useeffect', 'side effects', 'lifecycle', 'dependencies'],
    description: 'Handle side effects with useEffect. Cleanup and dependencies.',
  },
  {
    id: 'context-api',
    title: 'Context API',
    route: '/context',
    section: 'React Basics',
    keywords: ['context', 'provider', 'consumer', 'global state', 'usecontext'],
    description: 'Global state management using React Context API.',
  },
  {
    id: 'reducer-hook',
    title: 'Reducer Hook',
    route: '/reducer',
    section: 'React Basics',
    keywords: ['usereducer', 'dispatch', 'actions', 'reducer function'],
    description: 'Complex state logic with useReducer hook.',
  },
  {
    id: 'callback-memo',
    title: 'Callback & Memo',
    route: '/callback-memo',
    section: 'React Optimization',
    keywords: ['usecallback', 'usememo', 'react.memo', 'performance', 'memoization'],
    description: 'Optimize performance with callbacks and memoization.',
  },
  {
    id: 'ref-hook',
    title: 'Ref Hook',
    route: '/ref',
    section: 'React Basics',
    keywords: ['useref', 'mutable reference', 'dom access', 'focus'],
    description: 'Access DOM directly and keep mutable values with useRef.',
  },
  {
    id: 'imperative-handle',
    title: 'Imperative Handle',
    route: '/imperative',
    section: 'React Advanced',
    keywords: ['useimperativehandle', 'forwardref', 'child methods'],
    description: 'Customize ref forwarding and expose methods to parent.',
  },
  {
    id: 'layout-effect',
    title: 'Layout Effect Hook',
    route: '/layout-effect',
    section: 'React Advanced',
    keywords: ['uselayouteffect', 'dom measurement', 'paint', 'layout'],
    description: 'Handle effects that must run before paint.',
  },
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    route: '/custom-hooks',
    section: 'React Advanced',
    keywords: ['custom hook', 'reusable logic', 'hook pattern', 'composition'],
    description: 'Create reusable hook logic for component composition.',
  },
  {
    id: 'advanced-patterns',
    title: 'Advanced Patterns',
    route: '/advanced-patterns',
    section: 'React Advanced',
    keywords: ['render props', 'hoc', 'composition', 'patterns'],
    description: 'Advanced component patterns and techniques.',
  },
  {
    id: 'rules-of-hooks',
    title: 'Rules of Hooks',
    route: '/rules-of-hooks',
    section: 'React Advanced',
    keywords: ['hook rules', 'dependencies', 'eslint', 'best practices'],
    description: 'Essential rules for using React hooks correctly.',
  },

  // ============================================================================
  // ADVANCED FEATURES & REACT 18
  // ============================================================================
  {
    id: 'advanced-features',
    title: 'Advanced Features',
    route: '/advanced-features',
    section: 'Advanced Topics',
    keywords: ['advanced', 'features', 'patterns', 'techniques'],
    description: 'Advanced React features and architectural patterns.',
  },
  {
    id: 'react18-features',
    title: 'React 18 Features',
    route: '/react18',
    section: 'Advanced Topics',
    keywords: ['react 18', 'concurrent', 'suspense', 'transitions', 'automatic batching'],
    description: 'New features in React 18: Suspense, transitions, concurrency.',
  },

  // ============================================================================
  // FORMS & VALIDATION
  // ============================================================================
  {
    id: 'form-handling',
    title: 'Form Handling',
    route: '/forms',
    section: 'Forms & Validation',
    keywords: ['forms', 'input', 'validation', 'form state', 'submithandler'],
    description: 'Handle forms in React: validation, submission, state.',
  },

  // ============================================================================
  // PERFORMANCE OPTIMIZATION
  // ============================================================================
  {
    id: 'perf-optimization',
    title: 'Performance Optimization',
    route: '/performance',
    section: 'Performance',
    keywords: ['performance', 'optimization', 'speed', 'rendering', 'profiling'],
    description: 'Optimize React app performance: code splitting, lazy loading.',
  },

  // ============================================================================
  // LIGHTHOUSE & WEB PERFORMANCE
  // ============================================================================
  {
    id: 'lighthouse-guide',
    title: 'Lighthouse Guide',
    route: '/lighthouse',
    section: 'Performance',
    keywords: ['lighthouse', 'performance audit', 'web vitals', 'google'],
    description: 'Complete guide to Google Lighthouse reports and optimization.',
  },

  // Lighthouse Child Sections - Each metric is individually searchable
  {
    id: 'lighthouse-fcp',
    title: 'First Contentful Paint (FCP)',
    route: '/lighthouse#fcp',
    section: 'Lighthouse Metrics',
    keywords: ['fcp', 'first contentful paint', 'perceived', 'loading'],
    description: 'What FCP measures and how to improve it.',
  },
  {
    id: 'lighthouse-lcp',
    title: 'Largest Contentful Paint (LCP)',
    route: '/lighthouse#lcp',
    section: 'Lighthouse Metrics',
    keywords: ['lcp', 'largest contentful paint', 'load', 'main content'],
    description: 'LCP metric: when main content finishes loading.',
  },
  {
    id: 'lighthouse-cls',
    title: 'Cumulative Layout Shift (CLS)',
    route: '/lighthouse#cls',
    section: 'Lighthouse Metrics',
    keywords: ['cls', 'cumulative layout shift', 'stability', 'visual shift'],
    description: 'Prevent unexpected layout shifts during load.',
  },
  {
    id: 'lighthouse-tbt',
    title: 'Total Blocking Time (TBT)',
    route: '/lighthouse#tbt',
    section: 'Lighthouse Metrics',
    keywords: ['tbt', 'total blocking time', 'responsiveness', 'main thread'],
    description: 'Responsiveness: reduce main thread blocking.',
  },
  {
    id: 'lighthouse-si',
    title: 'Speed Index (SI)',
    route: '/lighthouse#si',
    section: 'Lighthouse Metrics',
    keywords: ['si', 'speed index', 'perceived speed', 'visual completion'],
    description: 'Overall visual completion and perceived performance.',
  },

  // Lighthouse Categories
  {
    id: 'lighthouse-perf-score',
    title: 'Performance Score',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['lighthouse', 'performance score', 'audit results'],
    description: 'Understanding your Lighthouse performance score.',
  },
  {
    id: 'lighthouse-accessibility',
    title: 'Accessibility',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['accessibility', 'a11y', 'wcag', 'screen reader'],
    description: 'Accessibility audit and improvements.',
  },
  {
    id: 'lighthouse-best-practices',
    title: 'Best Practices',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['best practices', 'standards', 'security', 'https'],
    description: 'Web standards and best practices.',
  },
  {
    id: 'lighthouse-seo',
    title: 'SEO',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['seo', 'search engine', 'meta tags', 'mobile friendly'],
    description: 'SEO optimization and search engine compatibility.',
  },
  {
    id: 'lighthouse-pwa',
    title: 'PWA',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['pwa', 'progressive web app', 'offline', 'installable'],
    description: 'Progressive Web App features.',
  },

  // Lighthouse Tips & Strategies
  {
    id: 'lighthouse-optimization-playbook',
    title: 'Optimization Playbook',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['optimization', 'code examples', 'fixes', 'improvements'],
    description: 'Before/after code examples for common performance issues.',
  },
  {
    id: 'lighthouse-architecture',
    title: 'Architecture Insights',
    route: '/lighthouse',
    section: 'Lighthouse',
    keywords: ['architecture', 'bundling', 'caching', 'cdn', 'ssr'],
    description: 'How architecture decisions affect performance.',
  },

  // ============================================================================
  // ENTERPRISE ARCHITECTURE
  // ============================================================================
  {
    id: 'enterprise-arch',
    title: 'Enterprise Architecture',
    route: '/enterprise-arch',
    section: 'Enterprise',
    keywords: ['architecture', 'scalable', 'enterprise', 'patterns'],
    description: 'Enterprise-level application architecture.',
  },

  // ============================================================================
  // STATE MANAGEMENT (Advanced)
  // ============================================================================
  {
    id: 'state-mgmt-advanced',
    title: 'State Management (Advanced)',
    route: '/state-mgmt-advanced',
    section: 'Enterprise',
    keywords: ['redux', 'mobx', 'recoil', 'zustand', 'state management'],
    description: 'Advanced state management solutions.',
  },

  // ============================================================================
  // SYSTEM DESIGN
  // ============================================================================
  {
    id: 'system-design',
    title: 'System Design',
    route: '/system-design',
    section: 'Enterprise',
    keywords: ['system design', 'architecture', 'scalability', 'components'],
    description: 'Design patterns and system architecture.',
  },

  // ============================================================================
  // TYPESCRIPT
  // ============================================================================
  {
    id: 'typescript-advanced',
    title: 'TypeScript Advanced',
    route: '/typescript-advanced',
    section: 'Languages',
    keywords: ['typescript', 'types', 'generics', 'interfaces', 'advanced'],
    description: 'Advanced TypeScript patterns and techniques.',
  },

  // ============================================================================
  // TESTING
  // ============================================================================
  {
    id: 'testing-strategies',
    title: 'Testing Strategies',
    route: '/testing',
    section: 'Quality',
    keywords: ['testing', 'unit tests', 'integration tests', 'jest', 'vitest'],
    description: 'Testing strategies and best practices.',
  },

  // ============================================================================
  // LEADERSHIP & SOFT SKILLS
  // ============================================================================
  {
    id: 'technical-leadership',
    title: 'Technical Leadership',
    route: '/leadership',
    section: 'Leadership',
    keywords: ['leadership', 'team', 'mentoring', 'decision making'],
    description: 'Technical leadership and team management.',
  },
  {
    id: 'communication',
    title: 'Cross-Team Communication',
    route: '/communication',
    section: 'Leadership',
    keywords: ['communication', 'collaboration', 'documentation', 'clarity'],
    description: 'Effective communication across teams.',
  },

  // ============================================================================
  // SECURITY & RELIABILITY
  // ============================================================================
  {
    id: 'security-design',
    title: 'Security & Secure Design',
    route: '/security',
    section: 'Quality',
    keywords: ['security', 'xss', 'csrf', 'authentication', 'encryption'],
    description: 'Security best practices and threat prevention.',
  },
  {
    id: 'observability',
    title: 'Observability & Production',
    route: '/observability',
    section: 'Quality',
    keywords: ['observability', 'monitoring', 'logging', 'performance monitoring'],
    description: 'Monitor and debug production applications.',
  },

  // ============================================================================
  // BUSINESS & STRATEGY
  // ============================================================================
  {
    id: 'business-acumen',
    title: 'Business Acumen & Strategy',
    route: '/business',
    section: 'Strategy',
    keywords: ['business', 'strategy', 'roi', 'metrics', 'goals'],
    description: 'Understanding business impact of technical decisions.',
  },

  // ============================================================================
  // PROBLEM SOLVING
  // ============================================================================
  {
    id: 'problem-solving',
    title: 'Problem Solving & Critical Thinking',
    route: '/problem-solving',
    section: 'Skills',
    keywords: ['problem solving', 'debugging', 'critical thinking', 'analysis'],
    description: 'Advanced problem-solving techniques.',
  },

  // ============================================================================
  // TECHNICAL DEBT & REFACTORING
  // ============================================================================
  {
    id: 'refactoring',
    title: 'Refactoring & Tech Debt',
    route: '/refactoring',
    section: 'Skills',
    keywords: ['refactoring', 'tech debt', 'code quality', 'cleanup'],
    description: 'Managing technical debt and code refactoring.',
  },

  // ============================================================================
  // ASYNC & CONCURRENCY
  // ============================================================================
  {
    id: 'async-concurrency',
    title: 'Advanced Async & Concurrency',
    route: '/async-concurrency',
    section: 'Advanced Topics',
    keywords: [
      'async',
      'await',
      'promises',
      'concurrency',
      'parallelism',
      'workers',
    ],
    description: 'Async patterns and concurrent programming.',
  },

  // ============================================================================
  // SCALABLE ARCHITECTURE
  // ============================================================================
  {
    id: 'scalable-architecture',
    title: 'Scalable Frontend Architecture',
    route: '/scalable-arch',
    section: 'Enterprise',
    keywords: ['scalable', 'architecture', 'frontend', 'growth', 'patterns'],
    description: 'Building scalable frontend systems.',
  },
];

export default SEARCH_INDEX;
