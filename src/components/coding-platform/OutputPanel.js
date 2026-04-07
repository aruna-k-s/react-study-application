/**
 * OutputPanel Component
 * 
 * Displays:
 * - Console output
 * - Test case results
 * - Pass/fail status
 */

import React, { useState } from 'react';
import { useCodingPlatform } from '../../context/CodingPlatformContext';
import './OutputPanel.css';

export default function OutputPanel() {
  const { output, testResults, executionTime, isSubmitted } = useCodingPlatform();
  const [expandedTest, setExpandedTest] = useState(null);

  const passedCount = testResults.filter(t => t.passed).length;
  const failedCount = testResults.filter(t => !t.passed).length;

  const toggleTestDetail = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  return (
    <div className="output-panel">
      {/* Output Summary */}
      <div className="output-summary">
        <div className="summary-title">
          {isSubmitted ? '🎯 Submission Results' : '▶ Run Results'}
        </div>
        
        {output && (
          <div className="summary-text">
            {output}
            {executionTime > 0 && (
              <span className="execution-time"> ({executionTime}ms)</span>
            )}
          </div>
        )}

        {testResults.length > 0 && (
          <div className="summary-stats">
            <span className={`stat passed ${passedCount > 0 ? 'has-value' : ''}`}>
              ✓ {passedCount} Passed
            </span>
            {failedCount > 0 && (
              <span className="stat failed">
                ✗ {failedCount} Failed
              </span>
            )}
          </div>
        )}
      </div>

      {/* Test Cases Results */}
      {testResults.length > 0 && (
        <div className="test-results">
          <div className="test-header">
            <h4>Test Cases</h4>
            <span className="test-count">({testResults.length} total)</span>
          </div>

          <div className="test-list">
            {testResults.map((test) => (
              <div
                key={test.id}
                className={`test-case ${test.passed ? 'passed' : 'failed'}`}
              >
                {/* Test Summary */}
                <button
                  className="test-summary"
                  onClick={() => toggleTestDetail(test.id)}
                >
                  <span className="test-icon">
                    {test.passed ? '✓' : '✗'}
                  </span>
                  <span className="test-description">
                    {test.description}
                  </span>
                  <span className="test-expand">
                    {expandedTest === test.id ? '▼' : '▶'}
                  </span>
                </button>

                {/* Test Details */}
                {expandedTest === test.id && (
                  <div className="test-details">
                    {test.input && (
                      <div className="detail-section">
                        <label>Input:</label>
                        <code className="detail-code">{test.input}</code>
                      </div>
                    )}

                    <div className="detail-section">
                      <label>Expected Output:</label>
                      <code className="detail-code expected">{test.expected}</code>
                    </div>

                    <div className="detail-section">
                      <label>Your Output:</label>
                      <code className={`detail-code actual ${test.passed ? 'correct' : 'incorrect'}`}>
                        {test.actual}
                      </code>
                    </div>

                    {test.error && (
                      <div className="detail-section error-message">
                        <label>Error:</label>
                        <p className="error-text">{test.errorMessage || test.actual}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {testResults.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">▶</div>
          <p>Click "Run Code" to execute your solution against test cases</p>
        </div>
      )}
    </div>
  );
}
