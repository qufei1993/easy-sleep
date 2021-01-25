declare module 'easy-sleep' {
  /**
   * Async sleep in miliseconds
   * Promise + setTimeout combination.
   * @param miliseconds
   */
  export function sleep(miliseconds: number): Promise<void>;

  /**
   * Thread sleep
   */
  export class SThread {
    /**
     * Sleep in miliseconds
     * @param {Number} miliseconds
     */
    static sleep(miliseconds: number): 0 | -1;

    /**
     * Sleep in microseconds
     * @param {Number} microseconds
     */
    static usleep(microseconds: number): 0 | -1;

    /**
     * The static Atomics.wait() method verifies that a given position in an Int32Array
     * still contains a given value and if so sleeps, awaiting a wakeup or a timeout.
     * Support Node.js v8.10.0+
     * @param {Number} miliseconds
     */
    static wait(miliseconds: number): 'ok' | 'timed-out' | 'not-equal'
  }
}