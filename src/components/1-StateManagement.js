/*
 * Component: src/components/1-StateManagement.js
 *
 * === Component Purpose ===
 * This component comprehensively demonstrates the useState hook, which is the
 * most fundamental React hook. useState is used to add state to functional
 * components. Before hooks, you could only use state in class components.
 * This component shows:
 * - Basic state declaration with useState
 * - Multiple state variables in one component
 * - Updating state with different patterns
 * - State immutability principles
 * - Re-rendering triggered by state changes
 *
 * === React Concepts Covered ===
 * 1. useState Hook - Managing component state
 * 2. State immutability - Never mutate state directly
 * 3. Functional updates - Using previous state in updates
 * 4. Multiple state variables - Managing complex state
 * 5. Event handling - Responding to user interactions
 * 6. Conditional rendering - Displaying content based on state
 * 7. Form inputs - Controlled components
 *
 * === Workflow ===
 * When a user interacts with buttons or inputs, event handlers call state
 * setter functions. These updates trigger a re-render, and React observes
 * the new state value. The component function runs again with the new state,
 * and React updates the DOM with the new JSX output.
 */

import React, { useState } from 'react';

function StateManagementExample() {
  // ============================================================================
  // === Basic useState Hook Examples ===
  // ============================================================================

  /*
   * --- Simple Counter State ---
   * useState returns an array with exactly 2 elements:
   * [currentValue, setterFunction]
   *
   * Parameters:
   * - useState takes ONE argument: the initial state value (0 in this case)
   * - This initial value is only used on the first render
   *
   * Return value:
   * - count: The current state value
   * - setCount: Function to update the state
   *
   * When setCount is called, React schedules a re-render. The component function
   * is called again, and useState returns the new state value.
   */
  const [count, setCount] = useState(0);

  /*
   * --- Multiple State Variables ---
   * You can have multiple useState calls in a single component.
   * The order of useState calls MUST be consistent (this is a React rule).
   * This is why you cannot call useState conditionally.
   */
  const [name, setName] = useState('React');
  const [isVisible, setIsVisible] = useState(true);

  /*
   * --- Complex State Object ---
   * You can store entire objects as state. However, when updating,
   * remember that you must replace the entire object (not mutate it).
   */
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
  });

  /*
   * --- Array State ---
   * Managing arrays in state. Remember: never mutate directly!
   * Always create a new array when updating.
   */
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn useState', completed: false },
    { id: 2, text: 'Learn useEffect', completed: false },
  ]);

  // ============================================================================
  // === State Update Patterns ===
  // ============================================================================

  /*
   * --- Pattern 1: Direct Value Update ---
   * Simplest form: setCount(newValue)
   * Used when the new value doesn't depend on the old value.
   */
  const handleResetCount = () => {
    setCount(0); // Direct update with new value
  };

  /*
   * --- Pattern 2: Functional Update ---
   * Form: setCount(prevCount => prevCount + 1)
   * BEST PRACTICE when the new value depends on the previous value.
   * Advantage: Guarantees you're using the most recent state value
   * (important for multiple state updates in quick succession).
   */
  const handleIncrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrementCount = () => {
    setCount(prevCount => prevCount - 1);
  };

  /*
   * --- Pattern 3: Object Spread for Object Updates ---
   * When updating an object in state, create a NEW object with the
   * updated properties. Never mutate the existing object.
   * This is crucial for React to detect changes and trigger re-renders.
   */
  const handleUpdateUserName = (newName) => {
    // ❌ WRONG: Don't do this (mutation)
    // user.firstName = newName;
    // setUser(user);

    // ✅ CORRECT: Create a new object
    setUser({
      ...user, // Spread existing properties
      firstName: newName, // Override the property you're changing
    });
  };

  /*
   * --- Pattern 4: Array Updates ---
   * Common array operations in state:
   */

  // Add item to array
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // Create new array with new item
  };

  // Remove item from array
  const handleRemoveTodo = (idToRemove) => {
    setTodos(todos.filter(todo => todo.id !== idToRemove));
  };

  // Update item in array
  const handleToggleTodo = (idToToggle) => {
    setTodos(todos.map(todo =>
      todo.id === idToToggle
        ? { ...todo, completed: !todo.completed } // Update this item
        : todo // Keep other items unchanged
    ));
  };

  // ============================================================================
  // === Event Handlers ===
  // ============================================================================

  const handleNameChange = (event) => {
    // event.target.value gives us the current input value
    setName(event.target.value);
  };

  const handleToggleVisibility = () => {
    // Toggle: if true, become false; if false, become true
    setIsVisible(!isVisible);
  };

  // ============================================================================
  // === Rendering ===
  // ============================================================================

  return (
    <div className="component-section">
      <h2>useState Hook - State Management</h2>

      <p>
        The <code>useState</code> hook is the gateway to adding state in functional components.
        It's called at the top level of the component and returns a state value and a
        function to update it.
      </p>

      <div className="explanation">
        <strong>Key Rule:</strong> useState calls must always be at the top level of your
        component function, not inside loops, conditions, or nested functions.
      </div>

      {/* === Example 1: Simple Counter === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 1: Simple Counter</h3>
        <p>Current count: <strong>{count}</strong></p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          When you click a button, the state updates and the component re-renders with
          the new value displayed.
        </p>
        <button onClick={handleIncrementCount}>Increment</button>
        <button onClick={handleDecrementCount}>Decrement</button>
        <button onClick={handleResetCount} className="secondary">Reset</button>
      </div>

      {/* === Example 2: String State === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 2: String State with Input</h3>
        <p>Current name: <strong>{name}</strong></p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          style={{ width: '200px' }}
        />
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          This is a <strong>controlled component</strong> - the input value is controlled by React state.
          React is the single source of truth for the input value.
        </p>
      </div>

      {/* === Example 3: Boolean State === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 3: Boolean State & Conditional Rendering</h3>
        <button onClick={handleToggleVisibility}>
          {isVisible ? 'Hide' : 'Show'} Message
        </button>
        
        {/* 
         * Conditional Rendering:
         * The content below only renders if isVisible is true.
         * This demonstrates how state directly affects what appears in the UI.
         */}
        {isVisible && (
          <div style={{
            backgroundColor: '#e7f3ff',
            padding: '10px',
            marginTop: '10px',
            borderRadius: '4px',
            color: '#0c5460'
          }}>
            This message is only visible when isVisible is true!
          </div>
        )}
      </div>

      {/* === Example 4: Object State === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 4: Object State</h3>
        <p>
          User: <strong>{user.firstName} {user.lastName}</strong>, Age: <strong>{user.age}</strong>
        </p>
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => handleUpdateUserName(e.target.value)}
          placeholder="First name"
          style={{ width: '150px', marginRight: '10px' }}
        />
        <button
          onClick={() => setUser({ ...user, age: user.age + 1 })}
          className="success"
        >
          Birthday! 🎂
        </button>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          When updating objects, spread the existing properties and override the one you're changing.
          This maintains immutability and ensures React detects the change.
        </p>
      </div>

      {/* === Example 5: Array State === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 5: Array State</h3>
        <p>Todo List:</p>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            id="newTodoInput"
            placeholder="Add a new todo"
            style={{ flex: 1 }}
          />
          <button
            onClick={() => {
              const input = document.getElementById('newTodoInput');
              if (input.value.trim()) {
                handleAddTodo(input.value);
                input.value = '';
              }
            }}
            className="success"
          >
            Add
          </button>
        </div>

        <ul className="item-list">
          {todos.map(todo => (
            <li key={todo.id} style={{
              opacity: todo.completed ? 0.5 : 1,
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              <span>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  style={{ marginRight: '10px' }}
                />
                {todo.text}
              </span>
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className="danger"
                style={{ padding: '4px 8px', fontSize: '0.8em' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
          Array updates use methods like <code>.map()</code>, <code>.filter()</code>, and spread operator
          to create new arrays. The order of items is preserved, allowing React to track changes accurately.
        </p>
      </div>

      {/* === Summary === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>Summary:</strong> useState is the foundation of state management in functional components.
        Remember three principles:
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Call useState at the top level of your component (not in conditions)</li>
          <li>Always maintain state immutability - create new objects/arrays, don't mutate</li>
          <li>Use functional updates when new state depends on previous state</li>
        </ul>
      </div>
    </div>
  );
}

export default StateManagementExample;

/*
 * === Why We Need useState ===
 *
 * Before React hooks (pre-2019), only class components could have state.
 * Functional components were stateless. useState bridges this gap, allowing
 * functional components to manage state. This led to:
 *
 * 1. Better code organization
 * 2. Easier code reuse through custom hooks
 * 3. Simpler mental model compared to class components
 * 4. Better performance optimizations
 *
 * === State is Local and Private ===
 *
 * Each component instance has its own independent state. If you render the same
 * component twice, each gets its own state. This is encapsulation - state is
 * completely local to the component.
 *
 * === State Updates are Asynchronous ===
 *
 * When you call a state setter (like setCount), React doesn't update the state
 * immediately. Instead, it queues the update and batches multiple updates
 * together for better performance. This means you can't rely on state being
 * updated immediately after calling the setter.
 */
