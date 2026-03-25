/*
 * ============================================================================
 * ENTERPRISE REACT ARCHITECTURE
 * ============================================================================
 * 
 * Component Purpose:
 * Advanced architectural patterns for building scalable, maintainable,
 * large-scale React applications at the enterprise level.
 * 
 * Topics Covered:
 * 1. Scalable Folder Structure
 * 2. Component Architecture Patterns
 * 3. Feature-Based vs Layer-Based Organization
 * 4. Code Splitting Strategies
 * 5. Error Boundaries & Resilience
 * 6. Authentication/Authorization Patterns
 * ============================================================================
 */

import React, { useState } from 'react';

function EnterpriseArchitectureExample() {
  const [activeSection, setActiveSection] = useState('structure');

  return (
    <div className="hook-section">
      <h2>Enterprise React Architecture</h2>

      <div className="hook-subsection">
        <h3>Architecture Patterns for Scale</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveSection('structure')}
            style={{
              backgroundColor: activeSection === 'structure' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Folder Structure
          </button>
          <button
            onClick={() => setActiveSection('components')}
            style={{
              backgroundColor: activeSection === 'components' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Component Patterns
          </button>
          <button
            onClick={() => setActiveSection('auth')}
            style={{
              backgroundColor: activeSection === 'auth' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Auth Patterns
          </button>
          <button
            onClick={() => setActiveSection('errors')}
            style={{
              backgroundColor: activeSection === 'errors' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Resilience
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'structure' && (
            <div>
              <h4>Scalable Folder Structure</h4>
              <p>Organize your React application for long-term maintainability:</p>
              
              <code className="code-block">
{`src/
├── features/                    # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── store/              # Feature-local state
│   │   └── index.ts            # Public API
│   ├── dashboard/
│   ├── products/
│   └── users/
├── shared/                      # Shared across features
│   ├── components/             # UI components
│   ├── hooks/                  # Custom hooks
│   ├── utilities/              # Helpers
│   ├── types/                  # Global types
│   └── constants/
├── core/                        # Core services
│   ├── api/                    # API client
│   ├── auth/                   # Auth service
│   ├── logger/                 # Logging
│   └── config/                 # Configuration
├── layouts/                     # Page layouts
├── App.tsx
└── index.tsx`}
              </code>

              <div className="explanation-box">
                <h5>Key Principles:</h5>
                <ul>
                  <li><strong>Feature Isolation:</strong> Each feature is self-contained with its own state and logic</li>
                  <li><strong>Clear Public API:</strong> Each feature exports a barrel file (index.ts)</li>
                  <li><strong>Shared Resources:</strong> Reusable components in shared folder</li>
                  <li><strong>Core Services:</strong> Infrastructure code separated from features</li>
                  <li><strong>Scale Horizontally:</strong> Easy to add new features without touching existing code</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'components' && (
            <div>
              <h4>Component Architecture Patterns</h4>
              
              <div className="explanation-box">
                <h5>1. Smart vs Presentational Components</h5>
                <code className="code-block">
{`// ❌ Avoid: Mixed concerns
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
}

// ✅ Prefer: Separated concerns
// Container (Smart)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetchUsers().then(setUsers); }, []);
  return <UserListPresentation users={users} />;
}

// Presentational (Dumb)
function UserListPresentation({ users }) {
  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Compound Component Pattern</h5>
                <code className="code-block">
{`// ✅ Flexible API for users
<Modal>
  <Modal.Header>Confirm Action</Modal.Header>
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>
    <Button onClick={onCancel}>Cancel</Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </Modal.Footer>
</Modal>`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Render Props vs Custom Hooks</h5>
                <p>Modern approach: Use custom hooks over render props</p>
                <code className="code-block">
{`// ✅ Custom Hook (recommended)
const useUserData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data
  }, [userId]);
  return { data, loading };
};

function UserProfile({ userId }) {
  const { data, loading } = useUserData(userId);
  return <div>{loading ? 'Loading...' : data.name}</div>;
}`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'auth' && (
            <div>
              <h4>Authentication & Authorization Patterns</h4>
              
              <div className="explanation-box">
                <h5>Protected Route Pattern</h5>
                <code className="code-block">
{`function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}

// Usage
<Routes>
  <Route path="/login" element={<Login />} />
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
</Routes>`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Role-Based Access Control (RBAC)</h5>
                <code className="code-block">
{`const usePermission = (requiredRole) => {
  const { user } = useAuth();
  return user?.roles.includes(requiredRole) ?? false;
};

function AdminPanel() {
  const hasAdminRole = usePermission('admin');
  return hasAdminRole ? <AdminContent /> : <AccessDenied />;
};`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Token Management</h5>
                <ul>
                  <li>Store refresh token in httpOnly cookie (secure)</li>
                  <li>Store access token in memory (fast)</li>
                  <li>Refresh token on expiry automatically</li>
                  <li>Handle 401 responses with retry logic</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'errors' && (
            <div>
              <h4>Error Boundaries & Resilience</h4>
              
              <div className="explanation-box">
                <h5>Error Boundary Implementation</h5>
                <code className="code-block">
{`class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Graceful Degradation</h5>
                <code className="code-block">
{`function FeatureComponent() {
  const { data, error, retrying } = useFeatureData();
  
  if (error && !retrying) {
    return <OfflineMode data={cachedData} />;
  }
  
  return <OnlineMode data={data} />;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Resilience Patterns</h5>
                <ul>
                  <li><strong>Retry Logic:</strong> Exponential backoff for failed requests</li>
                  <li><strong>Circuit Breaker:</strong> Stop calling failing services</li>
                  <li><strong>Fallback UI:</strong> Show cached/default data on failure</li>
                  <li><strong>User Feedback:</strong> Clear error messages with actions</li>
                  <li><strong>Error Tracking:</strong> Send errors to monitoring service</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Best Practices</h3>
        <div className="explanation-box">
          <ul>
            <li>Keep components focused and testable</li>
            <li>Separate business logic from presentation</li>
            <li>Use TypeScript for type safety at scale</li>
            <li>Implement proper error handling throughout</li>
            <li>Design for feature-based modularity</li>
            <li>Use dependency injection for testability</li>
            <li>Implement proper logging and monitoring</li>
            <li>Plan for code splitting and lazy loading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseArchitectureExample;
