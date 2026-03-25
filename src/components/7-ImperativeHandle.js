/*
 * ============================================================================
 * USEIMPERATIVEHANDLE HOOK DEMONSTRATION
 * ============================================================================
 * 
 * Component Purpose:
 * This component demonstrates useImperativeHandle, which allows child components
 * to expose imperative methods to parent components through refs.
 * 
 * Why useImperativeHandle?
 * By default, refs only give access to DOM elements. useImperativeHandle lets
 * you customize what the parent receives when accessing a ref to your component.
 * This is useful for exposing specific imperative methods to parent components.
 * 
 * Key Concepts:
 * - Customizing ref behavior in functional components
 * - Exposing imperative methods to parents
 * - Using forwardRef to accept refs
 * - Encapsulation of component logic
 * - Parent-child communication patterns
 * 
 * Use Cases:
 * - Exposing focus/blur methods
 * - Exposing validation methods
 * - Triggering animations
 * - Resetting component state from parent
 * ============================================================================
 */

import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';

/*
 * === Child Component with Imperative Handle ===
 * 
 * This component demonstrates how to expose methods to a parent component
 * through useImperativeHandle.
 * 
 * Key Points:
 * 1. Must use forwardRef to receive ref prop
 * 2. useImperativeHandle connects ref to exposed methods
 * 3. Parent can call these methods through ref
 */

/*
 * --- forwardRef Wrapper ---
 * 
 * Normally, functional components don't accept a 'ref' prop.
 * forwardRef allows this component to receive and use a ref.
 * 
 * Syntax:
 * const MyComponent = forwardRef((props, ref) => { ... });
 * 
 * Parameters:
 * 1. Component function that receives (props, ref)
 * 2. Returns JSX
 * 
 * Without forwardRef:
 * <MyComponent ref={ref} /> // ref would be undefined inside component
 * 
 * With forwardRef:
 * <MyComponent ref={ref} /> // ref is available inside component
 */
const CustomInput = forwardRef(function CustomInput(props, ref) {
  // Internal state for the input
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  /*
   * --- useImperativeHandle Hook ---
   * 
   * Purpose:
   * Customize the instance value that is exposed to parents via ref.
   * Instead of exposing the entire component, only expose specific methods.
   * 
   * Syntax:
   * useImperativeHandle(ref, () => ({
   *   method1() { ... },
   *   method2() { ... }
   * }), [dependencies]);
   * 
   * Parameters:
   * 1. ref: The ref passed from parent
   * 2. Callback: Returns an object with exposed methods
   * 3. Dependencies: When to recreate the object
   * 
   * Use Cases:
   * - Exposing focus() method
   * - Exposing validation method
   * - Exposing clear() method
   * - Exposing getValue() method
   * - Any imperative operation you want parent to trigger
   * 
   * Encapsulation:
   * The parent only sees these methods. Internal state is hidden.
   * This is a form of encapsulation - exposing a controlled interface.
   */
  useImperativeHandle(ref, () => ({
    // --- Exposed Methods ---
    // The parent component can call these methods through the ref
    
    /*
     * Focus Method
     * Parent can call: customInputRef.current.focus()
     */
    focus() {
      inputRef.current?.focus();
      setIsFocused(true);
    },

    /*
     * Blur Method
     * Parent can call: customInputRef.current.blur()
     */
    blur() {
      inputRef.current?.blur();
      setIsFocused(false);
    },

    /*
     * Get Value Method
     * Parent can call: customInputRef.current.getValue()
     * Returns the current input value
     */
    getValue() {
      return value;
    },

    /*
     * Set Value Method
     * Parent can call: customInputRef.current.setValue('new value')
     * Allows parent to programmatically set the input value
     */
    setValue(newValue) {
      setValue(newValue);
    },

    /*
     * Clear Method
     * Parent can call: customInputRef.current.clear()
     * Clears the input
     */
    clear() {
      setValue('');
      inputRef.current?.focus();
    },

    /*
     * Validate Method
     * Parent can call: customInputRef.current.validate()
     * Performs validation and returns result
     */
    validate() {
      if (value.trim().length === 0) {
        return { valid: false, error: 'Input cannot be empty' };
      }
      if (value.length < 3) {
        return { valid: false, error: 'Input must be at least 3 characters' };
      }
      return { valid: true, error: null };
    },

    /**
     * Get Focus State
     * Parent can call: customInputRef.current.isFocused()
     * Returns whether the input is currently focused
     */
    isFocused() {
      return isFocused;
    },
  }), [value, isFocused]);
  // Dependencies: recreate handle if value or isFocused changes
  // This ensures the exposed methods always have access to current state

  return (
    <div className="custom-input-wrapper">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeholder || 'Enter text'}
        className={`custom-input ${isFocused ? 'focused' : ''}`}
      />
      <span className="input-status">
        {isFocused && '✓ Focused'}
        {value && ` | ${value.length} chars`}
      </span>
    </div>
  );
});

