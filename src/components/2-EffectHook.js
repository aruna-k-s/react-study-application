/*
 * Component: src/components/2-EffectHook.js
 *
 * === Component Purpose ===
 * This component demonstrates the useEffect hook, which is the most important
 * hook for managing side effects in functional components. useEffect replaces
 * the lifecycle methods of class components (componentDidMount, componentDidUpdate,
 * componentWillUnmount).
 *
 * A "side effect" is any operation that affects something outside the component:
 * - Fetching data from an API
 * - Setting up subscriptions
 * - Updating the DOM directly
 * - Setting timers
 * - Logging
 *
 * === React Concepts Covered ===
 * 1. useEffect hook - Running side effects
 * 2. Dependency arrays - Controlling when effects run
 * 3. Effect cleanup - Preventing memory leaks
 * 4. Running on mount/unmount
 * 5. Running on every render
 * 6. Running on specific value changes
 * 7. Data fetching patterns
 * 8. Understanding rendering vs. effects
 *
 * === Workflow ===
 * 1. Component renders
 * 2. React updates the DOM
 * 3. Browser paints the screen
 * 4. After all of that, useEffect runs
 * 5. Before the next render, cleanup runs (if provided)
 */

import React, { useState, useEffect } from 'react';

function EffectHookExample() {
  // ============================================================================
  // === State Variables ===
  // ============================================================================

  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [inputValue, setInputValue] = useState('');
  const [userId, setUserId] = useState(1);
  const [timerCount, setTimerCount] = useState(0);

  // ============================================================================
  // === Effect 1: Runs After Every Render (No Dependency Array) ===
  // ============================================================================

  /*
   * When no dependency array is provided, this effect runs after EVERY render.
   *
   * Syntax: useEffect(() => { ... })
   * - Runs after initial render
   * - Runs after every re-render caused by state or props changes
   *
   * ⚠️ WARNING: This can cause performance issues if your effect is expensive!
   *
   * Use case: Very rare. Usually, you want to specify dependencies.
   *
   * Demonstration: This effect logs to console on every render.
   * Open the browser console to see how often it runs.
   */
  useEffect(() => {
    console.log('Effect runs after EVERY render. Count is now:', count);
    document.title = `Count: ${count}`; // Update page title
  }); // No dependency array!

  // ============================================================================
  // === Effect 2: Runs Once on Mount (Empty Dependency Array) ===
  // ============================================================================

  /*
   * When dependency array is empty [], the effect runs ONLY after the
   * initial render (mounting). It never runs again for that component instance.
   *
   * Syntax: useEffect(() => { ... }, [])
   *
   * Use cases:
   * - Fetch initial data from API
   * - Set up subscriptions
   * - Initialize timers
   * - Load configuration
   *
   * This is the equivalent of componentDidMount in class components.
   */
  useEffect(() => {
    console.log('Effect runs ONCE on component mount');

    /*
     * This simulates fetching data from an API.
     * In real apps, you'd use fetch() or a library like axios.
     */
    setLoading(true);
    const timer = setTimeout(() => {
      setData({
        message: 'Data fetched successfully! (Simulated)',
        timestamp: new Date().toLocaleTimeString(),
      });
      setLoading(false);
    }, 2000); // 2 second simulated delay

    // Return a cleanup function
    // This runs when the component unmounts
    return () => {
      clearTimeout(timer);
      console.log('Cleanup: Timer cleared on unmount');
    };
  }, []); // Empty dependency array = run once on mount

  // ============================================================================
  // === Effect 3: Runs When Dependencies Change ===
  // ============================================================================

  /*
   * When a dependency array is provided with values, the effect runs:
   * - After initial render
   * - Whenever any dependency value changes
   *
   * Syntax: useEffect(() => { ... }, [dep1, dep2, dep3])
   *
   * React compares the previous dependency values with the current values
   * using Object.is() comparison (similar to ===).
   *
   * This is the most common type of effect.
   */
  useEffect(() => {
    console.log('Effect runs when userId changes. New userId:', userId);

    // Simulate fetching user data
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      // In a real app, you'd fetch data based on userId
      console.log(`Fetched data for user ${userId}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userId]); // Effect runs when userId changes

  // ============================================================================
  // === Effect 4: Window Resize Listener with Cleanup ===
  // ============================================================================

  /*
   * This effect demonstrates proper cleanup, which is crucial for preventing
   * memory leaks. When you subscribe to events or set up listeners, you MUST
   * clean them up.
   *
   * Without cleanup:
   * - Multiple listeners would stack up
   * - Memory usage would grow continuously
   * - Old listeners would still run, causing bugs
   *
   * With cleanup:
   * - Listeners are properly removed
   * - Memory stays constant
   * - Only the current listener operates
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Subscribe to resize events
    window.addEventListener('resize', handleResize);

    console.log('Event listener added');

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Event listener removed (cleanup)');
    };
  }, []); // Empty array = set up once on mount, clean up on unmount

  // ============================================================================
  // === Effect 5: Multiple Dependencies ===
  // ============================================================================

  /*
   * You can have multiple dependencies. The effect runs if ANY dependency changes.
   *
   * This is useful when your effect needs multiple values and should re-run
   * if any of them change.
   */
  useEffect(() => {
    const message = `Input: "${inputValue}", Timer: ${timerCount}`;
    console.log('Multiple dependencies triggered:', message);

    // This effect uses both inputValue and timerCount
    // It runs whenever either changes
  }, [inputValue, timerCount]); // Effect runs when inputValue OR timerCount changes

  // ============================================================================
  // === Effect 6: Timer Effect ===
  // ============================================================================

  /*
   * This effect demonstrates setting up an interval and the importance of cleanup.
   * Without cleanup, intervals would accumulate and cause performance issues.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Run once on mount, clean up on unmount

  // ============================================================================
  // === Rendering ===
  // ============================================================================

  return (
    <div className="component-section">
      <h2>useEffect Hook - Side Effects Management</h2>

      <p>
        The <code>useEffect</code> hook lets you perform side effects in functional components.
        It's the functional component equivalent of componentDidMount, componentDidUpdate,
        and componentWillUnmount combined.
      </p>

      <div className="explanation">
        <strong>Key Rule:</strong> Effects run AFTER the browser has painted the screen,
        so they don't block rendering. This is different from LayoutEffect, which runs synchronously.
      </div>

      {/* === Example 1: Effect on Every Render === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 1: Every Render (No Dependency Array)</h3>
        <p>Count: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          The title in your browser tab updates with the current count.
          Check console to see how many times the first effect runs.
          This effect runs: <span className="badge badge-danger">after every render</span>
        </p>
      </div>

      {/* === Example 2: Effect on Mount === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 2: Only on Mount (Empty Dependency Array)</h3>
        {loading && <p>Loading data...</p>}
        {data && (
          <div style={{
            backgroundColor: '#d1e7dd',
            padding: '10px',
            borderRadius: '4px',
            color: '#0f5132'
          }}>
            <p><strong>Fetched Data:</strong></p>
            <p>Message: {data.message}</p>
            <p>Time: {data.timestamp}</p>
          </div>
        )}
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          This effect runs: <span className="badge badge-success">once on mount</span>
          (Notice it ran when the component first appeared, not when you click other buttons)
        </p>
      </div>

      {/* === Example 3: Effect When Dependencies Change === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 3: When Dependencies Change</h3>
        <p>User ID: <strong>{userId}</strong></p>
        <button onClick={() => setUserId(userId - 1)} disabled={userId === 1}>Previous User</button>
        <button onClick={() => setUserId(userId + 1)} disabled={userId === 5}>Next User</button>
        {loading && <p style={{ marginTop: '10px' }}>Loading user data...</p>}
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          This effect runs: <span className="badge badge-primary">when userId changes</span>
          (Click the buttons to change userId and see the effect run)
        </p>
      </div>

      {/* === Example 4: Window Size Listener === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 4: Event Listener with Cleanup</h3>
        <p>
          Window Size: <strong>{windowSize.width}x{windowSize.height}</strong>
        </p>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          Try resizing your browser window. The size updates in real-time.
          This effect: <span className="badge badge-primary">sets up listener on mount</span>
          {' '}<span className="badge badge-danger">cleans up on unmount</span>
          <br />
          The cleanup function prevents memory leaks by removing the listener.
        </p>
      </div>

      {/* === Example 5: Multiple Dependencies === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 5: Multiple Dependencies</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          style={{ width: '200px' }}
        />
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          This effect runs when inputValue changes.
          Open the console to see it log. It depends on: <span className="badge badge-primary">inputValue</span>
        </p>
      </div>

      {/* === Example 6: Timer === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 6: Timer (Interval with Cleanup)</h3>
        <p>Timer Count: <strong>{timerCount}</strong></p>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          A timer is running in the background, incrementing every second.
          The timer: <span className="badge badge-success">starts on mount</span>
          {' '}<span className="badge badge-danger">stops on unmount</span>
          <br />
          Cleanup prevents memory leaks from abandoned intervals.
        </p>
      </div>

      {/* === Comparison Table === */}
      <div style={{ marginTop: '20px' }}>
        <h3>Effect Dependency Array Patterns</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px',
          fontSize: '0.9em'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Pattern</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>When It Runs</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}><code>useEffect(() =&gt; {})</code></td>
              <td style={{ padding: '10px' }}>After every render</td>
              <td style={{ padding: '10px' }}>Sync with external systems</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}><code>useEffect(() =&gt; {}, [])</code></td>
              <td style={{ padding: '10px' }}>Only on mount</td>
              <td style={{ padding: '10px' }}>Initialize data, setup</td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}><code>useEffect(() =&gt; {}, [dep])</code></td>
              <td style={{ padding: '10px' }}>When dep changes</td>
              <td style={{ padding: '10px' }}>Respond to specific changes</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Cleanup Function === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>About Cleanup Functions:</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Return a function from useEffect to clean up</li>
          <li>Runs BEFORE the next effect (or on unmount)</li>
          <li>Essential for unsubscribing, clearing timers, removing listeners</li>
          <li>Prevents memory leaks and duplicate listeners</li>
        </ul>
      </div>

      {/* === Summary === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>Summary:</strong> useEffect is for side effects. Control when it runs with
        dependency arrays. Always clean up resources like timers and listeners.
      </div>
    </div>
  );
}

export default EffectHookExample;

/*
 * === Effects in React 18 Strict Mode ===
 *
 * In Strict Mode (development only), React runs effects twice:
 * 1. First mount and execute cleanup
 * 2. Then mount again
 *
 * This helps catch bugs where cleanup wasn't implemented properly.
 * In production, effects only run once.
 *
 * === Dependency Array Deep Dive ===
 *
 * Dependencies are compared using Object.is() (similar to ===).
 * This means:
 * - Objects are compared by reference, not value
 * - [] (new array) !== [] (different array), even with same contents
 * - Primitive values are compared by value
 *
 * This is why you should use useMemo for computed values in dependencies.
 */
