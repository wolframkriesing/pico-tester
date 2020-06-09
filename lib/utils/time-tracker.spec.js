import assert from 'assert';
import { describe, it } from '../index.js';
import { startTimer } from './time-tracker.js';

describe('TimeTracker', () => {
  it('`startTimer()` returns a function (`stopTimer`)', () => {
    const stopTimer = startTimer();
    assert.equal(typeof stopTimer, 'function');
  });
  it('calling `startTimer()` twice returns a different function every time', () => {
    const stopTimer1 = startTimer();
    const stopTimer2 = startTimer();
    assert.notEqual(stopTimer1, stopTimer2);
  });
  describe('newStopTimer', () => {
    it('should return elapsed time in miliseconds', () => {
      const stopTimer = startTimer();
      const elapsedTime = stopTimer();
      assert(elapsedTime > 0)
    });
  });
});
