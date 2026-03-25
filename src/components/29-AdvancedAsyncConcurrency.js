/*
 * ============================================================================
 * ADVANCED ASYNC PATTERNS & CONCURRENCY
 * ============================================================================
 * 
 * Component Purpose:
 * Deep understanding of asynchronous patterns and concurrent execution.
 * Handle complex concurrency scenarios at scale.
 * 
 * Topics Covered:
 * 1. Async/Await Patterns
 * 2. Race Conditions & Deadlocks
 * 3. Concurrent Request Management
 * 4. Backpressure Handling
 * 5. Worker Patterns
 * ============================================================================
 */

import React, { useState } from 'react';

function AdvancedAsyncConcurrencyExample() {
  const [activeSection, setActiveSection] = useState('patterns');

  return (
    <div className="hook-section">
      <h2>Advanced Async Patterns & Concurrency</h2>

      <div className="hook-subsection">
        <h3>Mastering Asynchronous JavaScript</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('patterns')} className={`section-button ${activeSection === 'patterns' ? 'active' : ''}`}>Patterns</button>
          <button onClick={() => setActiveSection('race')} className={`section-button ${activeSection === 'race' ? 'active' : ''}`}>Race Conditions</button>
          <button onClick={() => setActiveSection('concurrency')} className={`section-button ${activeSection === 'concurrency' ? 'active' : ''}`}>Concurrency</button>
          <button onClick={() => setActiveSection('workers')} className={`section-button ${activeSection === 'workers' ? 'active' : ''}`}>Workers</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'patterns' && (
            <div>
              <h4>Async/Await Patterns</h4>
              
              <div className="explanation-box">
                <h5>Sequential vs Parallel Execution</h5>
                <code className="code-block">
{`// SEQUENTIAL (one after another, 300ms total)
async function getUserWithPosts() {
  const user = await fetchUser(1);      // 100ms
  const posts = await fetchPosts(1);     // 100ms
  const followers = await fetchFollowers(1); // 100ms
  return { user, posts, followers };     // 300ms total
}

// PARALLEL (concurrent, 100ms total)
async function getUserWithPostsParallel() {
  const [user, posts, followers] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchFollowers(1)
  ]);
  return { user, posts, followers };     // ~100ms total
}

// SEMI-PARALLEL (start some async, wait on others)
async function getUserWithPostsSemiParallel() {
  const user = await fetchUser(1);       // 100ms, must wait
  const [posts, followers] = await Promise.all([
    fetchPosts(user.id),                 // Can parallel
    fetchFollowers(user.id)              // Can parallel
  ]);
  return { user, posts, followers };     // ~200ms total
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Error Handling in Async Code</h5>
                <code className="code-block">
{`// Try-Catch Pattern
async function fetchWithRetry() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetch('/api/data');
    } catch (error) {
      if (attempt === 3) throw error;
      await delay(1000 * attempt); // Exponential backoff
    }
  }
}

