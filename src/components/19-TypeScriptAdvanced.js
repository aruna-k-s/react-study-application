/*
 * ============================================================================
 * TYPESCRIPT & ADVANCED JAVASCRIPT
 * ============================================================================
 * 
 * Component Purpose:
 * Modern JavaScript features and TypeScript best practices for
 * building scalable, type-safe applications.
 * 
 * Topics:
 * 1. TypeScript advanced patterns
 * 2. Generics and type utilities
 * 3. Modern JavaScript features (ES2020+)
 * 4. Functional programming patterns
 * 5. Async/Await best practices
 * 6. Type safety in React
 * ============================================================================
 */

import React, { useState } from 'react';

function TypeScriptAdvancedExample() {
  const [activeTopic, setActiveTopic] = useState('typescript');

  return (
    <div className="hook-section">
      <h2>TypeScript & Advanced JavaScript</h2>

      <div className="hook-subsection">
        <h3>Modern JavaScript & TypeScript</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveTopic('typescript')}
            style={{
              backgroundColor: activeTopic === 'typescript' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            TypeScript
          </button>
          <button
            onClick={() => setActiveTopic('generics')}
            style={{
              backgroundColor: activeTopic === 'generics' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Generics
          </button>
          <button
            onClick={() => setActiveTopic('javascript')}
            style={{
              backgroundColor: activeTopic === 'javascript' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            ES2020+
          </button>
          <button
            onClick={() => setActiveTopic('async')}
            style={{
              backgroundColor: activeTopic === 'async' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Async Patterns
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeTopic === 'typescript' && (
            <div>
              <h4>TypeScript Best Practices</h4>

              <div className="explanation-box">
                <h5>1. Strict Configuration</h5>
                <code className="code-block">
{`// tsconfig.json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict checks
    "noImplicitAny": true,       // Error on implicit any
    "strictNullChecks": true,    // Strict null checks
    "strictFunctionTypes": true, // Strict function typing
    "sourceMap": true,
    "declaration": true,         // Generate .d.ts files
    "removeComments": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM"]
  }
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Type Safety in React</h5>
                <code className="code-block">
{`// ✅ Fully typed component
interface UserProps {
  id: number;
  name: string;
  onUserClick: (userId: number) => void;
  optional?: string;
}

const User: React.FC<UserProps> = ({ 
  id, 
  name, 
  onUserClick,
  optional 
}) => {
  return (
    <div onClick={() => onUserClick(id)}>
      {name}
      {optional && <span>{optional}</span>}
    </div>
  );
};

// ✅ Typed events
const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  console.log(e.target.value); // TypeScript knows it's a string
};

// ✅ Typed refs
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus(); // Safe null check`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Discriminated Unions</h5>
                <code className="code-block">
{`type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.status === 'success') {
    console.log(result.data); // TypeScript knows it's T
    // result.error is not accessible here
  } else {
    console.log(result.error); // TypeScript knows it's string
    // result.data is not accessible here
  }
}`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'generics' && (
            <div>
              <h4>Advanced Generics</h4>

              <div className="explanation-box">
                <h5>1. Generic Components</h5>
                <code className="code-block">
{`// Reusable component with generics
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage with different types
<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Conditional Types</h5>
                <code className="code-block">
{`// Transform types based on conditions
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number

// Useful for API responses
type AsyncData<T> = T extends Promise<infer U> ? U : never;

type Result = AsyncData<Promise<User>>; // User`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Type Utilities</h5>
                <code className="code-block">
{`// Pick - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - Exclude properties
type UserWithoutPassword = Omit<User, 'password'>;

// Partial - All properties optional
type PartialUser = Partial<User>;

// Required - All properties required
type StrictUser = Required<User>;

// Record - Typed object keys
type Status = 'pending' | 'completed' | 'failed';
const statusColors: Record<Status, string> = {
  pending: 'yellow',
  completed: 'green',
  failed: 'red'
};`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'javascript' && (
            <div>
              <h4>Modern JavaScript Features</h4>

              <div className="explanation-box">
                <h5>1. Optional Chaining & Nullish Coalescing</h5>
                <code className="code-block">
{`// Optional chaining (?.)
const userName = user?.profile?.name; // undefined if any step is null

// Nullish coalescing (??)
const displayName = user.name ?? 'Anonymous'; // Use ?? not || for 0/''/false

// With function calls
const count = data?.items?.length ?? 0;`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Destructuring & Rest Parameters</h5>
                <code className="code-block">
{`// Nested destructuring
const { user: { profile: { email } } } = data;

// With defaults
const { name = 'Unknown', age = 0 } = userData;

// Rest in destructuring
const { id, ...rest } = user; // rest contains all other properties

// Rest in functions
function sum(...numbers: number[]) {
  return numbers.reduce((a, b) => a + b);
}

sum(1, 2, 3, 4); // 10`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Array & Object Methods</h5>
                <code className="code-block">
{`// Array methods
const arr = [1, 2, 3, 4, 5];
arr.find(x => x > 3);       // 4
arr.findIndex(x => x > 3);  // 3
arr.some(x => x > 3);       // true
arr.every(x => x > 0);      // true
arr.flat();                 // Flatten nested arrays
arr.flatMap(x => [x, x*2]); // Map then flatten

// Object methods
Object.keys(obj);           // Property names
Object.values(obj);         // Property values
Object.entries(obj);        // [key, value] pairs
Object.assign(target, source); // Merge objects`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>4. Spread Operator</h5>
                <code className="code-block">
{`// Array methods
const merged = [...arr1, ...arr2];
const copy = [...original];

// Object spreading
const updated = { ...user, name: 'John' };
const combined = { ...obj1, ...obj2 };

// Function arguments
const numbers = [1, 2, 3];
Math.max(...numbers); // 3`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'async' && (
            <div>
              <h4>Async/Await Best Practices</h4>

              <div className="explanation-box">
                <h5>1. Error Handling Patterns</h5>
                <code className="code-block">
{`// Pattern 1: Try-Catch
async function fetchUser(id: number) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  } catch (error) {
    logger.error('Failed to fetch user', error);
    throw error;
  }
}

// Pattern 2: Error envelope
async function safeApiCall<T>(
  fn: () => Promise<T>
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Parallel vs Sequential Execution</h5>
                <code className="code-block">
{`// ❌ Sequential (slow)
const user = await fetchUser(id);
const posts = await fetchPosts(user.id);
const comments = await fetchComments(user.id);

// ✅ Parallel (fast) - when independent
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id)
]);

// ✅ Parallel with error handling
const results = await Promise.allSettled([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id)
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log(result.value);
  } else {
    console.error(result.reason);
  }
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Timeout Patterns</h5>
                <code className="code-block">
{`// Add timeout to promises
function withTimeout<T>(
  promise: Promise<T>, 
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    )
  ]);
}

// Usage
try {
  const user = await withTimeout(fetchUser(id), 5000);
} catch (error) {
  console.error('Request timed out');
}`}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Key Takeaways</h3>
        <div className="explanation-box">
          <ul>
            <li>Enable strict TypeScript mode for maximum safety</li>
            <li>Type function parameters and return values</li>
            <li>Use discriminated unions for better type narrowing</li>
            <li>Leverage generics for reusable, typed code</li>
            <li>Use optional chaining and nullish coalescing</li>
            <li>Prefer async/await over promise chains</li>
            <li>Always handle errors in async code</li>
            <li>Use Promise.all for parallel operations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TypeScriptAdvancedExample;
