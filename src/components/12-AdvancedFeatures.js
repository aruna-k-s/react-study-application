/*
 * ============================================================================
 * ADVANCED REACT FEATURES & PATTERNS
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates advanced React features that go beyond basic
 * hooks and component patterns:
 * 
 * 1. Fragments (<>) - Rendering multiple elements without a wrapper
 * 2. Portals - Rendering components outside the DOM hierarchy
 * 3. Suspense & Code Splitting - Lazy loading components
 * 4. Key Prop Importance - Critical for list rendering
 * 5. Controlled vs Uncontrolled Components - Form handling patterns
 * 6. Lifting State Up - Architecture pattern
 * 7. Composition patterns - Building complex UIs
 * ============================================================================
 */

import React, { useState, Suspense, lazy } from 'react';

// Note: In production, you'd use React.lazy with actual components
// const LazyComponent = lazy(() => import('./SomeComponent'));

/*
 * ============================================================================
 * PATTERN 1: FRAGMENTS
 * ============================================================================
 * 
 * Fragments allow you to return multiple elements without adding an extra
 * DOM node. Useful for:
 * - Avoiding unnecessary div wrappers
 * - Cleaner DOM structure
 * - Better semantics
 */

function FragmentExample() {
  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <div>
      <h4>Using Fragments</h4>
      
      {/* ✅ Without Fragment - adds extra div */}
      <div style={{ marginBottom: '15px' }}>
        <h5>Without Fragment (adds extra div):</h5>
        <div>
          <p>Item 1</p>
          <p>Item 2</p>
        </div>
      </div>

      {/* ✅ With Fragment - no extra div */}
      <div style={{ marginBottom: '15px' }}>
        <h5>With Fragment (no extra div):</h5>
        <>
          <p>Item 1</p>
          <p>Item 2</p>
        </>
      </div>

      {/* ✅ Fragment in lists with key */}
      <div>
        <h5>Fragment in List:</h5>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div style={{ color: '#667eea', fontWeight: 'bold' }}>{item}</div>
            <hr style={{ margin: '5px 0' }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 2: PORTALS
 * ============================================================================
 * 
 * Portals render components outside their parent DOM hierarchy.
 * Useful for:
 * - Modals and overlays
 * - Tooltips and popovers
 * - Dropdown menus
 * - Breaking out of CSS overflow/z-index constraints
 */

function PortalExample() {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div>
      <h4>Using Portals</h4>
      <p>Portals render content outside the normal DOM hierarchy</p>
      
      <button onClick={() => setShowPortal(!showPortal)}>
        {showPortal ? 'Hide' : 'Show'} Portal
      </button>

      {showPortal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#667eea',
          color: 'white',
          padding: '30px',
          borderRadius: '8px',
          zIndex: 9999,
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          <h3>This is a Portal!</h3>
          <p>Rendered outside normal DOM hierarchy</p>
          <button onClick={() => setShowPortal(false)}>Close</button>
        </div>
      )}

      <p className="info-text">
        ✅ In a real app, portals use ReactDOM.createPortal() to render
        into a different DOM node (like #modal-root)
      </p>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 3: KEY PROP IMPORTANCE
 * ============================================================================
 * 
 * The key prop is critical for list rendering. It tells React which items
 * have changed, been added, or removed.
 * 
 * Without proper keys:
 * - State can get mixed up between list items
 * - Performance suffers
 * - Items can appear to lose their state
 */

function KeyPropExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);

  const [inputStates, setInputStates] = useState({});

  const handleInputChange = (id, value) => {
    setInputStates(prev => ({ ...prev, [id]: value }));
  };

  const moveItem = (id, direction) => {
    const index = items.findIndex(item => item.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) {
      return;
    }

    const newItems = [...items];
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[nextIndex]] = [newItems[nextIndex], newItems[index]];
    setItems(newItems);
  };

  return (
    <div>
      <h4>Importance of Key Prop</h4>
      
      <div className="info-box">
        <p className="info-text">
          ✅ Move items around. Type in the input fields. Notice how the values
          stay with the SAME ITEM because we use the id as key (not index).
        </p>
      </div>

      <div style={{ marginTop: '15px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: '2px solid #667eea',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px'
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong>{item.name}</strong>
              <div>
                <button onClick={() => moveItem(item.id, 'up')} style={{ marginRight: '5px' }}>
                  ↑ Move Up
                </button>
                <button onClick={() => moveItem(item.id, 'down')}>
                  ↓ Move Down
                </button>
              </div>
            </div>
            <input
              type="text"
              value={inputStates[item.id] || ''}
              onChange={e => handleInputChange(item.id, e.target.value)}
              placeholder="Type something..."
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '8px'
              }}
            />
          </div>
        ))}
      </div>

      <div className="note" style={{ marginTop: '15px' }}>
        💡 Always use unique, stable identifiers (like item.id) as keys, NOT the index!
      </div>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 4: CONTROLLED vs UNCONTROLLED COMPONENTS
 * ============================================================================
 * 
 * Controlled: React state controls the input value
 * Uncontrolled: DOM controls the input value
 */

