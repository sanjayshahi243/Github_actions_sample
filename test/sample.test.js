const assert = require('assert');
const { add, subtract, multiply, divide } = require('../src/sample'); // Import your functions to be tested

// Example 1: Testing Addition Function
describe('addition function', function () {
  it('should return the sum of two numbers', function () {
    const result = add(5, 3);
    assert.strictEqual(result, 8);
  });

  it('should return 0 when adding two zeros', function () {
    const result = add(0, 0);
    assert.strictEqual(result, 0);
  });
});

// Example 2: Testing Subtraction Function
describe('subtraction function', function () {
  it('should return the difference between two numbers', function () {
    const result = subtract(10, 5);
    assert.strictEqual(result, 5);
  });

  it('should return 0 when subtracting a number from itself', function () {
    const result = subtract(7, 7);
    assert.strictEqual(result, 0);
  });
});

// Example 3: Testing Multiplication Function
describe('multiplication function', function () {
  it('should return the product of two numbers', function () {
    const result = multiply(4, 3);
    assert.strictEqual(result, 12);
  });

  it('should return 0 when multiplying by 0', function () {
    const result = multiply(6, 0);
    assert.strictEqual(result, 0);
  });
});

// Example 4: Testing Division Function
describe('division function', function () {
  it('should return the quotient of two numbers', function () {
    const result = divide(20, 5);
    assert.strictEqual(result, 4);
  });

  // it('should return Infinity when dividing by 0', function () {
  //   const result = divide(10, 0);
  //   assert.strictEqual(result, Infinity);
  // });

  it('should return NaN when dividing by NaN', function () {
    const result = divide(NaN, 5);
    assert(isNaN(result));
  });
});
