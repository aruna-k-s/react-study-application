/**
 * Coding Platform Context
 * 
 * Manages state for:
 * - Current problem
 * - User's code
 * - Execution results
 * - Test case results
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { codingProblems } from '../data/codingProblems';

const CodingPlatformContext = createContext();

export function CodingPlatformProvider({ children }) {
  const [currentProblemId, setCurrentProblemId] = useState(1);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [executionTime, setExecutionTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentProblem = codingProblems.find(p => p.id === currentProblemId);

  // Initialize code when problem changes
  const selectProblem = useCallback((problemId) => {
    setCurrentProblemId(problemId);
    
    // Load code from localStorage or use starter code
    const savedCode = localStorage.getItem(`code_problem_${problemId}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      const problem = codingProblems.find(p => p.id === problemId);
      setCode(problem?.starterCode || '');
    }
    
    setOutput('');
    setTestResults([]);
    setIsSubmitted(false);
    setExecutionTime(0);
  }, []);

  // Save code to localStorage
  const saveCode = useCallback((problemId, userCode) => {
    localStorage.setItem(`code_problem_${problemId}`, userCode);
  }, []);

  // Reset code to starter code
  const resetCode = useCallback(() => {
    if (currentProblem) {
      setCode(currentProblem.starterCode);
      localStorage.removeItem(`code_problem_${currentProblemId}`);
    }
  }, [currentProblem, currentProblemId]);

  // Input parser for all problem types
  function parseTestInput(inputString, problemTitle) {
    try {
      const assignments = {};
      // Match pattern: "key = value, key2 = value2"
      const pattern = /(\w+)\s*=\s*(.+?)(?=\s*,\s*\w+\s*=|$)/g;
      let match;
      
      while ((match = pattern.exec(inputString)) !== null) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Try to parse as JSON first (arrays, numbers, booleans)
        try {
          assignments[key] = JSON.parse(value);
        } catch {
          // If JSON parse fails, treat as string (remove quotes)
          assignments[key] = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
        }
      }
      
      return assignments;
    } catch (error) {
      throw new Error(`Failed to parse input: "${inputString}". ${error.message}`);
    }
  }

  // Result comparison handler
  function compareResults(actual, expectedString) {
    try {
      // Try to parse expected as JSON
      const expected = JSON.parse(expectedString);
      return JSON.stringify(actual) === JSON.stringify(expected);
    } catch {
      // Fallback: string comparison
      return String(actual).toLowerCase() === String(expectedString).toLowerCase();
    }
  }

  // High-level function execution
  // eslint-disable-next-line no-new-func
  function executeUserFunction(userCode, functionName, args) {
    try {
      // Create function that accepts code and function name
      const func = new Function(userCode + `\nreturn ${functionName};`);
      const userFunc = func();
      
      // Get the function reference
      if (typeof userFunc !== 'function') {
        throw new Error(`Function "${functionName}" not found in your code`);
      }
      
      // Execute function with arguments
      const result = userFunc(...args);
      return result;
      
    } catch (error) {
      throw new Error(`Execution failed: ${error.message}`);
    }
  }

  // Main execution engine
  const runCode = useCallback(async (userCode, testCases = 'visible') => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    
    const startTime = performance.now();
    
    try {
      const tests = testCases === 'visible' 
        ? currentProblem.visibleTestCases 
        : currentProblem.hiddenTestCases;

      const functionName = currentProblem.functionName || 'solve';
      const results = [];
      
      for (const testCase of tests) {
        try {
          // Parse input
          const inputData = parseTestInput(testCase.input, currentProblem.title);
          const args = Object.values(inputData);
          
          // Execute user function
          const result = executeUserFunction(userCode, functionName, args);
          
          // Compare results
          const passed = compareResults(result, testCase.expectedOutput);
          
          results.push({
            id: testCase.id,
            description: testCase.description,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: JSON.stringify(result),
            passed,
            error: false
          });
        } catch (error) {
          results.push({
            id: testCase.id,
            description: testCase.description,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: `Error: ${error.message}`,
            passed: false,
            error: true,
            errorMessage: error.message
          });
        }
      }
      
      const endTime = performance.now();
      setTestResults(results);
      setExecutionTime(Math.round(endTime - startTime));
      
      // Generate output summary
      const passed = results.filter(r => r.passed).length;
      const failed = results.filter(r => !r.passed).length;
      
      if (testCases === 'visible') {
        setOutput(`Ran ${results.length} test case(s): ${passed} passed, ${failed} failed`);
      } else {
        setOutput(`All test cases completed: ${passed} passed, ${failed} failed`);
        setIsSubmitted(true);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setTestResults([{
        id: 'fatal-error',
        description: 'Fatal Execution Error',
        input: '',
        expected: '',
        actual: error.message,
        passed: false,
        error: true,
        errorMessage: error.message
      }]);
    } finally {
      setIsRunning(false);
    }
  }, [currentProblem]);

  const value = {
    currentProblem,
    currentProblemId,
    code,
    setCode,
    isRunning,
    output,
    testResults,
    executionTime,
    isSubmitted,
    selectProblem,
    saveCode,
    resetCode,
    runCode,
    problems: codingProblems
  };

  return (
    <CodingPlatformContext.Provider value={value}>
      {children}
    </CodingPlatformContext.Provider>
  );
}

export function useCodingPlatform() {
  const context = useContext(CodingPlatformContext);
  if (!context) {
    throw new Error('useCodingPlatform must be used within CodingPlatformProvider');
  }
  return context;
}
