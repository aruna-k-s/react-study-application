/**
 * LIGHTHOUSE QUICK REFERENCE CHEAT SHEET
 * =====================================
 * Pin this for quick lookup during development
 */

// ============================================================================
// CORE WEB VITALS - THE 5 METRICS THAT MATTER
// ============================================================================

/*
╔══════════════════════════════════════════════════════════════════════╗
║                     FIRST CONTENTFUL PAINT (FCP)                     ║
╠══════════════════════════════════════════════════════════════════════╣
║ ❓ What:   First pixel rendered (text, image, SVG)                   ║
║ 💡 Why:    First impression of page loading                         ║
║ 📍 Where:  Render-blocking CSS/JS, large JS parsing               ║
║ ⏱️  When:   During initial page load (0-3 seconds)                 ║
║ 👥 Who:    Mobile 4G users, slow devices                           ║
║ ✓ Good:    ≤ 1.8 seconds                                           ║
║ ✗ Poor:    ≥ 3.0 seconds                                           ║
║ 🔧 Top 3 Fixes:                                                     ║
║    1. Inline critical CSS                                           ║
║    2. Defer non-critical JavaScript                                 ║
║    3. Minimize and compress                                         ║
╚══════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════╗
║              LARGEST CONTENTFUL PAINT (LCP)                          ║
╠══════════════════════════════════════════════════════════════════════╣
║ ❓ What:   Largest visual element becomes visible                    ║
║ 💡 Why:    = "Page is done loading" for users                       ║
║ 📍 Where:  Large images, late-loaded content, slow APIs            ║
║ ⏱️  When:   During page load (most important metric)                ║
║ 👥 Who:    Mobile users, 3G/4G users, slow CPUs                    ║
║ ✓ Good:    ≤ 2.5 seconds                                           ║
║ ✗ Poor:    ≥ 4.0 seconds                                           ║
║ 🔧 Top 3 Fixes:                                                     ║
║    1. Optimize and convert images to WebP                           ║
║    2. Lazy load off-screen images                                   ║
║    3. Cache API responses, use CDN                                  ║
╚══════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════╗
║               CUMULATIVE LAYOUT SHIFT (CLS)                          ║
╠══════════════════════════════════════════════════════════════════════╣
║ ❓ What:   Unexpected pixel movement during load/interaction         ║
║ 💡 Why:    Causes accidental clicks on wrong targets (+70%)         ║
║ 📍 Where:  Images/iframes without dimensions, late-loaded content  ║
║ ⏱️  When:   Page load, first 500ms after interaction                ║
║ 👥 Who:    All users (mobile most frustrated)                       ║
║ ✓ Good:    ≤ 0.1 (scale 0.0 - 1.0)                                 ║
║ ✗ Poor:    ≥ 0.25                                                   ║
║ 🔧 Top 3 Fixes:                                                     ║
║    1. Set explicit width/height on images                           ║
║    2. Use CSS aspect-ratio property                                 ║
║    3. Preload critical fonts                                        ║
╚══════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════╗
║              TOTAL BLOCKING TIME (TBT)                               ║
╠══════════════════════════════════════════════════════════════════════╣
║ ❓ What:   Sum of time when main thread is blocked (>50ms tasks)    ║
║ 💡 Why:    = Page is unresponsive to clicks, scrolls, typing       ║
║ 📍 Where:  Heavy JS execution, long event handlers, GC pauses      ║
║ ⏱️  When:   First 5 seconds (First Input to Interactive)            ║
║ 👥 Who:    Mobile users, mid-range devices, slow CPUs              ║
║ ✓ Good:    ≤ 300 milliseconds                                       ║
║ ✗ Poor:    ≥ 600 milliseconds                                       ║
║ 🔧 Top 3 Fixes:                                                     ║
║    1. Break long tasks into chunks                                  ║
║    2. Use requestIdleCallback() for non-urgent work                 ║
║    3. Move computation to Web Workers                               ║
╚══════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════╗
║              SPEED INDEX (SI)                                        ║
╠══════════════════════════════════════════════════════════════════════╣
║ ❓ What:   Average time at which visible parts are rendered          ║
║ 💡 Why:    Holistic measure of visual completion                    ║
║ 📍 Where:  All performance factors combined                          ║
║ ⏱️  When:   From navigation to visual completion                    ║
║ 👥 Who:    Mobile/3G, slow devices, poor bandwidth                  ║
║ ✓ Good:    ≤ 3.8 seconds                                           ║
║ ✗ Poor:    ≥ 5.8 seconds                                           ║
║ 🔧 Top 3 Fixes:                                                     ║
║    1. Optimize everything above                                     ║
║    2. Progressive rendering (critical first)                        ║
║    3. Build minimal critical rendering path                         ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================
// SCORE INTERPRETATION
// ============================================================================

/*
╔════════════════════════════════╗
║  PERFORMANCE SCORE MEANINGS    ║
╠════════════════════════════════╣
║ 90-100 ✓ EXCELLENT            ║
║        No action needed         ║
║        Keep monitoring          ║
║                                ║
║ 75-89  🔵 GOOD                 ║
║        Minor improvements       ║
║        Address in next sprint   ║
║                                ║
║ 50-74  🟡 NEEDS WORK           ║
║        Multiple issues          ║
║        Prioritize fixes         ║
║                                ║
║ 0-49   🔴 POOR                 ║
║        Critical issues          ║
║        Fix immediately!         ║
╚════════════════════════════════╝
*/

