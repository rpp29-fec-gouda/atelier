const identify = require('./identify.js');

test('Identifies as a test', () => {
  expect(identify()).toContain('I');
  expect(identify()).toContain('identify');
  expect(identify()).toContain('as');
  expect(identify()).toContain('a');
  expect(identify()).toContain('test');
});