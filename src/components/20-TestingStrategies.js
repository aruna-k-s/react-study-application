/*
 * ============================================================================
 * TESTING STRATEGIES FOR ENTERPRISE APPLICATIONS
 * ============================================================================
 * 
 * Component Purpose:
 * Comprehensive testing strategies for building reliable, production-ready
 * React applications (Unit, Integration, E2E).
 * 
 * Topics:
 * 1. Unit Testing with Jest & React Testing Library
 * 2. Integration Testing
 * 3. End-to-End Testing
 * 4. Test Pyramid & Strategy
 * 5. Mocking & Fixtures
 * 6. Test Automation
 * ============================================================================
 */

import React, { useState } from 'react';

function TestingStrategiesExample() {
  const [activeTopic, setActiveTopic] = useState('pyramid');

  return (
    <div className="hook-section">
      <h2>Testing Strategies for Enterprise Applications</h2>

      <div className="hook-subsection">
        <h3>Testing Approaches</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveTopic('pyramid')}
            style={{
              backgroundColor: activeTopic === 'pyramid' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Test Pyramid
          </button>
          <button
            onClick={() => setActiveTopic('unit')}
            style={{
              backgroundColor: activeTopic === 'unit' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Unit Tests
          </button>
          <button
            onClick={() => setActiveTopic('integration')}
            style={{
              backgroundColor: activeTopic === 'integration' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Integration
          </button>
          <button
            onClick={() => setActiveTopic('e2e')}
            style={{
              backgroundColor: activeTopic === 'e2e' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            E2E Tests
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeTopic === 'pyramid' && (
            <div>
              <h4>The Testing Pyramid</h4>
              
              <div style={{ 
                textAlign: 'center',
                margin: '20px 0',
                fontFamily: 'monospace'
              }}>
                <div style={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: '#e74c3c',
                  margin: '0 auto 5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  E2E (5-10%)
                </div>
                <div style={{
                  width: '200px',
                  height: '50px',
                  backgroundColor: '#f39c12',
                  margin: '0 auto 5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  Integration (15-30%)
                </div>
                <div style={{
                  width: '300px',
                  height: '60px',
                  backgroundColor: '#27ae60',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  Unit Tests (60-80%)
                </div>
              </div>

              <div className="explanation-box">
                <h5>Rationale:</h5>
                <ul>
                  <li><strong>Unit Tests (60-80%):</strong> Fast, cheap, catch bugs early</li>
                  <li><strong>Integration Tests (15-30%):</strong> Verify components work together</li>
                  <li><strong>E2E Tests (5-10%):</strong> Expensive, slow, but catch real-user workflows</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>What to Test:</h5>
                <ul>
                  <li>✅ Business logic and calculations</li>
                  <li>✅ Edge cases and error handling</li>
                  <li>✅ User interactions and workflows</li>
                  <li>✅ API integration and data fetching</li>
                  <li>❌ Don't test: implementation details, style</li>
                  <li>❌ Don't test: third-party libraries</li>
                </ul>
              </div>
            </div>
          )}

          {activeTopic === 'unit' && (
            <div>
              <h4>Unit Testing with React Testing Library</h4>

              <div className="explanation-box">
                <h5>1. Component Testing</h5>
                <code className="code-block">
{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ✅ Test behavior, not implementation
test('displays welcome message and login button', () => {
  render(<LoginForm />);
  
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i }))
    .toBeInTheDocument();
});

// ✅ Test user interactions
test('submits form with email and password', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  
  await userEvent.type(
    screen.getByLabelText(/email/i), 
    'user@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i),
    'password123'
  );
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123'
  });
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Hooks Testing</h5>
                <code className="code-block">
{`import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Mocking Modules</h5>
                <code className="code-block">
{`// Mock an API call
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => 
    Promise.resolve({ id: 1, name: 'John' })
  )
}));

import { fetchUser } from './api';

test('loads and displays user', async () => {
  const { getByText } = render(<UserProfile />);
  
  await waitFor(() => {
    expect(getByText('John')).toBeInTheDocument();
  });
  
  expect(fetchUser).toHaveBeenCalled();
});`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'integration' && (
            <div>
              <h4>Integration Testing</h4>

              <div className="explanation-box">
                <h5>1. Testing Multiple Components Together</h5>
                <code className="code-block">
{`test('user can filter and select products', async () => {
  const mockApi = jest.fn(() => 
    Promise.resolve([
      { id: 1, name: 'Product A', category: 'Electronics' },
      { id: 2, name: 'Product B', category: 'Books' }
    ])
  );
  
  render(
    <ProductCatalog apiClient={{ getProducts: mockApi }} />
  );
  
  // Filter by category
  await userEvent.click(
    screen.getByRole('checkbox', { name: /electronics/i })
  );
  
  // Product appears
  await waitFor(() => {
    expect(screen.getByText('Product A')).toBeInTheDocument();
  });
  
  // Select product
  await userEvent.click(screen.getByRole('button', { name: /select/i }));
  
  // Navigation occurs
  expect(mockNavigate).toHaveBeenCalledWith('/cart');
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Testing with Context Providers</h5>
                <code className="code-block">
{`// Custom render function with providers
const renderWithContext = (component) => {
  return render(
    <ThemeProvider>
      <AuthProvider>
        {component}
      </AuthProvider>
    </ThemeProvider>
  );
};

test('respects theme context', () => {
  renderWithContext(<UserProfile />);
  
  const container = screen.getByRole('main');
  expect(container).toHaveStyle('color: white');
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Testing Data Flow</h5>
                <code className="code-block">
{`test('user data flows through components', async () => {
  const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  
  const { rerender } = render(
    <UserManager initialUser={null} />
  );
  
  // Load user
  await act(async () => {
    rerender(<UserManager initialUser={mockUser} />);
  });
  
  // Verify data appears in child components
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'e2e' && (
            <div>
              <h4>End-to-End Testing</h4>

              <div className="explanation-box">
                <h5>1. Cypress Testing</h5>
                <code className="code-block">
{`// cypress/e2e/login.cy.js
describe('User Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify redirect to dashboard
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-welcome"]')
      .should('contain', 'Welcome, User');
  });

  it('should show error with invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrong');
    cy.get('button[type="submit"]').click();

    cy.get('[role="alert"]')
      .should('contain', 'Invalid credentials');
  });
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Best Practices for E2E</h5>
                <ul>
                  <li>✅ Test critical user journeys</li>
                  <li>✅ Use data-testid for reliable selectors</li>
                  <li>✅ Keep tests independent</li>
                  <li>✅ Use realistic test data</li>
                  <li>✅ Run in headless mode for CI/CD</li>
                  <li>❌ Don't test implementation details</li>
                  <li>❌ Avoid flaky waits - use cy.intercept()</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>3. Handling Async Operations</h5>
                <code className="code-block">
{`// Intercept and wait for network calls
cy.intercept('GET', '/api/users**', { fixture: 'users.json' });
cy.visit('/dashboard');

// Wait for API call
cy.intercept('POST', '/api/users').as('createUser');
cy.get('[data-testid="create-btn"]').click();
cy.wait('@createUser');

// Verify response
cy.get('[data-testid="success-msg"]')
  .should('contain', 'User created successfully');`}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Testing Checklist</h3>
        <div className="explanation-box">
          <ul>
            <li>✅ Happy path scenario</li>
            <li>✅ Error cases and edge cases</li>
            <li>✅ Loading and empty states</li>
            <li>✅ User interactions and events</li>
            <li>✅ Data validation</li>
            <li>✅ API error handling</li>
            <li>✅ Accessibility (a11y)</li>
            <li>✅ Critical user workflows (E2E)</li>
            <li>✅ Performance regression tests</li>
            <li>✅ Cross-browser compatibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TestingStrategiesExample;
