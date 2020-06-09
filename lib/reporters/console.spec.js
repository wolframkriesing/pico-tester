import assert from 'assert';
import { buildSpy } from '../build-spy.js';
import { describe, it } from '../index.js';
import { Console } from './console.js';

describe('Console Reporter', () => {
  it('renders `fail()`', () => {
    const log = buildSpy();
    const reporter = new Console({log});
    reporter.fail([], 'desc', 'error message', 42);
    assert.deepEqual(log.data.calledWith, [['❌ desc [42.00ms]\nerror message']]);
  });
  it('renders `pass()`', () => {
    const log = buildSpy();
    const reporter = new Console({log});
    reporter.pass([], 'desc', 0);
    assert.deepEqual(log.data.calledWith, [['✅ desc [0.00ms]']]);
  });
  describe('`final()`', () => {
    it('renders `final()`', () => {
      const log = buildSpy();
      const reporter = new Console({log});
      reporter.final(23, 42, 10);
      assert.deepEqual(log.data.calledWith, [['23 ❌ ,  42 ✅ ,  [10.00ms]']]);
    });
    it('WHEN all tests passed THEN render no ❌', () => {
      const log = buildSpy();
      const reporter = new Console({log});
      reporter.final(0, 42, 1.23);
      assert.deepEqual(log.data.calledWith, [['42 ✅ ,  [1.23ms]']]);
    });
  });
});
