/*
 * ============================================================================
 * USECALLBACK AND USEMEMO HOOKS DEMONSTRATION
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates two advanced performance optimization hooks:
 * - useCallback: Memoizes function references to prevent unnecessary function creations
 * - useMemo: Memoizes computed values to prevent unnecessary calculations
 * 
 * Why These Hooks Matter:
 * In React, function references and object references change on every render by default.
 * This can cause unnecessary re-renders of child components that compare references.
 * useCallback and useMemo help optimize these scenarios.
 * 
 * Real-World Scenarios:
 * - useCallback: When passing callbacks to memoized child components (React.memo)
 * - useMemo: When performing expensive calculations based on props/state
 * - Both: When data is passed to optimized child components
 * 
 * Concepts Demonstrated:
 * - Performance optimization strategies
 * - Dependency arrays and their impact
 * - Reference equality vs. value equality
 * - Memoization patterns
 * - Child component optimization with React.memo
 * ============================================================================
 */

import React, { useCallback, useMemo, useState } from 'react';

/*
 * --- Child Component: ExpensiveComputationDisplay ---
 * 
 * This component is wrapped with React.memo to show how useCallback
 * and useMemo optimize re-renders.
 * 
 * React.memo:
 * - Memoizes a component, making it only re-render if its props change
 * - Compares props using shallow equality (reference equality for objects/functions)
 * - Prevents unnecessary renders when parent component re-renders
 * 
 * If the callback wasn't memoized with useCallback, this component would
 * re-render on every parent render because the function reference would change.
 */
const ExpensiveComputationDisplay = React.memo(function ExpensiveComputationDisplay({
  onCalculate,
  computedValue,
  renderCount,
}) {
  return (
    <div className="memo-child">
      <h4>Memoized Child Component</h4>
      {/* Displays how many times this component has rendered */}
      <p>Child Component Render Count: <strong>{renderCount}</strong></p>
      <p>Computed Value: <strong>{computedValue}</strong></p>
      <button onClick={onCalculate}>Trigger Calculation</button>
      <p className="info-text">
        💡 This component is wrapped with React.memo. Without useCallback,
        it would re-render every time the parent renders due to the function reference changing.
      </p>
    </div>
  );
});

/*
 * --- Main Component ---
 */