function ControlledVsUncontrolledExample() {
  const [controlledValue, setControlledValue] = useState('');

  return (
    <div>
      <h4>Controlled vs Uncontrolled Components</h4>
      
      <div style={{ marginBottom: '20px' }}>
        <h5>✅ Controlled Component</h5>
        <p>React state controls the value:</p>
        <input
          type="text"
          value={controlledValue}
          onChange={e => setControlledValue(e.target.value)}
          placeholder="Controlled input"
          style={{ width: '100%', padding: '8px' }}
        />
        <p style={{ marginTop: '8px' }}>
          Value in React: <code>{controlledValue}</code>
        </p>
      </div>

      <div className="explanation-box">
        <h5>Controlled Component Benefits:</h5>
        <ul>
          <li>Predictable form state</li>
          <li>Easy validation</li>
          <li>Can disable/modify input dynamically</li>
          <li>Instant feedback</li>
        </ul>
      </div>

      <code className="code-block">
{`// ✅ Controlled
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />

// ❌ Uncontrolled (not recommended)
const ref = useRef();
const value = ref.current?.value;`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 5: LIFTING STATE UP
 * ============================================================================
 * 
 * When multiple components need the same state, lift it to their common parent
 */

function LiftingStateUpExample() {
  // State lifted to parent
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <div>
      <h4>Lifting State Up Pattern</h4>
      
      <div style={{
        backgroundColor: '#f7fafc',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <p><strong>Shared State: {sharedCount}</strong></p>
        <button onClick={() => setSharedCount(prev => prev + 1)}>
          Increment (Parent)
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <ChildComponent
          count={sharedCount}
          onIncrement={() => setSharedCount(prev => prev + 1)}
          title="Child A"
        />
        <ChildComponent
          count={sharedCount}
          onIncrement={() => setSharedCount(prev => prev + 1)}
          title="Child B"
        />
      </div>

      <code className="code-block">
{`// Parent manages shared state
const [count, setCount] = useState(0);

// Pass state and setter to children
<Child count={count} onIncrement={() => setCount(prev => prev + 1)} />
<Child count={count} onIncrement={() => setCount(prev => prev + 1)} />`}
      </code>
    </div>
  );
}

function ChildComponent({ count, onIncrement, title }) {
  return (
    <div style={{
      border: '2px solid #667eea',
      padding: '10px',
      borderRadius: '4px',
      flex: 1
    }}>
      <p><strong>{title}</strong></p>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>
        Increment in {title}
      </button>
    </div>
  );
}

/*
 * ============================================================================
 * MAIN COMPONENT
 * ============================================================================
 */
function AdvancedFeaturesExample() {
  const [activeFeature, setActiveFeature] = useState('fragments');

  return (
    <div className="hook-section">
      <h2>Advanced React Features & Patterns</h2>

      {/* Navigation */}
      <div className="hook-subsection">
        <h3>Select a Feature</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveFeature('fragments')}
            style={{
              backgroundColor: activeFeature === 'fragments' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Fragments
          </button>
          <button
            onClick={() => setActiveFeature('portals')}
            style={{
              backgroundColor: activeFeature === 'portals' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Portals
          </button>
          <button
            onClick={() => setActiveFeature('keys')}
            style={{
              backgroundColor: activeFeature === 'keys' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Key Prop
          </button>
          <button
            onClick={() => setActiveFeature('controlled')}
            style={{
              backgroundColor: activeFeature === 'controlled' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Controlled Components
          </button>
          <button
            onClick={() => setActiveFeature('lifting')}
            style={{
              backgroundColor: activeFeature === 'lifting' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Lifting State
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="hook-subsection">
        <div className="demo-box">
          {activeFeature === 'fragments' && <FragmentExample />}
          {activeFeature === 'portals' && <PortalExample />}
          {activeFeature === 'keys' && <KeyPropExample />}
          {activeFeature === 'controlled' && <ControlledVsUncontrolledExample />}
          {activeFeature === 'lifting' && <LiftingStateUpExample />}
        </div>
      </div>

      {/* Summary */}
      <div className="hook-subsection">
        <h3>Key Concepts</h3>
        <div className="summary-box">
          <div className="summary-item">
            <h4>Fragments</h4>
            <p>Return multiple elements without a wrapper div. Use <> ... </></p>
          </div>

          <div className="summary-item">
            <h4>Portals</h4>
            <p>Render components outside their parent DOM hierarchy</p>
          </div>

          <div className="summary-item">
            <h4>Key Prop</h4>
            <p>Use unique, stable identifiers - never use array index as key</p>
          </div>

          <div className="summary-item">
            <h4>Controlled Components</h4>
            <p>Let React state control form inputs for predictable behavior</p>
          </div>

          <div className="summary-item">
            <h4>Lifting State</h4>
            <p>Move state to common parent when multiple components need it</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFeaturesExample;
