/*
 * Component: src/components/3-ContextAPI.js
 *
 * === Component Purpose ===
 * This component demonstrates the useContext hook and the Context API, which
 * provides a way to pass data deeply through the component tree without having
 * to pass props down manually at every level.
 *
 * Problem useContext Solves:
 * When you have deeply nested components, passing data via props becomes
 * tedious (called "props drilling"). Context allows you to create a shared
 * value that any descendant component can access directly.
 *
 * === React Concepts Covered ===
 * 1. Creating contexts with React.createContext()
 * 2. Using Context.Provider to supply values
 * 3. Consuming contexts with useContext hook
 * 4. Global state management patterns
 * 5. Context providers at different levels
 * 6. Multiple contexts
 * 7. When NOT to use Context (performance considerations)
 *
 * === Workflow ===
 * 1. Create a context: const MyContext = React.createContext()
 * 2. Provide a value: <MyContext.Provider value={...}><Components/></MyContext.Provider>
 * 3. Consume it: const value = useContext(MyContext)
 * 4. All descendants can access the value without props drilling
 */

import React, { useState, createContext, useContext } from 'react';

// ============================================================================
// === Create Contexts ===
// ============================================================================

/*
 * --- Creating Context Object ---
 * createContext returns a context object with Provider and Consumer.
 *
 * Parameters:
 * - createContext(defaultValue) - the default value if no Provider wraps it
 *
 * Return value:
 * - A context object with .Provider and .Consumer properties
 *
 * The context object is just a wrapper - it doesn't hold the actual value.
 * The Provider holds the value and provides it to descendants.
 */

// Theme Context - for application-wide theming
const ThemeContext = createContext('light');

// User Context - for user authentication/profile information
const UserContext = createContext(null);

// Notification Context - for global notifications
const NotificationContext = createContext({
  message: '',
  type: 'info', // 'info', 'success', 'warning', 'error'
});

// ============================================================================
// === Context Provider Component ===
// ============================================================================

/*
 * This component wraps the context consumers and provides values.
 * It's responsible for:
 * 1. Managing the context state
 * 2. Providing values to all descendants
 * 3. Handling updates to context values
 */
function ContextProvider({ children }) {
  // --- Theme State ---
  const [theme, setTheme] = useState('light');

  // --- User State ---
  const [user, setUser] = useState(null);

  // --- Notification State ---
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
  });

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const loginUser = (userData) => {
    setUser(userData);
    setNotification({
      message: `Welcome, ${userData.name}!`,
      type: 'success',
    });
  };

  const logoutUser = () => {
    setUser(null);
    setNotification({
      message: 'You have been logged out.',
      type: 'info',
    });
  };

  const showNotification = (message, type = 'info') => {
    setNotification({
      message,
      type,
    });
  };

  // --- Theme Context Value ---
  const themeValue = {
    current: theme,
    toggle: toggleTheme,
  };

  // --- User Context Value ---
  const userContextValue = {
    current: user,
    login: loginUser,
    logout: logoutUser,
  };

  // --- Notification Context Value ---
  const notificationValue = {
    ...notification,
    show: showNotification,
  };

  /*
   * --- Provider Pattern ---
   * Wrapping components with multiple providers.
   * Children can access any of these contexts.
   *
   * Order of providers doesn't matter, but they must wrap the components
   * that use useContext() to access the values.
   */
  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userContextValue}>
        <NotificationContext.Provider value={notificationValue}>
          {children}
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// ============================================================================
// === Custom Hooks for Context Access ===
// ============================================================================

/*
 * Custom hooks to simplify accessing context values.
 * Instead of calling useContext(ThemeContext) everywhere,
 * components can call useTheme().
 *
 * Benefits:
 * 1. Shorter, cleaner code
 * 2. Single point to handle context access errors
 * 3. Can add validation/error handling
 * 4. Can return only what's needed
 */

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeContext.Provider');
  }
  return context;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserContext.Provider');
  }
  return context;
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used inside NotificationContext.Provider');
  }
  return context;
};

// ============================================================================
// === Child Components Using Context ===
// ============================================================================

/*
 * --- Child Component ---
 * This component accesses context values using the custom hooks.
 * It doesn't receive props - it pulls values directly from context.
 */
function ThemeToggleButton() {
  const { current, toggle } = useTheme();

  return (
    <button onClick={toggle}>
      Current Theme: {current} | Toggle Theme
    </button>
  );
}

function UserAuth() {
  const { current, login, logout } = useUser();
  const [inputName, setInputName] = useState('');

  const handleLogin = () => {
    if (inputName.trim()) {
      login({ name: inputName, id: Math.random() });
      setInputName('');
    }
  };

  if (current) {
    return (
      <div style={{
        backgroundColor: '#d1e7dd',
        padding: '10px',
        borderRadius: '4px',
        marginTop: '10px'
      }}>
        <p>Logged in as: <strong>{current.name}</strong></p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Enter your name"
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleLogin} className="success">Login</button>
    </div>
  );
}

function NotificationDisplay() {
  const notification = useNotification();

  if (!notification.message) {
    return null;
  }

  const colors = {
    info: '#cfe2ff',
    success: '#d1e7dd',
    warning: '#fff3cd',
    error: '#f8d7da',
  };

  const textColors = {
    info: '#084298',
    success: '#0f5132',
    warning: '#664d03',
    error: '#842029',
  };

  return (
    <div style={{
      backgroundColor: colors[notification.type],
      color: textColors[notification.type],
      padding: '10px',
      borderRadius: '4px',
      marginTop: '10px'
    }}>
      {notification.message}
    </div>
  );
}

