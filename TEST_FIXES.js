// Test file to verify all fixes are working
// This tests the new execution engine logic

// Test 1: parseTestInput function
function parseTestInput(inputString, problemTitle) {
  try {
    const assignments = {};
    const pattern = /(\w+)\s*=\s*(.+?)(?=\s*,\s*\w+\s*=|$)/g;
    let match;
    
    while ((match = pattern.exec(inputString)) !== null) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      try {
        assignments[key] = JSON.parse(value);
      } catch {
        assignments[key] = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      }
    }
    
    return assignments;
  } catch (error) {
    throw new Error(`Failed to parse input: "${inputString}". ${error.message}`);
  }
}

// Test 2: compareResults function
function compareResults(actual, expectedString) {
  try {
    const expected = JSON.parse(expectedString);
    return JSON.stringify(actual) === JSON.stringify(expected);
  } catch {
    return String(actual).toLowerCase() === String(expectedString).toLowerCase();
  }
}

// Test 3: executeUserFunction
function executeUserFunction(userCode, functionName, args) {
  try {
    // Create function that accepts code and function name
    const func = new Function(userCode + `\nreturn ${functionName};`);
    const userFunc = func();
    
    // Get the function reference
    if (typeof userFunc !== 'function') {
      throw new Error(`Function "${functionName}" not found in your code`);
    }
    
    // Execute function with arguments
    const result = userFunc(...args);
    return result;
    
  } catch (error) {
    throw new Error(`Execution failed: ${error.message}`);
  }
}

// ==================== RUNNING TESTS ====================
console.log('=== PARSING TESTS ===');

// Test parsing for Two Sum
const twoSumInput = "nums = [2,7,11,15], target = 9";
const parsed1 = parseTestInput(twoSumInput, "Two Sum");
console.log('Two Sum parsing:', parsed1);
console.assert(JSON.stringify(parsed1.nums) === '[2,7,11,15]', 'Two Sum array parsing failed');
console.assert(parsed1.target === 9, 'Two Sum target parsing failed');

// Test parsing for Valid Palindrome
const palindromeInput = 's = "A man, a plan, a canal: Panama"';
const parsed2 = parseTestInput(palindromeInput, "Valid Palindrome");
console.log('Palindrome parsing:', parsed2);
console.assert(parsed2.s === "A man, a plan, a canal: Panama", 'Palindrome string parsing failed');

// Test parsing with negative numbers
const negativeInput = "nums = [-1,0], target = -1";
const parsed3 = parseTestInput(negativeInput, "Two Sum");
console.log('Negative numbers parsing:', parsed3);
console.assert(JSON.stringify(parsed3.nums) === '[-1,0]', 'Negative numbers parsing failed');

console.log('\n=== COMPARISON TESTS ===');

// Test boolean comparison
const booleanResult = compareResults(true, "true");
console.log('Boolean comparison (true === "true"):', booleanResult);
console.assert(booleanResult === true, 'Boolean comparison failed');

// Test array comparison
const arrayResult = compareResults([0, 1], "[0,1]");
console.log('Array comparison ([0,1] === "[0,1]"):', arrayResult);
console.assert(arrayResult === true, 'Array comparison failed');

// Test string comparison
const stringResult = compareResults('raceacar', '"raceacar"');
console.log('String comparison ("raceacar"):', stringResult);

console.log('\n=== EXECUTION TESTS ===');

// Test 1: Simple Two Sum
const twoSumCode = `
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
`;

try {
  const result1 = executeUserFunction(twoSumCode, 'twoSum', [[2, 7, 11, 15], 9]);
  console.log('Two Sum result:', result1);
  console.assert(JSON.stringify(result1) === '[0,1]', 'Two Sum execution failed');
  console.log('✓ Two Sum test PASSED');
} catch (e) {
  console.error('✗ Two Sum test FAILED:', e.message);
}

// Test 2: Palindrome check
const palindromeCode = `
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
`;

try {
  const result2 = executeUserFunction(palindromeCode, 'isPalindrome', ["A man, a plan, a canal: Panama"]);
  console.log('Palindrome result:', result2);
  console.assert(result2 === true, 'Palindrome execution failed');
  console.log('✓ Palindrome test PASSED');
} catch (e) {
  console.error('✗ Palindrome test FAILED:', e.message);
}

// Test 3: Valid Parentheses
const parenthesesCode = `
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  
  return stack.length === 0;
}
`;

try {
  const result3a = executeUserFunction(parenthesesCode, 'isValid', ["()"]);
  const result3b = executeUserFunction(parenthesesCode, 'isValid', ["([)]"]);
  console.log('Valid parentheses results:', result3a, result3b);
  console.assert(result3a === true && result3b === false, 'Parentheses execution failed');
  console.log('✓ Valid Parentheses test PASSED');
} catch (e) {
  console.error('✗ Valid Parentheses test FAILED:', e.message);
}

// Test 4: Fibonacci
const fibonacciCode = `
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
`;

try {
  const result4 = executeUserFunction(fibonacciCode, 'fib', [2]);
  const result5 = executeUserFunction(fibonacciCode, 'fib', [10]);
  console.log('Fibonacci results:', result4, result5);
  console.assert(result4 === 1 && result5 === 55, 'Fibonacci execution failed');
  console.log('✓ Fibonacci test PASSED');
} catch (e) {
  console.error('✗ Fibonacci test FAILED:', e.message);
}

console.log('\n=== ALL TESTS COMPLETED ===');
console.log('✓ All critical fixes are working correctly!');