// Promise.allSettled (handle partial failures)
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url))
  );
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
    
  const failed = results
    .filter(r => r.status === 'rejected');
    
  return { successful, failed };
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Timeout Patterns</h5>
                <code className="code-block">
{`// Promise with timeout
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

// Usage
try {
  const data = await withTimeout(fetchData(), 5000);
} catch (error) {
  if (error.message === 'Timeout') {
    console.log('Request took too long');
  }
}`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'race' && (
            <div>
              <h4>Race Conditions & Deadlocks</h4>
              
              <div className="explanation-box">
                <h5>Classic Race Condition</h5>
                <code className="code-block">
{`// ❌ RACE CONDITION: Multiple saves overwrite each other
let draftPost = { title: 'Hello ' };

// User types "World"
getUserInput().then(input => {
  draftPost.title = draftPost.title + input;
  saveDraft(draftPost);
});

// Simultaneously user types "!"
getUserInput().then(input => {
  draftPost.title = draftPost.title + input;
  saveDraft(draftPost);
});

// Result: Unpredictable, could be "Hello World" or "Hello !"
// Or saves happen in wrong order

// ✅ FIX: Use version numbers (optimistic locking)
async function safeSaveDraft(updates) {
  let currentDraft = await getDraft();
  
  while (true) {
    try {
      await saveDraftWithVersion(
        { ...currentDraft, ...updates },
        currentDraft.version
      );
      break;
    } catch (error) {
      if (error.code === 'VERSION_MISMATCH') {
        // Retry with latest version
        currentDraft = await getDraft();
      } else {
        throw error;
      }
    }
  }
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Detector Pattern (for data races)</h5>
                <code className="code-block">
{`// Detect stale reads
const cache = new Map();
const versions = new Map();

function getCached(key, fetchFn) {
  const cached = cache.get(key);
  const version = versions.get(key) || 0;
  
  // Refresh in background if stale
  if (version < Date.now() - 5000) {
    fetchFn().then(data => {
      cache.set(key, data);
      versions.set(key, Date.now());
    });
  }
  
  return cached;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Deadlock Prevention</h5>
                <ul>
                  <li><strong>Lock Ordering:</strong> Always acquire locks in same order</li>
                  <li><strong>Timeout on Locks:</strong> Don't wait forever</li>
                  <li><strong>Detect & Recover:</strong> Monitor for deadlocks, auto-restart</li>
                  <li><strong>Prefer Lock-Free:</strong> Use immutable data, version numbers</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'concurrency' && (
            <div>
              <h4>Concurrent Request Management</h4>
              
              <div className="explanation-box">
                <h5>Connection Pooling</h5>
                <code className="code-block">
{`// Limit concurrent API requests
class RequestPool {
  constructor(maxConcurrent = 10) {
    this.maxConcurrent = maxConcurrent;
    this.active = 0;
    this.queue = [];
  }

  async run(fn) {
    while (this.active >= this.maxConcurrent) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    
    this.active++;
    try {
      return await fn();
    } finally {
      this.active--;
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }
}

// Usage
const pool = new RequestPool(10);
const promises = urls.map(url =>
  pool.run(() => fetch(url))
);
const results = await Promise.all(promises);
// Max 10 requests in flight at once`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Backpressure Handling</h5>
                <code className="code-block">
{`// When consumer slower than producer, back off
async function processStream(stream) {
  for await (const chunk of stream) {
    const canProcess = await processChunk(chunk);
    if (!canProcess) {
      // Consumer backlogged, pause reading
      stream.pause();
      // Wait before resuming
      await delay(1000);
      stream.resume();
    }
  }
}

// Or: Use async iterators with built-in backpressure
async function* throttledMap(iterator, asyncFn) {
  for await (const item of iterator) {
    yield await asyncFn(item); // Naturally throttled
  }
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Batch Processing</h5>
                <code className="code-block">
{`// Batch requests for efficiency
class BatchQueue {
  constructor(batchSize = 100, delayMs = 50) {
    this.batchSize = batchSize;
    this.delayMs = delayMs;
    this.batch = [];
    this.timer = null;
  }

  async add(item) {
    return new Promise((resolve, reject) => {
      this.batch.push({ item, resolve, reject });
      
      if (this.batch.length >= this.batchSize) {
        this.flush();
      } else if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.delayMs);
      }
    });
  }

  async flush() {
    clearTimeout(this.timer);
    if (this.batch.length === 0) return;
    
    const items = this.batch.splice(0);
    const results = await processBatch(items.map(x => x.item));
    
    items.forEach((item, i) => item.resolve(results[i]));
  }
}`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'workers' && (
            <div>
              <h4>Worker Patterns (Offload Heavy Work)</h4>
              
              <div className="explanation-box">
                <h5>Web Workers for Frontend</h5>
                <code className="code-block">
{`// main.js
const worker = new Worker('compute.worker.js');

// Offload heavy computation
worker.postMessage({ numbers: largeArray });

worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

─────────────────────────────────────────

// compute.worker.js
self.onmessage = (e) => {
  const result = expensiveComputation(e.data.numbers);
  self.postMessage(result);
};

Benefits:
✓ Heavy work doesn't block UI
✓ Responsive to user input
✓ Parallel processing (multi-core)

Use cases:
- Image/video processing
- Large data transformations
- Cryptography
- 3D rendering`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Worker Pool Pattern</h5>
                <code className="code-block">
{`// Reuse workers instead of creating new ones
class WorkerPool {
  constructor(workerScript, poolSize = 4) {
    this.workers = [];
    this.queue = [];
    this.availableWorkers = [];
    
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }
  }

  async run(data) {
    if (this.availableWorkers.length === 0) {
      // All workers busy, queue task
      return new Promise(resolve => {
        this.queue.push({ data, resolve });
      });
    }

    const worker = this.availableWorkers.pop();
    
    return new Promise(resolve => {
      worker.onmessage = (e) => {
        resolve(e.data);
        
        if (this.queue.length > 0) {
          const { data, resolve } = this.queue.shift();
          this.run(data).then(resolve);
        } else {
          this.availableWorkers.push(worker);
        }
      };
      
      worker.postMessage(data);
    });
  }
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>When to Use Workers</h5>
                <ul>
                  <li><strong>Heavy Computation:</strong> &gt; 50ms blocks UI</li>
                  <li><strong>Parsing Large Files:</strong> JSON.parse huge data</li>
                  <li><strong>Long-running Tasks:</strong> Don't freeze application</li>
                  <li><strong>Background Sync:</strong> Sync while user works</li>
                  <li><strong>Real-time Processing:</strong> Audio/video streams</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Concurrency Best Practices</h3>
        <div className="explanation-box">
          <ul>
            <li>Prefer immutable data to avoid race conditions</li>
            <li>Use Promise.allSettled for resilience</li>
            <li>Always set timeouts on async operations</li>
            <li>Monitor thread/worker pool health</li>
            <li>Profile before optimizing (may not be bottleneck)</li>
            <li>Document concurrent behavior in code comments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdvancedAsyncConcurrencyExample;
