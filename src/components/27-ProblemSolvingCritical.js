/*
 * ============================================================================
 * PROBLEM-SOLVING & CRITICAL THINKING
 * ============================================================================
 * 
 * Component Purpose:
 * Develop frameworks for solving complex, ambiguous problems.
 * Make sound technical judgments with incomplete information.
 * 
 * Topics Covered:
 * 1. Problem Analysis Frameworks
 * 2. Root Cause Analysis
 * 3. Systematic Decision-Making
 * 4. Managing Uncertainty
 * 5. Learning from Failures
 * ============================================================================
 */

import React, { useState } from 'react';

function ProblemSolvingCriticalThinkingExample() {
  const [activeSection, setActiveSection] = useState('framework');

  return (
    <div className="hook-section">
      <h2>Problem-Solving & Critical Thinking</h2>

      <div className="hook-subsection">
        <h3>Frameworks for Complex Problems</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('framework')} className={`section-button ${activeSection === 'framework' ? 'active' : ''}`}>Frameworks</button>
          <button onClick={() => setActiveSection('rca')} className={`section-button ${activeSection === 'rca' ? 'active' : ''}`}>Root Cause</button>
          <button onClick={() => setActiveSection('decision')} className={`section-button ${activeSection === 'decision' ? 'active' : ''}`}>Decision Making</button>
          <button onClick={() => setActiveSection('learning')} className={`section-button ${activeSection === 'learning' ? 'active' : ''}`}>Learning</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'framework' && (
            <div>
              <h4>Problem Analysis Frameworks</h4>
              
              <div className="explanation-box">
                <h5>SODA Framework (Understanding the Problem)</h5>
                <code className="code-block">
{`SYMPTOMS
├── What's observable?
├── Which metrics are off?
├── What patterns do we see?
└── Example: "API latency p99 increased from 50ms to 500ms"

OBSERVED DATA
├── When did this start?
├── How many users affected?
├── Is it consistent or intermittent?
├── What changed recently?
└── Example: "Started after deployment of cache invalidation logic"

DIAGNOSIS HYPOTHESES
├── What could cause this? (multiple theories)
├── Which are most likely?
├── Any common factors?
└── Example: "Cache misses? DB overload? Network issue?"

ACTION (experiment)
├── Test hypothesis 1: Enable debug logging
├── Test hypothesis 2: Check DB connection pool
├── Test hypothesis 3: Measure cache hit rate
└── Gather data to narrow possibilities`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>The 5 Whys (Simple RCA)</h5>
                <code className="code-block">
{`Problem: Checkout process is slow

Why 1: Frontend takes 2 seconds to render
Why 2: JavaScript bundle is loading slowly
Why 3: We're not code splitting
Why 4: We loaded all features in one bundle
Why 5: We prioritized speed of development over user speed

ROOT CAUSE: Prioritization issue, not technical

Solution: Implement code splitting + lazy loading
Prevention: Monitor bundle size metrics in CI`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Design Thinking (Ambiguous Problems)</h5>
                <code className="code-block">
{`EMPATHIZE
├── Understand user pain points
├── Interview affected users/teams
└── Don't assume you know the problem

DEFINE
├── Reframe problem clearly
├── Root cause, not symptoms
└── "How might we..." question

IDEATE
├── Brainstorm without judgment
├── Quantity over quality
├── Build on others' ideas

PROTOTYPE
├── Create simple, testable version
├── Not production-ready
├── Learn quickly

TEST
├── Get feedback
├── Iterate based on learning
└── Repeat


Example:
Problem: "Search is slow"
After empathy: "Users can't find products quickly, abandon search"
Root cause: "Relevance ranking outdated, filters ineffective"
Ideate: Improved ranking, auto-complete, filters
Prototype: Mock-up with new ranking
Test: A/B test, measure engagement`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'rca' && (
            <div>
              <h4>Root Cause Analysis (RCA)</h4>
              
              <div className="explanation-box">
                <h5>Fishbone Diagram (Cause & Effect)</h5>
                <code className="code-block">
{`Incident: Data corruption in production

PEOPLE
├── Junior dev didn't understand schema
└── Onboarding process missing validation

PROCESS
├── No code review for migrations
├── No staging environment test
└── Deployment without dry-run

TECHNOLOGY
├── No database constraints
├── No rollback mechanism
└── Migrations not reversible

ENVIRONMENT
├── Prod access too permissive
└── No audit logging

Root Causes (often multiple):
- Lack of safeguards (tech)
- Incomplete onboarding (people)
- Missing process steps (process)`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Distinguishing Symptoms from Causes</h5>
                <code className="code-block">
{`SYMPTOM: "We're shipping bugs"
├── This is what we observe

IMMEDIATE CAUSE: "Code review process is slow"
├── Why it happens, not deep enough

ROOT CAUSE: "Engineers overloaded, not enough capacity for reviews"
├── Why that happens

SYSTEMIC CAUSE: "We grew 2x but team grew 20%"
├── Organizational issue

Fix Symptom: Change code review tool (doesn't work)
Fix Immediate Cause: Hire reviewers (temporary, more growth= more bugs)
Fix Root Cause: Change review process, automation, standards
Fix Systemic: Hiring plan, team structure`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Blameless Root Cause Analysis</h5>
                <ul>
                  <li><strong>Ask "Why" not "Who":</strong> Focus on systems, not people</li>
                  <li><strong>Assume Good Intent:</strong> People do their best with info they have</li>
                  <li><strong>Look for Patterns:</strong> If possible, "how did system allow this?"</li>
                  <li><strong>Preventive Focus:</strong> How do we prevent this class of error?</li>
                  <li><strong>Action Items:</strong> Concrete steps to improve system</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'decision' && (
            <div>
              <h4>Decision-Making Under Uncertainty</h4>
              
              <div className="explanation-box">
                <h5>Decision Quality vs Outcome</h5>
                <code className="code-block">
{`Good decision + Good luck = Success (celebrate)
Good decision + Bad luck = Failure (learn, not blame)
Bad decision + Good luck = Success (risky, may happen again)
Bad decision + Bad luck = Disaster (learn hard lessons)

Staff engineers judge DECISION QUALITY, not outcomes.
"Great choice, unfortunately market moved"
"Okay choice, would make same with same info"
"Poor choice, ignored clear signals"

Key: Make decisions reversible when possible.
Reversible: Try approach for 2 weeks, switch if needed
Irreversible: Chose strategic direction, can't undo`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Probabilistic Thinking</h5>
                <code className="code-block">
{`Instead of: "Will this work?"
Ask: "What's probability this works?"

Estimate 70% chance caching helps
30% chance it doesn't/causes issues

If 70% successful: Expected value positive
Action: Try it (reversible), measure

Strategy: Many small bets (70% confidence each)
Vs: One big bet (95% confidence or bust)

Portfolio thinking:
├── 60% high-confidence (safe bets)
├── 30% medium-confidence (calculated risks)
├── 10% low-confidence (experiments, learn fast)`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Managing Uncertainty</h5>
                <ul>
                  <li><strong>Reduce Uncertainty:</strong> Light research, prototypes, expert input</li>
                  <li><strong>Accept Uncertainty:</strong> Some things unknowable upfront</li>
                  <li><strong>Decide with Uncertainty:</strong> Use probabilities, not certainty</li>
                  <li><strong>Revisit Decisions:</strong> New info → reconsider</li>
                  <li><strong>Bounded Exploration:</strong> Time-box research, decide despite unknowns</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'learning' && (
            <div>
              <h4>Learning from Failures</h4>
              
              <div className="explanation-box">
                <h5>Types of Failures</h5>
                <code className="code-block">
{`INTELLIGENT FAILURE (learn, celebrate)
├── Tested hypothesis
├── Learned from exploration
├── Could have been success
└── Example: "A/B test showed feature wasn't wanted"

MISTAKE (learn, improve process)
├── Didn't follow known best practices
├── Skipped important step
├── Known risk realized
└── Example: "Didn't test on mobile, but should have"

RECKLESS FAILURE (change behavior)
├── Ignored clear warnings
├── Cut corners despite risk
├── Knowingly chose unsafe path
└── Action required: Address why

SYSTEMIC FAILURE (improve systems)
├── System allowed preventable failure
├── No safeguards in place
├── Multiple people couldn't catch it
└── Example: "No DB constraints allowed bad data"`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>After-Action Review (AAR)</h5>
                <code className="code-block">
{`4 Simple Questions:

1. What did we expect to happen?
   → Baseline for what we planned

2. What actually happened?
   → Facts, not emotions

3. Why is there a difference?
   → Analysis, not blame

4. What will we do differently?
   → Specific, actionable changes

Keep AAR short (30 mins), immediate (don't wait weeks)
Share learnings widely (others learn too)
Track action items (close the loop)`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Building Error Tolerance Culture</h5>
                <ul>
                  <li>Small mistakes caught early are learning opportunities</li>
                  <li>Large mistakes prevented by catching early</li>
                  <li>System that prevents all mistakes also prevents innovation</li>
                  <li>Team that learns from failures improves fastest</li>
                  <li>Publish learnings: Internal blog posts, lunch-and-learns</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Cognitive Biases to Watch For</h3>
        <div className="explanation-box">
          <ul>
            <li><strong>Confirmation Bias:</strong> Only seeking info that confirms our belief</li>
            <li><strong>Availability Heuristic:</strong> Overweighting recent dramatic failures</li>
            <li><strong>Sunk Cost Fallacy:</strong> "We've invested so much, can't change course"</li>
            <li><strong>Groupthink:</strong> Assuming consensus = it's correct</li>
            <li><strong>Analysis Paralysis:</strong> Too much research, never deciding</li>
            <li><strong>Dunning-Kruger:</strong> Overconfidence in unfamiliar domains</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemSolvingCriticalThinkingExample;
