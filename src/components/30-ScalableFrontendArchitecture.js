/*
 * ============================================================================
 * SCALABLE FRONTEND ARCHITECTURE
 * ============================================================================
 * 
 * Component Purpose:
 * Master large-scale frontend architecture patterns for apps with
 * hundreds of components, millions of users, and distributed teams.
 * 
 * Topics Covered:
 * 1. Micro Frontends & Module Federation
 * 2. Component Library Design
 * 3. Monorepo Strategies
 * 4. Dynamic Module Loading
 * 5. Feature Flags & Rollout
 * ============================================================================
 */

import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

function ScalableFrontendArchitectureExample() {
  const [activeSection, setActiveSection] = useState('microfrontend');

  return (
    <div className="hook-section">
      <h2>Scalable Frontend Architecture</h2>

      <div className="hook-subsection">
        <h3>Architecture for Massive Scale</h3>
        <div className="button-group">
          <button 
            onClick={() => setActiveSection('microfrontend')}
            className={`section-button ${activeSection === 'microfrontend' ? 'active' : ''}`}
          >
            Micro Frontends
          </button>
          <button 
            onClick={() => setActiveSection('components')}
            className={`section-button ${activeSection === 'components' ? 'active' : ''}`}
          >
            Components
          </button>
          <button 
            onClick={() => setActiveSection('monorepo')}
            className={`section-button ${activeSection === 'monorepo' ? 'active' : ''}`}
          >
            Monorepo
          </button>
          <button 
            onClick={() => setActiveSection('features')}
            className={`section-button ${activeSection === 'features' ? 'active' : ''}`}
          >
            Feature Flags
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'microfrontend' && (
            <div>
              <h4>Micro Frontends & Module Federation</h4>
              
              <div className="explanation-box">
                <h5>When to Use Micro Frontends</h5>
                <CodeBlock>{`❌ DON'T use if:
  - Single product, small team
  - Frequent cross-team collaboration on same features
  - Performance critical (network overhead)

✅ DO use if:
  - Multiple teams, different roadmaps
  - Independent deployment cycles needed
  - Team ownership of sections
  - Different tech stack sections
  - Massive codebase (10k+ components)`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Module Federation Architecture</h5>
                <CodeBlock language="javascript">{`// webpack.config.js (Host App)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        '@checkout': 'checkout@http://localhost:3001/remoteEntry.js',
        '@payments': 'payments@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.2' },
        'react-dom': { singleton: true }
      }
    })
  ]
};

// In component
const CheckoutModule = lazy(() => import('@checkout/Checkout'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutModule />
    </Suspense>
  );
}

Benefits:
✓ Independent deployment
✓ Team autonomy
✓ Version flexibility
✓ Dynamic loading

Challenges:
✗ Shared dependency management
✗ Debugging across boundaries
✗ Testing complexity
✗ Network latency`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Fallback Strategies</h5>
                <CodeBlock language="javascript">{`// When remote module fails to load
const CheckoutModule = lazy(() =>
  import('@checkout/Checkout')
    .catch(error => {
      console.error('Checkout failed:', error);
      return { default: FallbackCheckout };
    })
);

// Fallback component uses cached or simplified flow
function FallbackCheckout() {
  return (
    <div>
      <p>Checkout service temporarily unavailable</p>
      <p>Redirecting to legacy checkout...</p>
      <iframe src="https://legacy.example.com/checkout" />
    </div>
  );
}`}</CodeBlock>
              </div>
            </div>
          )}

          {activeSection === 'components' && (
            <div>
              <h4>Component Library at Scale</h4>
              
              <div className="explanation-box">
                <h5>Component Library Structure</h5>
                <CodeBlock>{`component-library/
├── package.json
├── tsconfig.json
├── src/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.module.css
│   │   └── index.ts (export)
│   ├── Input/
│   ├── Modal/
│   └── index.ts (barrel export)
├── scripts/
│   ├── build.js
│   ├── generate-docs.js
│   └── publish.js
├── .storybook/ (Storybook config)
└── README.md


Key Principles:
- Each component has own folder
- Components are independent
- Versioning & changelog
- Storybook for documentation
- Published to npm registry`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Component Versioning</h5>
                <CodeBlock>{`SEMANTIC VERSIONING: MAJOR.MINOR.PATCH

PATCH (1.0.1)
├── Bug fixes only
├── No new features
├── No breaking changes
└── Auto-upgrade safe

MINOR (1.1.0)
├── New features added
├── Backwards compatible
├── No breaking changes
└── Safe to upgrade

MAJOR (2.0.0)
├── Breaking changes
├── Requires developer action
├── Old version stops working
└── May require rewrite

Strategy:  Apps pin to MINOR:
"@ui/components": "^1.2.0" = 1.2.x allowed, but not 2.0.0`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Evolving Components</h5>
                <ul>
                  <li><strong>Deprecation Warnings:</strong> Warn before removing</li>
                  <li><strong>Migration Guides:</strong> Document how to upgrade</li>
                  <li><strong>Feature Flags in Components:</strong> New behavior behind flag</li>
                  <li><strong>Codemods:</strong> Automated refactoring for API changes</li>
                  <li><strong>Multiple Versions in Parallel:</strong> v1 and v2 coexist while migrating</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'monorepo' && (
            <div>
              <h4>Monorepo Strategies</h4>
              
              <div className="explanation-box">
                <h5>Monorepo vs Polyrepo</h5>
                <CodeBlock>{`MONOREPO (single repo, multiple packages)
Pros:
✓ Atomic commits across packages
✓ Easier refactoring
✓ Code sharing without npm
✓ Consistent tooling

Cons:
✗ Larger disk size
✗ Slower clone/CI
✗ Requires more structure
✗ All teams see all code

─────────────────────────────────

POLYREPO (separate repos)
Pros:
✓ Independent versioning
✓ Smaller, faster repos
✓ Clear boundaries
✓ Easier permissions

Cons:
✗ Breaking changes hard to coordinate
✗ Duplicate tooling setup
✗ Refactoring across repos painful
✗ Code duplication risk`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Monorepo Tools & Structure</h5>
                <CodeBlock>{`Using Nx or Turborepo:

root/
├── packages/
│   ├── ui-components/
│   ├── api-client/
│   ├── state-management/
│   └── utils/
├── apps/
│   ├── main-app/
│   ├── admin-panel/
│   └── mobile-web/
├── nx.json (or turbo.json)
├── package.json
└── tsconfig.base.json

Benefits:
- Define dependencies between packages
- Build only affected packages
- Run tests in parallel
- Shared linting/formatting config
- Dependency graph visualization`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Managing Dependencies in Monorepo</h5>
                <CodeBlock language="json">{`// package.json
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}

// apps/main-app/package.json
{
  "dependencies": {
    "@monorepo/ui-components": "workspace:*",
    "@monorepo/api-client": "workspace:*"
  }
}

"workspace:*" = use local version, not npm
Benefits:
- Versions always match
- Fast local development
- Published version vs dev version clear`}</CodeBlock>
              </div>
            </div>
          )}

          {activeSection === 'features' && (
            <div>
              <h4>Feature Flags & Gradual Rollout</h4>
              
              <div className="explanation-box">
                <h5>Feature Flag Strategies</h5>
                <CodeBlock>{`// Different types of flags

RELEASE FLAGS (temporary)
├── Decoupling deploy from release
├── Deploy code, flag off by default
├── Enable gradually (5% → 25% → 100%)
└── Removed after full rollout

PERMISSION FLAGS
├── Enable features by permission
├── Admin features, beta users
├── Tied to user attributes
└── Long-lived

EXPERIMENT FLAGS
├── A/B testing
├── Measure impact
├── Rolled back if no improvement
└── Temporary (1-4 weeks)`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Implementation Pattern</h5>
                <CodeBlock language="javascript">{`// Feature flag service
const flagService = {
  isEnabled: (flagName, context = {}) => {
    const flag = FLAGS[flagName];
    if (!flag) return false;
    
    if (flag.type === 'release') {
      // Percentage rollout
      return hash(context.userId) % 100 < flag.rolloutPercent;
    }
    
    if (flag.type === 'permission') {
      // Check user permissions
      return context.permissions.includes(flag.requiredPermission);
    }
    
    if (flag.type === 'experiment') {
      // Check cohort assignment
      return context.experimentCohort === flag.treatmentCohort;
    }
    
    return false;
  }
};

// Usage
if (flagService.isEnabled('new_checkout', { userId })) {
  return <NewCheckout />;
} else {
  return <LegacyCheckout />;
}

// Database
FLAGS = {
  new_checkout: {
    type: 'release',
    rolloutPercent: 10,
    createdAt: '2024-01-01'
  }
}`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Gradual Rollout Process</h5>
                <CodeBlock>{`Day 1: Deploy new code
├── Feature flag OFF (0%)
├── No impact to users
└── Monitor infrastructure

Day 2-3: Internal testing
├── Enable for internal team (5%)
├── Find obvious bugs
└── Fix as needed

Day 4-5: Early adopters
├── Enable for 10% of users
├── Monitor error rate, latency
├── Check user feedback

Day 6-7: Half rollout
├── Enable for 50% of users
├── A/B test vs old version
├── Monitor conversion metrics

Day 8: Full rollout
├── Enable for 100% of users
├── Keep monitoring
└── Remove old code after 2 weeks`}</CodeBlock>
              </div>

              <div className="explanation-box">
                <h5>Kill Switch Pattern</h5>
                <ul>
                  <li><strong>Always have off switch:</strong> Can disable instantly</li>
                  <li><strong>No restart needed:</strong> Flag check on each request</li>
                  <li><strong>Cached safely:</strong> Periodic refresh (few minutes)</li>
                  <li><strong>Monitoring:</strong> Alert if error rate spikes</li>
                  <li><strong>Dashboard:</strong> Enable/disable without deploy</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Architectural Principles for Scale</h3>
        <div className="explanation-box">
          <ul>
            <li><strong>Independent Deployment:</strong> Teams deploy separately</li>
            <li><strong>Clear Boundaries:</strong> APIs between modules, not shared state</li>
            <li><strong>Observability First:</strong> Understand system health</li>
            <li><strong>Graceful Degradation:</strong> System works with parts down</li>
            <li><strong>Performance Conscious:</strong> Monitor bundle size, load time</li>
            <li><strong>Versioning Strategy:</strong> Clear upgrade paths</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ScalableFrontendArchitectureExample;
