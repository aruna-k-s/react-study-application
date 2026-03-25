/*
 * ============================================================================
 * SYSTEM DESIGN AT ENTERPRISE SCALE
 * ============================================================================
 * 
 * Component Purpose:
 * Deep dive into distributed systems, scalability, reliability patterns,
 * and architectural considerations for large-scale frontend systems.
 * 
 * Topics Covered:
 * 1. Distributed Systems Fundamentals
 * 2. Scalability Patterns
 * 3. Fault Tolerance & Resilience
 * 4. State Consistency Models
 * 5. Practical Enterprise Examples
 * ============================================================================
 */

import React, { useState } from 'react';

function SystemDesignEnterpriseExample() {
  const [activeSection, setActiveSection] = useState('distributed');

  return (
    <div className="hook-section">
      <h2>System Design at Enterprise Scale</h2>

      <div className="hook-subsection">
        <h3>Distributed Systems Concepts</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('distributed')} className={`section-button ${activeSection === 'distributed' ? 'active' : ''}`}>Distributed Sys</button>
          <button onClick={() => setActiveSection('scalability')} className={`section-button ${activeSection === 'scalability' ? 'active' : ''}`}>Scalability</button>
          <button onClick={() => setActiveSection('fault')} className={`section-button ${activeSection === 'fault' ? 'active' : ''}`}>Fault Tolerance</button>
          <button onClick={() => setActiveSection('consistency')} className={`section-button ${activeSection === 'consistency' ? 'active' : ''}`}>Consistency</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'distributed' && (
            <div>
              <h4>Distributed Systems Fundamentals</h4>
              
              <div className="explanation-box">
                <h5>Core Challenges</h5>
                <ul>
                  <li><strong>Latency:</strong> Network delay varies, non-negligible at scale</li>
                  <li><strong>Partial Failures:</strong> Components fail independently, not all-or-nothing</li>
                  <li><strong>Asynchrony:</strong> Message delivery timing is unpredictable</li>
                  <li><strong>State Synchronization:</strong> Different nodes may have different state</li>
                  <li><strong>Resource Constraints:</strong> Memory, CPU, bandwidth are limited</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>CAP Theorem</h5>
                <code className="code-block">
{`You can guarantee only 2 of 3 properties:

C - CONSISTENT
  All nodes see same data at same time
  Strong consistency, no stale reads

A - AVAILABLE
  System always responds to requests
  No single point of failure

P - PARTITION TOLERANT
  System works despite network partition
  Nodes can't communicate, must continue

Trade-offs:

CP Systems: Consistency + Partition Tolerance
├── Example: Traditional databases
├── Behavior: Block writes during partition
└── Use: Financial systems, banking

AP Systems: Availability + Partition Tolerance
├── Example: Dynamo, Cassandra
├── Behavior: Accept writes, eventual consistency
└── Use: Social media updates, user profiles

CA Systems: Consistency + Availability
├── Example: Single-node databases
├── Limitation: Can't handle network partitions
└── Not viable for distributed systems`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Fallacies of Distributed Computing</h5>
                <ul>
                  <li>The network is reliable → Plan for failures</li>
                  <li>Latency is zero → Cache, prefetch, predict</li>
                  <li>Bandwidth is infinite → Compress, deduplicate</li>
                  <li>Network is secure → Authenticate, encrypt, validate</li>
                  <li>Topology doesn't change → Load balance, discovery</li>
                  <li>There is one administrator → Multi-team coordination</li>
                  <li>Transport cost is zero → Minimize hops, optimize</li>
                  <li>Network is homogeneous → Handle variance</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'scalability' && (
            <div>
              <h4>Scalability Patterns</h4>
              
              <div className="explanation-box">
                <h5>Horizontal vs Vertical Scaling</h5>
                <code className="code-block">
{`VERTICAL SCALING (Scale Up)
├── Add more resources to single machine
├── Simpler architecture, easier to manage
├── Limited by hardware capacity
├── Risk: Single point of failure
└── Use: Monolithic, single-tenant systems

HORIZONTAL SCALING (Scale Out)
├── Add more machines/instances
├── No single point of failure
├── Requires distributed architecture
├── Complexity: Coordination, consistency
└── Use: Cloud-native, multi-tenant systems`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Load Balancing Strategies</h5>
                <ul>
                  <li><strong>Round-Robin:</strong> Distribute evenly in rotation</li>
                  <li><strong>Least Connections:</strong> Route to server with fewest active connections</li>
                  <li><strong>Weighted Round-Robin:</strong> Account for server capacity differences</li>
                  <li><strong>IP Hash:</strong> Route same client to same server (affinity)</li>
                  <li><strong>Resource-Based:</strong> Route based on actual CPU/memory availability</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Backend as a Service (BaaS) at Scale</h5>
                <code className="code-block">
{`// Sharding Strategy: Partition data across databases
User Service (100M users) partitioned by user ID:

Shard 0: Users 0-9,999,999
├── Database 0a (primary)
├── Database 0b (replica)
└── Database 0c (replica)

Shard 1: Users 10,000,000-19,999,999
├── Database 1a (primary)
├── Database 1b (replica)
└── Database 1c (replica)

Benefits:
- Each shard handles 1/N of load
- Parallel query execution
- Independent scaling per shard

Challenges:
- Complex operational management
- Cross-shard joins difficult
- Rebalancing is expensive
- Hotspots (uneven distribution)`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'fault' && (
            <div>
              <h4>Fault Tolerance & Resilience</h4>
              
              <div className="explanation-box">
                <h5>Resilience Patterns</h5>
                <code className="code-block">
{`// Circuit Breaker Pattern
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failures = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.openedAt > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = fn();
      this.onSuccess();
      return result;
    } catch (e) {
      this.onFailure();
      throw e;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.openedAt = Date.now();
    }
  }
}

// States:
// CLOSED: Normal operation, requests pass through
// OPEN: Circuit broken, fail fast without retry
// HALF_OPEN: Trying to recover, one request allowed`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Fallback Strategies</h5>
                <ul>
                  <li><strong>Return Cache:</strong> Serve stale data when fresh unavailable</li>
                  <li><strong>Default Values:</strong> Use safe defaults if service down</li>
                  <li><strong>Degrade Gracefully:</strong> Reduce feature set, not crash</li>
                  <li><strong>Retry with Backoff:</strong> Exponential backoff + jitter</li>
                  <li><strong>Bulkhead Pattern:</strong> Isolate failures in resource pools</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Chaos Engineering for Frontend</h5>
                <ul>
                  <li>Simulate network latency: Slow down API responses</li>
                  <li>Simulate failures: Make requests fail randomly</li>
                  <li>Simulate partial outages: Fail specific endpoints</li>
                  <li>Monitor behavior: Does UI degrade gracefully?</li>
                  <li>Load test: How many concurrent requests can you handle?</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'consistency' && (
            <div>
              <h4>Consistency & State Management at Scale</h4>
              
              <div className="explanation-box">
                <h5>Consistency Models</h5>
                <code className="code-block">
{`STRONG CONSISTENCY
├── All reads return latest write
├── Simple for developers
├── Trade-off: Higher latency, availability
├── Example: Banks, transactions
└── Pattern: Synchronous replication

EVENTUAL CONSISTENCY
├── Replicas converge over time
├── High availability, lower latency
├── Trade-off: Stale reads possible
├── Example: Social media, user profiles
└── Pattern: Asynchronous replication

CAUSAL CONSISTENCY
├── Cause-effect relationships maintained
├── Middle ground between strong & eventual
├── Complex to implement
└── Example: Comments on posts (parent visible before child)

SESSION CONSISTENCY
├── Consistency within user session only
├── Good practical balance
├── Trade-off: Cross-session inconsistency
└── Example: E-commerce, shopping carts`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Conflict Resolution Strategies</h5>
                <ul>
                  <li><strong>Last-Write-Wins (LWW):</strong> Simple but can lose data</li>
                  <li><strong>Version Vectors:</strong> Track causal relationships</li>
                  <li><strong>Operational Transformation:</strong> Merge concurrent edits (like Google Docs)</li>
                  <li><strong>CRDT (Conflict-free Replicated Data Type):</strong> Math-based conflict resolution</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Key Takeaways for Staff Engineers</h3>
        <div className="explanation-box">
          <ul>
            <li>Understand trade-offs: No perfect solution exists</li>
            <li>Know CAP theorem: Choose two of three properties</li>
            <li>Plan for failure: Assume network is unreliable</li>
            <li>Monitor everything: Observability is critical</li>
            <li>Design for resilience: Graceful degradation over crashes</li>
            <li>Test with chaos: Inject failures deliberately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SystemDesignEnterpriseExample;