CustomInput.displayName = 'CustomInput'; // For debugging purposes

/*
 * === Another Example: Resettable Form ===
 * 
 * This demonstrates a form component that exposes a reset method.
 */
const ResettableForm = forwardRef(function ResettableForm(props, ref) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useImperativeHandle(ref, () => ({
    reset() {
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    },

    getData() {
      return formData;
    },

    validate() {
      const errors = {};
      if (!formData.name) errors.name = 'Name is required';
      if (!formData.email) errors.email = 'Email is required';
      if (!formData.message) errors.message = 'Message is required';
      return Object.keys(errors).length === 0 ? { valid: true } : { valid: false, errors };
    },
  }), [formData]);

  return (
    <div className="form-content">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
        />
      </div>
      <div className="form-group">
        <label>Message:</label>
        <textarea
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder="Your message"
          rows="4"
        />
      </div>
    </div>
  );
});

ResettableForm.displayName = 'ResettableForm';

/*
 * === Main Component ===
 */
function ImperativeHandleExample() {
  // Create refs for the child components
  const customInputRef = useRef(null);
  const formRef = useRef(null);

  // State for demonstrations
  const [output, setOutput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  // Event handlers that use the imperative methods
  const handleFocusInput = () => {
    customInputRef.current?.focus();
    setOutput('Focus called on custom input');
  };

  const handleGetValue = () => {
    const value = customInputRef.current?.getValue();
    setOutput(`Current value: "${value}"`);
  };

  const handleSetValue = () => {
    customInputRef.current?.setValue('Programmatically set value');
    setOutput('Value set to "Programmatically set value"');
  };

  const handleClearInput = () => {
    customInputRef.current?.clear();
    setOutput('Input cleared');
  };

  const handleValidateInput = () => {
    const result = customInputRef.current?.validate();
    setValidationResult(result);
    setOutput(result.valid ? '✅ Validation passed' : `❌ ${result.error}`);
  };

  const handleResetForm = () => {
    formRef.current?.reset();
    setOutput('Form reset');
  };

  const handleGetFormData = () => {
    const data = formRef.current?.getData();
    setOutput(`Form data: ${JSON.stringify(data)}`);
  };

  const handleValidateForm = () => {
    const result = formRef.current?.validate();
    if (result.valid) {
      setOutput('✅ Form is valid');
    } else {
      setOutput(`❌ Form errors: ${JSON.stringify(result.errors)}`);
    }
  };

  return (
    <div className="hook-section">
      <h2>useImperativeHandle: Exposing Imperative Methods</h2>

      {/* Definition Section */}
      <div className="hook-subsection">
        <h3>What is useImperativeHandle?</h3>
        <div className="explanation-box">
          <p>
            useImperativeHandle customizes the value exposed by a ref when
            using forwardRef. It allows child components to expose specific
            imperative methods that parent components can call.
          </p>
          <code className="code-block">
{`// Child component with forwardRef
const MyComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    // Exposed methods
    someMethod() { ... },
    anotherMethod() { ... }
  }), [dependencies]);

  return <div>...</div>;
});

// Parent component
const ref = useRef();
ref.current.someMethod(); // Call exposed method`}
          </code>
        </div>
      </div>

      {/* Section 1: Custom Input Example */}
      <div className="hook-subsection">
        <h3>Example 1: Custom Input with Imperative Methods</h3>
        
        <div className="demo-box">
          <h4>Custom Input Component</h4>
          <CustomInput ref={customInputRef} placeholder="Type something..." />

          <div className="controls-group">
            <div className="button-group">
              <button onClick={handleFocusInput}>Focus Input</button>
              <button onClick={handleGetValue}>Get Value</button>
              <button onClick={handleSetValue}>Set Value</button>
              <button onClick={handleClearInput}>Clear Input</button>
              <button onClick={handleValidateInput}>Validate</button>
            </div>
          </div>

          <div className="output-section">
            <p><strong>Output:</strong> {output}</p>
            {validationResult && (
              <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
                {validationResult.valid ? '✅ Valid' : `❌ ${validationResult.error}`}
              </div>
            )}
          </div>

          <div className="info-box">
            <p className="info-text">
              ✅ The parent component calls methods on the child through the ref.
              The child's internal implementation is hidden - only these methods are exposed.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Resettable Form Example */}
      <div className="hook-subsection">
        <h3>Example 2: Resettable Form</h3>
        
        <div className="demo-box">
          <h4>Form Component with Imperative Methods</h4>
          <ResettableForm ref={formRef} />

          <div className="controls-group">
            <div className="button-group">
              <button onClick={handleResetForm}>Reset Form</button>
              <button onClick={handleGetFormData}>Get Form Data</button>
              <button onClick={handleValidateForm}>Validate Form</button>
            </div>
          </div>

          <div className="output-section">
            <p><strong>Output:</strong> {output}</p>
          </div>

          <div className="info-box">
            <p className="info-text">
              ✅ The parent can trigger form reset and validation through imperative methods.
              This pattern is useful when you need to programmatically control child components.
            </p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="hook-subsection">
        <h3>Key Concepts</h3>
        <div className="concepts-box">
          <div className="concept">
            <h4>forwardRef: Accepting Refs in Functional Components</h4>
            <p>
              Normally, functional components don't receive refs.
              forwardRef enables this by wrapping the component.
            </p>
            <code className="code-block">
{`// Without forwardRef: ref is ignored
function MyComponent(props) { ... }

// With forwardRef: ref is available
const MyComponent = forwardRef((props, ref) => { ... })`}
            </code>
          </div>

          <div className="concept">
            <h4>useImperativeHandle: Custom Ref Value</h4>
            <p>
              Instead of exposing the entire component instance,
              useImperativeHandle lets you choose what the ref exposes.
            </p>
          </div>

          <div className="concept">
            <h4>Encapsulation & Control</h4>
            <p>
              Only the methods you explicitly expose are available to parents.
              Internal state remains private and protected.
            </p>
          </div>

          <div className="concept">
            <h4>Dependencies Matter</h4>
            <p>
              The dependency array determines when the exposed object is recreated.
              Include any values the exposed methods depend on.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="hook-subsection">
        <h3>Best Practices</h3>
        <div className="tips-box">
          <div className="tip">
            <h4>✅ DO: Use for Imperative Operations</h4>
            <p>Focus, blur, validation, animations - things that don't fit the declarative model</p>
          </div>

          <div className="tip">
            <h4>✅ DO: Keep Public Interface Small</h4>
            <p>Only expose methods that are truly needed by parents</p>
          </div>

          <div className="tip">
            <h4>✅ DO: Document Exposed Methods</h4>
            <code className="code-block">
{`useImperativeHandle(ref, () => ({
  // Focus the input element
  focus() { ... },
  
  // Get current value
  getValue() { ... }
}), [...])`}
            </code>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Overuse for Simple State Changes</h4>
            <p>If you just need to pass data, use props instead</p>
          </div>

          <div className="tip">
            <h4>❌ DON'T: Forget displayName for Debugging</h4>
            <code className="code-block">
{`const MyComponent = forwardRef((props, ref) => { ... });
MyComponent.displayName = 'MyComponent';`}
            </code>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="hook-subsection">
        <h3>Real-World Use Cases</h3>
        <div className="use-cases-box">
          <div className="use-case">
            <h4>1. Form Components</h4>
            <p>Expose submit(), reset(), and validate() methods</p>
          </div>

          <div className="use-case">
            <h4>2. Modal Dialogs</h4>
            <p>Expose open() and close() methods for programmatic control</p>
          </div>

          <div className="use-case">
            <h4>3. Text Editors</h4>
            <p>Expose focus(), clear(), and getContent() methods</p>
          </div>

          <div className="use-case">
            <h4>4. Video/Audio Players</h4>
            <p>Expose play(), pause(), seek() for imperative control</p>
          </div>

          <div className="use-case">
            <h4>5. Animated Components</h4>
            <p>Expose trigger() to start animations programmatically</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImperativeHandleExample;
