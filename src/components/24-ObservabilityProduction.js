/*
 * ============================================================================
 * OBSERVABILITY & PRODUCTION EXCELLENCE
 * ============================================================================
 * 
 * Component Purpose:
 * Master the observability practices that keep systems running reliably at scale.
 * Understand logging, monitoring, tracing, and incident response processes.
 * 
 * Topics Covered:
 * 1. Structured Logging
 * 2. Monitoring & Alerting
 * 3. Distributed Tracing
 * 4. Incident Response
 * 5. SLO/SLA/SLI Concepts
 * ============================================================================
 */

import React, { useState } from 'react';

function ObservabilityProductionExample() {
  const [activeSection, setActiveSection] = useState('logging');

  return (
    <div className="hook-section">
      <h2>Observability & Production Excellence</h2>

      <div className="hook-subsection">
        <h3>Three Pillars of Observability</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('logging')} className={`section-button ${activeSection === 'logging' ? 'active' : ''}`}>Logging</button>
          <button onClick={() => setActiveSection('monitoring')} className={`section-button ${activeSection === 'monitoring' ? 'active' : ''}`}>Monitoring</button>
          <button onClick={() => setActiveSection('tracing')} className={`section-button ${activeSection === 'tracing' ? 'active' : ''}`}>Tracing</button>
          <button onClick={() => setActiveSection('incidents')} className={`section-button ${activeSection === 'incidents' ? 'active' : ''}`}>Incidents</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'logging' && (
            <div>
              <h4>Structured Logging for Investigation</h4>
              
              <div className="explanation-box">
                <h5>Move Beyond Console.log()</h5>
                <code className="code-block">
{`// ❌ Unstructured (hard to search/aggregate)
console.log('User login attempt');

// ✅ Structured (machine-readable, queryable)
logger.info({
  event: 'user_login_attempt',
  userId: '12345',
  email: 'user@example.com',
  source: 'web',
  ip: '192.168.1.1',
  timestamp: new Date().toISOString(),
  duration_ms: 42
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Logging Levels & Their Purpose</h5>
                <ul>
                  <li><strong>DEBUG:</strong> Development only, verbose internals</li>
                  <li><strong>INFO:</strong> Significant events (logins, purchases, deployments)</li>
                  <li><strong>WARN:</strong> Unexpected but recoverable (retries, degradation)</li>
                  <li><strong>ERROR:</strong> Failures that need attention (API failures, crashes)</li>
                  <li><strong>CRITICAL:</strong> System-wide failures (data loss, security breach)</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Correlation IDs for Request Tracing</h5>
                <code className="code-block">
{`// Frontend
const correlationId = generateUUID();
const headers = {
  'X-Correlation-ID': correlationId,
  'X-Request-ID': generateUUID()
};

// Backend receives request with same correlationId
// Logs all database queries, service calls with same ID
// When investigating issues: "Find all logs with correlation-id=xyz"

Benefits:
- Follow single user action through entire system
- Debug multi-service interactions
- Understand request flow in microservices`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Sampling Strategy</h5>
                <ul>
                  <li><strong>Log all errors & warnings:</strong> Never sample these</li>
                  <li><strong>Sample info/debug:</strong> 1-10% in production (configurable)</li>
                  <li><strong>Increase sampling on issues:</strong> Temporarily log more during investigation</li>
                  <li><strong>Budget-aware sampling:</strong> Balance insights vs cost</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'monitoring' && (
            <div>
              <h4>Monitoring, Metrics & Alerting</h4>
              
              <div className="explanation-box">
                <h5>Key Metrics (RED Method)</h5>
                <code className="code-block">
{`// RED: Rate, Errors, Duration
// Every service should track these

Rate
├── Requests per second: api.POST.requests_per_sec
├── Events per second: event_processor.events_per_sec
└── User actions: cart.add_to_cart_per_sec

Errors
├── HTTP 5xx responses: api.errors_5xx_rate
├── Failed transactions: checkout.failed_rate
├── Timeouts: api.timeout_rate
└── Type: payment_gateway.connection_errors

Duration
├── Response time (p50, p95, p99): api.response_time_ms
├── Query latency (p99): database.query_time_ms
└── Task completion: background_job.duration_ms`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Business Metrics</h5>
                <ul>
                  <li><strong>Conversion Rate:</strong> checkout_started / checkout_completed</li>
                  <li><strong>Revenue:</strong> transaction_value sum, per-user lifetime value</li>
                  <li><strong>User Engagement:</strong> Active users, retention, DAU/MAU</li>
                  <li><strong>Feature Usage:</strong> Which features do users rely on?</li>
                  <li><strong>Cost:</strong> Infrastructure, CDN, third-party services</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Alerting Best Practices</h5>
                <code className="code-block">
{`// Alert Fatigue: Too many alerts = ignored alerts

❌ Alert on every metric > threshold
├── 100 alerts per day
├── 95% false positives
└── Noise → ignored

✅ Alert on actionable anomalies
├── Sudden spike: error rate 1% → 30%
├── Trend: performance degrading over time
├── Business impact: checkout failures > 5%
└── 5 alerts per day, 95% require action

Alerting Rules:
1. Symptom-based, not cause-based
   Alert: "checkout failures up" ✓
   Alert: "database slow" ✗ (check if actual impact)

2. Include context & runbook
   Alert with link to troubleshooting steps
   
3. Escalate appropriately
   Info → WARN → ERROR → CRITICAL`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'tracing' && (
            <div>
              <h4>Distributed Tracing & Debugging</h4>
              
              <div className="explanation-box">
                <h5>Distributed Tracing Concepts</h5>
                <code className="code-block">
{`// Trace: Single user request through entire system
// Span: Individual operation within the trace

Timeline visualization:
         User Action (Trace ID: xyz)
         |
    ┌────┴────────────────────────────────────┐
    |                                          |
Frontend Fetch               Backend Handler
    |                               |
200ms                        ├──API validation (10ms)
    |                        ├──DB query (150ms)
    |                        ├──Cache write (5ms)
    |                        └──Response (35ms)
    |_______________________________|


OpenTelemetry Standard:
- Instruments code to send spans
- Supports multiple exporters (Datadog, Jaeger, etc.)
- Includes baggage (correlation IDs) across services`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Frontend Tracing Implementation</h5>
                <code className="code-block">
{`// Using Web APIs for tracing
const tracer = trace.getTracer('my-app');
const span = tracer.startSpan('fetch-user-data');

try {
  const response = await fetch('/api/user');
  span.setStatus({ code: SpanStatusCode.OK });
  return response.json();
} catch (error) {
  span.recordException(error);
  span.setStatus({ 
    code: SpanStatusCode.ERROR,
    message: error.message 
  });
  throw error;
} finally {
  span.end();
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Web Vitals Monitoring</h5>
                <ul>
                  <li><strong>LCP (Largest Contentful Paint):</strong> Time to render largest element (&lt; 2.5s)</li>
                  <li><strong>FID (First Input Delay):</strong> Time from input to response (&lt; 100ms)</li>
                  <li><strong>CLS (Cumulative Layout Shift):</strong> Unexpected layout movement score (&lt; 0.1)</li>
                  <li><strong>TTFB (Time to First Byte):</strong> Server response speed</li>
                  <li><strong>TTI (Time to Interactive):</strong> When page is fully interactive</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'incidents' && (
            <div>
              <h4>Incident Response & Post-Mortems</h4>
              
              <div className="explanation-box">
                <h5>Incident Severity Levels</h5>
                <code className="code-block">
{`SEV-1 (Critical - Wake up on-call)
├── Service completely down
├── Data loss or corruption
├── Security breach
└── Requires immediate action

SEV-2 (Major - Engage team)
├── Partial functionality down
├── Performance severely degraded
├── Affects large user segment
└── Needs urgent attention within 15 minutes

SEV-3 (Minor - Schedule investigation)
├── Non-critical feature affected
├── Small user segment impacted
├── Workaround available
└── Can wait for next business day

SEV-4 (Informational)
├── No customer impact
├── Documentation issue
├── Minor improvements`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Incident Response Phases</h5>
                <code className="code-block">
{`DETECTION (0-5 min)
└── Alert fires, on-call person notified

TRIAGE (5-10 min)
├── Understand scope: How many users affected?
├── Confirm it's real (not false positive)
└── Assign severity level

MITIGATION (10-60 min)
├── Quick fix if available
├── Rollback recent changes
├── Degrade features to prevent cascades
├── Implement workarounds

RESOLUTION (varies)
├── Fix root cause
├── Deploy update
├── Monitor metrics
└── Confirm normalcy

POST-MORTEM (24-48 hours later)
├── Timeline: What happened & when?
├── Impact: Users affected, revenue loss?
├── Root Cause: Why did it happen?
├── Action Items: Prevention for future`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Blameless Culture</h5>
                <ul>
                  <li><strong>Focus on systems, not people:</strong> "Why did the system allow this?"</li>
                  <li><strong>No blame, shared learning:</strong> Everyone learns from incidents</li>
                  <li><strong>Action items:</strong> Improve monitoring, automation, processes</li>
                  <li><strong>Public postmortems:</strong> Share learnings across organization</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>SLO, SLA, SLI Explained</h3>
        <div className="explanation-box">
          <ul>
            <li><strong>SLI (Service Level Indicator):</strong> Measurement - "99% of requests complete in &lt;100ms"</li>
            <li><strong>SLO (Service Level Objective):</strong> Goal - "Maintain 99.9% uptime"</li>
            <li><strong>SLA (Service Level Agreement):</strong> Contract - "99.9% uptime or customers get credit"</li>
          </ul>
          <code className="code-block">
{`// Example
SLI: Availability = (successful_requests / total_requests) × 100
SLO: 99.95% availability
SLA: If &lt; 99.95%, customers receive 1% billing credit`}
          </code>
        </div>
      </div>
    </div>
  );
}

export default ObservabilityProductionExample;
