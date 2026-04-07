/**
 * Coding Problems Data Structure
 * 
 * Each problem contains:
 * - id: unique identifier
 * - title: problem name
 * - description: detailed problem statement
 * - difficulty: 'Easy', 'Medium', 'Hard'
 * - constraints: problem constraints
 * - starterCode: initial code template
 * - examples: example input/output pairs
 * - visibleTestCases: test cases shown to users
 * - hiddenTestCases: test cases run on submit
 * - topic: problem category
 */

export const codingProblems = [
  {
    id: 1,
    title: "Two Sum",
    functionName: "twoSum",
    topic: "Arrays",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9, so we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6, so we return [1, 2]."
      }
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test case runner - do NOT modify
function runTest(nums, target) {
  return twoSum(nums, target);
}`,
    visibleTestCases: [
      {
        id: "test-1",
        input: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
        description: "Example 1"
      },
      {
        id: "test-2",
        input: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]",
        description: "Example 2"
      }
    ],
    hiddenTestCases: [
      {
        id: "hidden-1",
        input: "nums = [3,3], target = 6",
        expectedOutput: "[0,1]"
      },
      {
        id: "hidden-2",
        input: "nums = [2,7], target = 9",
        expectedOutput: "[0,1]"
      }
    ]
  },
  {
    id: 2,
    title: "Valid Palindrome",
    functionName: "isPalindrome",
    topic: "Strings",
    difficulty: "Easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists of printable ASCII characters."
    ],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: "After removing non-alphanumeric characters and converting to lowercase: 'amanaplanacanalpanama' is a palindrome."
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: "After removing non-alphanumeric characters and converting to lowercase: 'raceacar' is not a palindrome."
      }
    ],
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test case runner - do NOT modify
function runTest(s) {
  return isPalindrome(s);
}`,
    visibleTestCases: [
      {
        id: "test-1",
        input: 's = "A man, a plan, a canal: Panama"',
        expectedOutput: "true",
        description: "Example 1"
      },
      {
        id: "test-2",
        input: 's = "race a car"',
        expectedOutput: "false",
        description: "Example 2"
      }
    ],
    hiddenTestCases: [
      {
        id: "hidden-1",
        input: 's = " "',
        expectedOutput: "true"
      },
      {
        id: "hidden-2",
        input: 's = "0P"',
        expectedOutput: "false"
      }
    ]
  },
  {
    id: 3,
    title: "Valid Parentheses",
    functionName: "isValid",
    topic: "Stack",
    difficulty: "Easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'"
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "Simple valid parentheses"
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Multiple valid parentheses"
      },
      {
        input: 's = "([)]"',
        output: "false",
        explanation: "Mismatched parentheses"
      }
    ],
    starterCode: `function isValid(s) {
  // Write your solution here
  
}

// Test case runner - do NOT modify
function runTest(s) {
  return isValid(s);
}`,
    visibleTestCases: [
      {
        id: "test-1",
        input: 's = "()"',
        expectedOutput: "true",
        description: "Example 1"
      },
      {
        id: "test-2",
        input: 's = "()[]{}"',
        expectedOutput: "true",
        description: "Example 2"
      },
      {
        id: "test-3",
        input: 's = "([)]"',
        expectedOutput: "false",
        description: "Example 3"
      }
    ],
    hiddenTestCases: [
      {
        id: "hidden-1",
        input: 's = "("',
        expectedOutput: "false"
      },
      {
        id: "hidden-2",
        input: 's = "{[]}"',
        expectedOutput: "true"
      }
    ]
  },
  {
    id: 4,
    title: "Fibonacci Number",
    functionName: "fib",
    topic: "Recursion",
    difficulty: "Easy",
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is:

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1

Given n, calculate F(n).`,
    constraints: [
      "0 <= n <= 30"
    ],
    examples: [
      {
        input: "n = 2",
        output: "1",
        explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1"
      },
      {
        input: "n = 3",
        output: "2",
        explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2"
      },
      {
        input: "n = 4",
        output: "3",
        explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3"
      }
    ],
    starterCode: `function fib(n) {
  // Write your solution here
  
}

// Test case runner - do NOT modify
function runTest(n) {
  return fib(n);
}`,
    visibleTestCases: [
      {
        id: "test-1",
        input: "n = 2",
        expectedOutput: "1",
        description: "Example 1"
      },
      {
        id: "test-2",
        input: "n = 3",
        expectedOutput: "2",
        description: "Example 2"
      },
      {
        id: "test-3",
        input: "n = 4",
        expectedOutput: "3",
        description: "Example 3"
      }
    ],
    hiddenTestCases: [
      {
        id: "hidden-1",
        input: "n = 0",
        expectedOutput: "0"
      },
      {
        id: "hidden-2",
        input: "n = 5",
        expectedOutput: "5"
      },
      {
        id: "hidden-3",
        input: "n = 6",
        expectedOutput: "8"
      }
    ]
  }
];

export default codingProblems;
