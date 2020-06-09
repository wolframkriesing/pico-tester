import assert from 'assert';
import { describe, it, xit } from './index.js';
import { execute } from './execute.js';

describe('`execute()`', () => {
  it('returns true for succeeding executable', async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    await execute(succeedingExecutable).then(res => assert(res.result));
  });

  it("returns `elapsedTime` property for succeeding executable", async () => {
    const succeedingExecutable = () => assert.equal(1, 1);
    const { elapsedTime } = await execute(succeedingExecutable);

    assert(elapsedTime > 0)
  });

  it("should return elapsedTime for failing executable", async () => {
    const failingExecutable = () => assert.equal(1, 0);
    const { elapsedTime } = await execute(failingExecutable);

    assert.notEqual(elapsedTime, undefined);
  });

  describe('Assertion Error', () => {
    xit('should return expected and actual values for failing executable', async () => {
      const failingExecutable = () => assert.equal(0, 1);
      const failureObj = {
        result: false,
        errorMessage: `AssertionError: 0 == 1`
      };
      const { result: actualResult, errorMessage: actualErrorMessage } = await execute(failingExecutable);
      
      assert.equal(actualResult, failureObj.result);
      assert.equal(actualErrorMessage, failureObj.errorMessage);
    });
  
    xit('should be able to execute async functions', async () => {
      const failingExecutable = () => new Promise((resolve) => resolve(assert.equal(0, 1)));
      const failureObj = {
        result: false,
        errorMessage: 'AssertionError: 0 == 1'
      };
      const { result: actualResult, errorMessage: actualErrorMessage } = await execute(failingExecutable);

      assert.equal(actualResult, failureObj.result);
      assert.equal(actualErrorMessage, failureObj.errorMessage);
    });
  });

  describe('Timeout Error', () => {
    it('should return timeout error after when exceeded given configuration', async () => {
      const executionTimeout = 50;
      const timeoutErrorExecutable = () => new Promise(resolve => setTimeout(() => resolve(), 100))
      const failureObj = {
        result: false,
        errorMessage: `TimeoutError: Execution exceeded ${executionTimeout}ms`
      };

      const { result, errorMessage} = await execute(timeoutErrorExecutable, executionTimeout);

      assert.equal(result, failureObj.result);
      assert.equal(errorMessage, failureObj.errorMessage);
    });
  });

  describe('Other Errors', () => {
    it('should return description and stack trace', async () => {
      const referrenceErrorExecutable = () => assert(notDefined);
      const failureObj = {
        result: false,
        errorMessage: 'ReferenceError: notDefined is not defined'
      }
      const { result: actualResult } = await execute(referrenceErrorExecutable);
      
      assert.equal(actualResult, failureObj.result);
    });
  });
});
