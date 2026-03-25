/*
 * ============================================================================
 * SYSTEM DESIGN FOR FRONTEND APPLICATIONS
 * ============================================================================
 * 
 * Component Purpose:
 * Architectural and design considerations for building scalable,
 * maintainable, and performant frontend systems at enterprise scale.
 * 
 * Topics:
 * 1. API Design & Integration Strategies
 * 2. Caching Mechanisms
 * 3. Observability (Logging, Monitoring, Tracing)
 * 4. Decoupling Strategies
 * 5. Technology Stack Selection
 * 6. Database Query Optimization
 * ============================================================================
 */

import React, { useState } from 'react';

function SystemDesignFrontendExample() {
  const [activeTopic, setActiveTopic] = useState('api');

  return (
    <div className="hook-section">
      <h2>System Design for Frontend Applications</h2>

      <div className="hook-subsection">
        <h3>Architectural Considerations</h3>
        <div className="button-group">
          <button
            onClick={() => setActiveTopic('api')}
            style={{
              backgroundColor: activeTopic === 'api' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            API Design
          </button>
          <button
            onClick={() => setActiveTopic('caching')}
            style={{
              backgroundColor: activeTopic === 'caching' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Caching
          </button>
          <button
            onClick={() => setActiveTopic('observability')}
            style={{
              backgroundColor: activeTopic === 'observability' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Observability
          </button>
          <button
            onClick={() => setActiveTopic('decoupling')}
            style={{
              backgroundColor: activeTopic === 'decoupling' ? '#667eea' : '#ccc',
              color: 'white'
            }}
          >
            Decoupling
          </button>
        </div>
      </div>

      <div className="hook-subsection">
        <div className="demo-box">
          {activeTopic === 'api' && (
            <div>
              <h4>API Design & Integration Strategies</h4>

              <div className="explanation-box">
                <h5>1. RESTful vs GraphQL</h5>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>Aspect</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>REST</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #667eea' }}>GraphQL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Over-fetching</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>❌ Common</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>✅ No</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Under-fetching</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>❌ Multiple requests</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>✅ Single request</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Caching</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>✅ HTTP caching</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>⚠️ Complex</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Learning Curve</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>✅ Simple</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>⚠️ Steep</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="explanation-box">
                <h5>2. API Client Architecture</h5>
                <code className="code-block">
{`// Centralized API service with interceptors
class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000
    });
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = \`Bearer \${token}\`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await refreshAccessToken();
          originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
          return this.client(originalRequest);
        }
        
        return Promise.reject(error);
      }
    );
  }

  async get(url, config) {
    return this.client.get(url, config);
  }

  async post(url, data, config) {
    return this.client.post(url, data, config);
  }
}

export const apiClient = new ApiClient();`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Request Cancellation</h5>
                <code className="code-block">
{`// Prevent memory leaks with request cancellation
function useUserData(userId) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    
    const fetchData = async () => {
      try {
        const response = await apiClient.get(\`/users/\${userId}\`, {
          cancelToken: cancelToken.token
        });
        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      }
    };
    
    fetchData();
    
    return () => cancelToken.cancel('Operation cancelled');
  }, [userId]);
  
  return data;
}`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'caching' && (
            <div>
              <h4>Caching Strategies</h4>

              <div className="explanation-box">
                <h5>1. Multi-Layer Caching</h5>
                <code className="code-block">
{`// Layer 1: HTTP Caching (via headers)
// Layer 2: Service Worker Caching
// Layer 3: Memory Cache (React Query, SWR)
// Layer 4: LocalStorage (persistent)

const useQuery = (key, fetcher, options = {}) => {
  const [data, setData] = useState(null);
  const cacheRef = useRef(new Map());
  
  useEffect(() => {
    // Check memory cache first
    if (cacheRef.current.has(key)) {
      setData(cacheRef.current.get(key));
      return;
    }
    
    // Then localStorage
    const cached = localStorage.getItem(\`cache:\${key}\`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
        setData(parsed.data);
        cacheRef.current.set(key, parsed.data);
        return;
      }
    }
    
    // Finally fetch from server
    fetcher().then(result => {
      cacheRef.current.set(key, result);
      localStorage.setItem(\`cache:\${key}\`, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }));
      setData(result);
    });
  }, [key]);
  
  return data;
};`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Service Worker Caching</h5>
                <code className="code-block">
{`// Service Worker for offline support
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/css/main.css'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      
      // Clone the request
      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open('v1').then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Stale-While-Revalidate</h5>
                <code className="code-block">
{`// Serve stale data immediately, update in background
const useStaleWhileRevalidate = (key, fetcher) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Serve cached data immediately
    const cached = localStorage.getItem(\`swr:\${key}\`);
    if (cached) {
      setData(JSON.parse(cached));
    }
    
    // Revalidate in background
    fetcher().then(freshData => {
      setData(freshData);
      localStorage.setItem(\`swr:\${key}\`, JSON.stringify(freshData));
    });
  }, [key]);
  
  return data;
};`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'observability' && (
            <div>
              <h4>Observability: Logging, Monitoring, Tracing</h4>

              <div className="explanation-box">
                <h5>1. Structured Logging</h5>
                <code className="code-block">
{`class Logger {
  log(level, message, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
      userId: getCurrentUserId(),
      sessionId: getSessionId(),
      url: window.location.href
    };
    
    console.log(JSON.stringify(logEntry));
    
    // Send to logging service
    if (level === 'error') {
      reportToSentryOrElasticsearch(logEntry);
    }
  }
  
  info(message, meta) { this.log('info', message, meta); }
  error(message, meta) { this.log('error', message, meta); }
  warn(message, meta) { this.log('warn', message, meta); }
}

export const logger = new Logger();`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Performance Monitoring</h5>
                <code className="code-block">
{`// Core Web Vitals tracking
function reportWebVitals() {
  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      logger.info('LCP', { value: entry.renderTime || entry.loadTime });
    }
  }).observe({ type: 'largest-contentful-paint' });
  
  // First Input Delay
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      logger.info('FID', { value: entry.processingDuration });
    }
  }).observe({ type: 'first-input' });
  
  // Cumulative Layout Shift
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      logger.info('CLS', { value: entry.value });
    }
  }).observe({ type: 'layout-shift' });
}

reportWebVitals();`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Error Tracking</h5>
                <code className="code-block">
{`// Global error handler
window.addEventListener('error', (event) => {
  logger.error('Uncaught Error', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled Promise Rejection', {
    reason: event.reason
  });
});`}
                </code>
              </div>
            </div>
          )}

          {activeTopic === 'decoupling' && (
            <div>
              <h4>Decoupling Strategies</h4>

              <div className="explanation-box">
                <h5>1. Dependency Injection</h5>
                <code className="code-block">
{`// Decouple components from services
function UserListContainer({ userService = new UserService() }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    userService.fetchUsers().then(setUsers);
  }, [userService]);
  
  return <UserList users={users} />;
}

// Easy to test with mock service
test('UserListContainer', () => {
  const mockService = {
    fetchUsers: jest.fn(() => Promise.resolve([{ id: 1, name: 'John' }]))
  };
  
  render(<UserListContainer userService={mockService} />);
  expect(mockService.fetchUsers).toHaveBeenCalled();
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>2. Event-Driven Architecture</h5>
                <code className="code-block">
{`// Use events to decouple features
class EventBus {
  constructor() {
    this.events = new Map();
  }
  
  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }
  
  publish(eventName, data) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).forEach(cb => cb(data));
    }
  }
}

export const eventBus = new EventBus();

// Usage: Feature doesn't know about other features
eventBus.publish('user:loggedIn', { userId: 123 });
eventBus.subscribe('user:loggedIn', ({ userId }) => {
  // Analytics feature
  trackEvent('user_login', { userId });
});`}
                </code>
              </div>

              <div className="explanation-box">
                <h5>3. Public API Boundaries</h5>
                <code className="code-block">
{`// Feature modules export only public API
// src/features/users/index.ts
export { useUsers } from './hooks/useUsers';
export { UserList } from './components/UserList';
export type { User } from './types';

// NOT exported (internal):
// - internal helpers
// - store details
// - service implementations

// Other features only import from public API
import { useUsers, UserList } from 'features/users';`}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hook-subsection">
        <h3>Architecture Principles</h3>
        <div className="explanation-box">
          <ul>
            <li><strong>Scalability:</strong> Design for growth - horizontal scaling, load balancing</li>
            <li><strong>Maintainability:</strong> Clear separation of concerns, documented APIs</li>
            <li><strong>Performance:</strong> Optimize for user experience, monitor metrics</li>
            <li><strong>Reliability:</strong> Error handling, circuit breakers, graceful degradation</li>
            <li><strong>Observability:</strong> Comprehensive logging, monitoring, tracing</li>
            <li><strong>Security:</strong> Secure data handling, authentication, authorization</li>
            <li><strong>Testability:</strong> Dependency injection, mockable services</li>
            <li><strong>Flexibility:</strong> Decouple components, use abstractions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SystemDesignFrontendExample;
