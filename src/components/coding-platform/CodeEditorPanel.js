/**
 * CodeEditorPanel Component
 * 
 * Provides code editing functionality using Monaco Editor
 * Includes Run, Submit, and Reset buttons
 */

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useCodingPlatform } from '../../context/CodingPlatformContext';
import './CodeEditorPanel.css';

export default function CodeEditorPanel() {
  const { currentProblem, code, setCode, isRunning, saveCode, resetCode, runCode, currentProblemId } = useCodingPlatform();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Initialize code when component mounts or problem changes
    const savedCode = localStorage.getItem(`code_problem_${currentProblemId}`);
    if (savedCode) {
      setCode(savedCode);
    } else if (currentProblem) {
      setCode(currentProblem.starterCode);
    }
  }, [currentProblemId, currentProblem, setCode]);

  const handleCodeChange = (newCode) => {
    setCode(newCode || '');
    saveCode(currentProblemId, newCode || '');
  };

  const handleRun = () => {
    runCode(code, 'visible');
  };

  const handleSubmit = () => {
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    setShowConfirm(false);
    runCode(code, 'hidden');
  };

  if (!currentProblem) {
    return <div className="code-editor-panel">Loading...</div>;
  }

  return (
    <>
      {showConfirm && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h4>Confirm Submission</h4>
            <p>Submit your solution? This will run against all hidden test cases.</p>
            <div className="confirmation-buttons">
              <button onClick={() => setShowConfirm(false)} className="btn btn-cancel">Cancel</button>
              <button onClick={confirmSubmit} className="btn btn-confirm">Confirm Submit</button>
            </div>
          </div>
        </div>
      )}
      <div className="code-editor-panel">
        {/* Editor Toolbar */}
        <div className="editor-toolbar">
          <div className="language-selector">
            <label htmlFor="language">Language:</label>
            <select id="language" disabled value="javascript">
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <div className="editor-buttons">
            <button
              className="btn btn-run"
              onClick={handleRun}
              disabled={isRunning}
              title="Run against sample test cases"
            >
              {isRunning ? '⏳ Running...' : '▶ Run Code'}
            </button>

            <button
              className="btn btn-submit"
              onClick={handleSubmit}
              disabled={isRunning}
              title="Submit against all test cases"
            >
              {isRunning ? '⏳ Running...' : '✓ Submit Solution'}
            </button>

            <button
              className="btn btn-reset"
              onClick={resetCode}
              disabled={isRunning}
              title="Reset to starter code"
            >
              ↻ Reset
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="editor-container">
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            language="javascript"
            value={code}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: isRunning,
              formatOnPaste: true,
              formatOnType: true,
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              autoSurround: 'languageDefined'
            }}
          />
        </div>
      </div>
    </>
  );
}
