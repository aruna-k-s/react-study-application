/*
 * ============================================================================
 * STATE MANAGEMENT PATTERNS FOR ENTERPRISE
 * ============================================================================
 * 
 * Component Purpose:
 * Advanced state management strategies for complex applications.
 * Covers Redux, Context API patterns, and Zustand basics.
 * 
 * Topics:
 * 1. When to use each state management solution
 * 2. Redux architecture and best practices
 * 3. Context API advanced patterns
 * 4. Zustand lightweight alternative
 * 5. Selectors and memoization
 * 6. Middleware and side effects
 * ============================================================================
 */

import React, { useState } from 'react';

function StateManagementPatternsExample() {
  const [activePattern, setActivePattern] = useState('comparison');

  return (
    <div className="hook-section">
      <h2>Enterprise State Management Patterns</h2>

      <div className="hook-subsection">
        <h3>Choose Your Pattern</h3>
        <div className="button-group">
          <button
            onClick={() => setActivePattern('comparison')}
            style={{
              backgroundColor: activePattern === 'comparison' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Comparison
          </button>
          <button
            onClick={() => setActivePattern('redux')}
            style={{
              backgroundColor: activePattern === 'redux' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Redux
          </button>
          <button
            onClick={() => setActivePattern('context')}
            style={{
              backgroundColor: activePattern === 'context' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Context API
          </button>
          <button
            onClick={() => setActivePattern('zustand')}
            style={{
              backgroundColor: activePattern === 'zustand' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Zustand
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activePattern === 'comparison' && (
            <div>
              <h4>State Management Solution Comparison</h4>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>Criteria</th>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>Context API</th>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>Redux</th>
                    <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>Zustand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Bundle Size</strong></td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>~0KB (built-in)</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>~65KB</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>~2.4KB</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Learning Curve</strong></td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Easy</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Steep</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Very Easy</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Performance</strong></td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Can cause unnecessary rerenders</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Excellent with selectors</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Excellent</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>DevTools</strong></td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>None</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Excellent</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Good</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Best For</strong></td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Small to medium apps</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Large complex apps</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Modern, lightweight apps</td>
                  </tr>
                </tbody>
              </table>

              <div className="explanation-box">
                <h5>Decision Tree:</h5>
                <ul>
                  <li>✅ <strong>Simple local state?</strong> → useState</li>
                  <li>✅ <strong>Shared state, small app?</strong> → Context API</li>
                  <li>✅ <strong>Complex async logic needed?</strong> → Redux + Redux Thunk/Saga</li>
                  <li>✅ <strong>Want minimal setup, modern?</strong> → Zustand</li>
                  <li>✅ <strong>GraphQL + caching?</strong> → React Query / Apollo Client</li>
                </ul>
              </div>
            </div>
          )}

          {activePattern === 'redux' && (
            <div>
              <h4>Redux Best Practices</h4>

              <div className="explanation-box">
                <h5>1. Redux Ducks Pattern (Recommended)</h5>
                <code className="code-block">
{`// features/users/userSlice.js (Redux Toolkit)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks (side effects)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    userAdded: (state, action) => {
      state.data.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const selectUsers = (state) => state.users.data;
export const selectUsersLoading = (state) => state.users.loading;
export default usersSlice.reducer;`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Selectors (Minimize re-renders)</h5>
                <code className="code-block">
{`// Memoized selectors prevent unnecessary re-renders
import { createSelector } from '@reduxjs/toolkit';

export const selectUsers = (state) => state.users.data;

// Only re-renders if activeUsers actually changes
export const selectActiveUsers = createSelector(
  [selectUsers],
  (users) => users.filter(u => u.active)
);

// Usage in component
function UsersList() {
  const activeUsers = useSelector(selectActiveUsers);
  return <div>{activeUsers.map(u => <div>{u.name}</div>)}</div>;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Middleware for Side Effects</h5>
                <code className="code-block">
{`// Redux middleware for handling side effects
const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('New state:', store.getState());
  return result;
};

// Or use Redux Thunk for async actions
const store = configureStore({
  reducer: { users: usersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware)
});`}
                </code>
              </div>
            </div>
          )}

          {activePattern === 'context' && (
            <div>
              <h4>Advanced Context API Patterns</h4>

              <div className="explanation-box">
                <h5>1. Multiple Contexts with Composition</h5>
                <code className="code-block">
{`// Avoid deep nesting → Use composition
const AuthContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Usage
<AppProviders>
  <App />
</AppProviders>`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. useReducer + Context for Complex State</h5>
                <code className="code-block">
{`const StateContext = createContext();
const DispatchContext = createContext();

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Custom hooks to avoid direct context access
export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Preventing Unnecessary Re-renders</h5>
                <code className="code-block">
{`// Split contexts to prevent cascading re-renders
const ValuesContext = createContext();
const UpdateContext = createContext();

function StateProvider({ children }) {
  const [state, setState] = useState(initialState);
  
  // Memoize to prevent unnecessary re-renders
  const value = useMemo(() => state, [state]);
  const update = useMemo(() => ({ setState }), []);

  return (
    <ValuesContext.Provider value={value}>
      <UpdateContext.Provider value={update}>
        {children}
      </UpdateContext.Provider>
    </ValuesContext.Provider>
  );
}`}
                </code>
              </div>
            </div>
          )}

          {activePattern === 'zustand' && (
            <div>
              <h4>Zustand - Lightweight State Management</h4>

              <div className="explanation-box">
                <h5>Basic Store</h5>
                <code className="code-block">
{`import create from 'zustand';

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  
  // Actions
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  
  // Async action
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const data = await api.get('/users');
      set({ users: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));

// Usage
function UsersList() {
  const { users, loading, fetchUsers } = useUserStore();
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Selectors for Performance</h5>
                <code className="code-block">
{`const useUserStore = create((set) => ({
  // ... store definition
}));

// Memoized selector
const useActiveUsers = () => 
  useUserStore((state) => 
    state.users.filter(u => u.active)
  );

// Only re-renders when activeUsers change
function ActiveUsersList() {
  const activeUsers = useActiveUsers();
  return <div>{activeUsers.map(u => <div>{u.name}</div>)}</div>;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Middleware & Persistence</h5>
                <code className="code-block">
{`const useUserStore = create(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users })
    }),
    { name: 'user-storage' }  // LocalStorage key
  )
);`}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        <div className="explanation-box">
          <ul>
            <li>Choose the right tool for your use case complexity</li>
            <li>Use selectors to optimize performance</li>
            <li>Keep state as normalized as possible</li>
            <li>Separate state into domains (users, products, etc.)</li>
            <li>Handle async actions with thunks or sagas</li>
            <li>Use TypeScript with state management for safety</li>
            <li>Monitor state changes with DevTools</li>
            <li>Consider colocating state with features</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StateManagementPatternsExample;