// ============================================================================
// TOP 10 OPTIMIZATIONS (IN PRIORITY ORDER)
// ============================================================================

/*
1. 🖼️  IMAGES - The #1 Performance Culprit (Usually 80% of issues)
   ├─ Convert to WebP format (saves 25-35%)
   ├─ Compress ruthlessly (TinyPNG, ImageOptim)
   ├─ Use srcset for responsive sizing
   ├─ Add loading="lazy" for off-screen images
   └─ Use <picture> element with multiple formats

2. 📦 CODE SPLITTING - Monolithic bundles kill performance
   ├─ React.lazy() + Suspense for route-based splitting
   ├─ Dynamic imports for heavy components
   ├─ Tree-shake unused code: { "sideEffects": false }
   ├─ Analyze bundle: webpack-bundle-analyzer
   └─ Target: < 150KB JavaScript (gzipped)

3. 🔗 RENDER-BLOCKING RESOURCES
   ├─ CSS: Inline critical, defer non-critical
   ├─ JS: Add async/defer attributes
   ├─ Use preload/prefetch resource hints
   └─ Check Network tab for red entries

4. 📐 LAYOUT STABILITY - CLS is user frustration
   ├─ ALWAYS set width/height on images
   ├─ Use aspect-ratio CSS property
   ├─ Reserve space for ads, embeds
   ├─ Test on slow devices
   └─ Use transform: translate() instead of position changes

5. ⚙️ MAIN THREAD BLOCKING - Perceived responsiveness
   ├─ Profile with Chrome DevTools (Performance tab)
   ├─ Break tasks: scheduler.yield() or setTimeout
   ├─ Debounce event handlers
   ├─ Move heavy work to Web Workers
   └─ Lazy-load heavy libraries

6. 🚀 CDN + CACHING
   ├─ Serve static assets from CDN (geographic proximity)
   ├─ Set cache headers: 1 year for hashed files
   ├─ Compress: gzip/brotli on server
   ├─ Browser cache: service workers
   └─ API caching: 5-60 min depending on data

7. 🔤 FONTS - Often forgotten performance killer
   ├─ font-display: swap (show fallback immediately)
   ├─ Preload only above-the-fold fonts
   ├─ Limit font weights/sizes (usually 2-3)
   ├─ WOFF2 format (better compression)
   └─ Host locally or use CDN (avoid Google Fonts lag)

8. 📊 THIRD-PARTY SCRIPTS - Massive TBT contributor
   ├─ Defer all non-critical: analytics, chat, ads
   ├─ Use async/defer attributes
   ├─ Sandbox in iframes (facade pattern)
   ├─ Set script timeouts
   └─ Try alternatives: native vs third-party

9. 🔄 LAZY LOADING + INFINITE SCROLL
   ├─ Intersection Observer API (modern, performant)
   ├─ loading="lazy" on images/iframes
   ├─ Virtual scrolling for long lists
   ├─ Pagination instead of infinite scroll if possible
   └─ Preload next page just before needed

10. 🎨 RENDERING OPTIMIZATION
    ├─ Use transform/opacity (GPU accelerated)
    ├─ Avoid layout thrashing (read then write)
    ├─ React: React.memo, useMemo, useCallback
    ├─ Will-change CSS sparingly
    └─ Measure: requestAnimationFrame profiling
*/

