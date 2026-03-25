/*
 * ============================================================================
 * ADVANCED PATTERNS DEMONSTRATION
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates advanced React patterns:
 * 1. Higher-Order Components (HOCs) - wrapping components with logic
 * 2. Render Props - sharing code using render functions
 * 3. Error Boundaries - catching errors in component trees
 * 4. Composition - building complex UIs from simple parts
 * 
 * Note on Hooks vs Advanced Patterns:
 * Custom hooks often replace HOCs and render props in modern React,
 * but these patterns are still valuable for understanding React's flexibility.
 * ============================================================================
 */

import React, { useState } from 'react';

/*
 * ============================================================================
 * PATTERN 1: HIGHER-ORDER COMPONENT (HOC)
 * ============================================================================
 * 
 * A Higher-Order Component is a function that takes a component and
 * returns a new component with enhanced functionality.
 * 
 * Syntax: const EnhancedComponent = withHOC(BaseComponent);
 * 
 * Benefits:
 * - Add state and logic to any component
 * - Reuse component logic across multiple components
 * - Abstract complex logic
 * 
 * The name 'with' prefix is a convention for HOCs
 */

/*
 * --- HOC Example 1: withTheme ---
 * 
 * This HOC injects theme data into a component
 */
function withTheme(Component) {
  return function WithThemeComponent(props) {
    const [theme, setTheme] = useState('light');

    // Injecting theme data and setTheme function into the component
    return (
      <div style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '10px',
        borderRadius: '4px',
      }}>
        <Component {...props} theme={theme} setTheme={setTheme} />
      </div>
    );
  };
}

// Component that will be wrapped by HOC
function ThemedContent({ theme, setTheme }) {
  return (
    <div>
      <p>Current Theme: <strong>{theme}</strong></p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

const ThemedComponent = withTheme(ThemedContent);

/*
 * --- HOC Example 2: withLogger ---
 * 
 * This HOC logs component lifecycle events
 */
function withLogger(Component) {
  return function WithLoggerComponent(props) {
    const [renderCount, setRenderCount] = React.useState(0);

    React.useEffect(() => {
      setRenderCount(prev => prev + 1);
    }, []); // Empty dependency array - only run once on mount

    React.useEffect(() => {
      console.log(`${Component.name || 'Component'} rendered ${renderCount} times`);
    }, [renderCount, Component.name]);

    return <Component {...props} renderCount={renderCount} />;
  };
}

function LoggedContent({ renderCount }) {
  return (
    <div>
      <p>This component has rendered <strong>{renderCount}</strong> times</p>
      <p className="info-text">✅ Check browser console to see logging</p>
    </div>
  );
}

const LoggedComponent = withLogger(LoggedContent);

/*
 * ============================================================================
 * PATTERN 2: RENDER PROPS
 * ============================================================================
 * 
 * Render Props is a pattern where a component takes a function as a prop
 * that returns React elements. This function is called "render prop".
 * 
 * Benefits:
 * - Share logic without wrapping components
 * - More explicit than HOCs
 * - Easy to understand data flow
 * 
 * Common use case: Mouse position tracking
 */

/*
 * --- Render Props Example: Mouse Tracker ---
 */
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{
      border: '2px dashed #ccc',
      padding: '20px',
      cursor: 'crosshair',
      height: '150px',
    }}>
      {/* children is a function (render prop) that receives position data */}
      {children(position)}
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 3: ERROR BOUNDARY
 * ============================================================================
 * 
 * Error Boundaries catch JavaScript errors anywhere in the component tree.
 * They need to be class components (can't use hooks in error boundaries).
 * 
 * Error Boundaries catch errors DURING rendering, in lifecycle methods,
 * and in constructors of child components.
 * 
 * They DON'T catch:
 * - Event handlers (use try/catch instead)
 * - Asynchronous code (use .catch() or try/catch)
 * - Server-side rendering
 * - Errors in the error boundary itself
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /*
   * --- getDerivedStateFromError ---
   * Called during render to update state
   * Must return new state object
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /*
   * --- componentDidCatch ---
   * Called after error is thrown
   * Use for logging, error reporting, etc.
   */
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          border: '2px solid red',
          padding: '20px',
          backgroundColor: '#ffe0e0',
          borderRadius: '4px'
        }}>
          <h3>⚠️ Something went wrong</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

