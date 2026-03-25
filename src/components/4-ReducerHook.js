/*
 * Component: src/components/4-ReducerHook.js
 *
 * === Component Purpose ===
 * This component demonstrates the useReducer hook, which is an alternative to
 * useState for managing complex state. While useState is great for simple values,
 * useReducer shines when you have multiple related state values or when the next
 * state depends on the previous state in complex ways.
 *
 * useReducer is inspired by Redux and other state management patterns.
 * It provides a more structured way to handle state transitions.
 *
 * === React Concepts Covered ===
 * 1. useReducer hook - Complex state management
 * 2. Reducer functions - Pure functions for state transitions
 * 3. Actions - Objects describing state changes
 * 4. Dispatch - Triggering actions
 * 5. State architecture - Organizing complex state
 * 6. Action types - Preventing typos with string constants
 * 7. Initial state - Setting up reducers
 * 8. Combining useReducer with useContext
 *
 * === Workflow ===
 * 1. Define a reducer function: (state, action) => newState
 * 2. Initialize with useReducer: useReducer(reducer, initialState)
 * 3. Dispatch actions: dispatch({ type: 'ACTION_TYPE', payload: ... })
 * 4. Reducer handles the action and returns new state
 * 5. Component re-renders with new state
 */

import React, { useReducer, useState } from 'react';

// ============================================================================
// === Action Type Constants ===
// ============================================================================

/*
 * Best Practice: Define action types as constants to avoid typos.
 * If you type 'ADDD_ITEM' instead of 'ADD_ITEM', you'll get no error,
 * just unexpected behavior. Constants prevent this.
 */

// Todo actions
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO_COMPLETED: 'TOGGLE_TODO_COMPLETED',
  UPDATE_TODO_TEXT: 'UPDATE_TODO_TEXT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  RESET_TODOS: 'RESET_TODOS',
};

// Counter actions
const COUNTER_ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET_VALUE: 'SET_VALUE',
};

// ============================================================================
// === Reducer Functions ===
// ============================================================================

/*
 * --- Todo Reducer ---
 *
 * A reducer is a PURE FUNCTION with signature:
 * (previousState, action) => newState
 *
 * Rules for reducers:
 * 1. Must be pure - same inputs always produce same output
 * 2. No side effects - no API calls, no random numbers, no console.log
 * 3. Immutable - never modify the input state directly
 * 4. Must handle unknown actions - return current state by default
 *
 * Parameters:
 * - state: The current state (initial value on first call)
 * - action: An object describing what happened (typically has type and payload)
 *
 * Return value:
 * - The new state object
 */
function todoReducer(state, action) {
  switch (action.type) {
    // --- Add a new todo to the list ---
    case ACTIONS.ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: Math.max(...state.todos.map(t => t.id), 0) + 1,
            text: action.payload,
            completed: false,
            createdAt: new Date(),
          },
        ],
        totalCount: state.totalCount + 1,
      };

    // --- Remove a todo from the list ---
    case ACTIONS.REMOVE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
        totalCount: state.totalCount - 1,
      };

    // --- Toggle completion status ---
    case ACTIONS.TOGGLE_TODO_COMPLETED:
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        totalCount: state.totalCount,
      };

    // --- Update the text of a todo ---
    case ACTIONS.UPDATE_TODO_TEXT:
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
        totalCount: state.totalCount,
      };

    // --- Remove all completed todos ---
    case ACTIONS.CLEAR_COMPLETED:
      const incompleteTodos = state.todos.filter(todo => !todo.completed);
      return {
        todos: incompleteTodos,
        totalCount: incompleteTodos.length,
      };

    // --- Reset entire todo list ---
    case ACTIONS.RESET_TODOS:
      return {
        todos: [],
        totalCount: 0,
      };

    // --- Unknown action - return state unchanged ---
    default:
      return state;
  }
}

/*
 * --- Counter Reducer ---
 * A simpler example showing a numeric counter reducer.
 */
function counterReducer(state, action) {
  switch (action.type) {
    case COUNTER_ACTIONS.INCREMENT:
      return {
        value: state.value + 1,
        history: [...state.history, state.value],
      };

    case COUNTER_ACTIONS.DECREMENT:
      return {
        value: state.value - 1,
        history: [...state.history, state.value],
      };

    case COUNTER_ACTIONS.SET_VALUE:
      return {
        value: action.payload,
        history: [...state.history, state.value],
      };

    case COUNTER_ACTIONS.RESET:
      return {
        value: 0,
        history: [],
      };

    default:
      return state;
  }
}