// ============================================================================
// QUICK FIXES RANKED BY IMPACT vs EFFORT
// ============================================================================

/*
┌─────────────────────────────────────────────────────────┐
│ IMPACT vs EFFORT MATRIX                                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  HIGH IMPACT    │ Images WebP ✅✅✅                    │
│  LOW EFFORT     │ Defer JS ✅✅                         │
│                 │ Lazy load images ✅✅                 │
│                 │ Compress files ✅                     │
│                 │                                       │
│──────────────────────────────────────────────────────   │
│                 │                                       │
│  HIGH IMPACT    │ Code splitting ⚠️                    │
│  MEDIUM EFFORT  │ Service Worker ⚠️                    │
│                 │ Critical CSS ⚠️                      │
│                 │ CDN setup ⚠️                         │
│                 │                                       │
│──────────────────────────────────────────────────────   │
│                 │                                       │
│  MEDIUM IMPACT  │ 3rd party optimization ⚠️⚠️          │
│  HIGH EFFORT    │ Server optimization ⚠️⚠️             │
│                 │ Database tuning ⚠️⚠️                 │
│                 │ SSR implementation ⚠️⚠️⚠️             │
│                 │                                       │
└─────────────────────────────────────────────────────────┘

START HERE → Pick 3 low-effort, high-impact items
THEN → Move to medium effort as time allows
FINALLY → Consider high-effort architectural changes
*/

// ============================================================================
// CODE SNIPPETS - COPY & PASTE
// ============================================================================

/*
┌─────────────────────────────────────────────────────────┐
│ 1. LAZY LOAD REACT COMPONENTS                           │
├─────────────────────────────────────────────────────────┤

import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => 
  import('./HeavyComponent')
);

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. LAZY LOAD IMAGES                                     │
├─────────────────────────────────────────────────────────┤

<img 
  src="image.jpg" 
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
  style={{ width: '100%', height: 'auto' }}
/>
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. BREAK LONG TASKS                                     │
├─────────────────────────────────────────────────────────┤

async function processLargeDataSet(data) {
  for (let i = 0; i < data.length; i += 100) {
    await new Promise(resolve => {
      setTimeout(() => {
        processChunk(data.slice(i, i + 100));
        resolve();
      }, 0);
    });
  }
}
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. PREVENT CLS WITH ASPECT-RATIO                        │
├─────────────────────────────────────────────────────────┤

<img
  src="image.jpg"
  alt="Photo"
  style={{
    aspectRatio: '16 / 9',
    width: '100%',
    height: 'auto'
  }}
  loading="lazy"
/>
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 5. DEFER JAVASCRIPT                                     │
├─────────────────────────────────────────────────────────┤

<!-- In HTML head -->
<script src="bundle.js" defer></script>

<!-- Or async for analytics -->
<script src="analytics.js" async></script>
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 6. MONITOR WEB VITALS                                   │
├─────────────────────────────────────────────────────────┤

import { onCLS, onLCP, onTBT } from 'web-vitals';

onCLS(metric => console.log('CLS:', metric.value));
onLCP(metric => console.log('LCP:', metric.value));
onTBT(metric => console.log('TBT:', metric.value));
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 7. RESPONSIVE IMAGES WITH SRCSET                        │
├─────────────────────────────────────────────────────────┤

<picture>
  <source 
    srcSet="image-small.webp 480w,
            image-medium.webp 1024w,
            image-large.webp 1440w"
    type="image/webp"
  />
  <img 
    srcSet="image-small.jpg 480w,
            image-medium.jpg 1024w,
            image-large.jpg 1440w"
    src="image-large.jpg"
    alt="Description"
    loading="lazy"
  />
</picture>
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 8. MEMOIZE EXPENSIVE COMPUTATIONS                       │
├─────────────────────────────────────────────────────────┤

import { useMemo, useCallback } from 'react';

function MyComponent({ data }) {
  const processedData = useMemo(
    () => expensiveCalculation(data),
    [data]
  );
  
  const handleClick = useCallback(
    () => doSomething(),
    []
  );
  
  return <div onClick={handleClick}>{processedData}</div>;
}
└─────────────────────────────────────────────────────────┘
*/

