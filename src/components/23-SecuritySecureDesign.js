/*
 * ============================================================================
 * SECURITY & SECURE DESIGN
 * ============================================================================
 * 
 * Component Purpose:
 * Comprehensive security patterns for protecting applications and data at scale.
 * Essential knowledge for Staff Engineers responsible for architecture decisions.
 * 
 * Topics Covered:
 * 1. OWASP Top 10 for Frontend
 * 2. Authentication & Authorization
 * 3. Secure API Design
 * 4. Data Privacy & Compliance
 * 5. Supply Chain Security
 * ============================================================================
 */

import React, { useState } from 'react';

function SecuritySecureDesignExample() {
  const [activeSection, setActiveSection] = useState('owasp');

  return (
    <div className="hook-section">
      <h2>Security & Secure Design</h2>

      <div className="hook-subsection">
        <h3>Security at Enterprise Scale</h3>
        <div className="button-group">
          <button onClick={() => setActiveSection('owasp')} className={`section-button ${activeSection === 'owasp' ? 'active' : ''}`}>OWASP Top 10</button>
          <button onClick={() => setActiveSection('authz')} className={`section-button ${activeSection === 'authz' ? 'active' : ''}`}>Auth & AuthZ</button>
          <button onClick={() => setActiveSection('api')} className={`section-button ${activeSection === 'api' ? 'active' : ''}`}>API Security</button>
          <button onClick={() => setActiveSection('privacy')} className={`section-button ${activeSection === 'privacy' ? 'active' : ''}`}>Privacy & Compliance</button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeSection === 'owasp' && (
            <div>
              <h4>OWASP Top 10 for Frontend 2024</h4>
              
              <div className="explanation-box">
                <h5>1. Broken Access Control</h5>
                <div style={{background: '#fff3cd', padding: '10px', margin: '10px 0', borderRad: '4px'}}>
                  <strong>Risk:</strong> Users access resources they shouldn't
                </div>
                <code className="code-block">
{`// ❌ Insecure: Only hiding UI
if (user.role !== 'admin') {
  return <div>Access Denied</div>;
}
// User can still make API calls directly!

// ✅ Secure: Server-side enforcement + UI check
const canAccessAdmin = await checkAuthOnServer(userId);
if (!canAccessAdmin) {
  return <AccessDenied />;
}
// AND server validates every API request`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Cross-Site Scripting (XSS)</h5>
                <code className="code-block">
{`// ❌ Vulnerable to XSS
const userComment = "<img src=x onerror='alert(1)'>";
return <div dangerouslySetInnerHTML={{__html: userComment}} />;

// ✅ Safe: React escapes by default
const userComment = user.comment;
return <div>{userComment}</div>;

// ✅ If HTML needed, sanitize first
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userComment);
return <div dangerouslySetInnerHTML={{__html: clean}} />;`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Injection (SQL, Command, NoSQL)</h5>
                <ul>
                  <li><strong>SQL Injection:</strong> Use parameterized queries, never string concatenation</li>
                  <li><strong>NoSQL Injection:</strong> Validate & type-check all inputs</li>
                  <li><strong>Command Injection:</strong> Never use shell functions with user input</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>4. Insecure Deserialization</h5>
                <code className="code-block">
{`// ❌ Dangerous
const data = JSON.parse(userInput);

// ✅ Safer with validation
const schema = z.object({ name: z.string(), age: z.number() });
const data = schema.parse(JSON.parse(userInput));`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>5-10. Other Top Vulnerabilities</h5>
                <ul>
                  <li><strong>Broken Auth:</strong> Weak password policies, session management</li>
                  <li><strong>Sensitive Data Exposure:</strong> Unencrypted transmission, storage</li>
                  <li><strong>XML External Entities (XXE):</strong> Validate XML parsers</li>
                  <li><strong>Broken Access Control (revisited)</strong></li>
                  <li><strong>Security Misconfiguration:</strong> Default credentials, debug mode exposed</li>
                  <li><strong>Using Components With Known Vulnerabilities:</strong> Dependency scanning</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'authz' && (
            <div>
              <h4>Authentication & Authorization Patterns</h4>
              
              <div className="explanation-box">
                <h5>Authentication: Who are you?</h5>
                <code className="code-block">
{`// Modern Auth Flow: OAuth 2.0 / OIDC

1. User clicks "Sign In with Google"
2. Redirect to Google OAuth provider
3. User authenticates with Google
4. Google redirects back with authorization code
5. Frontend passes code to backend
6. Backend exchanges code for tokens (secure, server-only)
7. Backend returns session/JWT to client
8. Frontend stores token, uses for API requests

Best Practices:
- Use established providers (Google, Azure, GitHub)
- Never store passwords in frontend code
- Use PKCE for SPA/mobile apps
- Short-lived access tokens + refresh tokens`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Authorization: What can you do?</h5>
                <ul>
                  <li><strong>RBAC (Role-Based):</strong> Admin, moderator, user roles</li>
                  <li><strong>ABAC (Attribute-Based):</strong> Fine-grained: department, project, resource type</li>
                  <li><strong>PBAC (Policy-Based):</strong> Declarative rules engine</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Token Management</h5>
                <code className="code-block">
{`// JWT Best Practices

✅ DO:
- Use short expiration (15 minutes)
- Store in memory or HTTPOnly cookie
- Include user ID and minimal claims
- Sign with strong algorithm (RS256, not HS256)
- Rotate keys regularly

❌ DON'T:
- Store sensitive data in JWT
- Use JWT for long sessions
- Use symmetric key for shared APIs
- Ignore token expiration
- Log full tokens`}
                </code>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div>
              <h4>Secure API Design</h4>
              
              <div className="explanation-box">
                <h5>API Security Headers</h5>
                <code className="code-block">
{`// Required Security Headers
Content-Security-Policy: "default-src 'self'"
  → Only load resources from same origin
  
X-Content-Type-Options: nosniff
  → Prevent MIME sniffing attacks
  
X-Frame-Options: DENY
  → Prevent clickjacking (don't embed in frames)
  
Strict-Transport-Security: max-age=31536000
  → Force HTTPS for all connections
  
Referrer-Policy: strict-origin-when-cross-origin
  → Control what referrer info is shared
  
Permissions-Policy: camera=(), microphone=()
  → Restrict API access (camera, microphone, etc.)`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Rate Limiting & DDoS Protection</h5>
                <code className="code-block">
{`// Rate Limiting Strategy
const rateLimit = {};

function checkRateLimit(clientId) {
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute
  
  if (!rateLimit[clientId]) {
    rateLimit[clientId] = [];
  }
  
  // Remove old requests outside window
  rateLimit[clientId] = rateLimit[clientId].filter(
    t => t > windowStart
  );
  
  // Check limit (e.g., 100 per minute)
  if (rateLimit[clientId].length >= 100) {
    return false; // Rate limited
  }
  
  rateLimit[clientId].push(now);
  return true;
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Request Validation</h5>
                <ul>
                  <li>Validate all inputs on both client and server</li>
                  <li>Never trust user-provided data</li>
                  <li>Use schema validation (Zod, Joi, Yup)</li>
                  <li>Reject oversized payloads</li>
                  <li>Implement request signing for critical actions</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div>
              <h4>Data Privacy & Compliance</h4>
              
              <div className="explanation-box">
                <h5>Regulatory Requirements</h5>
                <ul>
                  <li><strong>GDPR (EU):</strong> User consent, right to be forgotten, data portability</li>
                  <li><strong>CCPA (California):</strong> Consumer rights, opt-out, data sale disclosure</li>
                  <li><strong>HIPAA (Healthcare):</strong> PHI protection, audit trails, encryption</li>
                  <li><strong>SOC 2:</strong> Security, availability, confidentiality controls</li>
                </ul>
              </div>

              <div className="explanation-box">
                <h5>Privacy by Design</h5>
                <code className="code-block">
{`// Data Minimization
- Collect only what you need
- Don't collect "just in case"
- Regularly purge old data

// Encryption
- Encrypt at rest (database)
- Encrypt in transit (HTTPS)
- Zero-knowledge architecture when possible

// Transparency
- Privacy policy in plain language
- Explain what data you collect & why
- Regular consent renewal
- Easy opt-out mechanisms

// User Rights
- Data export (GDPR)
- Data deletion (right to be forgotten)
- Rectification (fix wrong data)
- Portability (move to another service)`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>Dependency Security</h5>
                <ul>
                  <li>Regular <code>npm audit</code> checks</li>
                  <li>Automated dependency updates (Dependabot)</li>
                  <li>Software Bill of Materials (SBOM) for compliance</li>
                  <li>Supply chain security (verify package authors)</li>
                  <li>Private registries for sensitive packages</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>The Security Culture</h3>
        <div className="explanation-box">
          <ul>
            <li><strong>Shift Left:</strong> Security in design, not after development</li>
            <li><strong>Defense in Depth:</strong> Multiple layers, not single solution</li>
            <li><strong>Principle of Least Privilege:</strong> Minimal permissions needed</li>
            <li><strong>Zero Trust:</strong> Never trust, always verify</li>
            <li><strong>Transparency & Communication:</strong> Report breaches quickly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SecuritySecureDesignExample;
