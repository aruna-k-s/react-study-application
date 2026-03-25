/*
 * ============================================================================
 * TECHNICAL LEADERSHIP & MENTORSHIP
 * ============================================================================
 * 
 * Component Purpose:
 * Develop skills for leading engineering teams, mentoring junior engineers,
 * and driving technical excellence at the organizational level.
 * 
 * Topics Covered:
 * 1. Building and Scaling Teams
 * 2. Mentoring and Career Development
 * 3. Decision-Making Frameworks
 * 4. Influencing Technical Direction
 * 5. Communication at Scale
 * ============================================================================
 */

import React, { useState } from 'react';

function TechnicalLeadershipExample() {
  const [activeSection, setActiveSection] = useState('teamBuilding');

  return (
    <div className="hook-section">
      <h2>Technical Leadership & Mentorship</h2>

      <div className="hook-subsection">
        <h3>Staff Engineer Leadership Principles</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveSection('teamBuilding')}
            className={`section-button ${activeSection === 'teamBuilding' ? 'active' : ''}`}
          >
            Team Building
          </button>
          <button
            onClick={() => setActiveSection('mentoring')}
            className={`section-button ${activeSection === 'mentoring' ? 'active' : ''}`}
          >
            Mentoring
          </button>
          <button
            onClick={() => setActiveSection('decisions')}
            className={`section-button ${activeSection === 'decisions' ? 'active' : ''}`}
          >
            Decisions
          </button>
          <button
            onClick={() => setActiveSection('influence')}
            className={`section-button ${activeSection === 'influence' ? 'active' : ''}`}
          >
            Influence
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'teamBuilding' && (
            <div>
              <h4>Building and Scaling Engineering Teams</h4>
              
              <div className="explanation-box">
                <h5>Core Principles</h5>
                <ul>
                  <li><strong>Hire for Potential & Culture Fit:</strong> Look for learning velocity, problem-solving approach, and alignment with team values</li>
                  <li><strong>Psychological Safety:</strong> Create environment where engineers can take risks and speak up without fear</li>
                  <li><strong>Clear Career Paths:</strong> Define expectations for each level (IC1→IC5, or equivalent)</li>
                  <li><strong>Delegation & Ownership:</strong> Give engineers autonomy over decisions within their domain</li>
                  <li><strong>Continuous Learning:</strong> Allocate time for growth, courses, conferences, and side projects</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Team Structure Patterns</h5>
                <code className="code-block">
{`// Feature-Based Team Organization
Teams:
├── Platform Infrastructure
│   └── APIs, databases, deployment, DevOps
├── Feature Team A
│   └── Full-stack ownership of feature area
├── Feature Team B
│   └── Full-stack ownership of feature area
└── Shared Services
    └── Authentication, payments, analytics

Benefits:
- Full ownership & accountability
- Reduced cross-team dependencies
- Faster iteration cycles
- Clear responsibility boundaries

Challenges:
- Duplicate effort across teams
- Coordination complexity
- Shared infrastructure management`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Building High-Performance Teams</h5>
                <ul>
                  <li>Clear OKRs aligned to business goals</li>
                  <li>Regular 1-on-1s (weekly minimum) for feedback and growth</li>
                  <li>Blameless incident postmortems for psychological safety</li>
                  <li>Diverse thinking styles and backgrounds</li>
                  <li>Recognition of impact, not just output</li>
                  <li>Work-life balance and sustainability</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'mentoring' && (
            <div>
              <h4>Mentoring and Career Development</h4>
              
              <div className="explanation-box">
                <h5>Effective Mentoring Framework</h5>
                <code className="code-block">
{`// Mentoring Roadmap
1. ORIENTATION (Week 1-2)
   - System architecture overview
   - Codebase tour & key patterns
   - Team processes & communication
   - Set initial success metrics

2. RAMP (Week 3-8)
   - Small, bounded projects
   - Code review feedback loops
   - Pair programming sessions
   - Gradual complexity increase

3. INDEPENDENCE (Month 3+)
   - Lead feature work end-to-end
   - Own areas of codebase
   - Mentor others
   - Drive technical improvements

4. LEADERSHIP (Ongoing)
   - Lead design reviews
   - Shape architecture decisions
   - Mentor new team members
   - Drive organizational improvements`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Mentoring Techniques</h5>
                <ul>
                  <li><strong>Socratic Method:</strong> Ask questions to help mentee discover solutions</li>
                  <li><strong>Pair Programming:</strong> Real-time feedback and knowledge transfer</li>
                  <li><strong>Code Review Feedback:</strong> Specific, actionable, and constructive</li>
                  <li><strong>Growth Mindset:</strong> Frame failures as learning opportunities</li>
                  <li><strong>Stretch Goals:</strong> Push comfort zone without overwhelming</li>
                  <li><strong>Regular Feedback:</strong> Don't wait for annual reviews</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>What Good Feedback Looks Like</h5>
                <code className="code-block">
{`// ❌ Avoid: Vague, blaming feedback
"This code is messy and hard to understand."

// ✅ Prefer: Specific, actionable, growth-oriented
"I see the nested conditions here could be more readable.
Consider extracting this logic into a helper function
called validateUserPermissions(). This would also make
it easier to test edge cases. Let's look at examples
of this pattern in our codebase together."`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'decisions' && (
            <div>
              <h4>Technical Decision-Making Framework</h4>
              
              <div className="explanation-box">
                <h5>RACI Framework for Decisions</h5>
                <ul>
                  <li><strong>Responsible:</strong> Person who does the work</li>
                  <li><strong>Accountable:</strong> Person who has final say (usually manager or architect)</li>
                  <li><strong>Consulted:</strong> People who provide input and expertise</li>
                  <li><strong>Informed:</strong> People who need to know the decision</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Decision-Making Process</h5>
                <code className="code-block">
{`// Framework for Important Technical Decisions
1. DEFINE THE PROBLEM
   - What are we trying to solve?
   - What are the constraints?
   - What's the business impact?

2. GATHER INFORMATION
   - What do we currently know?
   - What precedents exist in industry?
   - What are team concerns?

3. BRAINSTORM OPTIONS (3-5 minimum)
   - Explore different approaches
   - Consider trade-offs
   - Don't settle on first idea

4. EVALUATE OPTIONS
   - Complexity & maintenance
   - Performance & scalability
   - Team capability
   - Time to implement
   - Risk & reversibility

5. DECIDE & DOCUMENT
   - Clear rationale in RFC/ADR
   - Explain what was rejected & why
   - Plan implementation & rollback

6. COMMUNICATE & ALIGN
   - Share with all stakeholders
   - Address concerns
   - Get buy-in for execution`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>When to Make Different Decision Styles</h5>
                <ul>
                  <li><strong>Unanimous:</strong> Critical decisions affecting system reliability</li>
                  <li><strong>Consensus:</strong> Architectural decisions, major refactors</li>
                  <li><strong>Consultative:</strong> Technology choices, process changes</li>
                  <li><strong>Directive:</strong> Time-sensitive decisions, emergency situations</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'influence' && (
            <div>
              <h4>Influencing Without Direct Authority</h4>
              
              <div className="explanation-box">
                <h5>Keys to Influence as Staff Engineer</h5>
                <ul>
                  <li><strong>Be a Trusted Advisor:</strong> Build reputation for sound judgment</li>
                  <li><strong>Understand Stakeholder Goals:</strong> What does each person/team care about?</li>
                  <li><strong>Lead by Example:</strong> Model the behavior and practices you advocate for</li>
                  <li><strong>Leverage Data & Evidence:</strong> Support arguments with metrics and case studies</li>
                  <li><strong>Build Coalitions:</strong> Find allies and build consensus gradually</li>
                  <li><strong>Pick Your Battles:</strong> Influence on what matters most</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Persuasion Strategies</h5>
                <code className="code-block">
{`// Influence Tactics

1. CREDIBILITY
   - Deep expertise in your domain
   - Consistent follow-through
   - Admit limits & unknowns

2. RELATABILITY
   - Understand others' perspectives
   - Show empathy for constraints
   - Find common ground

3. EVIDENCE
   - Data from experiments or research
   - Case studies from similar situations
   - Industry best practices

4. NARRATIVE
   - Tell compelling stories
   - Paint vivid picture of future
   - Connect to org values

5. TIMING
   - Choose right moment to raise topics
   - Don't push when people are stressed
   - Build momentum incrementally

6. COLLABORATION
   - Co-create solutions with others
   - Involve people in decisions
   - Celebrate collective wins`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Staff Engineer as Force Multiplier</h5>
                <ul>
                  <li>Unblock other teams through architecture & guidance</li>
                  <li>Reduce organizational silos through cross-team communication</li>
                  <li>Amplify good ideas through advocacy</li>
                  <li>Elevate engineering culture through modeling</li>
                  <li>Enable teams to move faster through better systems</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Anti-Patterns to Avoid</h3>
        <div className="explanation-box">
          <ul>
            <li>❌ Micromanaging: Trust your team with decisions</li>
            <li>❌ Hoarding decisions: Develop others' decision-making skills</li>
            <li>❌ Only hiring people like you: Build diverse teams</li>
            <li>❌ Vague feedback: Be specific and actionable</li>
            <li>❌ Inconsistent standards: Apply principles fairly</li>
            <li>❌ Ignoring psychological safety: Address toxicity immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TechnicalLeadershipExample;
