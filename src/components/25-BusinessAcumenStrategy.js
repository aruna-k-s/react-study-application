/*
 * ============================================================================
 * BUSINESS ACUMEN & TECHNICAL STRATEGY
 * ============================================================================
 * 
 * Component Purpose:
 * Develop the business mindset required at Staff Engineer level.
 * Align technical decisions with business objectives and understand value creation.
 * 
 * Topics Covered:
 * 1. Understanding Business Models
 * 2. ROI & Cost Analysis
 * 3. Technology Roadmapping
 * 4. Build vs Buy Decisions
 * 5. Prioritization Frameworks
 * ============================================================================
 */

import React, { useState } from 'react';

function BusinessAcumenTechStrategyExample() {
  const [activeSection, setActiveSection] = useState('business');

  return (
    <div className="hook-section">
      <h2>Business Acumen & Technical Strategy</h2>

      <div className="hook-subsection">
        <h3>Staff Engineers Must Understand Business</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('business')} className={`section-button ${activeSection === 'business' ? 'active' : ''}`}>Business Models</button>
          <button onClick={() => setActiveSection('roi')} className={`section-button ${activeSection === 'roi' ? 'active' : ''}`}>ROI & Costs</button>
          <button onClick={() => setActiveSection('roadmap')} className={`section-button ${activeSection === 'roadmap' ? 'active' : ''}`}>Roadmaps</button>
          <button onClick={() => setActiveSection('decisions')} className={`section-button ${activeSection === 'decisions' ? 'active' : ''}`}>Build vs Buy</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'business' && (
            <div>
              <h4>Understanding Business Models</h4>
              
              <div className="explanation-box">
                <h5>Common SaaS Business Models</h5>
                <code className="code-block">
{`SUBSCRIPTION (Netflix, Slack)
├── Recurring revenue model
├── Focus: Retention & engagement
├── Metrics: MRR, churn rate, LTV
│
├── Strategy: Increase stickiness
├── Tech implications: Reliability, uptime SLA
└── Trade-off: Better reliability = higher costs

USAGE-BASED (AWS, Twilio)
├── Pay per request/transaction
├── Focus: Cost optimization & scaling
├── Metrics: Cost per request, margins
│
├── Strategy: Efficient infrastructure
├── Tech implications: Auto-scaling, cost monitoring
└── Trade-off: Need precise billing, metering

FREEMIUM (Spotify, Figma)
├── Free tier + premium features
├── Focus: Conversion rate
├── Metrics: Free→Paid conversion %
│
├── Strategy: Expose premium features
├── Tech implications: Feature gates, usage tracking
└── Trade-off: Support free tier cost

B2B2C (Stripe Connect, Shopify)
├── Platform for other sellers
├── Focus: Network effects
├── Metrics: GMV, take rate
│
├── Strategy: Reduce friction for sellers/buyers
├── Tech implications: Multi-tenant, payment processing
└── Trade-off: Complex infrastructure`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Key Business Metrics</h5>
                <ul>
                  <li><strong>ARR (Annual Recurring Revenue):</strong> MRR × 12</li>
                  <li><strong>MRR (Monthly Recurring Revenue):</strong> Active subscriptions × price</li>
                  <li><strong>Churn:</strong> % customers who cancel monthly</li>
                  <li><strong>CAC (Customer Acquisition Cost):</strong> Sales & marketing spend / new customers</li>
                  <li><strong>LTV (Lifetime Value):</strong> Average revenue per customer over lifetime</li>
                  <li><strong>NRR (Net Revenue Retention):</strong> Monthly growth from existing customers</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>How Tech Decisions Impact Business</h5>
                <ul>
                  <li><strong>Uptime:</strong> Every 0.1% downtime = revenue impact for subscription model</li>
                  <li><strong>Performance:</strong> Slow checkout = fewer conversions = lost revenue</li>
                  <li><strong>Security:</strong> Breach = lost trust + regulatory fines</li>
                  <li><strong>Scalability:</strong> Can't handle growth = leaving money on table</li>
                  <li><strong>Developer Velocity:</strong> Tech debt → slower feature delivery → competitors win</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'roi' && (
            <div>
              <h4>ROI & Cost Analysis</h4>
              
              <div className="explanation-box">
                <h5>Calculating ROI for Technical Projects</h5>
                <code className="code-block">
{`// Example: Implementing caching layer

COSTS
├── Design time: 40 hours × $200/hr = $8,000
├── Implementation: 200 hours × $200/hr = $40,000
├── Infrastructure: Redis $2,000/month × 12 = $24,000
├── Maintenance: 10 hrs/month × $200 × 12 = $24,000
└── Total Year 1: $96,000

BENEFITS
├── Reduced database load: -50% queries
├── Faster response time: 100ms → 10ms
├── Reduced infrastructure costs: -$30,000/year (less DB hardware)
├── Increased conversion: +2% due to speed = +$200,000/year
└── Total Year 1 Benefits: $230,000

ROI = (Benefits - Costs) / Costs × 100
ROI = (230,000 - 96,000) / 96,000 = 134% (1.34x payback)`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Total Cost of Ownership (TCO)</h5>
                <ul>
                  <li><strong>Development:</strong> Initial build time & cost</li>
                  <li><strong>Infrastructure:</strong> Hosting, CDN, databases</li>
                  <li><strong>Maintenance:</strong> Bug fixes, security updates, monitoring</li>
                  <li><strong>Operational:</strong> On-call support, incident response</li>
                  <li><strong>Opportunity Cost:</strong> Team time not spent on other projects</li>
                  <li><strong>Risk:</strong> Potential for failure, rewrite if wrong choice</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Cost Optimization Strategies</h5>
                <code className="code-block">
{`// Typical Cost Breakdown for Web Service
├── Infrastructure (40%): Compute, storage, CDN, databases
├── People (35%): Engineers, DevOps, support
├── Third-party services (15%): Payment, analytics, monitoring
└── Other (10%): Office, tools, misc

Optimization Points:
├── Infra: Spot instances, reserved capacity, compress data
├── People: Automation, reduce on-call, efficient processes
├── Services: Negotiate contracts, find open-source alternatives
└── Monitoring: Right-size resources, scale on demand`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'roadmap' && (
            <div>
              <h4>Technology Roadmapping</h4>
              
              <div className="explanation-box">
                <h5>Balanced Roadmap Framework</h5>
                <code className="code-block">
{`// 12-Month Tech Roadmap Allocation

60% - BUSINESS VALUE
├── New features customers want
├── Performance improvements
├── Security/compliance improvements
└── Direct revenue impact

25% - OPERATIONAL EXCELLENCE
├── Dev velocity improvements
├── Testing infrastructure
├── Deployment automation
├── Monitoring & observability
└── Compounding benefits

15% - TECHNICAL HEALTH
├── Reduce technical debt
├── Modernize legacy systems
├── Explore new technologies
├── Team learning & growth
└── Long-term sustainability`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Making Technology Bets</h5>
                <ul>
                  <li><strong>Strategic:</strong> Tech chosen for long-term competitiveness (not latest trend)</li>
                  <li><strong>Evidence-based:</strong> Back decisions with data and research</li>
                  <li><strong>Reversible:</strong> Prefer bets we can reverse if wrong</li>
                  <li><strong>Measured:</strong> Have metrics to evaluate success</li>
                  <li><strong>Communicated:</strong> Explain rationale to organization</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Roadmap Communication</h5>
                <ul>
                  <li><strong>Executive Summary:</strong> 1 page: what, why, impact, timeline</li>
                  <li><strong>Business Case:</strong> ROI, risks, dependencies, go/no-go criteria</li>
                  <li><strong>Technical Details:</strong> Architecture, alternatives, mitigations</li>
                  <li><strong>Timeline:</strong> Realistic estimates with confidence levels</li>
                  <li><strong>Updates:</strong> Monthly progress, risk escalation</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'decisions' && (
            <div>
              <h4>Build vs Buy vs Partner Decisions</h4>
              
              <div className="explanation-box">
                <h5>Build vs Buy Analysis</h5>
                <code className="code-block">
{`BUILD (Internal)
Pros:
✓ Full control & customization
✓ No vendor lock-in
✓ Deep institutional knowledge
✓ Team learns important skills

Cons:
✗ High development cost
✗ Ongoing maintenance burden
✗ May miss domain expertise
✗ Delayed value while building

Use when:
- Core business differentiator
- Unique requirements
- Team has expertise
- Cost-effective vs vendor

───────────────────────────────────

BUY (COTS/SaaS)
Pros:
✓ Faster time-to-value
✓ Vendor handles maintenance
✓ Predictable pricing
✓ Vendor invests in improvements

Cons:
✗ Less customization
✗ Vendor lock-in risk
✗ May have features you don't need
✗ No source code access

Use when:
- Non-differentiating function
- Vendor is excellent
- Total cost cheaper than build
- Timeline critical

───────────────────────────────────

PARTNER (API/Integration)
Pros:
✓ Shared risk & investment
✓ Faster than building alone
✓ Vendor becomes stakeholder

Cons:
✗ Complex negotiations
✗ Misaligned incentives possible
✗ Revenue share implications

Use when:
- Mutual benefit
- Complementary capabilities
- Companies aligned on strategy`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Vendor Evaluation Checklist</h5>
                <ul>
                  <li>Pricing: Total cost, hidden fees, egress costs?</li>
                  <li>Features: Covers 80%+ of needs? Missing critical features?</li>
                  <li>Scalability: Can handle 10x growth? Pricing scales linearly?</li>
                  <li>Reliability: Uptime SLA, disaster recovery, support tier</li>
                  <li>Security: SOC 2, compliance certifications, penetration tested</li>
                  <li>Data: Can we export? Migration path if switching?</li>
                  <li>Vendor Health: Funding, competition, likely to stay in business?</li>
                  <li>Integration: API quality, documentation, support</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>The Staff Engineer's Business Translator Role</h3>
        <div className="explanation-box">
          <ul>
            <li>Bridge between engineering and business perspectives</li>
            <li>Translate business goals into technical strategy</li>
            <li>Communicate technical trade-offs in business terms</li>
            <li>Connect engineering metrics to business impact</li>
            <li>Help product & business understand tech constraints</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BusinessAcumenTechStrategyExample;
