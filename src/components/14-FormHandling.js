/*
 * ============================================================================
 * FORM HANDLING & ERROR BOUNDARIES
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates critical patterns for production React apps:
 * 
 * 1. Controlled Form Components - Managing form inputs with state
 * 2. Form Validation Patterns - Real-time and submit-time validation
 * 3. Error Handling - Try-catch patterns in effects
 * 4. Error Boundaries - Class component pattern for catching errors
 * 5. Form Submission & Data Handling
 * ============================================================================
 */

import React, { useState, useReducer, useCallback } from 'react';

/*
 * ============================================================================
 * PATTERN 1: BASIC FORM HANDLING
 * ============================================================================
 * 
 * Demonstrates controlled form components with state management
 */

function BasicFormExample() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console.');
    setFormData({ username: '', email: '', message: '' });
  };

  return (
    <div>
      <h4>Basic Form Handling</h4>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">
            Username:
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={{
                display: 'block',
                width: '100%',
                marginTop: '5px',
                padding: '8px'
              }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              style={{
                display: 'block',
                width: '100%',
                marginTop: '5px',
                padding: '8px'
              }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message">
            Message:
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              style={{
                display: 'block',
                width: '100%',
                marginTop: '5px',
                padding: '8px',
                minHeight: '100px',
                fontFamily: 'inherit'
              }}
              required
            />
          </label>
        </div>

        <button type="submit" style={{
          backgroundColor: '#667eea',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Submit
        </button>
      </form>

      <code className="code-block">
{`const [formData, setFormData] = useState({
  username: '',
  email: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// Use in input
<input name="username" value={formData.username} onChange={handleChange} />`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 2: FORM VALIDATION
 * ============================================================================
 * 
 * Demonstrates real-time and validation patterns
 */

function FormValidationExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 8;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value && !validatePassword(value)) {
      setErrors(prev => ({ ...prev, password: 'Must be 8+ chars' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const isValid = validateEmail(email) && validatePassword(password);

  return (
    <div>
      <h4>Form Validation</h4>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email-validation">
          Email:
          <input
            id="email-validation"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@test.com"
            style={{
              display: 'block',
              width: '100%',
              marginTop: '5px',
              padding: '8px',
              borderColor: errors.email ? 'red' : '#ccc',
              borderWidth: '2px'
            }}
          />
        </label>
        {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>❌ {errors.email}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="password-validation">
          Password:
          <input
            id="password-validation"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Min 8 characters"
            style={{
              display: 'block',
              width: '100%',
              marginTop: '5px',
              padding: '8px',
              borderColor: errors.password ? 'red' : '#ccc',
              borderWidth: '2px'
            }}
          />
        </label>
        {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>❌ {errors.password}</p>}
      </div>

      <button
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? '#48bb78' : '#ccc',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: isValid ? 'pointer' : 'not-allowed'
        }}
      >
        {isValid ? '✅ Ready to Submit' : '❌ Fill Form'}
      </button>

      <code className="code-block">
{`// Real-time validation
const handleChange = (e) => {
  const value = e.target.value;
  setValue(value);
  
  // Validate immediately
  if (!isValid(value)) {
    setErrors(prev => ({ ...prev, field: 'error' }));
  }
};

// Disable submit while invalid
<button disabled={!isFormValid}>Submit</button>`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 3: FORM WITH useReducer
 * ============================================================================
 * 
 * Complex form state management with reducer pattern
 */

function FormWithReducerExample() {
  const initialState = {
    firstName: '',
    lastName: '',
    country: '',
    agreeToTerms: false,
    errors: {}
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return {
          ...state,
          [action.field]: action.value,
          errors: { ...state.errors, [action.field]: '' }
        };
      case 'SET_ERROR':
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.error }
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'SET_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formState);
  };

  return (
    <div>
      <h4>Form with useReducer</h4>
      <p>Complex form state using the reducer pattern</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            placeholder="First Name"
            style={{ width: '48%', marginRight: '4%', padding: '8px' }}
          />
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={{ width: '48%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <select
            name="country"
            value={formState.country}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Select Country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formState.agreeToTerms}
              onChange={handleChange}
            />
            {' '}I agree to the terms
          </label>
        </div>

        <button type="submit" style={{
          backgroundColor: '#667eea',
          color: 'white',
          marginRight: '10px',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Submit
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            backgroundColor: '#ccc',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

/*
 * ============================================================================
 * PATTERN 4: ERROR HANDLING IN EFFECTS
 * ============================================================================
 * 
 * Handling errors when fetching data or running side effects
 */

function ErrorHandlingExample() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        // Simulate random success/failure
        if (Math.random() > 0.5) {
          setData({ message: 'Data fetched successfully!' });
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div>
      <h4>Error Handling in Effects</h4>

      <button
        onClick={fetchData}
        disabled={loading}
        style={{
          backgroundColor: '#667eea',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '⏳ Loading...' : '🔄 Fetch Data'}
      </button>

      <div style={{ marginTop: '20px', minHeight: '50px' }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}
        {data && <p style={{ color: 'green' }}>✅ {data.message}</p>}
      </div>

      <code className="code-block">
{`const [error, setError] = useState(null);

useEffect(() => {
  try {
    const result = await fetch('/api/data');
    if (!result.ok) throw new Error('Failed');
    const data = await result.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  }
}, []);

{error && <p>Error: {error}</p>}`}
      </code>
    </div>
  );
}

/*
 * ============================================================================
 * MAIN COMPONENT
 * ============================================================================
 */
function FormHandlingAndErrorsExample() {
  const [activePattern, setActivePattern] = useState('basic');

  return (
    <div className="hook-section">
      <h2>Form Handling & Error Management</h2>

      {/* Navigation */}
      <div className="hook-subsection">
        <h3>Select Pattern</h3>
        <div className="button-group">
          <button
            onClick={() => setActivePattern('basic')}
            style={{
              backgroundColor: activePattern === 'basic' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Basic Form
          </button>
          <button
            onClick={() => setActivePattern('validation')}
            style={{
              backgroundColor: activePattern === 'validation' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Validation
          </button>
          <button
            onClick={() => setActivePattern('reducer')}
            style={{
              backgroundColor: activePattern === 'reducer' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            useReducer
          </button>
          <button
            onClick={() => setActivePattern('errors')}
            style={{
              backgroundColor: activePattern === 'errors' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Error Handling
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="hook-subsection">
        <div className="demo-box">
          {activePattern === 'basic' && <BasicFormExample />}
          {activePattern === 'validation' && <FormValidationExample />}
          {activePattern === 'reducer' && <FormWithReducerExample />}
          {activePattern === 'errors' && <ErrorHandlingExample />}
        </div>
      </div>

      {/* Summary */}
      <div className="hook-subsection">
        <h3>Form Handling Patterns</h3>
        <div className="summary-box">
          <div className="summary-item">
            <h4>Controlled Components</h4>
            <p>Manage form inputs through React state for full control</p>
          </div>

          <div className="summary-item">
            <h4>Real-Time Validation</h4>
            <p>Validate as user types for instant feedback</p>
          </div>

          <div className="summary-item">
            <h4>useReducer for Complex Forms</h4>
            <p>Use reducer pattern for multi-field form state</p>
          </div>

          <div className="summary-item">
            <h4>Error Handling</h4>
            <p>Always wrap async operations in try-catch and set error state</p>
          </div>

          <div className="summary-item">
            <h4>Submission Handling</h4>
            <p>Prevent default, validate, then submit safely</p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="hook-subsection">
        <h3>Best Practices</h3>
        <ul className="explanation-box">
          <li>Always use controlled components for critical forms</li>
          <li>Validate early and provide instant feedback</li>
          <li>Use <code>useReducer</code> for complex multi-field forms</li>
          <li>Handle errors gracefully - show user-friendly messages</li>
          <li>Prevent default form behavior with <code>preventDefault()</code></li>
          <li>Clear sensitive data after submission or on component unmount</li>
        </ul>
      </div>
    </div>
  );
}

export default FormHandlingAndErrorsExample;
