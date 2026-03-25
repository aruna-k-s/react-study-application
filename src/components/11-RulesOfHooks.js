/*
 * ============================================================================
 * RULES OF HOOKS & BEST PRACTICES
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates the essential rules that must be followed when
 * using React hooks. Breaking these rules leads to bugs and unpredictable behavior.
 * 
 * Three Critical Rules:
 * 1. Only call hooks at the top level (not inside loops, conditions, or nested functions)
 * 2. Only call hooks from React function components or custom hooks
 * 3. Follow the Rules of Hooks ESLint plugin to enforce these rules
 * 
 * Why These Rules?
 * React relies on the order of hook calls to correctly manage state and effects.
 * If hooks are called conditionally or in different orders, React's internal
 * state tracking breaks.
 * ============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';

/*
 * === CORRECT: Hooks at Top Level ===
 */
function CorrectHookUsage() {
  // ✅ Hooks are called unconditionally at top level
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Effect runs correctly');
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}

/*
 * === WRONG: Conditional Hooks (DON'T DO THIS!) ===
 * This component demonstrates the WRONG way - for educational purposes only
 */
function WrongConditionalHooks({ showCounter }) {
  // ❌ DO NOT DO THIS - Hook inside condition!
  // if (showCounter) {
  //   const [count, setCount] = useState(0); // WRONG!
  // }
  
  // This causes:
  // 1. State to be lost when showCounter changes
  // 2. Hook call order to change
  // 3. React's internal state tracking to break

  // ✅ CORRECT: Call hook unconditionally, use the condition in logic
  const [count, setCount] = useState(0);

  if (!showCounter) {
    return <p>Counter is hidden</p>;
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}

/*
 * === WRONG: Hooks Inside Loops (DON'T DO THIS!) ===
 */
function WrongHooksInLoop() {
  // ❌ DO NOT DO THIS - Hooks inside loop!
  // const items = [1, 2, 3];
  // items.forEach(item => {
  //   const [state, setState] = useState(0); // WRONG!
  // });

  // ✅ CORRECT: Store data in a single state object
  const [items, setItems] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
  ]);

  const updateItem = (id, newValue) => {
    setItems(prev =>
      prev.map(item => 
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <p>Item {item.id}: {item.value}</p>
          <button onClick={() => updateItem(item.id, item.value + 1)}>
            Increment
          </button>
        </div>
      ))}
    </div>
  );
}

/*
 * === WRONG: Hooks Inside Nested Functions ===
 */
function WrongHooksInNestedFunction() {
  // ❌ DO NOT DO THIS - Hook inside nested function!
  // const handleClick = () => {
  //   const [state, setState] = useState(0); // WRONG!
  // };

  // ✅ CORRECT: Call hooks at top level
  const [state, setState] = useState(0);

  const handleClick = useCallback(() => {
    setState(prev => prev + 1);
  }, []);

  return <button onClick={handleClick}>Click me</button>;
}

/*
 * ============================================================================
 * MAIN COMPONENT: RULES OF HOOKS
 * ============================================================================
 */
