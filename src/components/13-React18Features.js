/*
 * ============================================================================
 * REACT 18 ADVANCED FEATURES
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates React 18's powerful new features for concurrent
 * rendering and performance optimization:
 * 
 * 1. useTransition - Mark updates as non-critical/non-blocking
 * 2. useDeferredValue - Defer value updates for better performance
 * 3. Suspense Boundaries - Handle async components gracefully
 * 4. startTransition - Programmatic way to mark transitions
 * 5. Automatic batching - Multiple state updates in one render
 * ============================================================================
 */

import React, { useState, useTransition, useDeferredValue, Suspense } from 'react';

/*
 * ============================================================================
 * PATTERN 1: useTransition HOOK
 * ============================================================================
 * 
 * useTransition marks state updates as non-urgent transitions.
 * This prevents UI from freezing on expensive operations.
 * 
 * Returns: [isPending, startTransition]
 * - isPending: boolean indicating if transition is ongoing
 * - startTransition: function to wrap a state update
 */

function UseTransitionExample() {
  const [tab, setTab] = useState('about');
  const [isPending, startTransition] = useTransition();

  const handleTabSelect = (nextTab) => {
    // Mark this state update as a non-blocking transition
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <h4>useTransition Hook</h4>
      <p>
        This hook marks state updates as non-urgent, keeping the UI responsive
        during expensive operations.
      </p>

      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => handleTabSelect('about')}
          style={{
            backgroundColor: tab === 'about' ? '#667eea' : '#ccc',
            color: 'white',
            marginRight: '10px'
          }}
        >
          {isPending ? '⏳ ' : ''}About
        </button>
        <button
          onClick={() => handleTabSelect('contact')}
          style={{
            backgroundColor: tab === 'contact' ? '#667eea' : '#ccc',
            color: 'white'
          }}
        >
          {isPending ? '⏳ ' : ''}Contact
        </button>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#f7fafc',
        borderRadius: '4px'
      }}>
        {isPending ? (
          <p style={{ opacity: 0.7 }}>Loading tab...</p>
        ) : (
          <>
            {tab === 'about' && <p>📋 About tab content - lightweight content</p>}
            {tab === 'contact' && <p>📧 Contact tab content - could fetch data</p>}
          </>
        )}
      </div>

      <code className="code-block">
{`const [isPending, startTransition] = useTransition();

const handleClick = () => {
  // Mark update as non-urgent
  startTransition(() => {
    setData(newValue);
  });
};

// Show loading indicator
{isPending && <Spinner />}`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 2: useDeferredValue HOOK
 * ============================================================================
 * 
 * useDeferredValue defers a value update for better performance.
 * Useful for expensive computations on prop values.
 * 
 * It automatically defers the value, returning the previous value
 * until the new value is ready.
 */

function UseDeferredValueExample() {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);

  // Simulate expensive filtering operation
  const filteredItems = React.useMemo(() => {
    if (!deferredInput) return [];
    
    // Simulate delay
    const items = [
      'Apple', 'Application', 'Apricot',
      'Banana', 'Browser', 'Buffer',
      'Cherry', 'Component', 'Context',
      'Data', 'Database', 'Debug'
    ];

    return items.filter(item =>
      item.toLowerCase().includes(deferredInput.toLowerCase())
    );
  }, [deferredInput]);

  const isStale = input !== deferredInput;

  return (
    <div>
      <h4>useDeferredValue Hook</h4>
      <p>
        This hook defers a value update. Type to see how it prioritizes
        input responsiveness over search results.
      </p>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search items..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          opacity: input !== deferredInput ? 1 : 0.7
        }}
      />

      <div style={{
        padding: '10px',
        backgroundColor: isStale ? '#fff3cd' : '#d4edda',
        marginBottom: '10px',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        {isStale ? '⏳ Updating...' : '✅ Up to date'}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px'
      }}>
        {filteredItems.slice(0, 4).map((item, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              backgroundColor: '#667eea',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && input && (
        <p style={{ marginTop: '10px', color: '#999' }}>No items found</p>
      )}

      <code className="code-block">
{`const [input, setInput] = useState('');
const deferredInput = useDeferredValue(input);

// Use deferredInput in expensive operations
const results = useMemo(() => {
  return expensiveFilter(deferredInput);
}, [deferredInput]);

// Show if it's stale
const isStale = input !== deferredInput;
{isStale && <Spinner />}`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 3: AUTOMATIC BATCHING
 * ============================================================================
 * 
 * React 18 automatically batches multiple state updates into a single render.
 * This improves performance automatically, even in event handlers.
 */

function AutomaticBatchingExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  const handleClick = () => {
    // Both state updates are batched into ONE render
    setCount(c => c + 1);
    setRenderCount(r => r + 1);
  };

  return (
    <div>
      <h4>Automatic Batching (React 18)</h4>
      <p>
        Multiple state updates are automatically batched into a single render.
        Click the button and watch the render count - it only increments once.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#667eea',
          color: 'white',
          borderRadius: '4px'
        }}>
          <p>Count: {count}</p>
          <button onClick={handleClick} style={{
            backgroundColor: 'white',
            color: '#667eea',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Click Me
          </button>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#48bb78',
          color: 'white',
          borderRadius: '4px'
        }}>
          <p>Render Count: {renderCount}</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            ✅ Both state updates batched into 1 render!
          </p>
        </div>
      </div>

      <code className="code-block">
{`// Before React 18: 2 renders
// After React 18: 1 render (automatic batching)

handleClick() {
  setCount(c => c + 1);      // Batched
  setRenderCount(r => r + 1); // Batched
}`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 4: CONCURRENT FEATURES SUMMARY
 * ============================================================================
 */

function ConcurrentFeaturesExample() {
  return (
    <div>
      <h4>React 18 Concurrent Features</h4>
      
      <div className="summary-box">
        <div className="summary-item">
          <h5>useTransition</h5>
          <p>Mark updates as non-urgent to keep UI responsive</p>
          <code style={{ fontSize: '11px' }}>const [isPending, startTransition] = useTransition();</code>
        </div>

        <div className="summary-item">
          <h5>useDeferredValue</h5>
          <p>Defer a value update for expensive operations</p>
          <code style={{ fontSize: '11px' }}>const deferred = useDeferredValue(value);</code>
        </div>

        <div className="summary-item">
          <h5>startTransition</h5>
          <p>Programmatic way to start a transition</p>
          <code style={{ fontSize: '11px' }}>startTransition({'(() {'} {'}'} setState(...)));</code>
        </div>

        <div className="summary-item">
          <h5>Automatic Batching</h5>
          <p>Multiple state updates in one render (no extra code needed!)</p>
          <code style={{ fontSize: '11px' }}>setState1(); setState2(); // 1 render!</code>
        </div>

        <div className="summary-item">
          <h5>Suspense SSR</h5>
          <p>Full Suspense support for server-side rendering</p>
          <code style={{ fontSize: '11px' }}>React 18 with full Suspense support</code>
        </div>
      </div>

      <div className="explanation-box">
        <h5>When to Use Each Feature:</h5>
        <ul>
          <li><strong>useTransition:</strong> Tab switches, search updates, large lists</li>
          <li><strong>useDeferredValue:</strong> Expensive filtering/sorting operations</li>
          <li><strong>Automatic Batching:</strong> Happens automatically, no action needed</li>
          <li><strong>Suspense:</strong> Loading states, code splitting, data fetching</li>
        </ul>
      </div>
    </div>
  );
}

/*
 * ============================================================================
 * MAIN COMPONENT
 * ============================================================================
 */
function React18FeaturesExample() {
  const [activeFeature, setActiveFeature] = useState('transition');

  return (
    <div className="hook-section">
      <h2>React 18 Advanced Features</h2>

      {/* Navigation */}
      <div className="hook-subsection">
        <h3>Select a Feature</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveFeature('transition')}
            style={{
              backgroundColor: activeFeature === 'transition' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            useTransition
          </button>
          <button
            onClick={() => setActiveFeature('deferred')}
            style={{
              backgroundColor: activeFeature === 'deferred' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            useDeferredValue
          </button>
          <button
            onClick={() => setActiveFeature('batching')}
            style={{
              backgroundColor: activeFeature === 'batching' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Auto Batching
          </button>
          <button
            onClick={() => setActiveFeature('summary')}
            style={{
              backgroundColor: activeFeature === 'summary' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Summary
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="hook-subsection">
        <div className="demo-box">
          {activeFeature === 'transition' && <UseTransitionExample />}
          {activeFeature === 'deferred' && <UseDeferredValueExample />}
          {activeFeature === 'batching' && <AutomaticBatchingExample />}
          {activeFeature === 'summary' && <ConcurrentFeaturesExample />}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        <div className="explanation-box">
          <ul>
            <li>React 18 introduces <strong>Concurrent Rendering</strong> for better performance</li>
            <li><strong>useTransition</strong> and <strong>useDeferredValue</strong> give you control over update priority</li>
            <li><strong>Automatic batching</strong> improves performance without any code changes</li>
            <li>Use transitions for <strong>non-urgent updates</strong> that can be interrupted</li>
            <li>Deferred values are great for <strong>expensive computations</strong> on rapid changes</li>
            <li>These features make React apps feel <strong>faster and more responsive</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React18FeaturesExample;