/*
 * Component that throws an error - used to demo error boundary
 */
function ErrorThrowingComponent({ shouldError }) {
  if (shouldError) {
    // This will be caught by ErrorBoundary
    throw new Error('Intentional error for demonstration!');
  }

  return <div>✅ No errors - component rendering successfully</div>;
}

/*
 * ============================================================================
 * MAIN COMPONENT: DEMONSTRATING ADVANCED PATTERNS
 * ============================================================================
 */
function AdvancedPatternsExample() {
  const [showErrorBoundaryError, setShowErrorBoundaryError] = useState(false);

  return (
    <div className="hook-section">
      <h2>Advanced React Patterns</h2>

      {/* === Introduction === */}
      <div className="hook-subsection">
        <h3>Advanced Patterns in React</h3>
        
        <div className="explanation-box">
          <h4>Why Advanced Patterns?</h4>
          <p>
            Advanced patterns provide different ways to organize code, share
            logic, and handle complex scenarios. While custom hooks often replace
            HOCs and render props, understanding these patterns helps you:
          </p>
          <ul>
            <li>Understand existing React code</li>
            <li>Know when each pattern is appropriate</li>
            <li>Design sophisticated component architectures</li>
            <li>Understand React's flexibility and power</li>
          </ul>
        </div>
      </div>

      {/* === PATTERN 1: HOCs === */}
      <div className="hook-subsection">
        <h3>Pattern 1: Higher-Order Components (HOCs)</h3>
        
        <div className="explanation-box">
          <h4>What is an HOC?</h4>
          <p>
            A Higher-Order Component is an advanced pattern for reusing component logic.
            It's a function that takes a component and returns an enhanced component.
          </p>
          <code className="code-block">
{`function withEnhancement(Component) {
  return function EnhancedComponent(props) {
    // Add state, logic, side effects here
    const [state, setState] = useState(...);
    
    // Render the original component with new props
    return <Component {...props} state={state} />;
  };
}

// Usage
const Enhanced = withEnhancement(MyComponent);`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo 1: Theme HOC</h4>
          <ThemedComponent />
          <p className="info-text">
            ✅ ThemedComponent is created by wrapping a base component
            with the withTheme HOC. The HOC provides theme state and setter.
          </p>
        </div>

        <div className="demo-box">
          <h4>Demo 2: Logger HOC</h4>
          <LoggedComponent />
          <p className="info-text">
            ✅ Open console to see logging. The withLogger HOC tracks
            and logs when the component renders.
          </p>
        </div>

        <div className="tips-box">
          <h4>HOC Best Practices</h4>
          <div className="tip">
            <h4>✅ DO: Static Methods</h4>
            <code className="code-block">
{`// Copy static methods from original component
import hoistNonReactStatics from 'hoist-non-react-statics';

function withHOC(Component) {
  const Wrapped = () => <Component />;
  hoistNonReactStatics(Wrapped, Component);
  return Wrapped;
}`}
            </code>
          </div>

          <div className="tip">
            <h4>✅ DO: displayName for Debugging</h4>
            <code className="code-block">
{`function withHOC(Component) {
  const Wrapped = (props) => <Component {...props} />;
  Wrapped.displayName = \`WithHOC(\${Component.displayName})\`;
  return Wrapped;
}`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Render HOC Inside Render</h4>
            <code className="code-block">
{`// ❌ Wrong - creates new component on every render
function BadComponent() {
  const Enhanced = withHOC(MyComponent);
  return <Enhanced />;
}

// ✅ Right - create component once
const Enhanced = withHOC(MyComponent);

function GoodComponent() {
  return <Enhanced />;
}`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Use in Render Method</h4>
            <p>
              Always create HOC components outside components.
              Creating inside render resets state and refs.
            </p>
          </div>
        </div>
      </div>

      {/* === PATTERN 2: RENDER PROPS === */}
      <div className="hook-subsection">
        <h3>Pattern 2: Render Props</h3>
        
        <div className="explanation-box">
          <h4>What are Render Props?</h4>
          <p>
            The render props pattern is a simple technique for sharing code
            between React components using a prop whose value is a function.
          </p>
          <code className="code-block">
{`// Component that uses render prop
<DataProvider render={(data) => (
  <div>Data: {data}</div>
)} />

// Or with children function
<DataProvider>
  {(data) => <div>Data: {data}</div>}
</DataProvider>`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: Mouse Position with Render Props</h4>
          <MouseTracker>
            {({ x, y }) => (
              <div>
                <p>Mouse position: <strong>X: {x}, Y: {y}</strong></p>
                <p className="info-text">Move your mouse in the box above</p>
              </div>
            )}
          </MouseTracker>

          <p className="info-text">
            ✅ MouseTracker uses render props to share mouse position.
            The component receives x and y coordinates.
          </p>
        </div>

        <div className="tips-box">
          <h4>Render Props Best Practices</h4>
          <div className="tip">
            <h4>✅ DO: Use render or children</h4>
            <code className="code-block">
{`// With render prop
<Component render={(data) => <div>{data}</div>} />

// With children prop (more common)
<Component>
  {(data) => <div>{data}</div>}
</Component>`}
            </code>
          </div>

          <div className="tip">
            <h4>✅ DO: Document the Render Function</h4>
            <code className="code-block">
{`/*
 * render: function(value: any) => React.ReactNode
 * The render function receives the component's data
 * and should return React elements
 */`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Define Render Function Inline</h4>
            <code className="code-block">
{`// ❌ Wrong - creates new function on every render
function Component() {
  return (
    <MouseTracker render={(data) => <div>{data}</div>} />
  );
}

// ✅ Right - memoize or define outside
const renderData = (data) => <div>{data}</div>;

function Component() {
  return <MouseTracker render={renderData} />;
}`}
            </code>
          </div>
        </div>
      </div>

      {/* === PATTERN 3: ERROR BOUNDARIES === */}
      <div className="hook-subsection">
        <h3>Pattern 3: Error Boundaries</h3>
        
        <div className="explanation-box">
          <h4>What are Error Boundaries?</h4>
          <p>
            Error Boundaries are React components that catch errors in their
            child component tree. They implement getDerivedStateFromError and/or
            componentDidCatch lifecycle methods (class component only).
          </p>
          <code className="code-block">
{`class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}`}
          </code>
        </div>

        <div className="demo-box">
          <h4>Demo: Error Boundary in Action</h4>
          
          <ErrorBoundary>
            <ErrorThrowingComponent shouldError={showErrorBoundaryError} />
          </ErrorBoundary>

          <div className="controls" style={{ marginTop: '15px' }}>
            <button onClick={() => setShowErrorBoundaryError(!showErrorBoundaryError)}>
              {showErrorBoundaryError ? 'Catch Error' : 'Throw Error'}
            </button>
          </div>

          <p className="info-text">
            ✅ Click "Throw Error" to see the Error Boundary catch and
            display an error message. Click again to recover.
          </p>
        </div>

        <div className="tips-box">
          <h4>Error Boundary Important Notes</h4>
          <div className="tip">
            <h4>⚠️ ERROR BOUNDARIES ONLY CATCH:</h4>
            <ul>
              <li>Errors during rendering</li>
              <li>Lifecycle method errors</li>
              <li>Constructor errors</li>
            </ul>
          </div>

          <div className="tip">
            <h4>❌ ERROR BOUNDARIES DON'T CATCH:</h4>
            <ul>
              <li>Event handler errors (use try/catch)</li>
              <li>Async code (use .catch or try/catch)</li>
              <li>Server-side rendering</li>
              <li>Errors in the boundary itself</li>
            </ul>
          </div>

          <div className="tip">
            <h4>✅ DO: Handle Event Errors Separately</h4>
            <code className="code-block">
{`function MyComponent() {
  const handleClick = () => {
    try {
      // Risky operation
      someFunction();
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return <button onClick={handleClick}>Click</button>;
}`}
            </code>
          </div>

          <div className="tip">
            <h4>✅ DO: Use Multiple Error Boundaries</h4>
            <code className="code-block">
{`// Wrap entire app
<ErrorBoundary>
  {/* Wrap specific features */}
  <ErrorBoundary>
    <FeatureA />
  </ErrorBoundary>
  <ErrorBoundary>
    <FeatureB />
  </ErrorBoundary>
</ErrorBoundary>`}
            </code>
          </div>
        </div>
      </div>

      {/* === COMPOSITION PATTERNS === */}
      <div className="hook-subsection">
        <h3>Pattern 4: Component Composition</h3>
        
        <div className="explanation-box">
          <h4>Composition vs Inheritance</h4>
          <p>
            React uses composition instead of inheritance for code reuse.
            Build complex UIs from simple, focused components.
          </p>
          <code className="code-block">
{`// Composition: Build complex from simple
function Profile({ user, children }) {
  return (
    <div>
      <ProfileHeader user={user} />
      {children}
    </div>
  );
}

// Instead of inheritance
class Profile extends React.Component {
  // extend and override
}`}
          </code>
        </div>

        <div className="tips-box">
          <div className="tip">
            <h4>✅ Composition Patterns</h4>
            
            <p><strong>1. Wrapper Component</strong></p>
            <code className="code-block">
{`function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage - composition!
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>`}
            </code>

            <p><strong>2. Specialized Components</strong></p>
            <code className="code-block">
{`function WelcomeDialog() {
  return (
    <Dialog title="Welcome">
      <h2>Welcome!</h2>
      <p>Glad to see you!</p>
    </Dialog>
  );
}`}
            </code>

            <p><strong>3. Props for Customization</strong></p>
            <code className="code-block">
{`function Button({ onClick, children, variant = 'primary' }) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary">Done</Button>
<Button variant="secondary">Cancel</Button>`}
            </code>
          </div>
        </div>
      </div>

      {/* === When to Use Each Pattern === */}
      <div className="hook-subsection">
        <h3>Pattern Selection Guide</h3>
        
        <div className="comparison-box">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Use When</th>
                <th>Modern Alternative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>HOC</strong></td>
                <td>Need to wrape multiple components with logic</td>
                <td>Custom hooks</td>
              </tr>
              <tr>
                <td><strong>Render Props</strong></td>
                <td>Need maximum flexibility in rendering</td>
                <td>Custom hooks or children prop</td>
              </tr>
              <tr>
                <td><strong>Error Boundary</strong></td>
                <td>Need to catch component errors</td>
                <td>No replacement - must use class component</td>
              </tr>
              <tr>
                <td><strong>Composition</strong></td>
                <td>Building component hierarchies</td>
                <td>Use composition always!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* === Summary === */}
      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        
        <div className="summary-box">
          <div className="summary-item">
            <h4>HOCs</h4>
            <p>Functions that enhance components. Useful but custom hooks are usually better.</p>
          </div>

          <div className="summary-item">
            <h4>Render Props</h4>
            <p>Share code via function props. Clear and explicit but custom hooks are simpler.</p>
          </div>

          <div className="summary-item">
            <h4>Error Boundaries</h4>
            <p>Catch errors in component trees. Must be class components. Essential for production apps.</p>
          </div>

          <div className="summary-item">
            <h4>Composition</h4>
            <p>Build complex UIs from simple components. The fundamental React pattern.</p>
          </div>

          <div className="summary-item">
            <h4>Modern Approach</h4>
            <p>Custom hooks often provide cleaner solutions than HOCs or render props.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedPatternsExample;
