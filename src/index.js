/*
 * Entry Point: src/index.js
 *
 * Purpose:
 * This is the entry point of the React application. It's responsible for:
 * 1. Importing the React and ReactDOM libraries
 * 2. Importing the root App component
 * 3. Rendering the App component into the DOM
 *
 * Concepts Involved:
 * - React library and ReactDOM library
 * - Root component rendering
 * - DOM manipulation
 * - Strict Mode (enabled for development, helps catch common issues)
 *
 * Strict Mode Benefits:
 * - Identifies components with unsafe lifecycles
 * - Warns about legacy context API usage
 * - Warns about findDOMNode usage
 * - Detects unexpected side effects
 * - Validates that components follow certain React best practices
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- React 18 Root API ---
// React 18 introduced a new root API using createRoot
// This is the new recommended way to render React applications
const root = ReactDOM.createRoot(document.getElementById('root'));

// --- Rendering the Application ---
// React.StrictMode is a wrapper component that helps identify potential problems
// in the application during development. It does NOT affect production builds.
// It runs additional development checks and warnings.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
 * Why Strict Mode?
 * In development, Strict Mode:
 * - Deliberately double-invokes certain functions to catch bugs
 * - Helps detect unintended side effects in render methods
 * - Provides warnings about deprecated APIs
 */
