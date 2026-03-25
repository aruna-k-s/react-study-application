/*
 * ============================================================================
 * USELAYOUTEFFECT HOOK DEMONSTRATION  
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates useLayoutEffect, useDebugValue, and shows the
 * difference between useEffect and useLayoutEffect.
 * 
 * Key Difference from useEffect:
 * - useEffect: Runs AFTER the browser paints (asynchronous)
 * - useLayoutEffect: Runs BEFORE the browser paints (synchronous)
 * 
 * Use Cases for useLayoutEffect:
 * - Measuring DOM elements (width, height, position)
 * - Reading layout information
 * - Synchronously updating the DOM before browser paints
 * - Animations that need to start immediately without flicker
 * 
 * ⚠️ Important: useLayoutEffect can hurt performance if misused!
 * Most of the time, useEffect is the better choice.
 * ============================================================================
 */

import React, { useEffect, useLayoutEffect, useState, useDebugValue } from 'react';

/*
 * === Demonstration of Timing Differences ===
 * 
 * This component shows when useEffect vs useLayoutEffect execute
 */
function TimingComparison() {
  const [effectLog, setEffectLog] = useState([]);

  // --- useEffect: Runs after paint ---
  // This runs AFTER the browser has painted the DOM
  useEffect(() => {
    setEffectLog(prev => [...prev, `useEffect executed at ${new Date().toLocaleTimeString()}`]);
  }, []);

  // --- useLayoutEffect: Runs before paint ---
  // This runs BEFORE the browser paints
  // The browser waits for this to complete before painting
  useLayoutEffect(() => {
    setEffectLog(prev => [...prev, `useLayoutEffect executed at ${new Date().toLocaleTimeString()}`]);
  }, []);

  return (
    <div className="timing-demo">
      <h4>Execution Order</h4>
      <ul>
        {effectLog.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

/*
 * === Practical Example: Measuring DOM Elements ===
 * 
 * useLayoutEffect is perfect for reading DOM measurements
 * because it runs before paint (no flash of unstyled content)
 */
function MeasurementExample() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const boxRef = React.useRef(null);

  /*
   * --- useLayoutEffect for DOM Measurements ---
   * 
   * Why useLayoutEffect here?
   * - We need to measure the DOM element
   * - We need to update state based on measurements
   * - We want this done BEFORE the browser paints
   * - This prevents layout flashing/jank
   * 
   * If we used useEffect instead:
   * - Browser would paint with incorrect sizes
   * - Then update with correct sizes (flicker!)
   * - With useLayoutEffect: sizes are correct before paint
   */
  useLayoutEffect(() => {
    if (boxRef.current) {
      setSize({
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight,
      });

      console.log('Measured element dimensions before paint');
    }
  }, []); // Runs once after initial render

  return (
    <div className="measurement-demo">
      <h4>DOM Element Measurement</h4>
      <div
        ref={boxRef}
        style={{
          border: '2px solid blue',
          padding: '20px',
          width: '200px',
          height: '100px',
        }}
      >
        <p>This element is measured with useLayoutEffect</p>
      </div>
      <p className="measurement-result">
        Dimensions: {size.width}px × {size.height}px
      </p>
      <p className="info-text">
        ✅ useLayoutEffect reads the DOM synchronously before paint,
        preventing layout flashing.
      </p>
    </div>
  );
}

/*
 * === Animation Example ===
 * 
 * useLayoutEffect can prevent animation jank by synchronously
 * setting up animations before browser paint
 */
function AnimationExample() {
  const [isAnimating, setIsAnimating] = useState(false);
  const boxRef = React.useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box || !isAnimating) return;

    // Synchronously set initial animation state
    // This runs before paint, so animation doesn't flash
    box.style.transition = 'none';
    box.style.transform = 'translateX(0)';

    // Force layout recalculation
    void box.offsetHeight;

    // Now set up the actual animation
    box.style.transition = 'transform 0.5s ease-in-out';
    box.style.transform = 'translateX(200px)';

    console.log('Animation set up synchronously before paint');
  }, [isAnimating]);

  return (
    <div className="animation-demo">
      <h4>Smooth Animation with useLayoutEffect</h4>
      <button onClick={() => setIsAnimating(!isAnimating)}>
        {isAnimating ? 'Stop' : 'Start'} Animation
      </button>
      <div
        ref={boxRef}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'red',
          marginTop: '20px',
        }}
      />
      <p className="info-text">
        ✅ useLayoutEffect prevents animation flicker by setting up
        the animation before the browser paints the first frame.
      </p>
    </div>
  );
}

