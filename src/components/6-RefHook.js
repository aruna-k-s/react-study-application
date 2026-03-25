/*
 * ============================================================================
 * USEREF HOOK DEMONSTRATION
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates the useRef hook, which provides a way to access
 * DOM elements directly and store mutable values that don't trigger re-renders.
 * 
 * Why useRef?
 * Unlike state, useRef gives you direct access to DOM elements and can store
 * mutable values that persist across renders without causing re-renders.
 * 
 * Common Use Cases:
 * 1. Accessing DOM elements directly (focus, text selection, media playback)
 * 2. Storing mutable values that don't trigger re-renders
 * 3. Keeping track of timeout/interval IDs for cleanup
 * 4. Storing the previous value of a prop or state
 * 
 * Concepts Demonstrated:
 * - DOM element references with useRef
 * - Mutable value storage
 * - Difference between useRef and useState
 * - Imperative operations on DOM elements
 * - Accessing current value with ref.current
 * ============================================================================
 */

import React, { useRef, useState } from 'react';

function RefHookExample() {
  /* ============================================================================
   * SECTION 1: DOM Element Access with useRef
   * ============================================================================
   * 
   * useRef creates a "box" that holds a mutable reference to a DOM element.
   * Unlike state, modifying a ref does NOT trigger a re-render.
   */

  // --- Creating Refs ---
  
  /*
   * useRef Hook Syntax:
   * const ref = useRef(initialValue);
   * 
   * Parameters:
   * - initialValue: The initial value stored in the ref (can be anything)
   * 
   * Return Value:
   * - A ref object with a .current property that stores the actual value
   * 
   * Key Difference from State:
   * - useRef returns the same object reference on every render
   * - Modifying ref.current does NOT trigger a re-render
   * - useState returns new reference but triggers re-render
   * 
   * Usage:
   * const ref = useRef(null);
   * // Later, attach to element: <input ref={ref} />
   * // Access: ref.current (the DOM element)
   */
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);
  const videoRef = useRef(null);

  // --- State for demonstrations ---
  const [text, setText] = useState('');
  const [focusCount, setFocusCount] = useState(0);

  /*
   * --- Imperative DOM Manipulation ---
   * These functions demonstrate using refs to imperatively manipulate the DOM.
   * "Imperative" means explicitly telling React what to do with the DOM.
   * 
   * Contrast with "Declarative" (normal React) where you describe what should
   * be shown and React handles the DOM updates.
   * 
   * When to use imperative operations:
   * - Focus management
   * - Text selection
   * - Media playback control (play, pause, etc.)
   * - Triggering animations
   * - Integration with non-React libraries
   */

  const handleFocusInput = () => {
    // --- Accessing the DOM Element ---
    // ref.current gives us the actual DOM element
    if (inputRef.current) {
      inputRef.current.focus();
      // Increment count (doesn't use input's ref, uses state)
      setFocusCount(prev => prev + 1);
    }
  };

  const handleSelectAllText = () => {
    if (textAreaRef.current) {
      // Imperative selection of all text
      textAreaRef.current.select();
    }
  };

  const handleClearText = () => {
    if (textAreaRef.current) {
      // Imperatively clear the text
      textAreaRef.current.value = '';
      // Also update React state to keep them in sync
      setText('');
    }
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      // Imperative control of video element
      videoRef.current.play();
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  /* ============================================================================
   * SECTION 2: Storing Mutable Values with useRef
   * ============================================================================
   */

  // Create a ref to store a mutable value (not for DOM element)
  const renderCountRef = useRef(0);

  // --- Incrementing the render count ---
  // This demonstrates that ref updates don't trigger re-renders
  // The value persists across renders but doesn't cause re-renders
  React.useEffect(() => {
    renderCountRef.current += 1;
  }); // No dependency array = runs after every render

  /* ============================================================================
   * SECTION 3: Storing Previous Value
   * ============================================================================
   */

  // Create a ref to store the previous value of text
  const prevTextRef = useRef('');

  React.useEffect(() => {
    // After rendering, store the current text as the previous value for next time
    prevTextRef.current = text;
  }, [text]);

  return (
    <div className="hook-section">
      <h2>useRef Hook: Direct DOM Access & Mutable Values</h2>

      {/* === Section 1: DOM Element Access === */}
      <div className="hook-subsection">
        <h3>1. Accessing DOM Elements with useRef</h3>
        
        <div className="explanation-box">
          <h4>What is useRef?</h4>
          <p>
            useRef creates a persistent reference to a DOM element or value.
            Unlike state, it doesn't trigger re-renders when updated, and it
            persists the same reference across renders.
          </p>
          <code className="code-block">
{`// Creating a ref
const inputRef = useRef(null);

// Attaching to element
<input ref={inputRef} />

// Accessing the DOM element
inputRef.current.focus();`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: Focus Management</h4>
          <div className="controls">
            {/* --- Input Element with Ref --- */}
            {/*
             * The ref attribute connects this input element to inputRef.
             * When attached, inputRef.current becomes the actual DOM element.
             */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Click 'Focus Input' button to focus this field"
              onChange={e => setText(e.target.value)}
            />
            
            <button onClick={handleFocusInput}>
              Focus Input ({focusCount} times)
            </button>
          </div>
          
          <div className="info-box">
            <p className="info-text">
              ✅ Click the button to programmatically focus the input.
              useRef lets you imperatively control DOM elements.
            </p>
          </div>
        </div>

        <div className="demo-box">
          <h4>Demo: Text Selection</h4>
          <div className="controls">
            <textarea
              ref={textAreaRef}
              placeholder="Type here or click 'Select All' to select all text"
              value={text}
              onChange={e => setText(e.target.value)}
              rows="4"
            />
            
            <div className="button-group">
              <button onClick={handleSelectAllText}>Select All Text</button>
              <button onClick={handleClearText}>Clear Text</button>
            </div>
          </div>
          
          <div className="info-box">
            <p className="info-text">
              ✅ These operations are imperative - you're directly commanding
              what the DOM should do, not just describing state.
            </p>
          </div>
        </div>

        <div className="demo-box">
          <h4>Demo: Media Control</h4>
          <div className="controls">
            {/* Simple video element with ref */}
            {/* Using a data URL for a simple test video */}
            <video
              ref={videoRef}
              width="300"
              style={{ border: '1px solid #ccc', marginBottom: '10px' }}
              crossOrigin="anonymous"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            
            <div className="button-group">
              <button onClick={handlePlayVideo}>Play Video</button>
              <button onClick={handlePauseVideo}>Pause Video</button>
            </div>
          </div>
          
          <div className="info-box">
            <p className="info-text">
              ✅ Using refs to control video playback imperatively.
              This is a common pattern for media elements.
            </p>
          </div>
        </div>
      </div>

      {/* === Section 2: Mutable Values === */}
      <div className="hook-subsection">
        <h3>2. Storing Mutable Values with useRef</h3>
        
        <div className="explanation-box">
          <h4>useRef for Mutable Values</h4>
          <p>
            useRef is also useful for storing mutable values that should persist
            across renders WITHOUT triggering re-renders. This is perfect for:
            - Tracking internal state that doesn't need UI updates
            - Storing timer IDs for cleanup
            - Caching values between renders
          </p>
          <code className="code-block">
{`// Store mutable value
const countRef = useRef(0);

// Update it (doesn't trigger re-render)
countRef.current += 1;

// Access it
console.log(countRef.current); // 1, 2, 3...`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: Render Count Tracking</h4>
          <div className="info-box">
            <p className="value"><strong>Total Renders: {renderCountRef.current}</strong></p>
            <p className="info-text">
              ✅ This component has rendered {renderCountRef.current} times.
              The render count is tracked using useRef but doesn't cause re-renders.
              Try interacting with other elements above - the count keeps increasing
              without explicitly updating state!
            </p>
            <p className="note">
              Note: Initial render counts vary based on React.StrictMode (dev-only behavior).
            </p>
          </div>
        </div>
      </div>

      {/* === Section 3: Storing Previous Value === */}
      <div className="hook-subsection">
        <h3>3. Storing Previous Values</h3>
        
        <div className="explanation-box">
          <h4>Common Pattern: Track Previous Value</h4>
          <p>
            A common pattern is using useRef with useEffect to track the previous
            value of a prop or state. This is useful for detecting what changed.
          </p>
          <code className="code-block">
{`const prevValueRef = useRef('');

useEffect(() => {
  // After rendering, store current as previous for next time
  prevValueRef.current = value;
}, [value]);

// Now you can compare: value vs prevValueRef.current`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: Tracking Previous Value</h4>
          <div className="info-box">
            <p>Current Text: <strong>{text}</strong></p>
            <p>Previous Text: <strong>{prevTextRef.current}</strong></p>
            <p className="info-text">
              ✅ Edit the textarea above. This component remembers the previous
              text value using useRef with useEffect.
            </p>
          </div>
        </div>
      </div>

      {/* === Summary Section === */}
      <div className="hook-subsection">
        <h3>useRef vs useState: When to Use Each</h3>
        
        <div className="comparison-box">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>useState</th>
                <th>useRef</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Trigger re-render?</td>
                <td>✅ Yes</td>
                <td>❌ No</td>
              </tr>
              <tr>
                <td>Mutable value?</td>
                <td>❌ Immutable</td>
                <td>✅ Mutable</td>
              </tr>
              <tr>
                <td>Reference persistence</td>
                <td>New reference each render</td>
                <td>Same reference always</td>
              </tr>
              <tr>
                <td>Best for</td>
                <td>UI state, display data</td>
                <td>DOM access, internal tracking</td>
              </tr>
              <tr>
                <td>Update timing</td>
                <td>Immediately scheduled</td>
                <td>Immediate, no delay</td>
              </tr>
              <tr>
                <td>Use case example</td>
                <td>Form inputs, counters</td>
                <td>Focus management, timers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* === Best Practices === */}
      <div className="hook-subsection">
        <h3>Best Practices with useRef</h3>
        
        <div className="tips-box">
          <div className="tip">
            <h4>✅ DO: Use for DOM Access</h4>
            <code className="code-block">
{`const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus(); // Good use case`}
            </code>
          </div>

          <div className="tip">
            <h4>✅ DO: Use for Mutable Values That Don't Affect UI</h4>
            <code className="code-block">
{`const timerIdRef = useRef(null);
// Store timer ID for cleanup
timerIdRef.current = setInterval(() => { ... }, 1000);`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Use Instead of useState for Display State</h4>
            <code className="code-block">
{`// ❌ Wrong: Won't update UI
const countRef = useRef(0);
countRef.current++; // No re-render!

// ✅ Correct: Use state for UI
const [count, setCount] = useState(0);
setCount(prev => prev + 1); // Re-renders UI`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Create Refs in Loops</h4>
            <code className="code-block">
{`// ❌ Wrong: Breaks rules of hooks
items.map(() => const ref = useRef(null)); // Never do this!

// ✅ Correct: Create ref once at top level
const itemsRef = useRef(new Array());`}
            </code>
          </div>
        </div>
      </div>

      {/* === Real-World Use Cases === */}
      <div className="hook-subsection">
        <h3>Real-World Use Cases</h3>
        
        <div className="use-cases-box">
          <div className="use-case">
            <h4>1. Focus Management in Forms</h4>
            <p>Move focus to first error field automatically</p>
          </div>

          <div className="use-case">
            <h4>2. Managing Third-Party Library Instances</h4>
            <p>Store chart instances, map objects, or other external references</p>
          </div>

          <div className="use-case">
            <h4>3. Storing Cached Values</h4>
            <p>Cache expensive computations without re-rendering unnecessarily</p>
          </div>

          <div className="use-case">
            <h4>4. Text Selection Management</h4>
            <p>Select text ranges for styling or copying</p>
          </div>

          <div className="use-case">
            <h4>5. Media Element Control</h4>
            <p>Play/pause/seek video or audio elements programmatically</p>
          </div>

          <div className="use-case">
            <h4>6. Timeout/Interval Management</h4>
            <p>Store timer IDs for cleanup in useEffect</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefHookExample;
