/*
 * ============================================================================
 * CUSTOM HOOKS DEMONSTRATION
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates how to create and use custom hooks.
 * Custom hooks are JavaScript functions that use React hooks and
 * encapsulate reusable logic.
 * 
 * Why Custom Hooks?
 * - Extract component logic into reusable functions
 * - Share stateful logic between multiple components
 * - Replace render props and HOCs for many use cases
 * - Cleaner, more maintainable code
 * 
 * Custom Hook Rules:
 * 1. Must be a JavaScript function
 * 2. Must start with "use" (naming convention)
 * 3. Can call other hooks
 * 4. Must be called at the top level (not conditionally)
 * 5. Can only be called from React components or other custom hooks
 * ============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';

/*
 * ============================================================================
 * CUSTOM HOOK EXAMPLES
 * ============================================================================
 */

/*
 * --- Custom Hook 1: useCounter ---
 * 
 * Purpose:
 * Encapsulates counter logic - increment, decrement, reset
 * 
 * Benefits:
 * - Reusable across many components
 * - Cleaner component code
 * - Logic is testable and maintainable
 */
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  // Return an object with the state and methods
  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
    reset: () => setCount(initialValue),
    set: (value) => setCount(value),
  };
}

/*
 * --- Custom Hook 2: useLocalStorage ---
 * 
 * Purpose:
 * Persist values to localStorage and sync with component state
 * 
 * Benefits:
 * - Automatic persistence across page reloads
 * - Syncs across browser tabs
 * - Cleaner than managing localStorage manually
 */
