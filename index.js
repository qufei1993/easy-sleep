const binary = require('node-pre-gyp');
const path = require('path')
const binding_path = binary.find(path.resolve(path.join(__dirname,'./package.json')));
const { usleep } = require(binding_path);

/**
 * Thread sleep
 */
class Thread {
  /**
   * Sleep in miliseconds
   * @param {Number} miliseconds
   */
  static sleep(miliseconds) {
    _paramsCheck(miliseconds);
    return usleep(miliseconds * 1000);
  }

  /**
   * Sleep in microseconds
   * @param {Number} microseconds
   */
  static usleep(microseconds) {
    _paramsCheck(microseconds);
    return usleep(microseconds);
  }

  /**
   * The static Atomics.wait() method verifies that a given position in an Int32Array
   * still contains a given value and if so sleeps, awaiting a wakeup or a timeout.
   * Support Node.js v8.10.0+
   * @param {Number} miliseconds
   */
  static wait(miliseconds) {
    _paramsCheck(miliseconds)
    const sab = new SharedArrayBuffer(4); // eslint-disable-line no-undef
    const int32 = new Int32Array(sab);

    return Atomics.wait(int32, 0, 0, Number(miliseconds)); // eslint-disable-line no-undef
  }
}

module.exports = {
  /**
   * Async sleep in miliseconds
   * Promise + setTimeout combination.
   * @param {Number} miliseconds
   */
  sleep: (miliseconds) => {
    _paramsCheck(miliseconds);

    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  },

  Thread
}

/**
 * Parameter check
 * @param {Number} miliseconds
 */
function _paramsCheck(miliseconds) {
  const valid = miliseconds > 0 && miliseconds < Infinity
  if (valid === false) {
    if (typeof ms !== 'number' && typeof ms !== 'bigint') {
      throw TypeError('miliseconds must be a number')
    }

    throw RangeError('miliseconds must be a number that is greater than 0 but less than Infinity')
  }
}