// ============================================================================
// === Main Component ===
// ============================================================================

function ContextAPIExample() {
  return (
    <div className="component-section">
      <h2>useContext Hook & Context API</h2>

      <p>
        The Context API provides a way to pass data through the component tree
        without having to pass props down manually at every level. The <code>useContext</code>
        hook allows functional components to consume context values.
      </p>

      <div className="explanation">
        <strong>Problem it solves:</strong> Imagine passing a prop through 10 nested components
        when only the deepest one needs it. That's "prop drilling" - Context eliminates this.
      </div>

      {/* === Example: Multiple Contexts === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example: Multiple Contexts in Action</h3>

        {/* Wrap content with providers to supply context values */}
        <ContextProvider>
          {/* === Notification Area === */}
          <NotificationDisplay />

          {/* === Theme Section === */}
          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <h4>Theme Management</h4>
            <p>Any component nested here can access theme context:</p>
            <ThemeToggleButton />
          </div>

          {/* === User Auth Section === */}
          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <h4>User Authentication</h4>
            <p>User context is accessible throughout the app:</p>
            <UserAuth />
          </div>

          {/* === Deep Nesting Example === */}
          <div style={{
            border: '1px dashed #999',
            padding: '15px',
            borderRadius: '4px',
            marginTop: '15px',
            backgroundColor: '#f9f9f9'
          }}>
            <h4>Deep Component Nesting</h4>
            <p>Even deeply nested components can access context:</p>
            <div style={{ paddingLeft: '15px', marginTop: '10px' }}>
              <p>Level 1</p>
              <div style={{
                paddingLeft: '15px',
                borderLeft: '2px solid #ddd',
              }}>
                <p>Level 2</p>
                <div style={{
                  paddingLeft: '15px',
                  borderLeft: '2px solid #ddd',
                }}>
                  <p>Level 3 (Can still access theme and user!)</p>
                  <DeepNestedComponent />
                </div>
              </div>
            </div>
          </div>
        </ContextProvider>
      </div>

      {/* === Context Concepts === */}
      <div style={{ marginTop: '20px' }}>
        <h3>Key Context Concepts</h3>

        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          <h4>Creating Context</h4>
          <p><code>const MyContext = React.createContext()</code></p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Creates a context object. Can optionally pass a default value.
          </p>
        </div>

        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          <h4>Providing Values</h4>
          <p><code>&lt;MyContext.Provider value=​{'{'} ...  {'}'}&gt;</code></p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Wrap components that need to access the context. All descendants can consume it.
          </p>
        </div>

        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          <h4>Consuming Context</h4>
          <p><code>const value = useContext(MyContext)</code></p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Inside a functional component, get the context value. Only works inside a Provider.
          </p>
        </div>
      </div>

      {/* === When to Use Context === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>When to Use Context:</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Theme/styling (dark mode, etc.)</li>
          <li>User authentication/profile</li>
          <li>Application configuration</li>
          <li>Global notifications/alerts</li>
          <li>Language/localization</li>
        </ul>
      </div>

      {/* === When NOT to Use Context === */}
      <div className="explanation" style={{ marginTop: '20px', backgroundColor: '#fff3cd' }}>
        <strong>When NOT to Use Context (Performance):</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Frequently changing values (context updates re-render all consumers)</li>
          <li>Simple prop passing (just use props if only 2-3 levels deep)</li>
          <li>Large, complex state (consider Redux or Zustand)</li>
          <li>Real-time data that changes every frame</li>
        </ul>
      </div>

      {/* === Summary === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>Summary:</strong> Context avoids prop drilling. Create contexts for global
        values, provide them with Provider, and access with useContext. Create custom hooks
        for cleaner code.
      </div>
    </div>
  );
}

/*
 * --- Alternative Consumer Pattern ---
 * Before hooks, you had to use a Consumer component with a render prop.
 * This is still valid but less common with hooks:
 *
 * <MyContext.Consumer>
 *   {value => <YourComponent value={value} />}
 * </MyContext.Consumer>
 *
 * The useContext hook replaces this pattern elegantly.
 */

// --- Deeply Nested Component ---
function DeepNestedComponent() {
  const theme = useTheme();
  const user = useUser();

  return (
    <div style={{
      padding: '10px',
      backgroundColor: theme.current === 'light' ? '#fff' : '#333',
      color: theme.current === 'light' ? '#000' : '#fff',
      borderRadius: '4px',
      border: '1px solid ' + (theme.current === 'light' ? '#ddd' : '#666')
    }}>
      <p>Theme: <strong>{theme.current}</strong></p>
      <p>User: <strong>{user.current ? user.current.name : 'Not logged in'}</strong></p>
      <p style={{ fontSize: '0.9em', opacity: 0.7 }}>
        ✓ This deep component accessed context without prop drilling!
      </p>
    </div>
  );
}

export default ContextAPIExample;

/*
 * === Context vs Other State Management ===
 *
 * Context API:
 * + Built into React, no dependencies
 * + Great for global app state
 * - Not optimized for frequent changes
 * - All consumers re-render when value changes
 *
 * Redux:
 * + Powerful, scalable, great tooling
 * + Selectors prevent unnecessary re-renders
 * - More boilerplate
 * - Steeper learning curve
 *
 * Zustand/Jotai:
 * + Simpler than Redux
 * + Better performance than Context
 * - Less community resources than Redux
 *
 * For most applications, Context for global state + useState for local state is sufficient.
 */
