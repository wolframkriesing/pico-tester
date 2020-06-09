const testDescription = (specs, description) => {
  const allSpecs = specs.join(' ');
  return (allSpecs ? allSpecs + ' ' : allSpecs) + description;
};

export class Console {
  constructor(reporter = console) {
    this._print = (...args) => reporter.log(...args);
  }
  final(failures, passes, elapsedTime) {
    this._print(`${failures} ❌ ,  ${passes} ✅ ,  [${elapsedTime.toFixed(2)}ms]`);
  }
  fail(specs, description, errorMessage, elapsedTime) {
    const testDesc = testDescription(specs, description);
    this._print(`❌ ${testDesc} [${elapsedTime.toFixed(2)}ms]\n${errorMessage}`);
  }
  pass(specs, description, elapsedTime) {
    const testDesc = testDescription(specs, description);
    this._print(`✅ ${testDesc} [${elapsedTime.toFixed(2)}ms]`);
  }
}
