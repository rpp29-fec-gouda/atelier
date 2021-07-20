// ==== Test Demo ====
// ====== sum.js ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// Below is a sample test of pure JavaScript running a sample file included in the demo directory

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});