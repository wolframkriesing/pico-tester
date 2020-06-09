import { startTimer } from "./utils/time-tracker";

const pass = (elapsedTime) => ({
  result: true, 
  elapsedTime,
});
const failure = (errorMessage, elapsedTime) => ({
  result: false,
  errorMessage,
  elapsedTime,
});
export const execute = async (executable, timeout = 1500) => {
  const stopTimer = startTimer();
  const elapsedTime = () => stopTimer();
  const timeoutFn = () => 
    new Promise((resolve, reject) => 
      setTimeout(() => reject(`TimeoutError: Execution exceeded ${timeout}ms`), timeout))
  ;
  try {
    await Promise.race([executable(), timeoutFn()]);
    return pass(elapsedTime());
  } catch (error) {
    return failure(error, elapsedTime());
  }
};