/*
 * ============================================================================
 * REFACTORING & TECH DEBT MANAGEMENT
 * ============================================================================
 * 
 * Component Purpose:
 * Learn to identify, prioritize, and systematically address technical debt.
 * Modernize legacy systems while maintaining productivity.
 * 
 * Topics Covered:
 * 1. Identifying Tech Debt
 * 2. Prioritization of Debt
 * 3. Refactoring Strategies
 * 4. Incremental Modernization
 * 5. Measuring Technical Health
 * ============================================================================
 */

import React, { useState } from 'react';

function RefactoringTechDebtExample() {
  const [activeSection, setActiveSection] = useState('identify');

  return (
    <div className="hook-section">
      <h2>Refactoring & Tech Debt Management</h2>

      <div className="hook-subsection">
        <h3>Tech Debt is Real Debt</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('identify')} className={`section-button ${activeSection === 'identify' ? 'active' : ''}`}>Identify</button>
          <button onClick={() => setActiveSection('prioritize')} className={`section-button ${activeSection === 'prioritize' ? 'active' : ''}`}>Prioritize</button>
          <button onClick={() => setActiveSection('refactor')} className={`section-button ${activeSection === 'refactor' ? 'active' : ''}`}>Refactor</button>
          <button onClick={() => setActiveSection('metric')} className={`section-button ${activeSection === 'metric' ? 'active' : ''}`}>Metrics</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'identify' && (
            <div>
              <h4>Identifying Technical Debt</h4>
              
              <div className="explanation-box">
                <h5>Types of Tech Debt</h5>
                <code className="code-block">
{`INTENTIONAL DEBT (known trade-off)
├── Chose quick solution over perfect
├── Known workaround, plan to fix
├── Example: "Hardcoded config for launch, will parametrize"
└── Action: Document intent, owner, deadline

ACCIDENTAL DEBT (not noticed until later)
├── Patterns that worked small, don't scale
├── Legacy code nobody understands
├── Dependencies on old libraries
├── Example: Monolithic component, hard to test
└── Action: Discovered during code reviews

ENVIRONMENTAL DEBT (context changed)
├── Language/framework best practices evolved
├── New tools available
├── Team composition changed
├── Example: "Built with jQuery, now using React"
└── Action: Periodic assessment

STRUCTURAL DEBT (systemic issues)
├── Entangled dependencies
├── Unclear code organization
├── Weak abstraction boundaries
└── Action: Architectural refactoring`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Red Flags for Tech Debt</h5>
                <ul>
                  <li><strong>High Bug Rate:</strong> More bugs than expected suggests unstable code</li>
                  <li><strong>Slow Feature Velocity:</strong> Simple features take too long</li>
                  <li><strong>High Review Time:</strong> Changes take long to review (complex code)</li>
                  <li><strong>Broken Tests:</strong> Flaky tests = underlying instability</li>
                  <li><strong>Slow Tests:</strong> Test suite takes &gt; 5 minutes</li>
                  <li><strong>Frequent Incidents:</strong> Same type of bug recurring</li>
                  <li><strong>Low Confidence Deploys:</strong> Nervous about shipping changes</li>
                  <li><strong>High Onboarding Time:</strong> New engineers take months to be productive</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Creating Debt Inventory</h5>
                <code className="code-block">
{`Track in spreadsheet/issue tracker:

Component: Payment Module
Severity: 2 (medium)
Effort: 1 month
Impact: -2% velocity, +3 bugs/quarter
Owner: @jane
Deadline: Q3 2024
Status: Planned for Sprint 12

This makes debt VISIBLE
- Can prioritize against features
- Know resource impact
- See progress`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'prioritize' && (
            <div>
              <h4>Prioritizing Tech Debt</h4>
              
              <div className="explanation-box">
                <h5>Cost vs Benefit Analysis</h5>
                <code className="code-block">
{`BENEFIT (impact per year)
├── Velocity improvement: +x engineers worth productivity
├── Risk reduction: Fewer incidents
├── Hiring/retention: Easier to attract/keep engineers
├── Feature enablement: Unblocks new capabilities
└── Calculate in $$

COST (resource investment)
├── Engineer time: x months × $
├── Infrastructure: If needs new tools
├── Opportunity cost: Features not built
└── Total $$

URGENCY
├── When does this become critical?
├── Will it block hiring growth?
├── Security risk?
└── Business risk?

3x3 MATRIX:
High Impact, Low Cost → DO FIRST
High Impact, High Cost → PLAN ROADMAP
Low Impact, Low Cost → GROUP & BATCH
Low Impact, High Cost → AVOID`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>The 15% Rule</h5>
                <ul>
                  <li>Every sprint: 10-15% debt paydown</li>
                  <li>Prevents compound growth of debt</li>
                  <li>Keeps codebase from becoming legacy</li>
                  <li>Builds team morale (working on real problems)</li>
                  <li>Negotiation: "Will implement feature + refactor related code"</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Strategic Debt Payoff</h5>
                <code className="code-block">
{`YEAR 1: Quick wins & foundations
├── Test infrastructure (biggest enabler)
├── Logging/monitoring (visibility)
└── Dependency updates (security)

YEAR 2: Core stability
├── Module refactoring (payment, auth)
├── Database optimization
└── Performance improvements

YEAR 3: Platform improvements
├── Micro-frontends if applicable
├── Advanced architecture patterns
└── Developer productivity tools`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'refactor' && (
            <div>
              <h4>Safe Refactoring Strategies</h4>
              
              <div className="explanation-box">
                <h5>Strangler Fig Pattern (for legacy systems)</h5>
                <code className="code-block">
{`Replace old system piece-by-piece without disruption

Legacy System          New System
         ├── Feature A (old)
         │
Request →├── Feature B (new) - gradually route
         │
         └── Feature C (old)

Process:
1. New system runs alongside
2. Gradually route traffic (5% → 25% → 50%)
3. Monitor metrics carefully
4. Can roll back quickly if issues
5. Once 100% working, remove old code

Benefits:
✓ No big bang rewrite (risky)
✓ Continuous value delivery
✓ Easy rollback
✓ Team learns incrementally`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Safe Refactoring "Rules"</h5>
                <ul>
                  <li><strong>Refactor = No Logic Change:</strong> Only improve structure, not behavior</li>
                  <li><strong>Tests First:</strong> Must have tests passing before + after</li>
                  <li><strong>Small Steps:</strong> Many tiny changes, not one giant refactor</li>
                  <li><strong>Commit Often:</strong> Small commits easy to review + roll back</li>
                  <li><strong>Review Carefully:</strong> Ensure no logic sneaked in</li>
                  <li><strong>Deploy Frequently:</strong> Don't batch refactors (too risky)</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Feature Branches vs Trunk-Based</h5>
                <code className="code-block">
{`FEATURE BRANCH (for large refactors)
├── Create branch for refactoring
├── Work for 1-2 weeks
├── Massive merge conflict risk
├── Delayed communication of changes
└── Good for: Very isolated changes

TRUNK-BASED (preferred)
├── Commit to main every 1-2 days
├── Smaller increments
├── Better communication
├── Tests must pass before merge
└── Good for: Continuous refactoring

With trunk-based + feature flags:
- Deploy code that's not yet active
- Gradually enable new behavior
- Roll back instantly if needed
- Safer, faster feedback loop`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'metric' && (
            <div>
              <h4>Measuring Technical Health</h4>
              
              <div className="explanation-box">
                <h5>Code Metrics</h5>
                <ul>
                  <li><strong>Cyclomatic Complexity:</strong> How many paths through code? (lower = simpler)</li>
                  <li><strong>Test Coverage:</strong> % of code exercised by tests (aim for 80%+)</li>
                  <li><strong>Code Duplication:</strong> Repeated logic (target: &lt; 5%)</li>
                  <li><strong>Dependency Cycles:</strong> Components depend on each other (should be acyclic)</li>
                  <li><strong>Package Cohesion:</strong> Related code grouped (high = better)</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Team Metrics Correlating with Health</h5>
                <ul>
                  <li><strong>Lead Time for Changes:</strong> Time from code push to production (smaller = better)</li>
                  <li><strong>Deployment Frequency:</strong> How often do you deploy? (more = better, 1-3 per day)</li>
                  <li><strong>Change Failure Rate:</strong> % of deployments causing incidents (aim &lt; 5%)</li>
                  <li><strong>Time to Recovery:</strong> How fast from incident to fixed (faster = better)</li>
                  <li><strong>Code Review Time:</strong> How long until merged (faster = less blocking)</li>
                  <li><strong>On-Call Load:</strong> Incidents per engineer (lower = healthier)</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Anti-Patterns to Avoid</h5>
                <ul>
                  <li><strong>Chasing Perfect Metrics:</strong> 100% coverage ≠ good code (diminishing returns)</li>
                  <li><strong>Vanity Metrics:</strong> Lines of code, number of commits (ignore, not meaningful)</li>
                  <li><strong>Blame Culture:</strong> High failure rate shouldn't lead to blame</li>
                  <li><strong>Micromanagement via Metrics:</strong> Track trends, not individual performance</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Improving Over Time</h5>
                <code className="code-block">
{`Dashboard showing trends (not absolute):

Metric            Current    Goal      Trend
─────────────────────────────────────────────
Test Coverage     72%        80%       ↑ +2%
Deployment Freq   1/week     daily     ↑ +20%
Change Fail Rate  12%        &lt;5%     ↓ -3%
Lead Time         7 days     2 days    ↓ steady


What matters:
- Direction of trend (up/down/stable)
- Is it heading toward goal?
- Celebrate progress
- Identify blockers early`}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Tech Debt Philosophy</h3>
        <div className="explanation-box">
          <ul>
            <li>Tech debt is strategic tool, not failure (speeds up certain decisions)</li>
            <li>Acknowledge debt, don't hide it (transparency builds trust)</li>
            <li>Pay regularly (15% rule) to prevent compounding</li>
            <li>Sometimes better to rewrite than refactor (assess each situation)</li>
            <li>Shared ownership: Whole team responsible, not individual blame</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RefactoringTechDebtExample;
