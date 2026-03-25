/*
 * ============================================================================
 * PERFORMANCE OPTIMIZATION & RENDERING PATTERNS
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates essential performance optimization techniques
 * for building fast, scalable React applications:
 * 
 * 1. React.memo - Prevent unnecessary re-renders
 * 2. useMemo - Memoize expensive computations
 * 3. useCallback - Maintain function identity across renders
 * 4. Code Splitting - Lazy loading components
 * 5. Key Optimization - Proper list rendering
 * 6. Virtualization - Rendering only visible items
 * ============================================================================
 */

import React, { useState, useCallback, useMemo, memo } from 'react';

/*
 * ============================================================================
 * PATTERN 1: React.memo OPTIMIZATION
 * ============================================================================
 * 
 * React.memo prevents re-renders when props haven't changed.
 * Only worthwhile for expensive child components.
 */

const ExpensiveChildComponent = memo(({ count, onIncrement }) => {
  console.log('ExpensiveChild rendered');
  
  // Simulate expensive computation
  const expensiveValue = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 100000000; i++) {
      sum += i;
    }
    return sum;
  }, []);

  return (
    <div style={{
      border: '2px solid green',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px'
    }}>
      <p>Count from parent: {count}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Computed value: {expensiveValue.toString().slice(0, 10)}...
      </p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Return true if props are equal (don't re-render)
  return prevProps.count === nextProps.count && 
         prevProps.onIncrement === nextProps.onIncrement;
});

ExpensiveChildComponent.displayName = 'ExpensiveChild';

