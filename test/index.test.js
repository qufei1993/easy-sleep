const assert = require('assert');
const { sleep, Thread } = require('../index');

describe('index.js', function() {
  this.timeout(3000);
  describe('async sleep', function() {
    it('should success with async sleep', async function() {
      const now = Date.now();
      const miliseconds = 1000;
      await sleep(miliseconds);
      const diff = Date.now() - now;
      assert.ok(diff >= miliseconds && miliseconds < (miliseconds + 100));
    });
  });

  describe('Thread sleep', function() {
    it('should success with Thread.sleep()', function() {
      const now = Date.now();
      const miliseconds = 1000;
      Thread.sleep(miliseconds);
      const diff = Date.now() - now;
      assert.ok(diff >= miliseconds && miliseconds < (miliseconds + 100));
    });

    it('should success with Thread.usleep()', function() {
      const now = Date.now();
      const miliseconds = 1000;
      const microseconds = miliseconds * 1000;
      Thread.usleep(microseconds);
      const diff = (Date.now() - now) * 1000;
      assert.ok(diff >= microseconds && microseconds < (microseconds + 100 * 1000));
    });

    it('should success with Thread.wait()', function() {
      const now = Date.now();
      const miliseconds = 1000;
      Thread.wait(miliseconds);
      const diff = Date.now() - now;
      assert.ok(diff >= miliseconds && miliseconds < (miliseconds + 100));
    });
  });
});