function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Create a setter that updates both state and localStorage
  const setValue = useCallback((value) => {
    try {
      // Handle both direct values and functions
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/*
 * --- Custom Hook 3: useFetch ---
 * 
 * Purpose:
 * Handle data fetching with loading and error states
 * 
 * Benefits:
 * - Consistent data fetching pattern
 * - Automatic loading and error state management
 * - Cleanup on unmount
 */
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    // Simulate fetching from a URL
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (isMounted) {
          setState({
            data: { message: `Fetched from ${url}` },
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error.message,
          });
        }
      }
    };

    fetchData();

    // Cleanup: set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

/*
 * --- Custom Hook 4: useDebounce ---
 * 
 * Purpose:
 * Delay updates until user stops typing (common search pattern)
 * 
 * Benefits:
 * - Reduces API calls during user input
 * - Improves performance for search/filter
 * - Cleaner than managing debounce manually
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the debounce timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timer if value changes before delay completes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/*
 * --- Custom Hook 5: usePrevious ---
 * 
 * Purpose:
 * Track the previous value of a prop or state
 * 
 * Benefits:
 * - Detect what changed
 * - Compare current vs previous
 * - Implement "only if changed" logic
 */
function usePrevious(value) {
  const ref = React.useRef();

  useEffect(() => {
    // After rendering, save the current value as previous
    ref.current = value;
  }, [value]);

  // Return the value from last render
  return ref.current;
}

/*
 * --- Custom Hook 6: useAsync ---
 * 
 * Purpose:
 * Execute async functions with proper loading/error handling
 * 
 * Benefits:
 * - Consistent async operation pattern
 * - Automatic cleanup
 * - Easy error handling
 */
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setResult(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setResult(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, result, error };
}

/*
 * ============================================================================
 * MAIN COMPONENT: DEMONSTRATING CUSTOM HOOKS
 * ============================================================================
 */
function CustomHooksExample() {
  // --- Using Custom Hooks ---

  // 1. useCounter example
  const counter = useCounter(0);

  // 2. useLocalStorage example
  const [savedName, setSavedName] = useLocalStorage('userName', 'Guest');

  // 3. useFetch example
  const fetchResult = useFetch('https://api.example.com/data');

  // 4. useDebounce example
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  // 5. usePrevious example
  const previousCounter = usePrevious(counter.count);

  // 6. useAsync example
  const asyncTask = useAsync(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { timestamp: new Date().toLocaleTimeString() };
  }, false);

  return (
    <div className="hook-section">
      <h2>Custom Hooks: Reusing Stateful Logic</h2>

      {/* === Introduction === */}
      <div className="hook-subsection">
        <h3>What are Custom Hooks?</h3>
        
        <div className="explanation-box">
          <p>
            Custom hooks are regular JavaScript functions that use React's
            built-in hooks and encapsulate reusable stateful logic. They follow
            the naming convention of starting with "use" and can only be called
            from React components or other custom hooks.
          </p>
          <code className="code-block">
{`// Creating a custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
  };
}

// Using custom hook in a component
function MyComponent() {
  const counter = useCounter(0);
  return <button onClick={counter.increment}>{counter.count}</button>;
}`}
          </code>
        </div>
      </div>

      {/* === Custom Hook 1: useCounter === */}
      <div className="hook-subsection">
        <h3>1. useCounter: Simple Counter Logic</h3>
        
        <div className="demo-box">
          <h4>Counter: {counter.count}</h4>
          {previousCounter !== undefined && (
            <p>Previous value: {previousCounter}</p>
          )}
          
          <div className="button-group">
            <button onClick={counter.increment}>Increment</button>
            <button onClick={counter.decrement}>Decrement</button>
            <button onClick={counter.reset}>Reset</button>
          </div>

          <div className="code-example">
            <code className="code-block">
{`function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
    reset: () => setCount(initialValue),
  };
}

// In component:
const counter = useCounter(0);
<button onClick={counter.increment}>{counter.count}</button>`}
            </code>
          </div>

          <p className="info-text">
            ✅ This simple custom hook encapsulates counter logic.
            Great for learning custom hooks - start simple!
          </p>
        </div>
      </div>

      {/* === Custom Hook 2: useLocalStorage === */}
      <div className="hook-subsection">
        <h3>2. useLocalStorage: Persist Data</h3>
        
        <div className="demo-box">
          <h4>Saved Name (persists in localStorage)</h4>
          <input
            type="text"
            value={savedName}
            onChange={e => setSavedName(e.target.value)}
            placeholder="Enter your name"
          />
          <p>Current name: <strong>{savedName}</strong></p>
          <p className="info-text">
            ✅ Refresh the page - your name is saved in localStorage!
            Close and reopen the tab - it stays. Try opening this page
            in another tab - it syncs!
          </p>
        </div>
      </div>

      {/* === Custom Hook 3: useFetch === */}
      <div className="hook-subsection">
        <h3>3. useFetch: Data Fetching Pattern</h3>
        
        <div className="demo-box">
          <h4>Fetch Demo</h4>
          {fetchResult.loading && <p>Loading...</p>}
          {fetchResult.error && <p style={{ color: 'red' }}>Error: {fetchResult.error}</p>}
          {fetchResult.data && <p>✅ {fetchResult.data.message}</p>}

          <p className="info-text">
            ✅ useFetch manages loading and error states automatically.
            Perfect for reusing the same pattern across components.
          </p>
        </div>
      </div>

      {/* === Custom Hook 4: useDebounce === */}
      <div className="hook-subsection">
        <h3>4. useDebounce: Debounced Search</h3>
        
        <div className="demo-box">
          <h4>Search with Debounce</h4>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Type to search..."
          />
          <p>Raw input: <strong>{searchInput}</strong></p>
          <p>Debounced input: <strong>{debouncedSearchTerm}</strong></p>
          
          <p className="info-text">
            ✅ Start typing - notice the debounced value updates after
            you stop typing. This prevents excessive API calls during user input.
          </p>

          <code className="code-block">
{`function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`}
          </code>
        </div>
      </div>

      {/* === Custom Hook 5: usePrevious === */}
      <div className="hook-subsection">
        <h3>5. usePrevious: Track Previous Value</h3>
        
        <div className="demo-box">
          <h4>Value Tracking</h4>
          <p>Current Counter: <strong>{counter.count}</strong></p>
          <p>Previous Counter: <strong>{previousCounter ?? 'No previous value'}</strong></p>
          
          <div className="button-group">
            <button onClick={counter.increment}>Increment</button>
            <button onClick={counter.decrement}>Decrement</button>
          </div>

          <p className="info-text">
            ✅ usePrevious remembers the previous value.
            Useful for detecting changes and reacting differently.
          </p>
        </div>
      </div>

      {/* === Custom Hook 6: useAsync === */}
      <div className="hook-subsection">
        <h3>6. useAsync: Async Operation Handler</h3>
        
        <div className="demo-box">
          <h4>Async Task</h4>
          <button onClick={asyncTask.execute}>Execute Async Task</button>
          
          <div className="async-status">
            <p>Status: <strong>{asyncTask.status}</strong></p>
            {asyncTask.result && (
              <p>✅ Completed at: <strong>{asyncTask.result.timestamp}</strong></p>
            )}
            {asyncTask.error && (
              <p style={{ color: 'red' }}>❌ Error: {asyncTask.error.message}</p>
            )}
          </div>

          <p className="info-text">
            ✅ Click the button to execute an async task.
            The hook manages loading, success, and error states.
          </p>
        </div>
      </div>

      {/* === Custom Hook Patterns === */}
      <div className="hook-subsection">
        <h3>Custom Hook Patterns & Best Practices</h3>
        
        <div className="tips-box">
          <div className="tip">
            <h4>✅ Rule 1: Name Starts with "use"</h4>
            <p>By convention, custom hooks must start with "use". This helps tools and developers identify them as hooks.</p>
          </div>

          <div className="tip">
            <h4>✅ Rule 2: Call at Top Level Only</h4>
            <code className="code-block">
{`// ✅ Correct
function MyComponent() {
  const state = useCustomHook(); // Top level
  return <div>{state}</div>;
}

// ❌ Wrong
function MyComponent() {
  if (condition) {
    const state = useCustomHook(); // Inside condition - FORBIDDEN
  }
}`}
            </code>
          </div>

          <div className="tip">
            <h4>✅ Rule 3: Can Only Be Called from Components/Hooks</h4>
            <code className="code-block">
{`// ✅ Correct
function MyComponent() {
  const state = useCustomHook(); // From component
}

// ✅ Also correct
function useCustomHook() {
  const state = useAnotherHook(); // From another hook
}

// ❌ Wrong
function regularFunction() {
  const state = useCustomHook(); // From regular function - NOT ALLOWED
}`}
            </code>
          </div>

          <div className="tip">
            <h4>💡 Pattern: Return Object for Multiple Values</h4>
            <code className="code-block">
{`// Object return - allows destructuring properties you need
function useCounter() {
  return { count, increment, decrement };
}

// Usage
const { count, increment } = useCounter();`}
            </code>
          </div>

          <div className="tip">
            <h4>💡 Pattern: Array Return for Simplicity</h4>
            <code className="code-block">
{`// Array return - similar to useState pattern
function useCustomState() {
  return [value, setValue];
}

// Usage
const [value, setValue] = useCustomState();`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ Common Mistake: Conditional Hooks</h4>
            <code className="code-block">
{`// ❌ WRONG - Never call hooks conditionally!
function BadComponent({ condition }) {
  if (condition) {
    const state = useCustomHook(); // Violates rules of hooks
  }
  return <div/>;
}

// ✅ CORRECT - Call at top level
function GoodComponent({ condition }) {
  const state = useCustomHook(); // Always called
  
  // Use the condition here instead
  if (condition) {
    // use state
  }
}`}
            </code>
          </div>
        </div>
      </div>

      {/* === Real-World Examples === */}
      <div className="hook-subsection">
        <h3>Real-World Custom Hooks</h3>
        
        <div className="use-cases-box">
          <div className="use-case">
            <h4>useWindowListener</h4>
            <p>Listen to window events with automatic cleanup</p>
          </div>

          <div className="use-case">
            <h4>useClickOutside</h4>
            <p>Detect clicks outside a component (for dropdowns, modals)</p>
          </div>

          <div className="use-case">
            <h4>useAuthentication</h4>
            <p>Manage user auth state and provide login/logout methods</p>
          </div>

          <div className="use-case">
            <h4>useForm</h4>
            <p>Manage form state, validation, and submission</p>
          </div>

          <div className="use-case">
            <h4>useInfiniteScroll</h4>
            <p>Load more items when user scrolls to bottom</p>
          </div>

          <div className="use-case">
            <h4>useMediaQuery</h4>
            <p>Respond to media queries for responsive design</p>
          </div>
        </div>
      </div>

      {/* === Summary === */}
      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        
        <div className="summary-box">
          <div className="summary-item">
            <h4>Custom Hooks = Reusable Logic</h4>
            <p>Extract component logic into custom hooks to use across multiple components</p>
          </div>

          <div className="summary-item">
            <h4>They're Just Functions</h4>
            <p>Custom hooks are regular JavaScript functions that use React hooks internally</p>
          </div>

          <div className="summary-item">
            <h4>Share State & Logic</h4>
            <p>Unlike render props or HOCs, custom hooks share stateful logic cleanly and simply</p>
          </div>

          <div className="summary-item">
            <h4>Testing & Maintenance</h4>
            <p>Logic extracted into custom hooks is easier to test and maintain</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomHooksExample;