function ReactMemoExample() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const handleIncrementChild = useCallback(() => {
    setChildCount(c => c + 1);
  }, []);

  return (
    <div>
      <h4>React.memo Optimization</h4>
      <p>Parent updates won't re-render memoized child unnecessarily</p>

      <button onClick={() => setParentCount(c => c + 1)} style={{
        backgroundColor: '#667eea',
        color: 'white',
        marginBottom: '15px',
        padding: '8px 16px'
      }}>
        Update Parent Count: {parentCount}
      </button>

      <div style={{
        backgroundColor: '#f7fafc',
        padding: '15px',
        borderRadius: '4px'
      }}>
        <h5>Memoized Child Component</h5>
        <ExpensiveChildComponent
          count={childCount}
          onIncrement={handleIncrementChild}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          ✅ Open console to see when it re-renders
          (only when its props change)
        </p>
      </div>

      <code className="code-block">
{`// Wrap component in memo
const OptimizedChild = memo(
  ({ count }) => <div>{count}</div>,
  (prev, next) => prev.count === next.count
);`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 2: useMemo OPTIMIZATION
 * ============================================================================
 * 
 * Memoize expensive computations to avoid recalculation
 */

function UseMemoOptimizationExample() {
  const [items, setItems] = useState([5, 2, 8, 1, 9, 3]);
  const [renderCount, setRenderCount] = useState(0);

  // Without memoization - recalculates every render
  const sumWithoutMemo = items.reduce((a, b) => a + b, 0);

  // With memoization - only recalculates when items change
  const sumWithMemo = useMemo(() => {
    console.log('Computing sum...');
    return items.reduce((a, b) => a + b, 0);
  }, [items]);

  const handleShuffleItems = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div>
      <h4>useMemo Optimization</h4>
      <p>Expensive calculations are cached and reused</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '15px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#f7fafc',
          borderRadius: '4px'
        }}>
          <h5>Numbers</h5>
          <p>{items.join(', ')}</p>
          <button onClick={handleShuffleItems}> 🔀 Shuffle</button>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#f7fafc',
          borderRadius: '4px'
        }}>
          <h5>Sum</h5>
          <p style={{ fontSize: '24px', color: '#667eea' }}>{sumWithMemo}</p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            ✅ Recalculated only when items change
          </p>
        </div>
      </div>

      <button onClick={() => setRenderCount(c => c + 1)} style={{
        backgroundColor: '#48bb78',
        color: 'white',
        padding: '8px 16px'
      }}>
        Force Re-render: {renderCount}
      </button>

      <p style={{
        fontSize: '12px',
        marginTop: '10px',
        color: '#666'
      }}>
        💡 Click "Force Re-render" then check console.
        Sum is NOT recalculated on empty dependency change.
      </p>

      <code className="code-block">
{`const expensiveValue = useMemo(() => {
  // Heavy computation here
  return complexCalculation(data);
}, [data]); // Only recalculate when 'data' changes`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 3: useCallback OPTIMIZATION
 * ============================================================================
 * 
 * Maintain function identity across renders for callback props
 */

function UseCallbackOptimizationExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Without useCallback - new function created every render
  const handleClickWithoutCallback = () => {
    setCount(c => c + 1);
  };

  // With useCallback - same function reference
  const handleClickWithCallback = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <h4>useCallback Optimization</h4>
      <p>Maintain function identity for memoized child components</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#f7fafc',
          borderRadius: '4px'
        }}>
          <h5>Without useCallback</h5>
          <p>New function every render</p>
          <button onClick={handleClickWithoutCallback}>
            Click Me
          </button>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          borderRadius: '4px'
        }}>
          <h5>With useCallback</h5>
          <p>Same function reference</p>
          <button onClick={handleClickWithCallback}>
            Optimized Click
          </button>
        </div>
      </div>

      <p style={{ marginTop: '15px' }}>
        Count: <strong>{count}</strong>
      </p>

      <button onClick={() => setRenderCount(c => c + 1)} style={{
        backgroundColor: '#667eea',
        color: 'white',
        padding: '8px 16px',
        marginTop: '10px'
      }}>
        Force Re-render: {renderCount}
      </button>

      <code className="code-block">
{`// Without useCallback - new function each render
const handler = () => setState(value);

// With useCallback - same reference
const handler = useCallback(() => {
  setState(value);
}, []); // Memoized function

// Pass to memoized children
<MemoizedChild onClick={handler} />`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 4: RENDERING OPTIMIZATION
 * ============================================================================
 * 
 * List rendering optimization and avoiding common pitfalls
 */

function RenderingOptimizationExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);

  const handleAddItem = () => {
    const newItem = {
      id: Math.max(...items.map(i => i.id)) + 1,
      name: `Item ${items.length + 1}`
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h4>Rendering Optimization</h4>
      
      <button onClick={handleAddItem} style={{
        backgroundColor: '#667eea',
        color: 'white',
        padding: '8px 16px',
        marginBottom: '15px'
      }}>
        Add Item
      </button>

      <div>
        <h5>✅ Correct: Using ID as Key</h5>
        <div style={{
          backgroundColor: '#d4edda',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                padding: '10px',
                backgroundColor: 'white',
                marginBottom: '5px',
                borderLeft: '4px solid #48bb78'
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="note">
        <strong>❌ Never do this:</strong>
        <code style={{ display: 'block', marginTop: '8px' }}>
          {items.map((item, index) => <div key={index}>...</div>)}
        </code>
      </div>

      <code className="code-block">
{`// ✅ CORRECT: Use unique, stable IDs
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// ❌ WRONG: Never use index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 5: PERFORMANCE SUMMARY
 * ============================================================================
 */

function PerformanceSummaryExample() {
  return (
    <div>
      <h4>Performance Optimization Summary</h4>

      <div className="summary-box">
        <div className="summary-item">
          <h5>React.memo</h5>
          <p>Prevent re-renders when props unchanged (memoize components)</p>
          <code style={{ fontSize: '11px' }}>const Optimized = memo(Component);</code>
        </div>

        <div className="summary-item">
          <h5>useMemo</h5>
          <p>Cache expensive computations</p>
          <code style={{ fontSize: '11px' }}>const value = useMemo({`() => expensive()`}, [deps]);</code>
        </div>

        <div className="summary-item">
          <h5>useCallback</h5>
          <p>Maintain function identity across renders</p>
          <code style={{ fontSize: '11px' }}>const fn = useCallback({`() => {}`}, [deps]);</code>
        </div>

        <div className="summary-item">
          <h5>Proper Keys</h5>
          <p>Always use unique, stable IDs (never index!)</p>
          <code style={{ fontSize: '11px' }}>items.map(item =&gt; &lt;div key=&#123;item.id&#125;&gt;Item&lt;/div&gt;)</code>
        </div>

        <div className="summary-item">
          <h5>Code Splitting</h5>
          <p>Lazy load components with React.lazy</p>
          <code style={{ fontSize: '11px' }}>const Async = lazy({`() => import('./Component')`});</code>
        </div>
      </div>

      <div className="explanation-box">
        <h5>When to Apply Optimizations:</h5>
        <ul>
          <li>Children components: Use <code>React.memo</code></li>
          <li>Expensive calculations: Use <code>useMemo</code></li>
          <li>Callback props to memoized children: Use <code>useCallback</code></li>
          <li>Large lists: Use unique IDs as keys, consider virtualization</li>
          <li>Route-based code: Use <code>React.lazy</code></li>
        </ul>
      </div>

      <div className="note">
        <strong>⚠️ Important:</strong> Don't over-optimize! Only optimize when you have a
        measurable performance problem. Use React DevTools Profiler to identify bottlenecks.
      </div>
    </div>
  );
}

/*
 * ============================================================================
 * MAIN COMPONENT
 * ============================================================================
 */
function PerformanceOptimizationExample() {
  const [activePattern, setActivePattern] = useState('memo');

  return (
    <div className="hook-section">
      <h2>Performance Optimization & Rendering Patterns</h2>

      {/* Navigation */}
      <div className="hook-subsection">
        <h3>Select Pattern</h3>
        <div className="button-group">
          <button
            onClick={() => setActivePattern('memo')}
            style={{
              backgroundColor: activePattern === 'memo' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            React.memo
          </button>
          <button
            onClick={() => setActivePattern('usememo')}
            style={{
              backgroundColor: activePattern === 'usememo' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            useMemo
          </button>
          <button
            onClick={() => setActivePattern('callback')}
            style={{
              backgroundColor: activePattern === 'callback' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            useCallback
          </button>
          <button
            onClick={() => setActivePattern('rendering')}
            style={{
              backgroundColor: activePattern === 'rendering' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Rendering
          </button>
          <button
            onClick={() => setActivePattern('summary')}
            style={{
              backgroundColor: activePattern === 'summary' ? '#667eea' : '#ccc',
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
          {activePattern === 'memo' && <ReactMemoExample />}
          {activePattern === 'usememo' && <UseMemoOptimizationExample />}
          {activePattern === 'callback' && <UseCallbackOptimizationExample />}
          {activePattern === 'rendering' && <RenderingOptimizationExample />}
          {activePattern === 'summary' && <PerformanceSummaryExample />}
        </div>
      </div>

      {/* Best Practices */}
      <div className="hook-subsection">
        <h3>Performance Best Practices</h3>
        <ul className="explanation-box">
          <li>Use React DevTools Profiler to identify actual bottlenecks</li>
          <li>Only optimize when measurement shows it's needed</li>
          <li>Prefer proper architecture over micro-optimizations</li>
          <li>Use <code>React.memo</code> for expensive child components</li>
          <li>Use <code>useMemo</code> for expensive calculations</li>
          <li>Use <code>useCallback</code> when passing callbacks to memoized children</li>
          <li>Always use stable, unique keys in lists (never use index!)</li>
          <li>Consider virtualization for very large lists</li>
          <li>Use code splitting and lazy loading for route-based components</li>
        </ul>
      </div>
    </div>
  );
}

export default PerformanceOptimizationExample;
