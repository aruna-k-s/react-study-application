/**
 * ProblemPanel Component
 * 
 * Displays the problem description, constraints, and examples
 * Left side of the split screen
 */

import React from 'react';
import { useCodingPlatform } from '../../context/CodingPlatformContext';
import './ProblemPanel.css';

export default function ProblemPanel() {
  const { currentProblem } = useCodingPlatform();

  if (!currentProblem) {
    return <div className="problem-panel">Loading...</div>;
  }

  return (
    <div className="problem-panel">
      {/* Problem Header */}
      <div className="problem-header">
        <h2 className="problem-title">{currentProblem.title}</h2>
        <div className="problem-meta">
          <span className={`difficulty ${currentProblem.difficulty.toLowerCase()}`}>
            {currentProblem.difficulty}
          </span>
          <span className="topic-badge">{currentProblem.topic}</span>
        </div>
      </div>

      {/* Problem Content */}
      <div className="problem-content">
        {/* Description */}
        <section className="problem-section">
          <h3 className="section-title">Description</h3>
          <p className="section-content">
            {currentProblem.description}
          </p>
        </section>

        {/* Constraints */}
        <section className="problem-section">
          <h3 className="section-title">Constraints</h3>
          <ul className="constraints-list">
            {currentProblem.constraints.map((constraint, idx) => (
              <li key={idx} className="constraint-item">
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        {/* Examples */}
        <section className="problem-section">
          <h3 className="section-title">Examples</h3>
          <div className="examples-list">
            {currentProblem.examples.map((example, idx) => (
              <div key={idx} className="example-item">
                <div className="example-header">Example {idx + 1}</div>
                
                <div className="example-input">
                  <span className="label">Input:</span>
                  <code className="code-snippet">{example.input}</code>
                </div>
                
                <div className="example-output">
                  <span className="label">Output:</span>
                  <code className="code-snippet">{example.output}</code>
                </div>
                
                {example.explanation && (
                  <div className="example-explanation">
                    <span className="label">Explanation:</span>
                    <p>{example.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
