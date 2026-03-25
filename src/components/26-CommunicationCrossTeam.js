/*
 * ============================================================================
 * COMMUNICATION & CROSS-FUNCTIONAL LEADERSHIP
 * ============================================================================
 * 
 * Component Purpose:
 * Master the communication skills required for technical leadership at scale.
 * Learn to influence across organizational silos and manage complex relationships.
 * 
 * Topics Covered:
 * 1. Technical Writing & RFCs
 * 2. Presenting to Different Audiences
 * 3. Negotiation & Persuasion
 * 4. Cross-team Collaboration
 * 5. Documentation Culture
 * ============================================================================
 */

import React, { useState } from 'react';

function CommunicationCrossTeamExample() {
  const [activeSection, setActiveSection] = useState('writing');

  return (
    <div className="hook-section">
      <h2>Communication & Cross-Functional Leadership</h2>

      <div className="hook-subsection">
        <h3>Staff Engineers are Communicators First</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('writing')} className={`section-button ${activeSection === 'writing' ? 'active' : ''}`}>Writing & RFCs</button>
          <button onClick={() => setActiveSection('presenting')} className={`section-button ${activeSection === 'presenting' ? 'active' : ''}`}>Presenting</button>
          <button onClick={() => setActiveSection('negotiation')} className={`section-button ${activeSection === 'negotiation' ? 'active' : ''}`}>Negotiation</button>
          <button onClick={() => setActiveSection('collab')} className={`section-button ${activeSection === 'collab' ? 'active' : ''}`}>Collaboration</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'writing' && (
            <div>
              <h4>Technical Writing & Design Documents</h4>
              
              <div className="explanation-box">
                <h5>The RFC (Request for Comments) Process</h5>
                <code className="code-block">
{`// RFC Structure (Google Docs → GitHub)

## TITLE: Clear, specific problem statement

## BACKGROUND
- What's the current state?
- What's the pain point?
- Examples of the problem
- Why now? (urgency?)

## PROPOSAL
- High-level design
- Key components
- Data flow diagrams
- API design (if relevant)
- Examples

## ALTERNATIVES CONSIDERED
- Option A: Trade-offs, pros/cons
- Option B: Trade-offs, pros/cons
- Why chosen option over others?

## RISKS & MITIGATIONS
- Technical risks: What could go wrong?
- Organizational risks: Resistance, skills gaps?
- Mitigation strategies

## SUCCESS CRITERIA
- How do we measure success?
- Metrics to monitor
- What would count as failure?`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Writing Principles</h5>
                <ul>
                  <li><strong>Clarity > Eloquence:</strong> Aim for clear over clever</li>
                  <li><strong>Active Voice:</strong> "We refactored" not "It was refactored"</li>
                  <li><strong>Headings & Structure:</strong> Skim first, read full second</li>
                  <li><strong>Visual Aids:</strong> Diagrams > walls of text</li>
                  <li><strong>Executive Summary:</strong> TLDR at top for busy readers</li>
                  <li><strong>Anticipate Questions:</strong> Address likely concerns</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Common Document Types</h5>
                <code className="code-block">
{`RFC (major decisions)
- Architecture changes
- Major refactors
- Tool/platform evaluations
- Process changes

DESIGN DOC (smaller scope)
- Feature specifications
- API design
- Database schema
- Component architecture

ADR (Architecture Decision Record)
- Short-term decisions
- Alternative considered
- Rationale
- Consequences

RUNBOOK (operational)
- How to deploy
- How to troubleshoot
- Disaster recovery
- On-call procedures`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'presenting' && (
            <div>
              <h4>Presenting to Different Audiences</h4>
              
              <div className="explanation-box">
                <h5>Tailoring Message by Audience</h5>
                <code className="code-block">
{`ENGINEERS (care about: how it works, trade-offs, code)
├── Start with problem
├── Show architecture diagrams
├── Discuss implementation details
├── Talk about testing strategy
├── Address performance implications
└── Open for technical debate

PRODUCT MANAGERS (care about: user impact, timeline, risks)
├── Start with user problem
├── How does this help users?
├── What's the timeline? Any blockers?
├── What are the risks?
├── How do we measure success?
└── When can we ship?

EXECUTIVES (care about: business impact, $, risk)
├── Start with business problem
├── What's the impact? Revenue? Retention?
├── How much does this cost?
├── What's the risk if we don't do this?
├── What's the risk if we do?
├── Decision needed: Yes/No/Maybe`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Presentation Structure</h5>
                <code className="code-block">
{`9 SLIDER DECK TEMPLATE

1. TITLE
   Problem statement, your recommendation

2. WHY NOW?
   Context, urgency, background

3. THE PROBLEM
   What's wrong today? (with data)

4. PROPOSED SOLUTION
   High-level approach

5. DESIGN/DETAILS
   How it works

6. EXAMPLES
   Real scenario, end-to-end walkthrough

7. RISKS & MITIGATIONS
   What could go wrong? How do we handle?

8. SUCCESS METRICS
   How do we know it worked?

9. NEXT STEPS
   Recommendations, timeline`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Presentation Tips</h5>
                <ul>
                  <li>Practice out loud (sounds different than reading)</li>
                  <li>Tell stories, not just data</li>
                  <li>Use the "rule of three" (three main points)</li>
                  <li>Pause for questions, don't rush</li>
                  <li>Anticipate objections, be prepared</li>
                  <li>Repeat key message multiple times</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'negotiation' && (
            <div>
              <h4>Negotiation & Persuasion</h4>
              
              <div className="explanation-box">
                <h5>Interest-Based Negotiation</h5>
                <code className="code-block">
{`Scenario: Backend team wants REST API, Frontend wants GraphQL

POSITIONAL (win/lose)
Backend: "We're doing REST."
Frontend: "No, we need GraphQL."
→ Conflict, resentment

INTEREST-BASED (win/win)
Discover interests:
├── Backend: Concerned about complexity, team expertise
├── Backend: Wants reusable, maintainable, low-overhead
├── Frontend: Wants specific data fields only
├── Frontend: Wants to avoid N+1 queries
├── Frontend: Wants fast development

Create solutions addressing interests:
├── REST with field selection (query params for attributes)
├── Backend builds facade that solves FE needs
├── Test both approaches with real workloads
├── Both teams less frustrated, better solution`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Persuasion Frameworks</h5>
                <ul>
                  <li><strong>WIIFM (What's In It For Me):</strong> Why should they care?</li>
                  <li><strong>Social Proof:</strong> "Other teams use this pattern successfully"</li>
                  <li><strong>Authority:</strong> Industry best practices, research</li>
                  <li><strong>Scarcity:</strong> "Limited time window to prevent..." (don't overuse)</li>
                  <li><strong>Reciprocity:</strong> Help others first, they help back</li>
                  <li><strong>Consistency:</strong> Connect to stated values & goals</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Handling Disagreement</h5>
                <code classroom="code-block">
{`// Healthy Debate Pattern

1. LISTEN FULLY
   "I hear you're concerned about X. Tell me more."
   
2. ACKNOWLEDGE THEIR POINT
   "That's a legitimate concern. X is real."
   
3. FIND COMMON GROUND
   "We both care about reliability and velocity."
   
4. PROPOSE EXPERIMENT
   "Let's try approach A for 2 weeks, measure X, decide."
   
5. COMMIT TO OUTCOME
   "Whatever we learn, we'll act on it."

→ Builds trust, reduces defensiveness
→ Decisions made by evidence, not hierarchy`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'collab' && (
            <div>
              <h4>Cross-Functional Collaboration</h4>
              
              <div className="explanation-box">
                <h5>Working Effectively with Product</h5>
                <ul>
                  <li><strong>Translate Requirements:</strong> "Needs low latency" → specific ms target</li>
                  <li><strong>Challenge Assumptions:</strong> Ask why, not just what</li>
                  <li><strong>Propose Alternatives:</strong> "Could we achieve goal with simpler approach?"</li>
                  <li><strong>Visibility:</strong> Regular syncs, share blockers early</li>
                  <li><strong>Celebrate Wins:</strong> Public acknowledgment of product wins</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Working Effectively with Design</h5>
                <ul>
                  <li>Request design early (don't start coding)</li>
                  <li>Provide performance constraints upfront</li>
                  <li>Design reviews: Provide technical feedback kindly</li>
                  <li>Implementation details: Share implementation suggestions, not demands</li>
                  <li>Iterate together: Visual mockups help clarify</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Cross-Team Meetings: Effective Facilitation</h5>
                <code className="code-block">
{`BEFORE MEETING
├── Clear agenda (2-3 topics max)
├── Pre-reads if complex
├── Right people invited (decision makers present)
└── Defined outcomes

DURING MEETING
├── Start on time (respect people's time)
├── Clarify: What are we deciding today?
├── Hear all sides before deciding
├── Disagree and commit (no passive-aggressive after)
└── Decisions + action items noted

AFTER MEETING
├── Send summary same day
├── Assign owners to action items
├── Follow up on commitments`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Managing Upward (Your Manager)</h5>
                <ul>
                  <li><strong>Be Proactive:</strong> Surface issues early, don't surprise them</li>
                  <li><strong>Provide Context:</strong> They may not know technical details</li>
                  <li><strong>Suggest Solutions:</strong> "Here's my recommendation..."</li>
                  <li><strong>Respect Their Time:</strong> Be concise, 1-on-1 time is precious</li>
                  <li><strong>Ask for Feedback:</strong> "How can I improve in X?"</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Documentation as Knowledge Transfer</h3>
        <div className="explanation-box">
          <ul>
            <li>Good documentation multiplies team capability (others can unblock themselves)</li>
            <li>Outdated docs are worse than no docs (confusing)</li>
            <li>Keep docs close to code (less likely to drift)</li>
            <li>Video walkthroughs for complex processes</li>
            <li>Encourage team to document, not just you</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommunicationCrossTeamExample;
