/*
 * DSA Mastery Module: src/components/31-DSAMastery.js
 *
 * Comprehensive Data Structures & Algorithms Learning Path
 *
 * Purpose:
 * This module provides a complete roadmap for mastering DSA and cracking
 * FAANG-level technical interviews. It covers everything from foundational
 * concepts to advanced patterns, with practical strategies for success.
 *
 * Key Topics Covered:
 * 1. Preparation Roadmap - Step-by-step progression
 * 2. Core Data Structures - Arrays, Linked Lists, Trees, Graphs, etc.
 * 3. Algorithmic Paradigms - Recursion, DP, Greedy, etc.
 * 4. Problem Patterns - Sliding Window, Two Pointers, etc.
 * 5. Question Identification - How to decode any problem
 * 6. Practice Strategy - Structured approach to solving problems
 * 7. Interview Readiness - Final preparation and tactics
 */

import React, { useState } from 'react';
import '../styles/DSAMastery.css';

export default function DSAMastery() {
  const [expandedPhase, setExpandedPhase] = useState('phase0');
  const [expandedDS, setExpandedDS] = useState(null);
  const [expandedAlgo, setExpandedAlgo] = useState(null);
  const [expandedPattern, setExpandedPattern] = useState(null);

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const toggleDS = (dsId) => {
    setExpandedDS(expandedDS === dsId ? null : dsId);
  };

  const toggleAlgo = (algoId) => {
    setExpandedAlgo(expandedAlgo === algoId ? null : algoId);
  };

  const togglePattern = (patternId) => {
    setExpandedPattern(expandedPattern === patternId ? null : patternId);
  };

  return (
    <div className="dsa-mastery">
      <div className="dsa-hero">
        <h1>🚀 DSA Mastery: From Zero to FAANG-Ready</h1>
        <p>A structured, battle-tested path covering every layer of DSA expertise needed to crack top-tier technical interviews.</p>
        <div className="dsa-stats">
          <div className="stat-box">
            <div className="stat-number">16 Weeks</div>
            <div className="stat-label">Preparation Timeline</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">450+</div>
            <div className="stat-label">Curated Problems</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">18</div>
            <div className="stat-label">Core Patterns</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">7</div>
            <div className="stat-label">Major Topics</div>
          </div>
        </div>
      </div>

      {/* ============= SECTION 1: PREPARATION ROADMAP ============= */}
      <div className="dsa-section">
        <h2 className="section-title">📋 Preparation Roadmap</h2>
        <p className="section-subtitle">A 16-week structured progression from foundations to FAANG-level mastery</p>

        <div className="phase-container">
          <PhaseCard
            id="phase0"
            title="Phase 1: Foundations (Weeks 1-2)"
            duration="2 weeks"
            topics={['Arrays basics', 'Strings manipulation', 'Big-O notation', 'Time/Space complexity']}
            focus="Understanding core computational thinking and analyzing algorithm efficiency"
            isExpanded={expandedPhase === 'phase0'}
            onToggle={() => togglePhase('phase0')}
          />

          <PhaseCard
            id="phase1"
            title="Phase 2: Core Data Structures (Weeks 3-4)"
            duration="2 weeks"
            topics={['Linked Lists', 'Stacks & Queues', 'Hash Tables', 'Basic Trees']}
            focus="Master fundamental data structures and their implementations"
            isExpanded={expandedPhase === 'phase1'}
            onToggle={() => togglePhase('phase1')}
          />

          <PhaseCard
            id="phase2"
            title="Phase 3: Recursion & Backtracking (Weeks 5-6)"
            duration="2 weeks"
            topics={['Recursion patterns', 'Backtracking paradigm', 'Subset/combination problems', 'Permutations']}
            focus="Master recursive thinking and explore solution spaces efficiently"
            isExpanded={expandedPhase === 'phase2'}
            onToggle={() => togglePhase('phase2')}
          />

          <PhaseCard
            id="phase3"
            title="Phase 4: Advanced Trees & Graphs (Weeks 7-8)"
            duration="2 weeks"
            topics={['Binary Trees (traversals, properties)', 'Binary Search Trees', 'Graph basics (adjacency lists)', 'BFS/DFS']}
            focus="Navigate complex tree and graph structures with confidence"
            isExpanded={expandedPhase === 'phase3'}
            onToggle={() => togglePhase('phase3')}
          />

          <PhaseCard
            id="phase4"
            title="Phase 5: Dynamic Programming (Weeks 9-10)"
            duration="2 weeks"
            topics={['DP fundamentals (memoization vs tabulation)', '0/1 Knapsack variants', 'Longest subsequence problems', 'Path counting']}
            focus="Learn to optimize overlapping subproblems and exponential searches"
            isExpanded={expandedPhase === 'phase4'}
            onToggle={() => togglePhase('phase4')}
          />

          <PhaseCard
            id="phase5"
            title="Phase 6: Advanced Algorithms (Weeks 11-13)"
            duration="3 weeks"
            topics={['Greedy algorithms', 'Topological sort', 'Heaps & priority queues', 'Segment Trees (optional)', 'Tries']}
            focus="Solve complex optimization and graph problems with specialized techniques"
            isExpanded={expandedPhase === 'phase5'}
            onToggle={() => togglePhase('phase5')}
          />

          <PhaseCard
            id="phase6"
            title="Phase 7: Mock Interviews & Refinement (Weeks 14-16)"
            duration="3 weeks"
            topics={['Full mock interviews (2-3 per week)', 'Problem pattern review', 'Weak area drilling', 'System design fundamentals']}
            focus="Simulate real interview conditions and build confidence"
            isExpanded={expandedPhase === 'phase6'}
            onToggle={() => togglePhase('phase6')}
          />
        </div>
      </div>

      {/* ============= SECTION 2: CORE DATA STRUCTURES ============= */}
      <div className="dsa-section">
        <h2 className="section-title">🏗️ Core Data Structures</h2>
        <p className="section-subtitle">Essential structures for solving interview problems efficiently</p>

        <div className="ds-grid">
          <DataStructureCard
            id="ds1"
            name="Arrays & Strings"
            complexity="Space: O(n)"
            description="Contiguous memory storage. Fastest random access but costly insertions/deletions."
            useCases="Searching, sorting, sliding window, prefix sums, dynamic programming"
            isExpanded={expandedDS === 'ds1'}
            onToggle={() => toggleDS('ds1')}
          />

          <DataStructureCard
            id="ds2"
            name="Linked Lists"
            complexity="Space: O(n)"
            description="Sequential nodes connected by pointers. Efficient insertions/deletions but slow random access."
            useCases="LRU cache, cycle detection, reversal problems, merging lists"
            isExpanded={expandedDS === 'ds2'}
            onToggle={() => toggleDS('ds2')}
          />

          <DataStructureCard
            id="ds3"
            name="Stacks"
            complexity="Space: O(n)"
            description="Last-In-First-Out (LIFO) structure. Push and pop in O(1)."
            useCases="Parenthesis matching, expression evaluation, undo operations, DFS"
            isExpanded={expandedDS === 'ds3'}
            onToggle={() => toggleDS('ds3')}
          />

          <DataStructureCard
            id="ds4"
            name="Queues"
            complexity="Space: O(n)"
            description="First-In-First-Out (FIFO) structure. Enqueue and dequeue in O(1)."
            useCases="BFS, task scheduling, sliding window maximum, level-order traversal"
            isExpanded={expandedDS === 'ds4'}
            onToggle={() => toggleDS('ds4')}
          />

          <DataStructureCard
            id="ds5"
            name="Hash Tables / Hash Maps"
            complexity="Space: O(n)"
            description="Key-value pairs with O(1) average lookup. Collisions handled by chaining or open addressing."
            useCases="Frequency counting, caching, duplicate detection, anagram grouping"
            isExpanded={expandedDS === 'ds5'}
            onToggle={() => toggleDS('ds5')}
          />

          <DataStructureCard
            id="ds6"
            name="Binary Trees"
            complexity="Space: O(n)"
            description="Hierarchical structure with at most 2 children per node. Root at top, leaves at bottom."
            useCases="Expression trees, file systems, AVL/Red-Black trees, segment trees"
            isExpanded={expandedDS === 'ds6'}
            onToggle={() => toggleDS('ds6')}
          />

          <DataStructureCard
            id="ds7"
            name="Binary Search Trees (BSTs)"
            complexity="Space: O(n)"
            description="Binary tree where left child < parent < right child. Enables efficient searching."
            useCases="Balanced search, closest element, kth largest, in-order traversal for sorted output"
            isExpanded={expandedDS === 'ds7'}
            onToggle={() => toggleDS('ds7')}
          />

          <DataStructureCard
            id="ds8"
            name="Heaps (Priority Queues)"
            complexity="Space: O(n)"
            description="Complete binary tree satisfying heap property. Min-heap or max-heap."
            useCases="K largest elements, merge sorted lists, Dijkstra's algorithm, median finding"
            isExpanded={expandedDS === 'ds8'}
            onToggle={() => toggleDS('ds8')}
          />

          <DataStructureCard
            id="ds9"
            name="Graphs"
            complexity="Space: O(V + E)"
            description="Nodes (vertices) connected by edges. Directed or undirected, weighted or unweighted."
            useCases="Network paths, social networks, dependency resolution, bipartite checking"
            isExpanded={expandedDS === 'ds9'}
            onToggle={() => toggleDS('ds9')}
          />

          <DataStructureCard
            id="ds10"
            name="Tries (Prefix Trees)"
            complexity="Space: O(alphabet_size × n)"
            description="Tree for storing strings with shared prefixes. O(m) search where m = string length."
            useCases="Autocomplete, word search, spell checking, IP routing"
            isExpanded={expandedDS === 'ds10'}
            onToggle={() => toggleDS('ds10')}
          />

          <DataStructureCard
            id="ds11"
            name="Union-Find (Disjoint Set)"
            complexity="Space: O(n)"
            description="Efficient tracking of connected components. Path compression and union by rank optimize operations."
            useCases="Detecting cycles in undirected graphs, finding connected components, Kruskal's algorithm"
            isExpanded={expandedDS === 'ds11'}
            onToggle={() => toggleDS('ds11')}
          />

          <DataStructureCard
            id="ds12"
            name="Segment Trees"
            complexity="Space: O(n)"
            description="Binary tree for efficiently querying and updating ranges. O(log n) for both operations."
            useCases="Range sum queries, range updates, count of elements in range, maximum in subarray"
            isExpanded={expandedDS === 'ds12'}
            onToggle={() => toggleDS('ds12')}
          />
        </div>
      </div>

      {/* ============= SECTION 3: ALGORITHMIC PARADIGMS ============= */}
      <div className="dsa-section">
        <h2 className="section-title">⚙️ Algorithmic Paradigms</h2>
        <p className="section-subtitle">Core problem-solving techniques used across FAANG interviews</p>

        <div className="algo-container">
          <AlgorithmCard
            id="algo1"
            name="Recursion & Backtracking"
            complexity="Time: Problem-dependent"
            description="Breaking problems into smaller subproblems. Backtracking explores all possibilities with pruning."
            examples="N-Queens, letter combinations, word search, subset generation"
            isExpanded={expandedAlgo === 'algo1'}
            onToggle={() => toggleAlgo('algo1')}
          />

          <AlgorithmCard
            id="algo2"
            name="Dynamic Programming"
            complexity="Time: Varies by state space"
            description="Optimizing recursive solutions by storing computed subproblems. Two approaches: memoization (top-down) or tabulation (bottom-up)."
            examples="Fibonacci, longest common subsequence, coin change, edit distance"
            isExpanded={expandedAlgo === 'algo2'}
            onToggle={() => toggleAlgo('algo2')}
          />

          <AlgorithmCard
            id="algo3"
            name="Divide and Conquer"
            complexity="Time: Usually O(n log n)"
            description="Breaking problem into independent subproblems, solving each, then combining results."
            examples="Merge sort, quick sort, binary search, inversion count"
            isExpanded={expandedAlgo === 'algo3'}
            onToggle={() => toggleAlgo('algo3')}
          />

          <AlgorithmCard
            id="algo4"
            name="Greedy Algorithms"
            complexity="Time: Usually O(n log n) or O(n)"
            description="Making locally optimal choices at each step, hoping for a global optimum. Requires proof of correctness."
            examples="Activity selection, huffman coding, fractional knapsack, interval scheduling"
            isExpanded={expandedAlgo === 'algo4'}
            onToggle={() => toggleAlgo('algo4')}
          />

          <AlgorithmCard
            id="algo5"
            name="Graph Traversal (BFS/DFS)"
            complexity="Time: O(V + E)"
            description="BFS explores level-by-level (queue). DFS explores depth-first (stack). Both find all reachable nodes."
            examples="Connected components, bipartite checking, topological sort, shortest path in unweighted graphs"
            isExpanded={expandedAlgo === 'algo5'}
            onToggle={() => toggleAlgo('algo5')}
          />

          <AlgorithmCard
            id="algo6"
            name="Binary Search"
            complexity="Time: O(log n)"
            description="Efficient searching in sorted arrays. Eliminates half the search space each iteration."
            examples="Search insert position, first/last occurrence, rotated sorted array, peak element"
            isExpanded={expandedAlgo === 'algo6'}
            onToggle={() => toggleAlgo('algo6')}
          />

          <AlgorithmCard
            id="algo7"
            name="Sorting Algorithms"
            complexity="Time: O(n²) to O(n log n)"
            description="Ordering elements by a key. Understand merge sort, quick sort, and heap sort for interviews."
            examples="Sorting arrays, custom comparators, merge K sorted lists, find median in sorted arrays"
            isExpanded={expandedAlgo === 'algo7'}
            onToggle={() => toggleAlgo('algo7')}
          />

          <AlgorithmCard
            id="algo8"
            name="Shortest Path Algorithms"
            complexity="Time: O(E log V) to O(VE)"
            description="Finding shortest path in weighted graphs. Dijkstra (non-negative weights) or Bellman-Ford (any weights)."
            examples="Network routing, GPS navigation, game pathfinding, transfer minimum cost"
            isExpanded={expandedAlgo === 'algo8'}
            onToggle={() => toggleAlgo('algo8')}
          />
        </div>
      </div>

      {/* ============= SECTION 4: PROBLEM PATTERNS ============= */}
      <div className="dsa-section">
        <h2 className="section-title">🎯 Problem Patterns (18 Core Patterns)</h2>
        <p className="section-subtitle">Recognize these patterns to solve problems 10x faster</p>

        <div className="pattern-container">
          <PatternCard
            id="pat1"
            name="Sliding Window"
            trigger="Contiguous subarray/substring with constraint"
            description="Maintain a dynamic window with two pointers to solve subarray problems in O(n) time."
            examples="Max subarray sum, longest substring without repeating, minimum window substring"
            isExpanded={expandedPattern === 'pat1'}
            onToggle={() => togglePattern('pat1')}
          />

          <PatternCard
            id="pat2"
            name="Two Pointers"
            trigger="Sorted array or linked list, find pairs or reverse"
            description="Use two pointers (start/end or slow/fast) to efficiently traverse or find combinations."
            examples="2Sum, 3Sum, trap water, container with most water, merge sorted arrays"
            isExpanded={expandedPattern === 'pat2'}
            onToggle={() => togglePattern('pat2')}
          />

          <PatternCard
            id="pat3"
            name="Fast & Slow Pointers"
            trigger="Linked list cycle, middle element, or kth element"
            description="Slow pointer moves 1 step, fast pointer moves 2 steps. Detects cycles and finds midpoints."
            examples="Detect cycle in linked list, find middle node, start of cycle, duplicate number"
            isExpanded={expandedPattern === 'pat3'}
            onToggle={() => togglePattern('pat3')}
          />

          <PatternCard
            id="pat4"
            name="Merge Intervals"
            trigger="Overlapping intervals, merging, or scheduling"
            description="Sort intervals and merge overlapping ones. Handles insertion and conflict detection."
            examples="Merge overlapping intervals, insert interval, meeting rooms, employee free time"
            isExpanded={expandedPattern === 'pat4'}
            onToggle={() => togglePattern('pat4')}
          />

          <PatternCard
            id="pat5"
            name="Cyclic Sort"
            trigger="Array with range [1, n], find missing/duplicate"
            description="Place each number in its correct position. Finds missing/duplicate in O(1) space."
            examples="Missing number, duplicate number, find all missing numbers, first missing positive"
            isExpanded={expandedPattern === 'pat5'}
            onToggle={() => togglePattern('pat5')}
          />

          <PatternCard
            id="pat6"
            name="Subset / Combination / Permutation"
            trigger="Generate all combinations or subsets"
            description="Use recursion/backtracking to explore all possibilities. Handle duplicates carefully."
            examples="All subsets, permutations, combinations, letter case permutation, word ladder"
            isExpanded={expandedPattern === 'pat6'}
            onToggle={() => togglePattern('pat6')}
          />

          <PatternCard
            id="pat7"
            name="BFS (Shortest Path)"
            trigger="Grid/graph with shortest unweighted path"
            description="Level-order traversal using a queue. Guarantees shortest path in unweighted graphs."
            examples="Number of islands, walls and gates, word ladder, knight shortest path"
            isExpanded={expandedPattern === 'pat7'}
            onToggle={() => togglePattern('pat7')}
          />

          <PatternCard
            id="pat8"
            name="DFS / Backtracking"
            trigger="Pathfinding, constraint satisfaction, or exhaustive search"
            description="Recursive exploration of all branches. Useful for finding all paths or validating constraints."
            examples="Number of islands, clone graph, path sum, all paths, N-Queens, Sudoku solver"
            isExpanded={expandedPattern === 'pat8'}
            onToggle={() => togglePattern('pat8')}
          />

          <PatternCard
            id="pat9"
            name="Dynamic Programming (1D)"
            trigger="Maximize/minimize over linear sequence"
            description="Build up solution using previously computed values (1D state)."
            examples="House robber, climb stairs, longest increasing subsequence, jump game"
            isExpanded={expandedPattern === 'pat9'}
            onToggle={() => togglePattern('pat9')}
          />

          <PatternCard
            id="pat10"
            name="Dynamic Programming (2D)"
            trigger="Grid-based optimization or two-string comparison"
            description="2D state for grid problems or DP on two strings (edit distance, LCS)."
            examples="Unique paths, min path sum, edit distance, longest common subsequence"
            isExpanded={expandedPattern === 'pat10'}
            onToggle={() => togglePattern('pat10')}
          />

          <PatternCard
            id="pat11"
            name="Topological Sort"
            trigger="Dependency order, DAG, or detecting cycles"
            description="Order nodes respecting dependencies. Detects cycles in directed graphs."
            examples="Course schedule, alien dictionary, build order, task precedence"
            isExpanded={expandedPattern === 'pat11'}
            onToggle={() => togglePattern('pat11')}
          />

          <PatternCard
            id="pat12"
            name="Union-Find / DSU"
            trigger="Connected components, cycle detection, or grouping"
            description="Efficiently track and merge groups. Detects cycles in undirected graphs."
            examples="Number of islands, redundant connection, friend circles, accounts merge"
            isExpanded={expandedPattern === 'pat12'}
            onToggle={() => togglePattern('pat12')}
          />

          <PatternCard
            id="pat13"
            name="Greedy (Activity Selection)"
            trigger="Non-overlapping intervals or selecting maximum non-conflicting items"
            description="Sort by end time (or deadline) and greedily pick earliest-ending item."
            examples="Meeting rooms, interval scheduling, weighted job scheduling"
            isExpanded={expandedPattern === 'pat13'}
            onToggle={() => togglePattern('pat13')}
          />

          <PatternCard
            id="pat14"
            name="Binary Search"
            trigger="Sorted array or monotonic condition"
            description="Eliminate half the search space each iteration. O(log n) efficiency."
            examples="Search target, first/last position, rotated sorted array, peak element"
            isExpanded={expandedPattern === 'pat14'}
            onToggle={() => togglePattern('pat14')}
          />

          <PatternCard
            id="pat15"
            name="Heap / Priority Queue"
            trigger="K largest/smallest, median, or merge streams"
            description="Use min/max heap to efficiently extract extremes. Maintains partial order."
            examples="K closest points, merge K sorted lists, median stream, reorganize string"
            isExpanded={expandedPattern === 'pat15'}
            onToggle={() => togglePattern('pat15')}
          />

          <PatternCard
            id="pat16"
            name="Trie (Prefix Tree)"
            trigger="Word search, dictionary, or prefix problems"
            description="Tree structure for efficient string operations. O(m) search where m = string length."
            examples="Autocomplete, word search II, longest word, unique substrings"
            isExpanded={expandedPattern === 'pat16'}
            onToggle={() => togglePattern('pat16')}
          />

          <PatternCard
            id="pat17"
            name="String Matching"
            trigger="Finding patterns in strings"
            description="Efficient string search using KMP, Rabin-Karp, or Z-algorithm."
            examples="Nearest repeated word, stream of characters, find all anagrams"
            isExpanded={expandedPattern === 'pat17'}
            onToggle={() => togglePattern('pat17')}
          />

          <PatternCard
            id="pat18"
            name="Bit Manipulation"
            trigger="Single number, subset generation, or counting"
            description="Use bitwise operations for compact representation and fast computation."
            examples="Single number variants, XOR tricks, hamming distance, power of two"
            isExpanded={expandedPattern === 'pat18'}
            onToggle={() => togglePattern('pat18')}
          />
        </div>
      </div>

      {/* ============= SECTION 5: QUESTION IDENTIFICATION ============= */}
      <div className="dsa-section">
        <h2 className="section-title">🔍 Question Identification Strategy</h2>
        <p className="section-subtitle">Decode any problem into the right data structure and pattern in 2-3 minutes</p>

        <div className="identification-steps">
          <IdentificationStep
            num="1"
            title="Understand the Problem"
            description="Restate the problem in your own words. Ask clarifying questions about constraints, input range, and edge cases before writing any code."
            keywords={['Constraints', 'Input format', 'Output format', 'Edge cases']}
          />

          <IdentificationStep
            num="2"
            title="Identify Problem Type"
            description="Determine if this is a searching, sorting, counting, path-finding, or optimization problem. Look for keywords like 'unique', 'maximum', 'minimum', 'all possible', 'shortest', 'connected'."
            keywords={['Maximum/Minimum', 'Count', 'Path/Shortest', 'All possible', 'Unique']}
          />

          <IdentificationStep
            num="3"
            title="Spot Key Characteristics"
            description="Notice properties of the input: Is it sorted? Is it a linked list or array? Are there duplicates? Is it a tree/graph? This narrows down data structures."
            keywords={['Sorted array', 'Linked list', 'Tree/Graph', 'Matrix', 'String']}
          />

          <IdentificationStep
            num="4"
            title="Match to Pattern"
            description="Compare with known patterns. Sliding window for subarrays, two pointers for pairs, DFS/BFS for traversal, DP for optimization, greedy for selection."
            keywords={['Sliding window', 'Two pointers', 'BFS/DFS', 'DP', 'Greedy', 'Topological sort']}
          />

          <IdentificationStep
            num="5"
            title="Choose Data Structure"
            description="Based on pattern and constraints, select the optimal data structure. Hash map for fast lookup, heap for extremes, trie for prefixes, graph for relationships."
            keywords={['Hash map', 'Heap', 'Stack/Queue', 'Trie', 'Union-Find', 'Segment tree']}
          />

          <IdentificationStep
            num="6"
            title="Plan Approach"
            description="Before coding, outline your algorithm: time complexity O(?), space complexity O(?), and main steps. Get interviewer approval before implementation."
            keywords={['Time complexity', 'Space complexity', 'Algorithm steps', 'Trade-offs']}
          />
        </div>

        <div className="decision-tree">
          <h3>Quick Decision Tree for Pattern Identification</h3>
          <div className="tree-content">
            <div className="tree-branch">
              <strong>Contiguous subarray problem?</strong><br/>
              ↳ Yes → Two pointers OR Sliding window<br/>
              ↳ No → Continue
            </div>
            <div className="tree-branch">
              <strong>Find pairs/triplets in array?</strong><br/>
              ↳ Sorted input → Two pointers<br/>
              ↳ Unsorted → Hash map for prefix
            </div>
            <div className="tree-branch">
              <strong>Shortest path in graph?</strong><br/>
              ↳ Unweighted → BFS<br/>
              ↳ Weighted → Dijkstra
            </div>
            <div className="tree-branch">
              <strong>All paths / Exhaustive search?</strong><br/>
              ↳ Backtracking + pruning
            </div>
            <div className="tree-branch">
              <strong>Optimize over sequences/items?</strong><br/>
              ↳ Overlapping subproblems → DP<br/>
              ↳ Greedy choice property → Greedy
            </div>
          </div>
        </div>
      </div>

      {/* ============= SECTION 6: PRACTICE STRATEGY ============= */}
      <div className="dsa-section">
        <h2 className="section-title">📚 Practice Strategy</h2>
        <p className="section-subtitle">How to extract maximum learning from each problem solved</p>

        <div className="strategy-box">
          <h3>The 3-Problem Daily Rule</h3>
          <p><strong>Problem 1 (Easy Review - 5 min):</strong> Solve a previously mastered problem from memory. Validates retention and builds confidence.</p>
          <p><strong>Problem 2 (Medium Timed - 25 min):</strong> New or struggling medium problem under time pressure. Simulates interview stress.</p>
          <p><strong>Problem 3 (Hard Exploration - 45 min):</strong> Challenging new problem. At 35 min, look at hint if stuck. Never sleep without understanding failure modes.</p>
        </div>

        <div className="strategy-box">
          <h3>The 30-Minute Rule</h3>
          <p>If you haven't made meaningful progress in 30 minutes:</p>
          <ol>
            <li>Look at the pattern hint ONLY (not solution)</li>
            <li>Attempt again for 15 more minutes</li>
            <li>Study the optimal solution line-by-line with annotations</li>
            <li>Re-solve it blind 24 hours later</li>
          </ol>
        </div>

        <div className="strategy-box">
          <h3>Spaced Repetition Tracking</h3>
          <p>Tag every problem: <code>Easy/Medium/Hard × Solved/Struggled/Failed</code></p>
          <ul>
            <li><strong>Struggled problems:</strong> Revisit after 3 days</li>
            <li><strong>Failed problems:</strong> Revisit after 1 day</li>
            <li><strong>Mastery threshold:</strong> Solve problem in under 20 min from cold (no hint)</li>
          </ul>
        </div>

        <div className="strategy-box">
          <h3>Pattern-First Learning</h3>
          <p>When tackling a new topic:</p>
          <ol>
            <li>Read about the pattern (e.g., "What is sliding window?")</li>
            <li>Solve 2 template problems that clearly exemplify it</li>
            <li>Solve 5 mixed problems where pattern isn't labeled</li>
            <li>This approach transfers better than grinding 30 sequential problems</li>
          </ol>
        </div>

        <div className="strategy-box">
          <h3>Company-Specific Focus</h3>
          <table className="company-table">
            <tbody>
              <tr>
                <td><strong>Google</strong></td>
                <td>DP, Trees, BFS/DFS on graphs, Segment Trees, Topological Sort</td>
              </tr>
              <tr>
                <td><strong>Meta (Facebook)</strong></td>
                <td>Arrays, Strings, Graphs, Backtracking, BFS</td>
              </tr>
              <tr>
                <td><strong>Amazon</strong></td>
                <td>Arrays, Heaps, OOP design, DP (knapsack-style), Sliding Window</td>
              </tr>
              <tr>
                <td><strong>Apple</strong></td>
                <td>Arrays, Trees, String parsing, OOP, Clean code emphasis</td>
              </tr>
              <tr>
                <td><strong>Microsoft</strong></td>
                <td>Backtracking, DP, strings, linked lists, trees</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ============= SECTION 7: INTERVIEW READINESS ============= */}
      <div className="dsa-section">
        <h2 className="section-title">🎤 Interview Readiness</h2>
        <p className="section-subtitle">Final tactics for succeeding on the day of the interview</p>

        <div className="readiness-framework">
          <h3>UMPIRE Framework: Communication Protocol</h3>
          
          <div className="framework-step">
            <h4>🔍 U — Understand</h4>
            <p>Restate the problem. Confirm examples. Ask about constraints and edge cases <strong>before</strong> writing code.</p>
          </div>

          <div className="framework-step">
            <h4>🎯 M — Match</h4>
            <p>Identify the pattern. Say out loud: "This looks like a sliding window problem because we have a contiguous subarray constraint."</p>
          </div>

          <div className="framework-step">
            <h4>📐 P — Plan</h4>
            <p>Explain your approach before coding. Mention time/space complexity. Get interviewer approval of strategy.</p>
          </div>

          <div className="framework-step">
            <h4>💻 I — Implement</h4>
            <p>Code cleanly with meaningful variable names. Narrate decisions. Use helper functions. Don't write 200 lines of spaghetti.</p>
          </div>

          <div className="framework-step">
            <h4>✅ R — Review</h4>
            <p>Walk through your code with the examples. Test edge cases (empty input, single element, large N). Discuss optimizations.</p>
          </div>

          <div className="framework-step">
            <h4>🚀 E — Evaluate</h4>
            <p>Confirm time and space complexity. Ask if there are any improvements. Discuss trade-offs (time vs. space).</p>
          </div>
        </div>

        <div className="tips-section">
          <h3>Interview Day Tips</h3>
          
          <div className="tip">
            <strong>✓ Start with brute force, then optimize</strong>
            <p>Interviewers value thinking process. Show you understand the naive approach before refining it.</p>
          </div>

          <div className="tip">
            <strong>✓ Use test cases liberally</strong>
            <p>Walk through your solution with provided examples and edge cases. Catch bugs before submission.</p>
          </div>

          <div className="tip">
            <strong>✓ Don't panic on stuck moments</strong>
            <p>If stuck, use the 5-minute rule: Try earnestly for 5 min, then ask for a hint. Hints are normal and don't hurt you.</p>
          </div>

          <div className="tip">
            <strong>✓ Code quality matters</strong>
            <p>Use clear variable names, proper indentation, and comments. Interviewers judge code legibility.</p>
          </div>

          <div className="tip">
            <strong>✓ Optimize communication over speed</strong>
            <p>Slow, clear thinking beats fast, confused coding. Interviewers care about your thought process.</p>
          </div>

          <div className="tip">
            <strong>✓ Practice mock interviews weekly</strong>
            <p>Use platforms like LeetCode, InterviewBit, or Pramp. Get comfortable explaining solutions out loud.</p>
          </div>
        </div>

        <div className="final-checklist">
          <h3>Final Preparation Checklist</h3>
          <ul>
            <li>✅ Mastered all 18 problem patterns</li>
            <li>✅ Solved 150+ LeetCode Medium problems</li>
            <li>✅ Solved 50+ company-specific problems</li>
            <li>✅ Completed 5+ mock interviews</li>
            <li>✅ Understand Big-O for all patterns</li>
            <li>✅ Can explain trade-offs (time vs. space)</li>
            <li>✅ Comfortable with recursion and backtracking</li>
            <li>✅ Can code and debug efficiently</li>
            <li>✅ Practiced UMPIRE framework with 10+ problems</li>
            <li>✅ Built a personal problem review document</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============= HELPER COMPONENTS =============

function PhaseCard({ id, title, duration, topics, focus, isExpanded, onToggle }) {
  return (
    <div className={`phase-card ${isExpanded ? 'open' : ''}`}>
      <div className="phase-header" onClick={onToggle}>
        <div className="phase-title">
          <h3>{title}</h3>
          <p className="phase-duration">{duration}</p>
        </div>
        <span className="phase-chevron">▼</span>
      </div>
      {isExpanded && (
        <div className="phase-content">
          <p className="phase-focus"><strong>Focus:</strong> {focus}</p>
          <div className="topics-list">
            {topics.map((topic, idx) => (
              <span key={idx} className="topic-tag">{topic}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DataStructureCard({ id, name, complexity, description, useCases, isExpanded, onToggle }) {
  return (
    <div className={`ds-card ${isExpanded ? 'open' : ''}`}>
      <div className="ds-header" onClick={onToggle}>
        <h4>{name}</h4>
        <span className="complexity">{complexity}</span>
        <span className="chevron">▼</span>
      </div>
      {isExpanded && (
        <div className="ds-body">
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Common Use Cases:</strong> {useCases}</p>
        </div>
      )}
    </div>
  );
}

function AlgorithmCard({ id, name, complexity, description, examples, isExpanded, onToggle }) {
  return (
    <div className={`algo-card ${isExpanded ? 'open' : ''}`}>
      <div className="algo-header" onClick={onToggle}>
        <h4>{name}</h4>
        <span className="complexity">{complexity}</span>
        <span className="chevron">▼</span>
      </div>
      {isExpanded && (
        <div className="algo-body">
          <p><strong>How it works:</strong> {description}</p>
          <p><strong>Common examples:</strong> {examples}</p>
        </div>
      )}
    </div>
  );
}

function PatternCard({ id, name, trigger, description, examples, isExpanded, onToggle }) {
  return (
    <div className={`pattern-card ${isExpanded ? 'open' : ''}`}>
      <div className="pattern-header" onClick={onToggle}>
        <h4>{name}</h4>
        <span className="trigger">{trigger}</span>
        <span className="chevron">▼</span>
      </div>
      {isExpanded && (
        <div className="pattern-body">
          <p><strong>When to use:</strong> {description}</p>
          <p><strong>Classic problems:</strong> {examples}</p>
        </div>
      )}
    </div>
  );
}

function IdentificationStep({ num, title, description, keywords }) {
  return (
    <div className="ident-step">
      <div className="step-number">{num}</div>
      <div className="step-content">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="keywords">
          {keywords.map((kw, idx) => (
            <span key={idx} className="keyword">{kw}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