// ============================================================================
// DEBUGGING WORKFLOW
// ============================================================================

/*
STEP 1: Generate Lighthouse Report
├─ Chrome DevTools → Lighthouse tab
├─ Click "Analyze page load"
└─ Wait 30-90 seconds

STEP 2: Identify Worst Issues
├─ Look for CRITICAL severity issues
├─ Check all metrics > thresholds
└─ Note: Impact (milliseconds saved) for each

STEP 3: Find Root Cause
├─ DevTools Performance tab → Record
├─ DevTools Network tab → Check sizes
├─ DevTools Source tab → Profile JavaScript
└─ Chrome Profiler: npm profile

STEP 4: Implement Fix
├─ Pick one issue (smallest first)
├─ Apply fix from this cheat sheet
├─ Test locally (DevTools)
└─ Measure before/after

STEP 5: Validate
├─ Run Lighthouse again
├─ Compare scores (should improve)
├─ Check all metrics
└─ Look for regressions

STEP 6: Repeat
└─ Pick next issue, goto STEP 4
*/

// ============================================================================
// THRESHOLD REFERENCE TABLE
// ============================================================================

/*
╔══════════════════════════════════════════════════════════════════════╗
║ METRIC      GOOD         AVG          POOR          MEASURE          ║
╠══════════════════════════════════════════════════════════════════════╣
║ FCP         ≤ 1.8s       1.8-3.0s     ≥ 3.0s        Load perceived  ║
║ LCP         ≤ 2.5s       2.5-4.0s     ≥ 4.0s        Load done        ║
║ CLS         ≤ 0.1        0.1-0.25     ≥ 0.25        Stability        ║
║ TBT         ≤ 300ms      300-600ms    ≥ 600ms       Responsiveness   ║
║ SI          ≤ 3.8s       3.8-5.8s     ≥ 5.8s        Overall speed    ║
║                                                                       ║
║ JS Bundle   ≤ 150KB      150-300KB    ≥ 300KB       Code size        ║
║ CSS Bundle  ≤ 30KB       30-50KB      ≥ 50KB        Style size       ║
║ Images      ≤ 100KB      100-300KB    ≥ 300KB       Per image        ║
║                                                                       ║
║ Score       90-100       50-89        0-49          Performance      ║
║                          (avg)        (poor)        overall          ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================
// PERFORMANCE BUDGET - WHAT TO AIM FOR
// ============================================================================

/*
YOUR PERFORMANCE BUDGET:

JavaScript (gzipped):     ≤ 150 KB  ← Keep under this!
CSS (gzipped):            ≤ 30 KB   ← Small and focused
Fonts (total):            ≤ 100 KB  ← Usually 2-3 fonts max
Images (per image):       ≤ 100 KB  ← Compress ruthlessly
Total threshold:          ≤ 200 KB  ← For 4G networks

Core Web Vitals:
- FCP should be          ≤ 1.8s
- LCP should be          ≤ 2.5s
- CLS should be          ≤ 0.1
- TBT should be          ≤ 300ms
- SI should be           ≤ 3.8s

Mobile-specific:
- FCP (4G):              ≤ 2.5s   (slower network)
- LCP (Mobile device):   ≤ 3.2s   (slower processor)

When you exceed these = Performance regression alert!
*/