/*
 * === Custom Hook Example with useDebugValue ===
 * 
 * This demonstrates useDebugValue, which helps with debugging
 * custom hooks in React DevTools
 */

/*
 * --- Custom Hook: useWindowSize ---
 * 
 * This custom hook tracks window dimensions and demonstrates
 * useDebugValue for debugging.
 */
function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /*
   * --- useDebugValue Hook ---
   * 
   * Purpose:
   * Provides a label for this hook in React DevTools.
   * Only visible in React DevTools, not in the app itself.
   * 
   * Why useDebugValue?
   * - Helps debug custom hooks
   * - Provides human-readable value in DevTools
   * - Optional: can format complex values
   * 
   * Syntax:
   * useDebugValue(value, formatFunction);
   * 
   * Parameters:
   * 1. value: The value to display in DevTools
   * 2. formatFunction: Optional function to format the display
   * 
   * Note: Very minor performance overhead, only use in development
   */
  useDebugValue(
    `${size.width}×${size.height}`,
    // Format function - formats how it displays in DevTools
    (value) => `Window size: ${value}`
  );

  return size;
}

/*
 * === Main Component ===
 */
function LayoutEffectExample() {
  const windowSize = useWindowSize();

  return (
    <div className="hook-section">
      <h2>useLayoutEffect & useDebugValue: Timing & Debugging</h2>

      {/* === Explanation Section === */}
      <div className="hook-subsection">
        <h3>Understanding useLayoutEffect</h3>
        
        <div className="explanation-box">
          <h4>useEffect vs useLayoutEffect</h4>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>useEffect</th>
                <th>useLayoutEffect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Timing</td>
                <td>After browser paint</td>
                <td>Before browser paint</td>
              </tr>
              <tr>
                <td>Blocking?</td>
                <td>Non-blocking</td>
                <td>Blocks browser paint</td>
              </tr>
              <tr>
                <td>Performance</td>
                <td>Better for most cases</td>
                <td>Can cause jank</td>
              </tr>
              <tr>
                <td>Use for</td>
                <td>Side effects, data fetching</td>
                <td>DOM measurements, animations</td>
              </tr>
              <tr>
                <td>Visual flicker</td>
                <td>Possible</td>
                <td>Prevention</td>
              </tr>
            </tbody>
          </table>

          <code className="code-block">
{`// useEffect - runs after paint (asynchronous)
useEffect(() => {
  // Browser paints first, then this runs
}, [deps]);

// useLayoutEffect - runs before paint (synchronous)
useLayoutEffect(() => {
  // This must complete before browser paints
}, [deps]);`}
          </code>
        </div>
      </div>

      {/* === Timing Demo === */}
      <div className="hook-subsection">
        <h3>Execution Timing Demonstration</h3>
        <div className="demo-box">
          <TimingComparison />
          <p className="info-text">
            ✅ Open browser console to see the execution order.
            useLayoutEffect executes before useEffect in the same render cycle.
          </p>
        </div>
      </div>

      {/* === DOM Measurement Demo === */}
      <div className="hook-subsection">
        <h3>Use Case 1: DOM Measurements</h3>
        <div className="demo-box">
          <MeasurementExample />
          <p className="tip">
            Use useLayoutEffect when you need to read DOM dimensions
            or positions before the browser paints. This prevents flashing.
          </p>
        </div>
      </div>

      {/* === Animation Demo === */}
      <div className="hook-subsection">
        <h3>Use Case 2: Smooth Animations</h3>
        <div className="demo-box">
          <AnimationExample />
          <p className="tip">
            useLayoutEffect ensures animations are set up before paint,
            preventing the first frame from being drawn incorrectly.
          </p>
        </div>
      </div>

      {/* === useDebugValue Demo === */}
      <div className="hook-subsection">
        <h3>useDebugValue: Debugging Custom Hooks</h3>
        
        <div className="explanation-box">
          <h4>What is useDebugValue?</h4>
          <p>
            useDebugValue provides a label for custom hooks when debugging
            in React DevTools. It's only visible in the browser's React DevTools,
            not in the actual application.
          </p>
          <code className="code-block">
{`function useCustomHook() {
  const [value, setValue] = useState(0);
  
  // Display "CustomHook: 123" in React DevTools
  useDebugValue(value, v => \`CustomHook: \${v}\`);
  
  return [value, setValue];
}`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: Custom Hook with useDebugValue</h4>
          <p>
            Current window size: <strong>{windowSize.width} × {windowSize.height}</strong>
          </p>
          <p className="info-text">
            ✅ To see useDebugValue in action:
            1. Install React DevTools Browser Extension
            2. Open DevTools and go to the Components tab
            3. Find a component using useWindowSize
            4. The hook is labeled with "Window size: WxH"
          </p>
          <p className="tip">
            useDebugValue is purely a developer debugging tool with no
            impact on your application's functionality or performance.
          </p>
        </div>
      </div>

      {/* === When to Use === */}
      <div className="hook-subsection">
        <h3>When to Use useLayoutEffect</h3>
        
        <div className="tips-box">
          <div className="tip">
            <h4>✅ DO Use useLayoutEffect For:</h4>
            <ul>
              <li>Reading DOM measurements (width, height, scroll position)</li>
              <li>Reading computed styles</li>
              <li>Getting element visibility</li>
              <li>Setting up animations that shouldn't flicker</li>
              <li>Synchronous state updates based on DOM</li>
            </ul>
          </div>

          <div className="tip">
            <h4>❌ DON'T Use useLayoutEffect For:</h4>
            <ul>
              <li>Effects that don't involve DOM measurements</li>
              <li>Data fetching (use useEffect)</li>
              <li>Network requests</li>
              <li>Setting up event listeners (use useEffect)</li>
              <li>Any async operations</li>
            </ul>
          </div>

          <div className="tip">
            <h4>⚠️ Warning: Performance Impact</h4>
            <p>
              useLayoutEffect runs synchronously and blocks browser paint.
              If your effect takes time, it will block the browser and cause
              jank. Only use when absolutely necessary for avoiding visual flicker.
            </p>
          </div>
        </div>
      </div>

      {/* === useDebugValue Details === */}
      <div className="hook-subsection">
        <h3>useDebugValue: Advanced Debugging</h3>
        
        <div className="tips-box">
          <div className="tip">
            <h4>Basic Usage:</h4>
            <code className="code-block">
{`// Simple display
useDebugValue(value);

// With formatting function
useDebugValue(value, v => \`Formatted: \${v}\`);

// For complex objects
useDebugValue(
  data,
  d => JSON.stringify(d, null, 2)
);`}
            </code>
          </div>

          <div className="tip">
            <h4>Advanced Use: Conditional Formatting</h4>
            <code className="code-block">
{`function useCustomHook() {
  const [value, setValue] = useState(0);
  
  useDebugValue(
    value,
    v => {
      if (v === 0) return 'Empty';
      if (v > 100) return 'Large';
      return \`Value: \${v}\`;
    }
  );
  
  return [value, setValue];
}`}
            </code>
          </div>

          <div className="tip">
            <h4>💡 Real-World Example: useAuth Hook</h4>
            <code className="code-block">
{`function useAuth() {
  const [authState, setAuthState] = useState(null);
  
  useDebugValue(
    authState,
    state => state 
      ? \`Authenticated: \${state.username}\`
      : 'Not authenticated'
  );
  
  return authState;
}`}
            </code>
          </div>
        </div>
      </div>

      {/* === Summary === */}
      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        
        <div className="summary-box">
          <div className="takeaway">
            <h4>useLayoutEffect Timing</h4>
            <p>
              Render → useLayoutEffect runs → Browser paints → useEffect runs
            </p>
          </div>

          <div className="takeaway">
            <h4>Performance First</h4>
            <p>
              Default to useEffect. Only use useLayoutEffect when you need
              DOM measurements or animations that would otherwise flicker.
            </p>
          </div>

          <div className="takeaway">
            <h4>useDebugValue</h4>
            <p>
              Use it in custom hooks to make React DevTools more helpful
              for debugging. It has zero impact on your app's performance.
            </p>
          </div>

          <div className="takeaway">
            <h4>Avoid Common Pitfall</h4>
            <p>
              useLayoutEffect blocks browser paint. If they take a long time,
              users will experience jank. Keep them fast!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutEffectExample;