// ============================================================================
// === Initial State ===
// ============================================================================

const initialTodoState = {
  todos: [
    {
      id: 1,
      text: 'Learn useReducer',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      text: 'Understand reducer functions',
      completed: true,
      createdAt: new Date(),
    },
  ],
  totalCount: 2,
};

const initialCounterState = {
  value: 0,
  history: [],
};

// ============================================================================
// === Main Component ===
// ============================================================================

function ReducerHookExample() {
  /*
   * --- useReducer Hook ---
   *
   * Syntax:
   * const [state, dispatch] = useReducer(reducerFunction, initialState)
   *
   * Parameters:
   * 1. reducerFunction: A function that takes (state, action) and returns newState
   * 2. initialState: The starting state value
   *
   * Return value: Array with [currentState, dispatchFunction]
   * - currentState: The current state value
   * - dispatch: Function to trigger state updates by dispatching actions
   *
   * Comparison to useState:
   * useState: Simple state updates, good for individual values
   * useReducer: Complex state logic, multiple related values, clear action flow
   */

  const [todoState, dispatchTodo] = useReducer(todoReducer, initialTodoState);
  const [counterState, dispatchCounter] = useReducer(counterReducer, initialCounterState);
  const [newTodoText, setNewTodoText] = useState('');

  // ============================================================================
  // === Dispatch Functions (Action Creators) ===
  // ============================================================================

  /*
   * Good practice: Create dispatch wrapper functions that make it clear
   * what each dispatch does. This prevents typos and makes code more readable.
   */

  const addTodo = (text) => {
    dispatchTodo({
      type: ACTIONS.ADD_TODO,
      payload: text,
    });
  };

  const removeTodo = (id) => {
    dispatchTodo({
      type: ACTIONS.REMOVE_TODO,
      payload: id,
    });
  };

  const toggleTodo = (id) => {
    dispatchTodo({
      type: ACTIONS.TOGGLE_TODO_COMPLETED,
      payload: id,
    });
  };

  const updateTodoText = (id, newText) => {
    dispatchTodo({
      type: ACTIONS.UPDATE_TODO_TEXT,
      payload: { id, text: newText },
    });
  };

  const clearCompleted = () => {
    dispatchTodo({
      type: ACTIONS.CLEAR_COMPLETED,
    });
  };

  const resetTodos = () => {
    dispatchTodo({
      type: ACTIONS.RESET_TODOS,
    });
  };

  const incrementCounter = () => {
    dispatchCounter({
      type: COUNTER_ACTIONS.INCREMENT,
    });
  };

  const decrementCounter = () => {
    dispatchCounter({
      type: COUNTER_ACTIONS.DECREMENT,
    });
  };

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };

  // Calculate statistics
  const completedCount = todoState.todos.filter(t => t.completed).length;
  const pendingCount = todoState.todos.length - completedCount;

  return (
    <div className="component-section">
      <h2>useReducer Hook - Complex State Management</h2>

      <p>
        The <code>useReducer</code> hook is an alternative to <code>useState</code>
        for managing complex state. It uses a reducer function to handle state transitions
        based on dispatched actions, similar to Redux.
      </p>

      <div className="explanation">
        <strong>When to use useReducer:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Multiple related state values</li>
          <li>Complex state transitions logic</li>
          <li>Next state depends on previous state</li>
          <li>Want to optimize performance (can pass dispatch to child components)</li>
        </ul>
      </div>

      {/* === Example 1: Todo List with useReducer === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 1: Todo List Manager</h3>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          <div>
            <span style={{ color: '#666' }}>Total:</span>
            {' '}
            <strong>{todoState.todos.length}</strong>
          </div>
          <div>
            <span style={{ color: '#666' }}>Completed:</span>
            {' '}
            <strong style={{ color: '#28a745' }}>{completedCount}</strong>
          </div>
          <div>
            <span style={{ color: '#666' }}>Pending:</span>
            {' '}
            <strong style={{ color: '#dc3545' }}>{pendingCount}</strong>
          </div>
        </div>

        {/* Add Todo */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '15px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Add a new todo..."
            style={{ flex: 1 }}
          />
          <button onClick={handleAddTodo} className="success">Add</button>
        </div>

        {/* Todo List */}
        <ul className="item-list">
          {todoState.todos.map(todo => (
            <li
              key={todo.id}
              style={{
                opacity: todo.completed ? 0.6 : 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ marginRight: '10px' }}
                />
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => updateTodoText(todo.id, e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      font: 'inherit',
                      width: '100%'
                    }}
                    onFocus={(e) => e.target.style.background = '#fff'}
                    onBlur={(e) => e.target.style.background = 'transparent'}
                  />
                </div>
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="danger"
                style={{ padding: '4px 8px', fontSize: '0.8em' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todoState.todos.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            {completedCount > 0 && (
              <button onClick={clearCompleted} className="secondary">
                Clear Completed ({completedCount})
              </button>
            )}
            <button onClick={resetTodos} className="danger">Reset All</button>
          </div>
        )}

        {todoState.todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
            No todos yet. Add one to get started!
          </p>
        )}

        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '15px' }}>
          This example uses useReducer to manage multiple related state values
          (todos list and total count) through dispatch actions.
        </p>
      </div>

      {/* === Example 2: Counter with History === */}
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', margin: '15px 0' }}>
        <h3>Example 2: Counter with History</h3>

        <div style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '2em', margin: '0', fontWeight: 'bold' }}>
            {counterState.value}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button onClick={decrementCounter}>Decrement</button>
          <button onClick={incrementCounter} className="success">Increment</button>
          <button onClick={() => dispatchCounter({ type: COUNTER_ACTIONS.RESET })} className="secondary">
            Reset
          </button>
        </div>

        <div>
          <h4>Change History:</h4>
          {counterState.history.length > 0 ? (
            <div style={{
              display: 'flex',
              gap: '5px',
              flexWrap: 'wrap',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px'
            }}>
              {counterState.history.map((value, index) => (
                <span
                  key={index}
                  className="badge badge-primary"
                  style={{ padding: '5px 10px' }}
                >
                  {value}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999' }}>No history yet</p>
          )}
        </div>

        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '15px' }}>
          This simpler example shows how useReducer handles a numeric counter
          and maintains a history of changes.
        </p>
      </div>

      {/* === Reducer Pattern Overview === */}
      <div style={{ marginTop: '20px' }}>
        <h3>useReducer Pattern Overview</h3>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px',
          fontSize: '0.9em'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Component</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Purpose</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>Reducer Function</td>
              <td style={{ padding: '10px' }}>
                Pure function that returns new state based on action
              </td>
              <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>
                (state, action) =&gt; newState
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>Action</td>
              <td style={{ padding: '10px' }}>
                Object describing what happened
              </td>
              <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>
                {'{type: "ADD", payload: ...{'}'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>Dispatch</td>
              <td style={{ padding: '10px' }}>
                Function to send actions to reducer
              </td>
              <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>
                dispatch({'{type: action{'}'}})
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>State</td>
              <td style={{ padding: '10px' }}>
                Current state value returned by reducer
              </td>
              <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.85em' }}>
                const [state, dispatch] = ...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Reducer Functions Rules === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>Reducer Function Rules (Must Be Pure):</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Same input always produces same output</li>
          <li>No side effects (no API calls, random numbers, time operations)</li>
          <li>Never mutate input parameters directly</li>
          <li>Must return newState or current state</li>
          <li>Handle unknown action types gracefully</li>
        </ul>
      </div>

      {/* === useState vs useReducer === */}
      <div className="explanation" style={{ marginTop: '20px', backgroundColor: '#f0f0f0' }}>
        <strong>useState vs useReducer:</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>useState:</strong> Simple values, direct updates: setCount(5)</li>
          <li><strong>useReducer:</strong> Complex logic, related values, action-based updates</li>
          <li><strong>Performance:</strong> useReducer dispatch can be passed to children (prevents recreation)</li>
          <li><strong>Testing:</strong> useReducer easier to test (pure reducer functions)</li>
        </ul>
      </div>

      {/* === Summary === */}
      <div className="explanation" style={{ marginTop: '20px' }}>
        <strong>Summary:</strong> useReducer is perfect for complex state with multiple related values
        and clear transitions. Dispatch actions to trigger state changes through a pure reducer function.
      </div>
    </div>
  );
}

export default ReducerHookExample;

/*
 * === useReducer vs Redux ===
 *
 * useReducer: Built-in hook, good for local component or app state
 * Redux: Separate library, more scalable for large apps, better tooling
 *
 * In many cases, useReducer + Context is sufficient.
 * Use Redux when your state becomes too complex.
 *
 * === Action Creators Best Practice ===
 *
 * While we showed inline dispatch calls, many prefer action creator functions:
 *
 * const addTodo = (text) => ({
 *   type: ACTIONS.ADD_TODO,
 *   payload: text,
 * });
 *
 * This centralizes action creation and makes typo prevention easier.
 */