function CallbackMemoExample() {
  // --- State Variables ---
  
  // Counter for demonstrating general parent re-renders
  const [parentCounter, setParentCounter] = useState(0);
  
  // Counter that tracks child component renders
  const [childRenderCount, setChildRenderCount] = useState(0);
  
  // Data for expensive computation
  const [baseValue, setBaseValue] = useState(10);
  const [multiplier, setMultiplier] = useState(5);
  
  // Track how many times the calculation has run
  const [calculationCount, setCalculationCount] = useState(0);

  /*
   * --- useCallback Hook ---
   * 
   * Purpose:
   * Memoizes a function so the same function reference is returned on subsequent renders
   * (unless dependencies change).
   * 
   * Syntax:
   * const memoizedCallback = useCallback(() => { ... }, [dependencies]);
   * 
   * Parameters:
   * 1. Callback function: The function to memoize
   * 2. Dependency array: Determines when the function reference should change
   * 
   * Return Value:
   * A memoized version of the callback that only changes if dependencies change
   * 
   * When to Use:
   * - Passing callbacks to memoized child components (React.memo)
   * - As a dependency in useEffect (to prevent infinite loops)
   * - When performance profiling shows function re-creation is an issue
   * 
   * Without useCallback:
   * - A new function object is created on every render
   * - Child components using React.memo will re-render (reference changed)
   * - Object comparison with === would fail
   * 
   * With useCallback:
   * - Same function reference returned if dependencies haven't changed
   * - Child components stay memoized and don't re-render unnecessarily
   * - Object comparison with === would succeed
   */
  const handleCalculate = useCallback(() => {
    setCalculationCount(prev => prev + 1);
    setChildRenderCount(prev => prev + 1);
    console.log('Calculation triggered!');
  }, []);
  // Dependency array: empty means this function never changes reference
  // If we had depends like [baseValue], function would recreate when baseValue changes

  /*
   * --- useMemo Hook ---
   * 
   * Purpose:
   * Memoizes a computed value so expensive calculations aren't re-run
   * unless dependencies change.
   * 
   * Syntax:
   * const memoizedValue = useMemo(() => { return value; }, [dependencies]);
   * 
   * Parameters:
   * 1. Computation function: Should return the computed value
   * 2. Dependency array: Determines when to recompute
   * 
   * Return Value:
   * The memoized computed value from the callback function
   * 
   * When to Use:
   * - Expensive computations (complex calculations, large array operations)
   * - Creating object/array literals that are passed to memoized components
   * - Preventing unnecessary recalculations of derived state
   * 
   * Without useMemo:
   * - Computation runs on every render even if inputs haven't changed
   * - Performance impact with expensive calculations
   * - New object reference created each render
   * 
   * With useMemo:
   * - Computation only runs when dependencies change
   * - Old value is reused if dependencies haven't changed
   * - Same object reference preserved across renders
   * 
   * Important: Don't overuse useMemo!
   * - Memoization itself has a performance cost
   * - Only use for genuinely expensive computations
   * - Profile before and after implementing useMemo
   */
  const expensiveComputedValue = useMemo(() => {
    console.log('🔄 Expensive computation running...');
    
    // This would be expensive in real-world (sorting large arrays, complex math, etc.)
    let result = 0;
    for (let i = 0; i < 50000000; i++) {
      result += i;
    }
    
    // Return the actual computed value
    return baseValue * multiplier + result * 0.0000001; // Small added value for demo
  }, [baseValue, multiplier]);
  // Dependencies: computation runs again only when baseValue or multiplier change

  return (
    <div className="hook-section">
      <h2>useCallback & useMemo: Performance Optimization Hooks</h2>

      {/* === Demonstration Section 1: useCallback === */}
      <div className="hook-subsection">
        <h3>useCallback Hook - Function Memoization</h3>
        
        <div className="explanation-box">
          <h4>What is useCallback?</h4>
          <p>
            useCallback memoizes a function so it maintains the same reference across renders
            (when dependencies don't change). This prevents unnecessary re-renders of child
            components that receive the function as a prop and are wrapped with React.memo.
          </p>
          <code className="code-block">
{`const handleClick = useCallback(() => {
  // This function maintains the same reference
  // unless dependencies change
}, [dependencies]);`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: useCallback with Memoized Child</h4>
          
          <div className="controls">
            <label>
              Parent Counter (triggers parent re-render):
              <button onClick={() => setParentCounter(prev => prev + 1)}>
                Increment Parent: {parentCounter}
              </button>
            </label>
            <p className="info-text">
              ✅ Click this button. The child component should NOT re-render because
              handleCalculate's function reference hasn't changed (thanks to useCallback).
            </p>
          </div>

          {/* Display the memoized child component */}
          <ExpensiveComputationDisplay
            onCalculate={handleCalculate}
            computedValue={calculationCount}
            renderCount={childRenderCount}
          />

          <div className="comparison">
            <h4>Key Insight</h4>
            <p>Parent renders: {parentCounter}</p>
            <p>Child renders: {childRenderCount}</p>
            <p className="note">
              🔍 Without useCallback, childRenderCount would equal parentCounter.
              With useCallback, child only re-renders when actually needed.
            </p>
          </div>
        </div>
      </div>

      {/* === Demonstration Section 2: useMemo === */}
      <div className="hook-subsection">
        <h3>useMemo Hook - Value Memoization</h3>
        
        <div className="explanation-box">
          <h4>What is useMemo?</h4>
          <p>
            useMemo memoizes a computed value. The expensive calculation only runs when
            specified dependencies change. On subsequent renders with the same dependencies,
            the previously computed value is returned.
          </p>
          <code className="code-block">
{`const expensiveValue = useMemo(() => {
  // This computation runs only when dependencies change
  return someExpensiveCalculation();
}, [dep1, dep2]);`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: useMemo with Expensive Computation</h4>
          
          <div className="controls">
            <label>
              Base Value:
              <input
                type="number"
                value={baseValue}
                onChange={e => setBaseValue(Number(e.target.value))}
              />
            </label>
            
            <label>
              Multiplier:
              <input
                type="number"
                value={multiplier}
                onChange={e => setMultiplier(Number(e.target.value))}
              />
            </label>

            <label>
              Parent Counter (doesn't affect computation):
              <button onClick={() => setParentCounter(prev => prev + 1)}>
                Re-render: {parentCounter}
              </button>
            </label>
          </div>

          <div className="result">
            <h4>Computed Result:</h4>
            <p className="value"><strong>{expensiveComputedValue.toFixed(2)}</strong></p>
            <p className="info-text">
              ✅ Open your browser's console and watch the logs.
              The "Expensive computation running..." message only appears when
              baseValue or multiplier changes, NOT when parent re-renders.
            </p>
          </div>
        </div>
      </div>

      {/* === Summary Section === */}
      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        <div className="summary-box">
          <h4>useCallback & useMemo Comparison</h4>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>useCallback</th>
                <th>useMemo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What it memoizes</td>
                <td>Function reference</td>
                <td>Computed value</td>
              </tr>
              <tr>
                <td>Return type</td>
                <td>Function</td>
                <td>Any value</td>
              </tr>
              <tr>
                <td>Best used with</td>
                <td>React.memo components</td>
                <td>Expensive calculations</td>
              </tr>
              <tr>
                <td>Dependency changes</td>
                <td>New function created</td>
                <td>Value recalculated</td>
              </tr>
              <tr>
                <td>Performance cost</td>
                <td>Memoization overhead</td>
                <td>Memoization overhead</td>
              </tr>
            </tbody>
          </table>

          <div className="tips">
            <h4>💡 Best Practices</h4>
            <ul>
              <li>
                <strong>Profile before optimizing:</strong> Use React DevTools Profiler
                to identify actual performance bottlenecks
              </li>
              <li>
                <strong>Don't prematurely optimize:</strong> useCallback and useMemo have
                overhead; only use when profiling shows it's needed
              </li>
              <li>
                <strong>Keep dependency arrays accurate:</strong> Incorrect dependencies
                lead to stale closures and subtle bugs
              </li>
              <li>
                <strong>useMemo for object/array literals:</strong> When passing objects
                to memoized components, wrap with useMemo to maintain reference equality
              </li>
              <li>
                <strong>useCallback for complex callbacks:</strong> Especially when passed
                to React.memo'd children or used in useEffect dependencies
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* === Common Mistakes Section === */}
      <div className="hook-subsection">
        <h3>Common Mistakes to Avoid</h3>
        <div className="mistakes-box">
          <div className="mistake">
            <h4>❌ Mistake 1: Incorrect Dependency Arrays</h4>
            <code className="code-block">
{`// ❌ DON'T: Missing dependencies causes stale closures
const memoized = useCallback(() => {
  return count + 1; // But count is not in dependencies!
}, []); // Wrong: stale closure, count never updates

// ✅ DO: Include all dependencies
const memoized = useCallback(() => {
  return count + 1;
}, [count]); // Correct: function updates when count changes`}
            </code>
          </div>

          <div className="mistake">
            <h4>❌ Mistake 2: Over-memoizing Simple Values</h4>
            <code className="code-block">
{`// ❌ DON'T: Overkill for simple calculations
const doubled = useMemo(() => value * 2, [value]);

// ✅ DO: Simple calculations don't need memoization
const doubled = value * 2;`}
            </code>
          </div>

          <div className="mistake">
            <h4>❌ Mistake 3: Forgetting React.memo on Child Components</h4>
            <code className="code-block">
{`// ❌ DON'T: useCallback without React.memo has no effect
const handleClick = useCallback(() => { ... }, []);
return <Child onClick={handleClick} />; // Still re-renders!

// ✅ DO: Wrap child with React.memo for useCallback to work
const Child = React.memo(function({ onClick }) { ... });
return <Child onClick={handleClick} />;`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallbackMemoExample;
