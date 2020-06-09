const testDescription = (specs, description) => {
  const allSpecs = specs.join(' ');
  return (allSpecs ? allSpecs + ' ' : allSpecs) + description;
};

export class Console {
  constructor(reporter = console) {
    this._print = (...args) => reporter.log(...args);
  }
  fail(specs, description, errorMessage, elapsedTime) {
    const testDesc = testDescription(specs, description);
    this._print(`❌ ${testDesc} [${elapsedTime.toFixed(2)}ms]\n${errorMessage}`);
  }
  pass(specs, description, elapsedTime) {
    const testDesc = testDescription(specs, description);
    this._print(`✅ ${testDesc} [${elapsedTime.toFixed(2)}ms]`);
  }
  final(failures, passes, elapsedTime) {
    const failureText = failures ? `${failures} ❌ ,  ` : '';
    this._print(failureText + `${passes} ✅ ,  [${elapsedTime.toFixed(2)}ms]`);
  }
}
