/*
 * Comprehensive DSA Learning Curriculum
 * src/components/32-DSAComprehensiveCurriculum.js
 *
 * A detailed, structured educational curriculum covering:
 * - Fundamental concepts (Big O, complexity analysis)
 * - Core data structures with deep dives
 * - Algorithmic paradigms with implementation details
 * - Problem-solving methodologies
 * - Practical platforms and languages
 * - Assessment frameworks
 *
 * Designed for learners progressing from novice to expert level
 */

import React, { useState } from 'react';
import '../styles/DSAComprehensiveCurriculum.css';

export default function DSAComprehensiveCurriculum() {
  const [expandedTopic, setExpandedTopic] = useState('fundamentals');
  const [expandedSubtopic, setExpandedSubtopic] = useState({});

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const toggleSubtopic = (key) => {
    setExpandedSubtopic(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="dsa-curriculum">
      <div className="curriculum-hero">
        <h1>📚 Comprehensive DSA Learning Curriculum</h1>
        <p>A detailed, structured pathway to mastering Data Structures and Algorithms from fundamental concepts to expert implementation</p>
        <div className="curriculum-meta">
          <span className="meta-item">🎓 Beginner to Expert</span>
          <span className="meta-item">📖 6 Major Topics</span>
          <span className="meta-item">💻 Hands-On Practice</span>
          <span className="meta-item">📊 Assessment Included</span>
        </div>
      </div>

      {/* ============= SECTION 1: FUNDAMENTAL CONCEPTS ============= */}
      <Section1Fundamentals expanded={expandedTopic === 'fundamentals'} onToggle={() => toggleTopic('fundamentals')} />

      {/* ============= SECTION 2: DATA STRUCTURES ============= */}
      <Section2DataStructures expanded={expandedTopic === 'dataStructures'} onToggle={() => toggleTopic('dataStructures')} expandedSubtopic={expandedSubtopic} toggleSubtopic={toggleSubtopic} />

      {/* ============= SECTION 3: ALGORITHMS & PARADIGMS ============= */}
      <Section3Algorithms expanded={expandedTopic === 'algorithms'} onToggle={() => toggleTopic('algorithms')} expandedSubtopic={expandedSubtopic} toggleSubtopic={toggleSubtopic} />

      {/* ============= SECTION 4: PROBLEM-SOLVING STRATEGIES ============= */}
      <Section4ProblemSolving expanded={expandedTopic === 'problemSolving'} onToggle={() => toggleTopic('problemSolving')} expandedSubtopic={expandedSubtopic} toggleSubtopic={toggleSubtopic} />

      {/* ============= SECTION 5: PRACTICAL APPLICATION ============= */}
      <Section5Practical expanded={expandedTopic === 'practical'} onToggle={() => toggleTopic('practical')} expandedSubtopic={expandedSubtopic} toggleSubtopic={toggleSubtopic} />

      {/* ============= SECTION 6: ASSESSMENT & PROGRESSION ============= */}
      <Section6Assessment expanded={expandedTopic === 'assessment'} onToggle={() => toggleTopic('assessment')} expandedSubtopic={expandedSubtopic} toggleSubtopic={toggleSubtopic} />
    </div>
  );
}

// ============= SECTION 1: FUNDAMENTAL CONCEPTS =============
function Section1Fundamentals({ expanded, onToggle }) {
  return (
    <div className="curriculum-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">🔬 Section 1: Fundamental Concepts</h2>
        <span className="section-chevron">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="section-content">
          <div className="subsection">
            <h3>Time Complexity Analysis</h3>
            <p className="intro-text">Understanding how an algorithm's runtime scales with input size is crucial for writing efficient code.</p>
            
            <div className="concept-box">
              <h4>Big O Notation</h4>
              <p><strong>Definition:</strong> Describes the worst-case scenario for an algorithm's growth rate as input size approaches infinity.</p>
              <div className="complexity-chart">
                <table>
                  <thead>
                    <tr>
                      <th>Notation</th>
                      <th>Name</th>
                      <th>Example</th>
                      <th>Scaled (n=1,000,000)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="row-o1">
                      <td className="notation">O(1)</td>
                      <td>Constant</td>
                      <td>Array access by index</td>
                      <td>1 operation</td>
                    </tr>
                    <tr className="row-ologn">
                      <td className="notation">O(log n)</td>
                      <td>Logarithmic</td>
                      <td>Binary search</td>
                      <td>~20 operations</td>
                    </tr>
                    <tr className="row-on">
                      <td className="notation">O(n)</td>
                      <td>Linear</td>
                      <td>Single loop iteration</td>
                      <td>1,000,000 operations</td>
                    </tr>
                    <tr className="row-onlogn">
                      <td className="notation">O(n log n)</td>
                      <td>Linearithmic</td>
                      <td>Merge sort, quick sort</td>
                      <td>~20,000,000 operations</td>
                    </tr>
                    <tr className="row-on2">
                      <td className="notation">O(n²)</td>
                      <td>Quadratic</td>
                      <td>Nested loops, bubble sort</td>
                      <td>1,000,000,000,000 operations</td>
                    </tr>
                    <tr className="row-on3">
                      <td className="notation">O(n³)</td>
                      <td>Cubic</td>
                      <td>Triple nested loops</td>
                      <td>10¹⁸ operations</td>
                    </tr>
                    <tr className="row-o2n">
                      <td className="notation">O(2ⁿ)</td>
                      <td>Exponential</td>
                      <td>Brute-force combinations</td>
                      <td>2¹'⁰⁰⁰'⁰⁰⁰ operations</td>
                    </tr>
                    <tr className="row-on-fact">
                      <td className="notation">O(n!)</td>
                      <td>Factorial</td>
                      <td>Generating permutations</td>
                      <td>Astronomical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="concept-box">
              <h4>Rules for Big O Analysis</h4>
              <ol>
                <li><strong>Drop constants:</strong> O(2n) = O(n), O(5) = O(1)</li>
                <li><strong>Drop non-dominant terms:</strong> O(n² + n) = O(n²)</li>
                <li><strong>Analyze worst-case:</strong> Even if average is better, use worst-case</li>
                <li><strong>Add complexities for sequential operations:</strong> O(a) + O(b) = O(a + b)</li>
                <li><strong>Multiply complexities for nested operations:</strong> O(a) × O(b) = O(a × b)</li>
              </ol>
            </div>
          </div>

          <div className="subsection">
            <h3>Space Complexity Analysis</h3>
            <p className="intro-text">Memory usage is as important as time complexity. Understand auxiliary space requirements.</p>
            
            <div className="concept-box">
              <h4>Space Complexity Considerations</h4>
              <ul>
                <li><strong>Auxiliary space:</strong> Extra memory used by algorithm (excluding input)</li>
                <li><strong>In-place algorithms:</strong> O(1) space, modify input directly</li>
                <li><strong>Recursion stack:</strong> Each recursive call uses stack memory</li>
                <li><strong>Data structure overhead:</strong> Hash map O(n), Tree O(n), Linked list O(n)</li>
                <li><strong>Trade-offs:</strong> Often can trade time for space (memoization, caching)</li>
              </ul>
            </div>

            <div className="concept-box">
              <h4>Space Complexity Examples</h4>
              <div className="example-list">
                <div className="example-item">
                  <strong>O(1):</strong> Swapping two variables, single variables
                </div>
                <div className="example-item">
                  <strong>O(n):</strong> Creating new array of size n, recursion depth n
                </div>
                <div className="example-item">
                  <strong>O(n²):</strong> 2D matrix creation of size n×n
                </div>
                <div className="example-item">
                  <strong>O(log n):</strong> Recursion depth in binary search tree (balanced)
                </div>
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3>Algorithmic Paradigms Overview</h3>
            <p className="intro-text">Different problem-solving approaches suited to different problem types.</p>
            
            <div className="paradigm-grid">
              <div className="paradigm-card">
                <h4>Divide & Conquer</h4>
                <p>Break problem into subproblems, solve independently, combine results.</p>
                <strong>When:</strong> Problem decomposes naturally
              </div>
              <div className="paradigm-card">
                <h4>Dynamic Programming</h4>
                <p>Cache results of subproblems to avoid recomputation.</p>
                <strong>When:</strong> Overlapping subproblems, optimal substructure
              </div>
              <div className="paradigm-card">
                <h4>Greedy</h4>
                <p>Make locally optimal choice at each step.</p>
                <strong>When:</strong> Greedy choice property holds
              </div>
              <div className="paradigm-card">
                <h4>Backtracking</h4>
                <p>Explore solution space, prune invalid branches.</p>
                <strong>When:</strong> Need all solutions or constraint satisfaction
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============= SECTION 2: DATA STRUCTURES =============
function Section2DataStructures({ expanded, onToggle, expandedSubtopic, toggleSubtopic }) {
  const dataStructures = [
    {
      key: 'arrays',
      name: 'Arrays & Dynamic Arrays',
      summary: 'Contiguous memory, O(1) access, O(n) insertion/deletion',
      details: {
        definition: 'Ordered collection of elements in contiguous memory. Fixed size in most languages.',
        properties: [
          'Time: Access O(1), Search O(n), Insert O(n), Delete O(n)',
          'Space: O(n) where n is capacity',
          'Cache-friendly due to contiguous memory',
          'Index-based access'
        ],
        useCases: [
          'Sorting problems',
          'Searching and filtering',
          'Matrix operations',
          'Implementing other data structures'
        ],
        advanced: 'Dynamic arrays (Python lists, Java ArrayList) auto-resize. Amortized time for append: O(1).',
        whenToUse: 'When you need fast random access or sequential storage.'
      }
    },
    {
      key: 'linkedLists',
      name: 'Linked Lists',
      summary: 'Sequential pointers, O(n) access, O(1) insertion/deletion at node',
      details: {
        definition: 'Chain of nodes where each node contains data and reference to next node.',
        properties: [
          'Time: Access O(n), Search O(n), Insert O(1)*, Delete O(1)*',
          'Space: O(n) including pointers',
          'No requirement for contiguous memory',
          '* At known position'
        ],
        useCases: [
          'LRU cache implementation',
          'Cycle detection',
          'Reversing sequences',
          'Splitting/merging lists'
        ],
        variants: 'Singly, doubly, circular linked lists with different properties.',
        whenToUse: 'When frequent insertions/deletions needed or size varies greatly.'
      }
    },
    {
      key: 'stacks',
      name: 'Stacks (LIFO)',
      summary: 'Last-In-First-Out, O(1) push/pop',
      details: {
        definition: 'Collection where elements added/removed from same end (top).',
        properties: [
          'Time: Push O(1), Pop O(1), Peek O(1)',
          'Space: O(n)',
          'LIFO ordering',
          'Typically implemented with arrays or linked lists'
        ],
        useCases: [
          'Expression evaluation (postfix, prefix)',
          'Parenthesis matching',
          'Undo/Redo functionality',
          'DFS (recursive calls use implicit stack)',
          'Browser back button'
        ],
        implementation: 'Use array with pointer to top, or linked list.',
        whenToUse: 'When you need LIFO ordering or managing function calls.'
      }
    },
    {
      key: 'queues',
      name: 'Queues (FIFO)',
      summary: 'First-In-First-Out, O(1) enqueue/dequeue',
      details: {
        definition: 'Collection where elements added at rear, removed from front.',
        properties: [
          'Time: Enqueue O(1), Dequeue O(1), Peek O(1)',
          'Space: O(n)',
          'FIFO ordering',
          'Circular queue optimization available'
        ],
        useCases: [
          'BFS tree/graph traversal',
          'Task scheduling',
          'Print queue management',
          'Level-order tree traversal'
        ],
        variants: 'Circular queue (space-efficient), Priority queue (ordered by priority).',
        whenToUse: 'When you need FIFO ordering or level-wise processing.'
      }
    },
    {
      key: 'hashTables',
      name: 'Hash Tables / Hash Maps',
      summary: 'O(1) average lookup, handles collisions',
      details: {
        definition: 'Map keys to values using hash function. Handles collisions via chaining or open addressing.',
        properties: [
          'Time: Search O(1) avg, O(n) worst, Insert O(1) avg, Delete O(1) avg',
          'Space: O(n)',
          'Unordered (order not guaranteed)',
          'Requires good hash function'
        ],
        useCases: [
          'Frequency counting',
          'Duplicate detection',
          'Caching (memoization)',
          'Grouping anagrams',
          'Two-sum problems'
        ],
        collisionHandling: 'Chaining (linked list at each bucket) or open addressing (find next empty slot).',
        whenToUse: 'When you need fast key-value lookup.'
      }
    },
    {
      key: 'trees',
      name: 'Trees (Binary & BST)',
      summary: 'Hierarchical structure, O(log n) balanced operations',
      details: {
        definition: 'Hierarchical data structure with root node and child subtrees.',
        properties: [
          'Time: Search O(log n) balanced, O(n) skewed',
          'Space: O(n)',
          'Acyclic connected graph',
          'Height = log n in balanced tree'
        ],
        types: [
          'Binary Tree: Each node ≤ 2 children',
          'Binary Search Tree: Left < parent < right',
          'AVL Tree: Self-balancing, height difference ≤ 1',
          'Red-Black Tree: Balanced with color property'
        ],
        useCases: [
          'Implementing sorted collections',
          'Expression trees',
          'File systems',
          'Database indexing'
        ],
        traversals: 'In-order (sorted), Pre-order (parent first), Post-order (children first), Level-order',
        whenToUse: 'When you need sorted data with efficient insertion/deletion.'
      }
    },
    {
      key: 'heaps',
      name: 'Heaps (Priority Queues)',
      summary: 'Complete binary tree, O(log n) insert/delete-min',
      details: {
        definition: 'Complete binary tree where parent ≤ children (min-heap) or parent ≥ children (max-heap).',
        properties: [
          'Time: Insert O(log n), Delete O(log n), Get-min O(1)',
          'Space: O(n)',
          'Complete binary tree (all levels filled except last)',
          'Can be array-implemented (no pointers needed)'
        ],
        useCases: [
          'Finding k largest/smallest elements',
          'Merge k sorted lists',
          'Dijkstra\'s shortest path algorithm',
          'Huffman coding',
          'Median finding'
        ],
        operations: 'Insertion with bubble-up, deletion with bubble-down, heapify.',
        whenToUse: 'When you need efficient access to min/max elements.'
      }
    },
    {
      key: 'graphs',
      name: 'Graphs',
      summary: 'Vertices + edges, various traversals',
      details: {
        definition: 'Collection of vertices and edges. Directed (→) or undirected (—). Weighted or unweighted.',
        properties: [
          'Vertices (V) and Edges (E)',
          'Time: DFS O(V+E), BFS O(V+E)',
          'Space: Adjacency list O(V+E), matrix O(V²)',
          'Can be cyclic or acyclic (DAG)'
        ],
        representations: [
          'Adjacency list: O(V+E) space, efficient for sparse',
          'Adjacency matrix: O(V²) space, efficient for dense',
          'Edge list: Simple but less efficient'
        ],
        useCases: [
          'Social networks',
          'Route finding (GPS)',
          'Network routing',
          'Course prerequisites',
          'Game state representation'
        ],
        algorithms: 'DFS, BFS, Topological sort, Dijkstra, MST (Kruskal, Prim)',
        whenToUse: 'When representing relationships between entities.'
      }
    },
    {
      key: 'tries',
      name: 'Tries (Prefix Trees)',
      summary: 'String-optimized, O(m) search where m = string length',
      details: {
        definition: 'Tree structure optimized for string storage. Each level represents character.',
        properties: [
          'Time: Search O(m), Insert O(m), Delete O(m) where m = word length',
          'Space: O(ALPHABET_SIZE × n)',
          'Efficient for prefix queries',
          'No comparison needed between strings'
        ],
        useCases: [
          'Autocomplete',
          'Spell checking',
          'IP routing',
          'Dictionary implementation',
          'Phone directory'
        ],
        optimization: 'Compressed tries reduce space. Hash-map trie uses maps at each node.',
        whenToUse: 'When dealing with string/prefix problems.'
      }
    }
  ];

  return (
    <div className="curriculum-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">🏗️ Section 2: Data Structures Deep Dive</h2>
        <span className="section-chevron">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="section-content">
          <p className="intro-text">Master each data structure: when to use, how to implement, time/space complexity, and real-world applications.</p>
          
          {dataStructures.map(ds => (
            <div key={ds.key} className="ds-detailed-card">
              <div className="ds-header" onClick={() => toggleSubtopic(ds.key)}>
                <h3>{ds.name}</h3>
                <p className="ds-summary">{ds.summary}</p>
                <span className="expand-icon">{expandedSubtopic[ds.key] ? '−' : '+'}</span>
              </div>

              {expandedSubtopic[ds.key] && (
                <div className="ds-details">
                  <div className="detail-section">
                    <h4>Definition</h4>
                    <p>{ds.details.definition}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Properties</h4>
                    <ul>
                      {ds.details.properties.map((prop, idx) => (
                        <li key={idx}>{prop}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>Use Cases</h4>
                    <ul>
                      {ds.details.useCases.map((useCase, idx) => (
                        <li key={idx}>{useCase}</li>
                      ))}
                    </ul>
                  </div>

                  {ds.details.types && (
                    <div className="detail-section">
                      <h4>Types & Variants</h4>
                      <ul>
                        {ds.details.types.map((type, idx) => (
                          <li key={idx}>{type}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ds.details.collisionHandling && (
                    <div className="detail-section">
                      <h4>Collision Handling</h4>
                      <p>{ds.details.collisionHandling}</p>
                    </div>
                  )}

                  {ds.details.advanced && (
                    <div className="detail-section">
                      <h4>Advanced Concepts</h4>
                      <p>{ds.details.advanced}</p>
                    </div>
                  )}

                  {ds.details.representations && (
                    <div className="detail-section">
                      <h4>Representations</h4>
                      <ul>
                        {ds.details.representations.map((rep, idx) => (
                          <li key={idx}>{rep}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ds.details.algorithms && (
                    <div className="detail-section">
                      <h4>Key Algorithms</h4>
                      <p>{ds.details.algorithms}</p>
                    </div>
                  )}

                  {ds.details.traversals && (
                    <div className="detail-section">
                      <h4>Traversal Methods</h4>
                      <p>{ds.details.traversals}</p>
                    </div>
                  )}

                  {ds.details.operations && (
                    <div className="detail-section">
                      <h4>Key Operations</h4>
                      <p>{ds.details.operations}</p>
                    </div>
                  )}

                  <div className="detail-section highlight">
                    <h4>When to Use</h4>
                    <p><strong>{ds.details.whenToUse}</strong></p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============= SECTION 3: ALGORITHMS =============
function Section3Algorithms({ expanded, onToggle, expandedSubtopic, toggleSubtopic }) {
  const algorithms = [
    {
      key: 'sorting',
      name: 'Sorting Algorithms',
      items: [
        {
          name: 'Merge Sort',
          complexity: 'O(n log n) time, O(n) space',
          description: 'Divide-and-conquer: split in half, recursively sort, merge.',
          stability: 'Stable (preserves order of equal elements)',
          when: 'Guaranteed O(n log n), need stable sort, external sorting',
          code: 'Recursive with merge operation'
        },
        {
          name: 'Quick Sort',
          complexity: 'O(n log n) avg, O(n²) worst, O(log n) space',
          description: 'Partition around pivot, recursively sort partitions.',
          stability: 'Unstable',
          when: 'Average case O(n log n), in-place, cache-friendly',
          code: 'In-place with partition logic'
        },
        {
          name: 'Heap Sort',
          complexity: 'O(n log n) time, O(1) space',
          description: 'Build max-heap, repeatedly extract root.',
          stability: 'Unstable',
          when: 'Guaranteed O(n log n), space-critical, in-place',
          code: 'Heapify then extract operations'
        }
      ]
    },
    {
      key: 'searching',
      name: 'Searching Algorithms',
      items: [
        {
          name: 'Linear Search',
          complexity: 'O(n) time, O(1) space',
          description: 'Check each element sequentially.',
          use: 'Unsorted arrays, small datasets',
          when: 'No sorting available, need all matches',
          code: 'Simple loop'
        },
        {
          name: 'Binary Search',
          complexity: 'O(log n) time, O(1) space',
          description: 'Eliminate half search space each iteration. Requires sorted array.',
          variants: 'Find first occurrence, last occurrence, closest element',
          when: 'Sorted array, need fast search',
          code: 'Two pointers with mid calculation'
        },
        {
          name: 'Hash-Based Search',
          complexity: 'O(1) avg search, O(n) space',
          description: 'Store in hash table for O(1) lookup.',
          tradeoff: 'Trade space for time',
          when: 'Many repeated searches, need fast access',
          code: 'Hash table implementation'
        }
      ]
    },
    {
      key: 'recursion',
      name: 'Recursion & Backtracking',
      items: [
        {
          name: 'Recursion Fundamentals',
          definition: 'Function calling itself to solve subproblems.',
          base: 'Base case (when to stop) is critical',
          stack: 'Each call uses stack memory - depth = space complexity',
          examples: 'Factorial, Fibonacci, tree traversal'
        },
        {
          name: 'Tail Recursion',
          description: 'Recursive call is last statement. Can be optimized to iteration.',
          benefit: 'Compiler can optimize to loop (no stack growth)',
          languages: 'Some languages optimize (Scheme), others don\'t (Python)'
        },
        {
          name: 'Backtracking',
          description: 'Explore all solutions by trying each option and undoing if invalid.',
          pattern: '1. Choose 2. Explore 3. Unchoose',
          problems: 'N-Queens, Sudoku, permutations, combinations',
          optimization: 'Pruning: avoid exploring impossible branches'
        }
      ]
    },
    {
      key: 'dp',
      name: 'Dynamic Programming',
      items: [
        {
          name: 'Memoization (Top-Down)',
          description: 'Recursive solution + cache results',
          implementation: 'Use hash map to store subproblem solutions',
          advantage: 'Natural recursive structure preserved',
          time: 'Reduces exponential to polynomial by caching'
        },
        {
          name: 'Tabulation (Bottom-Up)',
          description: 'Iterative solution building from smallest subproblems',
          implementation: 'Use array/table to store results',
          advantage: 'No recursion stack, often faster in practice',
          pattern: 'Fill table row-by-row following recurrence relation'
        },
        {
          name: 'Identifying DP Problems',
          property1: 'Optimal substructure: optimal solution uses optimal subproblem solutions',
          property2: 'Overlapping subproblems: same subproblems solved multiple times',
          approach: 'Memoize + optimize → DP solution',
          examples: 'Fibonacci, Longest increasing subsequence, Knapsack'
        }
      ]
    },
    {
      key: 'greedy',
      name: 'Greedy Algorithms',
      items: [
        {
          name: 'Greedy Choice Property',
          definition: 'Globally optimal solution = locally optimal choices at each step',
          proof: 'Not all problems have this property. Must prove before applying.',
          when: 'Minimum spanning tree, activity selection, Huffman coding',
          caution: 'Avoid using if problem doesn\'t have greedy property'
        },
        {
          name: 'Classic Greedy Problems',
          problems: [
            'Activity selection: Choose non-overlapping activities',
            'Fractional knapsack: Take items by best value/weight ratio',
            'Huffman coding: Build optimal prefix-free code',
            'Interval scheduling: Maximize non-conflicting tasks'
          ]
        }
      ]
    },
    {
      key: 'graphAlgo',
      name: 'Graph Algorithms',
      items: [
        {
          name: 'Depth-First Search (DFS)',
          complexity: 'O(V + E)',
          implementation: 'Recursion or explicit stack',
          use: 'Cycle detection, topological sort, connected components',
          pattern: 'Explore deep before backtracking'
        },
        {
          name: 'Breadth-First Search (BFS)',
          complexity: 'O(V + E)',
          implementation: 'Queue-based',
          use: 'Shortest path (unweighted), level-order, connected components',
          pattern: 'Explore level-by-level'
        },
        {
          name: 'Dijkstra\'s Algorithm',
          complexity: 'O((V + E) log V)',
          requirement: 'Non-negative edge weights',
          use: 'Shortest path from source to all vertices',
          implementation: 'Priority queue for efficient min extraction'
        },
        {
          name: 'Topological Sort',
          complexity: 'O(V + E)',
          requirement: 'Directed acyclic graph (DAG)',
          use: 'Course prerequisites, build order, dependency resolution',
          methods: 'DFS-based or Kahn\'s algorithm (BFS-based)'
        }
      ]
    }
  ];

  return (
    <div className="curriculum-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">⚙️ Section 3: Algorithms & Paradigms</h2>
        <span className="section-chevron">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="section-content">
          <p className="intro-text">Learn the fundamental algorithms and how to implement them efficiently.</p>
          
          {algorithms.map(algoGroup => (
            <div key={algoGroup.key} className="algo-group">
              <h3 className="group-title">{algoGroup.name}</h3>
              
              <div className="algo-items">
                {algoGroup.items.map((item, idx) => (
                  <div key={idx} className="algo-item">
                    <h4>{item.name}</h4>
                    
                    {item.complexity && (
                      <div className="algo-property">
                        <strong>Complexity:</strong> {item.complexity}
                      </div>
                    )}

                    {item.description && (
                      <div className="algo-property">
                        <strong>How it works:</strong> {item.description}
                      </div>
                    )}

                    {item.definition && (
                      <div className="algo-property">
                        <strong>Definition:</strong> {item.definition}
                      </div>
                    )}

                    {item.base && (
                      <div className="algo-property">
                        <strong>Critical:</strong> {item.base}
                      </div>
                    )}

                    {item.stack && (
                      <div className="algo-property">
                        <strong>Stack Impact:</strong> {item.stack}
                      </div>
                    )}

                    {item.examples && (
                      <div className="algo-property">
                        <strong>Examples:</strong> {item.examples}
                      </div>
                    )}

                    {item.pattern && (
                      <div className="algo-property">
                        <strong>Pattern:</strong> {item.pattern}
                      </div>
                    )}

                    {item.problems && (
                      <div className="algo-property">
                        <strong>Problems:</strong> {
                          Array.isArray(item.problems) 
                            ? item.problems.map((p, i) => <div key={i}>• {p}</div>)
                            : item.problems
                        }
                      </div>
                    )}

                    {item.stability && (
                      <div className="algo-property">
                        <strong>Stability:</strong> {item.stability}
                      </div>
                    )}

                    {item.when && (
                      <div className="algo-property">
                        <strong>When to use:</strong> {item.when}
                      </div>
                    )}

                    {item.code && (
                      <div className="algo-property">
                        <strong>Implementation:</strong> {item.code}
                      </div>
                    )}

                    {item.use && (
                      <div className="algo-property">
                        <strong>Best for:</strong> {item.use}
                      </div>
                    )}

                    {item.variants && (
                      <div className="algo-property">
                        <strong>Variants:</strong> {item.variants}
                      </div>
                    )}

                    {item.tradeoff && (
                      <div className="algo-property">
                        <strong>Trade-off:</strong> {item.tradeoff}
                      </div>
                    )}

                    {item.requirement && (
                      <div className="algo-property">
                        <strong>Requirement:</strong> {item.requirement}
                      </div>
                    )}

                    {item.benefit && (
                      <div className="algo-property">
                        <strong>Benefit:</strong> {item.benefit}
                      </div>
                    )}

                    {item.languages && (
                      <div className="algo-property">
                        <strong>Note:</strong> {item.languages}
                      </div>
                    )}

                    {item.implementation && (
                      <div className="algo-property">
                        <strong>Implementation approach:</strong> {item.implementation}
                      </div>
                    )}

                    {item.methods && (
                      <div className="algo-property">
                        <strong>Methods:</strong> {item.methods}
                      </div>
                    )}

                    {item.property1 && (
                      <div className="algo-property">
                        <strong>Key property 1:</strong> {item.property1}
                      </div>
                    )}

                    {item.property2 && (
                      <div className="algo-property">
                        <strong>Key property 2:</strong> {item.property2}
                      </div>
                    )}

                    {item.approach && (
                      <div className="algo-property">
                        <strong>Solution approach:</strong> {item.approach}
                      </div>
                    )}

                    {item.caution && (
                      <div className="algo-property algo-caution">
                        <strong>⚠️ Caution:</strong> {item.caution}
                      </div>
                    )}

                    {item.advantage && (
                      <div className="algo-property">
                        <strong>Advantage:</strong> {item.advantage}
                      </div>
                    )}

                    {item.time && (
                      <div className="algo-property">
                        <strong>Time improvement:</strong> {item.time}
                      </div>
                    )}

                    {item.proof && (
                      <div className="algo-property">
                        <strong>Proof needed:</strong> {item.proof}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============= SECTION 4: PROBLEM-SOLVING STRATEGIES =============
function Section4ProblemSolving({ expanded, onToggle, expandedSubtopic, toggleSubtopic }) {
  return (
    <div className="curriculum-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">🔍 Section 4: Problem-Solving Strategies</h2>
        <span className="section-chevron">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="section-content">
          <div className="strategy-framework">
            <h3>The DARE Framework: 6-Step Problem-Solving Process</h3>
            
            <div className="step-card">
              <h4>1️⃣ Decompose the Problem</h4>
              <p><strong>Objective:</strong> Break complex problem into manageable pieces</p>
              <ul>
                <li>Define inputs, outputs, constraints explicitly</li>
                <li>Identify what changes (variables) vs. what stays fixed</li>
                <li>Look for subproblems that repeat or build on each other</li>
                <li>Ask: "Is this similar to a problem I've solved before?"</li>
              </ul>
            </div>

            <div className="step-card">
              <h4>2️⃣ Analyze the Problem</h4>
              <p><strong>Objective:</strong> Determine appropriate data structures and algorithms</p>
              <ul>
                <li><strong>Problem type:</strong> Searching, sorting, optimization, counting, pathfinding?</li>
                <li><strong>Input characteristics:</strong> Sorted? Range-bounded? Contains duplicates?</li>
                <li><strong>Constraints matter:</strong> Size limits suggest time complexity ceiling</li>
                <li><strong>Output requirements:</strong> One answer or all answers? Specific format?</li>
              </ul>
              <div className="constraint-analysis">
                <p><strong>Constraint Analysis:</strong></p>
                <ul>
                  <li>n ≤ 10: Brute force O(n!), O(2ⁿ) acceptable</li>
                  <li>n ≤ 100: O(n³) acceptable</li>
                  <li>n ≤ 10,000: O(n²) acceptable</li>
                  <li>n ≤ 1,000,000: O(n log n) or O(n) required</li>
                  <li>n {'>'} 10,000,000: O(n) or O(log n) required</li>
                </ul>
              </div>
            </div>

            <div className="step-card">
              <h4>3️⃣ Research Applicable Patterns</h4>
              <p><strong>Objective:</strong> Match problem to known solution patterns</p>
              <ul>
                <li><strong>Two Pointers:</strong> Sorted array, find pairs/subsequence</li>
                <li><strong>Sliding Window:</strong> Contiguous subarray with constraint</li>
                <li><strong>Binary Search:</strong> Monotonic property, find position</li>
                <li><strong>Dynamic Programming:</strong> Overlapping subproblems visible</li>
                <li><strong>Greedy:</strong> Local optimal choice → global optimum</li>
                <li><strong>Backtracking:</strong> All solutions needed, constraints to satisfy</li>
                <li><strong>BFS/DFS:</strong> Graph/tree traversal, connectivity</li>
              </ul>
            </div>

            <div className="step-card">
              <h4>4️⃣ Establish Solution Strategy</h4>
              <p><strong>Objective:</strong> Plan before coding</p>
              <ul>
                <li><strong>Brute force first:</strong> Understand problem completely</li>
                <li><strong>Identify inefficiencies:</strong> What makes brute force slow?</li>
                <li><strong>Optimize:</strong> Use data structures/patterns to improve</li>
                <li><strong>Trade-offs:</strong> Time vs. space? Clarity vs. performance?</li>
                <li><strong>Pseudo-code:</strong> Write algorithm logic before actual code</li>
                <li><strong>Complexity analysis:</strong> Depth O(?), Time O(?), Space O(?)</li>
              </ul>
            </div>

            <div className="step-card">
              <h4>5️⃣ Execute & Test</h4>
              <p><strong>Objective:</strong> Implement correctly and verify</p>
              <ul>
                <li><strong>Code carefully:</strong> Use clear variable names, proper formatting</li>
                <li><strong>Handle edge cases:</strong> Empty input, single element, large values, negative numbers</li>
                <li><strong>Test systematically:</strong> Examples from problem, self-created edge cases</li>
                <li><strong>Debug methodically:</strong> Print intermediate values, trace through manually</li>
                <li><strong>Optimize if needed:</strong> After correctness, then performance</li>
              </ul>
            </div>

            <div className="step-card">
              <h4>6️⃣ Refine & Learn</h4>
              <p><strong>Objective:</strong> Extract lesson for future problems</p>
              <ul>
                <li><strong>Understand the pattern:</strong> Why this approach works</li>
                <li><strong>Identify bottlenecks:</strong> Where time/space was lost</li>
                <li><strong>Compare approaches:</strong> Why does solution A beat solution B?</li>
                <li><strong>Generalize:</strong> How does this pattern apply to other problems?</li>
                <li><strong>Document insights:</strong> Keep personal problem journal</li>
              </ul>
            </div>
          </div>

          <div className="problem-classification">
            <h3>Problem Classification Decision Tree</h3>
            <div className="tree-visual">
              <p><strong>Is the array/sequence sorted?</strong></p>
              <div className="tree-branch">
                <p>→ Yes: Try binary search, two pointers, sliding window</p>
              </div>
              <div className="tree-branch">
                <p>→ No: Consider hash map, sorting, or traversal</p>
              </div>

              <p><strong>Is this about finding extremes (min/max/kth)?</strong></p>
              <div className="tree-branch">
                <p>→ Yes: Heap, sorting, or selection algorithm</p>
              </div>

              <p><strong>Does the problem involve multiple choices?</strong></p>
              <div className="tree-branch">
                <p>→ All solutions: Backtracking, DFS combinations</p>
              </div>
              <div className="tree-branch">
                <p>→ Optimal one: Greedy, DP, or optimization</p>
              </div>

              <p><strong>Is this about relationships/connectivity?</strong></p>
              <div className="tree-branch">
                <p>→ Yes: Graph algorithm (DFS, BFS, topological sort)</p>
              </div>

              <p><strong>Does it involve overlapping subproblems?</strong></p>
              <div className="tree-branch">
                <p>→ Yes: Dynamic programming (memoization or DP table)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============= SECTION 5: PRACTICAL APPLICATION =============
function Section5Practical({ expanded, onToggle, expandedSubtopic, toggleSubtopic }) {
  return (
    <div className="curriculum-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">💻 Section 5: Practical Application & Resources</h2>
        <span className="section-chevron">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="section-content">
          <div className="practical-section">
            <h3>Programming Languages for DSA</h3>
            <div className="lang-recommendations">
              <div className="lang-card">
                <h4>Python 🐍</h4>
                <p><strong>Pros:</strong> Clean syntax, rapid prototyping, rich standard library</p>
                <p><strong>Best for:</strong> Learning DSA concepts, coding interviews</p>
                <p><strong>Cons:</strong> Slower execution, less suitable for systems programming</p>
              </div>
              <div className="lang-card">
                <h4>Java ☕</h4>
                <p><strong>Pros:</strong> Strong typing, excellent libraries (Collections), industry standard</p>
                <p><strong>Best for:</strong> FAANG interviews, enterprise knowledge</p>
                <p><strong>Cons:</strong> Verbose syntax, more boilerplate required</p>
              </div>
              <div className="lang-card">
                <h4>C++ ⚡</h4>
                <p><strong>Pros:</strong> Fastest execution, fine-grained control, competitive programming</p>
                <p><strong>Best for:</strong> Performance-critical applications, competitive programming</p>
                <p><strong>Cons:</strong> Steep learning curve, memory management required</p>
              </div>
              <div className="lang-card">
                <h4>JavaScript 📱</h4>
                <p><strong>Pros:</strong> Web development integration, Node.js for server-side</p>
                <p><strong>Best for:</strong> Full-stack engineers, interview prep if JS-focused</p>
                <p><strong>Cons:</strong> Dynamic typing can hide errors, slower than compiled languages</p>
              </div>
            </div>
          </div>

          <div className="practical-section">
            <h3>Online Coding Platforms</h3>
            <div className="platform-grid">
              <div className="platform-card">
                <h4>LeetCode</h4>
                <p><em>Most comprehensive interview prep</em></p>
                <ul>
                  <li>2000+ problems categorized by difficulty & topic</li>
                  <li>Company-specific problem filters</li>
                  <li>Editorial solutions & community discussions</li>
                  <li>Premium: Timed contests, interview simulations</li>
                </ul>
              </div>
              <div className="platform-card">
                <h4>HackerRank</h4>
                <p><em>Gamified learning with progression</em></p>
                <ul>
                  <li>Tutorials alongside problems</li>
                  <li>Coding challenges with immediate feedback</li>
                  <li>Domains organize topics logically</li>
                  <li>Good for beginners getting started</li>
                </ul>
              </div>
              <div className="platform-card">
                <h4>CodeSignal</h4>
                <p><em>Used by 1000+ companies for hiring</em></p>
                <ul>
                  <li>Real company interviews</li>
                  <li>Autocomplete suggestions reduce syntax struggle</li>
                  <li>Skill ratings and certifications</li>
                  <li>Interview practice with timing</li>
                </ul>
              </div>
              <div className="platform-card">
                <h4>Pramp</h4>
                <p><em>Live peer-to-peer mock interviews</em></p>
                <ul>
                  <li>Real human interviewer (free)</li>
                  <li>Practice communication skills</li>
                  <li>Get feedback on thinking process</li>
                  <li>Company-specific interview formats</li>
                </ul>
              </div>
              <div className="platform-card">
                <h4>Codeforces</h4>
                <p><em>Competitive programming focus</em></p>
                <ul>
                  <li>Weekly contests with rankings</li>
                  <li>Advanced algorithm problems</li>
                  <li>Community of competitive programmers</li>
                  <li>Problem archive with editorial</li>
                </ul>
              </div>
              <div className="platform-card">
                <h4>InterviewBit</h4>
                <p><em>Interview-focused curriculum</em></p>
                <ul>
                  <li>Problems grouped by pattern</li>
                  <li>Curated learning path</li>
                  <li>Bonus system for consistency</li>
                  <li>Company interview questions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="practical-section">
            <h3>Study Approach & Practice Regimen</h3>
            <div className="regimen-box">
              <h4>Daily Practice Routine (4 weeks minimum)</h4>
              <ol>
                <li><strong>Warm-up (10 min):</strong> Review solved problem from previous day</li>
                <li><strong>Learn (15 min):</strong> Read pattern explanation or algorithm</li>
                <li><strong>Solve Easy (20 min):</strong> Template problem exemplifying pattern</li>
                <li><strong>Solve Medium (40 min):</strong> New problem applying pattern</li>
                <li><strong>Optimize (15 min):</strong> Review solution, identify improvements</li>
                <li><strong>Reflect (10 min):</strong> Document lessons learned</li>
              </ol>
              <p><strong>Total: 110 minutes/day</strong></p>
            </div>

            <div className="regimen-box">
              <h4>Weekly Targets</h4>
              <ul>
                <li><strong>Easy:</strong> 5-7 problems (validation & speed building)</li>
                <li><strong>Medium:</strong> 10-15 problems (deep pattern learning)</li>
                <li><strong>Hard:</strong> 2-3 problems (exposure to advanced concepts)</li>
                <li><strong>Mock Interviews:</strong> 1 full mock (70-90 minutes)</li>
                <li><strong>Review/Reflection:</strong> 2 hours analyzing mistakes</li>
              </ul>
            </div>

            <div className="regimen-box">
              <h4>The Spaced Repetition System</h4>
              <p>Maximize retention by revisiting problems at intervals:</p>
              <ul>
                <li><strong>Day 0:</strong> Solve problem first time</li>
                <li><strong>Day 1:</strong> Revisit without looking at solution</li>
                <li><strong>Day 3:</strong> Solve similar pattern problem</li>
                <li><strong>Day 7:</strong> Re-solve original from scratch</li>
                <li><strong>Day 14:</strong> Final review of variations</li>
              </ul>
            </div>
          </div>

          <div className="practical-section">
            <h3>Environment Setup</h3>
            <p className="setup-intro"><strong>Essential tools for efficient DSA practice:</strong></p>
            
            <div className="setup-checklist">
              <div className="setup-item">
                <h4>Local Development Environment</h4>
                <ul>
                  <li>IDE/Editor: VSCode, IntelliJ, PyCharm</li>
                  <li>Compiler/Interpreter: Python 3.9+, Node.js 16+, Java 11+</li>
                  <li>Version control: Git for tracking solutions</li>
                </ul>
              </div>

              <div className="setup-item">
                <h4>Productivity Tools</h4>
                <ul>
                  <li><strong>Anki:</strong> Spaced repetition flashcards for algorithms</li>
                  <li><strong>Notion/Obsidian:</strong> Personal knowledge base for patterns</li>
                  <li><strong>Spreadsheet:</strong> Track problems solved (Easy/Medium/Hard)</li>
                  <li><strong>Timer:</strong> Practice under time pressure (25 min for medium)</li>
                </ul>
              </div>

              <div className="setup-item">
                <h4>Reference Resources</h4>
                <ul>
                  <li>Algorithm visualization: <em>VisuAlgo.net</em></li>
                  <li>Big O reference: <em>bigocheatsheet.com</em></li>
                  <li>Pattern documentation: Personal wiki/notes</li>
                  <li>Interview tips: <em>LeetCode Discuss</em> & <em>GitHub repos</em></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============= SECTION 6: ASSESSMENT & PROGRESSION =============
function Section6Assessment({ expanded, onToggle, expandedSubtopic, toggleSubtopic }) {
  return (
    <div className="curriculum-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">📊 Section 6: Assessment & Progression Framework</h2>
        <span className="section-chevron">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="section-content">
          <div className="assessment-framework">
            <h3>Competency Levels</h3>
            
            <div className="level-card level-novice">
              <h4>🟢 Level 1: Novice (Weeks 1-3)</h4>
              <p><strong>Focus:</strong> Fundamentals & basic data structures</p>
              <ul>
                <li>✓ Understand Big O analysis and complexity</li>
                <li>✓ Implement arrays, linked lists, basic operations</li>
                <li>✓ Solve 30+ easy problems</li>
                <li>✓ Recognize basic patterns (linear search, simple sorting)</li>
              </ul>
              <p><strong>Assessment:</strong> Can you implement and explain basic data structures?</p>
            </div>

            <div className="level-card level-beginner">
              <h4>🟡 Level 2: Beginner (Weeks 4-8)</h4>
              <p><strong>Focus:</strong> Intermediate patterns & core algorithms</p>
              <ul>
                <li>✓ Master 5-6 core patterns (two pointers, sliding window, binary search)</li>
                <li>✓ Solve 80+ medium problems</li>
                <li>✓ Understand recursion and basic DP</li>
                <li>✓ Implement trees and graphs</li>
              </ul>
              <p><strong>Assessment:</strong> Can you identify patterns in new problems?</p>
            </div>

            <div className="level-card level-intermediate">
              <h4>🔵 Level 3: Intermediate (Weeks 9-12)</h4>
              <p><strong>Focus:</strong> Advanced patterns & optimization</p>
              <ul>
                <li>✓ Master 12+ patterns confidently</li>
                <li>✓ Solve 150+ problems across difficulties</li>
                <li>✓ Implement DP solutions (memoization & tabulation)</li>
                <li>✓ Solve graph problems (DFS, BFS, shortest path)</li>
                <li>✓ Complete 3+ mock interviews</li>
              </ul>
              <p><strong>Assessment:</strong> Can you solve medium problems in 30 minutes?</p>
            </div>

            <div className="level-card level-advanced">
              <h4>🟣 Level 4: Advanced (Weeks 13-16)</h4>
              <p><strong>Focus:</strong> Complex problems & company-specific patterns</p>
              <ul>
                <li>✓ Solve 250+ total problems</li>
                <li>✓ Tackle hard problems confidently</li>
                <li>✓ Apply multiple patterns to single problem</li>
                <li>✓ Optimize for both time and space</li>
                <li>✓ Complete 8+ mock interviews</li>
              </ul>
              <p><strong>Assessment:</strong> Can you solve hard problems with clear communication?</p>
            </div>

            <div className="level-card level-expert">
              <h4>⭐ Level 5: Expert (Ongoing)</h4>
              <p><strong>Focus:</strong> Mastery & mentoring</p>
              <ul>
                <li>✓ Solve problems blind in under 20 minutes</li>
                <li>✓ Ace live interviews consistently</li>
                <li>✓ Mentor others on patterns & approaches</li>
                <li>✓ Contribute to open-source algorithms libraries</li>
              </ul>
              <p><strong>Assessment:</strong> Can you teach others the approaches?</p>
            </div>
          </div>

          <div className="progression-roadmap">
            <h3>16-Week Progressive Roadmap</h3>
            
            <div className="week-milestone">
              <h4>Weeks 1-2: Foundations & Core Structures</h4>
              <ul>
                <li>Big O analysis (memorize chart)</li>
                <li>Array operations & manipulation</li>
                <li>Linked list basics</li>
                <li>Stack & Queue implementation</li>
                <li><strong>Problems:</strong> 20-30 easy, all basic</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 3-4: Pattern Recognition Begins</h4>
              <ul>
                <li>Two pointers technique</li>
                <li>Sliding window pattern</li>
                <li>Basic hash map problems</li>
                <li><strong>Problems:</strong> 40-50 easy to medium mixed</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 5-6: Tree & Recursion Focus</h4>
              <ul>
                <li>Binary tree traversals (DFS variations)</li>
                <li>Recursion fundamentals</li>
                <li>Backtracking basics</li>
                <li>Binary search trees</li>
                <li><strong>Problems:</strong> 50-60 medium tree/recursion problems</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 7-8: Graphs & Advanced Trees</h4>
              <ul>
                <li>Graph representations</li>
                <li>BFS and DFS traversals</li>
                <li>Connected components</li>
                <li>Heaps and priority queues</li>
                <li><strong>Problems:</strong> 60-70 medium graph problems</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 9-10: Dynamic Programming Introduction</h4>
              <ul>
                <li>Identify DP problems (overlapping subproblems)</li>
                <li>Memoization approach (top-down)</li>
                <li>Tabulation approach (bottom-up)</li>
                <li>1D and 2D DP problems</li>
                <li><strong>Problems:</strong> 50-60 medium DP problems</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 11-12: Advanced Patterns & Topics</h4>
              <ul>
                <li>Topological sort</li>
                <li>Trie data structure</li>
                <li>Greedy algorithms</li>
                <li>String matching</li>
                <li><strong>Problems:</strong> 80-100 medium-hard mixed</li>
                <li><strong>Mock Interview:</strong> 2 full sessions</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 13-14: Hard Problems & Optimization</h4>
              <ul>
                <li>Combine multiple patterns</li>
                <li>Optimize time & space trade-offs</li>
                <li>Company-specific problem drilling</li>
                <li><strong>Problems:</strong> 40-50 hard problems from target companies</li>
                <li><strong>Mock Interviews:</strong> 3-4 sessions focused on communication</li>
              </ul>
            </div>

            <div className="week-milestone">
              <h4>Weeks 15-16: Mock Interviews & Refinement</h4>
              <ul>
                <li>Full-length mock interviews (2-3 per week)</li>
                <li>Problem review from weak areas</li>
                <li>System design fundamentals (15-20 min portion)</li>
                <li>Practice stress management</li>
                <li><strong>Mock Interviews:</strong> 6+ sessions</li>
                <li><strong>Review:</strong> All mistakes from previous weeks</li>
              </ul>
            </div>
          </div>

          <div className="success-metrics">
            <h3>Success Metrics & Self-Assessment</h3>
            
            <div className="metric-group">
              <h4>✅ Knowledge Metrics</h4>
              <ul>
                <li>Can name Big O for common algorithms from memory</li>
                <li>Can explain time/space trade-offs</li>
                <li>Can identify pattern within 2 minutes of reading problem</li>
                <li>Can explain why a data structure works for a problem</li>
              </ul>
            </div>

            <div className="metric-group">
              <h4>✅ Performance Metrics</h4>
              <ul>
                <li><strong>Easy:</strong> Solve 100% in {'<'} 15 minutes</li>
                <li><strong>Medium:</strong> Solve 80%+ in {'<'} 35 minutes</li>
                <li><strong>Hard:</strong> Solve 50%+ in {'<'} 50 minutes</li>
                <li><strong>Accuracy:</strong> First submission accepted rate {'>'} 70%</li>
              </ul>
            </div>

            <div className="metric-group">
              <h4>✅ Interview Readiness Metrics</h4>
              <ul>
                <li>Can articulate approach before coding</li>
                <li>Write clean, readable code first time</li>
                <li>Explain solution clearly to interviewer</li>
                <li>Handle interview pressure and think on feet</li>
                <li>Score 6+/10 on mock interviews</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
