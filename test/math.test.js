const assert = require('assert');

describe('Math Utils', function() {
  it('should add numbers correctly', function() {
    assert.strictEqual(2 + 2, 4);
  });

  it('should multiply numbers correctly', function() {
    assert.strictEqual(3 * 5, 15);
  });

  it('should handle division by zero', function() {
    assert.strictEqual(10 / 0, Infinity);
  });
});