// ============================================================================
// TOOLS QUICK REFERENCE
// ============================================================================

/*
BUILT-IN TOOLS (Free):
├─ Chrome DevTools (F12)
│  ├─ Performance tab: Flame graph, bottleneck analysis
│  ├─ Lighthouse tab: Full audit
│  └─ Network tab: Waterfall, bundle sizes
│
├─ PageSpeed Insights (https://pagespeed.web.dev)
│  └─ Free online Lighthouse audit
│
└─ Web Vitals Library (npm install web-vitals)
   └─ Measure Core Web Vitals in real users

THIRD-PARTY TOOLS:
├─ WebPageTest (https://www.webpagetest.org)
│  └─ Detailed waterfall from different locations
│
├─ Webpack Bundle Analyzer
│  ├─ npm install --save-dev webpack-bundle-analyzer
│  └─ Visualize bundle contents
│
├─ Lighthouse CI (GitHub Actions)
│  └─ Automate Lighthouse in CI/CD
│
└─ Perfume.js
   └─ Real user monitoring library

MY RECOMMENDATION:
✓ Start: DevTools + Lighthouse tab
✓ Analyze: Performance tab + Network tab
✓ Measure: Web Vitals library
✓ Track: Lighthouse reports JSON files
✓ Monitor: Real user data
*/

// ============================================================================
// DECISION TREE - WHICH OPTIMIZATION?
// ============================================================================

/*
START: My Core Web Vitals score is X
│
├─ Performance 0-49?
│  └─ 🚨 CRITICAL: Fix immediately
│     1. Run Google PageSpeed
│     2. Check Lighthouse issues
│     3. Start with: Images, JS bundles
│
├─ Performance 50-89?
│  ├─ LCP > 2.5s?
│  │  └─ Optimize images, use CDN, cache API
│  ├─ CLS > 0.1?
│  │  └─ Set width/height, preload fonts
│  ├─ TBT > 300ms?
│  │  └─ Code split, break long tasks
│  └─ FCP > 1.8s?
│     └─ Defer CSS/JS, use critical CSS
│
└─ Performance 90-100?
   └─ ✅ EXCELLENT: Keep it! Monitor for regressions
*/

export const CHEAT_SHEET = 'Bookmark this file!';

// ============================================================================
// FINAL CHECKLIST - Do this NOW
// ============================================================================

/*
IMMEDIATE ACTIONS (Next 30 minutes):

☐ 1. Run Lighthouse on your app
     → Chrome DevTools → Lighthouse tab
     → Click "Analyze page load"

☐ 2. Note your scores
     → Performance, Accessibility, Best Practices, SEO, PWA

☐ 3. Read Lighthouse report
     → Look at "Opportunities" section
     → Which saves most milliseconds?

☐ 4. Identify top 3 issues
     → Pick lowest hanging fruit
     → Calculate potential impact

☐ 5. Make ONE change
     → Follow the code snippets above
     → Test in DevTools
     → Measure impact

WEEKLY:

☐ Run Lighthouse every Friday
☐ Compare with previous week
☐ Celebrate improvements or fix regressions
☐ Share results with team

MONTHLY:

☐ Review performance trends
☐ Set targets for next month
☐ Share business impact (revenue, SEO, retention)
☐ Plan architectural changes if needed
*/

print('🚀 Use this cheat sheet daily. Pin it!');
