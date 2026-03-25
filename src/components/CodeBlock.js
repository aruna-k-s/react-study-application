/**
 * CODE BLOCK COMPONENT
 * ===================
 * Reusable component for displaying code, folder structures, and preformatted text
 * with consistent styling across the entire application.
 * 
 * Features:
 * - Preserves indentation and whitespace
 * - Horizontal scrolling for long lines
 * - Monospace font rendering
 * - Proper handling of special characters (├──, │, └──, etc.)
 * - Responsive design
 * - Copy-to-clipboard button (optional)
 */

import React, { useState } from 'react';
import './CodeBlock.css';

export default function CodeBlock({
  children,
  language = 'text',
  showCopy = false,
  title = null,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container">
      {title && <div className="code-block-title">{title}</div>}
      
      <div className="code-block-wrapper">
        {showCopy && (
          <button
            className="code-block-copy-btn"
            onClick={handleCopyClick}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? '✓' : '📋'}
          </button>
        )}

        <pre className={`code-block code-block-${language}`}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