function RulesOfHooksExample() {
  const [showDemo, setShowDemo] = useState('correct');

  return (
    <div className="hook-section">
      <h2>Rules of Hooks: Essential Guidelines</h2>

      {/* === Introduction === */}
      <div className="hook-subsection">
        <h3>The Three Essential Rules</h3>
        
        <div className="explanation-box">
          <h4>Rule 1: Only Call at Top Level</h4>
          <p>
            Never call hooks inside loops, conditions, or nested functions.
            React uses the order of hook calls to manage state correctly.
          </p>
          <code className="code-block">
{`// ✅ CORRECT
function MyComponent() {
  const [count, setCount] = useState(0); // Top level
  
  return <div>{count}</div>;
}

// ❌ WRONG
function MyComponent({ showCounter }) {
  if (showCounter) {
    const [count, setCount] = useState(0); // Inside condition!
  }
}`}
          </code>
        </div>

        <div className="explanation-box">
          <h4>Rule 2: Only Call from React Functions</h4>
          <p>
            Only call hooks from React functional components or custom hooks.
            Don't call them from regular JavaScript functions, event handlers, or classes.
          </p>
          <code className="code-block">
{`// ✅ CORRECT
function MyComponent() {
  const [state, setState] = useState(0);
  
  return <div>{state}</div>;
}

// ✅ ALSO CORRECT (Custom hook)
function useCustomHook() {
  const [state, setState] = useState(0);
  return state;
}

// ❌ WRONG (Regular function)
function regularFunction() {
  const [state, setState] = useState(0); // ERROR!
}

// ❌ WRONG (Event handler)
const handleClick = () => {
  const [state, setState] = useState(0); // ERROR!
};`}
          </code>
        </div>

        <div className="explanation-box">
          <h4>Rule 3: Use ESLint Plugin</h4>
          <p>
            Use the `eslint-plugin-react-hooks` plugin to automatically enforce
            these rules during development. It catches violations before runtime.
          </p>
          <code className="code-block">
{`// In .eslintrc.json or setup
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}`}
          </code>
        </div>
      </div>

      {/* === Demo Section === */}
      <div className="hook-subsection">
        <h3>Interactive Demonstrations</h3>
        
        <div className="demo-box">
          <h4>Select a Demo</h4>
          <div className="button-group">
            <button
              onClick={() => setShowDemo('correct')}
              style={{
                backgroundColor: showDemo === 'correct' ? '#667eea' : '#ccc',
                color: 'white'
              }}
            >
              ✅ Correct Usage
            </button>
            <button
              onClick={() => setShowDemo('conditional')}
              style={{
                backgroundColor: showDemo === 'conditional' ? '#667eea' : '#ccc',
                color: 'white'
              }}
            >
              ❌ Conditional Hooks
            </button>
            <button
              onClick={() => setShowDemo('loop')}
              style={{
                backgroundColor: showDemo === 'loop' ? '#667eea' : '#ccc',
                color: 'white'
              }}
            >
              ❌ Hooks in Loop
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            {showDemo === 'correct' && <CorrectHookUsage />}
            {showDemo === 'conditional' && <WrongConditionalHooks showCounter={true} />}
            {showDemo === 'loop' && <WrongHooksInLoop />}
          </div>
        </div>
      </div>

      {/* === Why These Rules Matter === */}
      <div className="hook-subsection">
        <h3>Why These Rules Exist</h3>
        
        <div className="tips-box">
          <div className="tip">
            <h4>🔍 Hook Call Order is Critical</h4>
            <p>
              React uses a calling order to track which state belongs to which hook.
              If you call hooks in different orders, React's mapping breaks:
            </p>
            <code className="code-block">
{`// First render:
useState() → state1
useState() → state2

// If second render skips first hook:
useState() → Gets state2's value! (WRONG!)`}
            </code>
          </div>

          <div className="tip">
            <h4>🧩 Consistent Component Structure</h4>
            <p>
              Hooks enable a simpler mental model than class components.
              Rules of Hooks maintain this consistency and predictability.
            </p>
          </div>

          <div className="tip">
            <h4>🐛 Debugging is Easier</h4>
            <p>
              When hooks follow the rules, debugging is straightforward.
              Breaking rules creates confusing, hard-to-track bugs.
            </p>
          </div>

          <div className="tip">
            <h4>⚡ Performance Optimization</h4>
            <p>
              Consistent hook calling allows React to optimize re-renders
              and dependency tracking more effectively.
            </p>
          </div>
        </div>
      </div>

      {/* === Common Mistakes === */}
      <div className="hook-subsection">
        <h3>Common Violations & Fixes</h3>
        
        <div className="mistakes-box">
          <div className="mistake">
            <h4>❌ Mistake 1: Hook in Conditional</h4>
            <code className="code-block">
{`// ❌ WRONG
function Component({ isVisible }) {
  if (isVisible) {
    const [state, setState] = useState(0);
  }
  return <div />;
}

// ✅ CORRECT
function Component({ isVisible }) {
  const [state, setState] = useState(0);
  if (!isVisible) return null;
  return <div>{state}</div>;
}`}
            </code>
          </div>

          <div className="mistake">
            <h4>❌ Mistake 2: Hook in Loop</h4>
            <code className="code-block">
{`// ❌ WRONG
function Component({ items }) {
  items.forEach(item => {
    const [state, setState] = useState(0);
  });
}

// ✅ CORRECT
function Component({ items }) {
  const [states, setStates] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );
}`}
            </code>
          </div>

          <div className="mistake">
            <h4>❌ Mistake 3: Hook in Event Handler</h4>
            <code className="code-block">
{`// ❌ WRONG
function Component() {
  const handleClick = () => {
    const [state, setState] = useState(0);
  };
}

// ✅ CORRECT
function Component() {
  const [state, setState] = useState(0);
  const handleClick = () => {
    setState(prev => prev + 1);
  };
}`}
            </code>
          </div>

          <div className="mistake">
            <h4>❌ Mistake 4: Hook outside Component</h4>
            <code className="code-block">
{`// ❌ WRONG
const [state, setState] = useState(0);
function Component() {
  return <div>{state}</div>;
}

// ✅ CORRECT
function Component() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}`}
            </code>
          </div>
        </div>
      </div>

      {/* === ESLint Plugin === */}
      <div className="hook-subsection">
        <h3>Using ESLint Plugin to Catch Violations</h3>
        
        <div className="tips-box">
          <div className="tip">
            <h4>Installation</h4>
            <code className="code-block">
{`npm install eslint-plugin-react-hooks --save-dev`}
            </code>
          </div>

          <div className="tip">
            <h4>Configuration</h4>
            <code className="code-block">
{`// .eslintrc.json
{
  "plugins": ["react-hooks"],
  "rules": {
    // Enforces rules of hooks
    "react-hooks/rules-of-hooks": "error",
    
    // Warns about missing dependencies
    "react-hooks/exhaustive-deps": "warn"
  }
}`}
            </code>
          </div>

          <div className="tip">
            <h4>What It Catches</h4>
            <ul>
              <li>Hooks called inside conditions ❌</li>
              <li>Hooks called inside loops ❌</li>
              <li>Hooks in regular functions ❌</li>
              <li>Missing dependencies in useEffect ⚠️</li>
              <li>Missing dependencies in useCallback ⚠️</li>
              <li>Missing dependencies in useMemo ⚠️</li>
            </ul>
          </div>
        </div>
      </div>

      {/* === Summary === */}
      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        
        <div className="summary-box">
          <div className="summary-item">
            <h4>Rule 1: Top Level Only</h4>
            <p>Never call hooks conditionally, in loops, or in nested functions</p>
          </div>

          <div className="summary-item">
            <h4>Rule 2: React Functions Only</h4>
            <p>Only call hooks from components and custom hooks, never elsewhere</p>
          </div>

          <div className="summary-item">
            <h4>Rule 3: Use ESLint</h4>
            <p>Enable the ESLint plugin to catch violations automatically</p>
          </div>

          <div className="summary-item">
            <h4>Why It Matters</h4>
            <p>
              Breaking these rules causes state confusion, lost state,
              and unpredictable behavior. Always follow them!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesOfHooksExample;
