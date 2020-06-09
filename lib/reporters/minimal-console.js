export class MinimalConsole {
  constructor(printer = console) {
    this._log = (...args) => printer.log(...args);
  }
  fail(specs, description, errorMessage, elapsedTime) {
    this._log(`❌ ${[...specs, description]} [${elapsedTime.toFixed(2)}ms]\n${errorMessage}`);
  }
  pass() {}
  final(failures, passes, elapsedTime) {
    const failureText = failures ? `${failures} ❌ ,  ` : '';
    this._log(failureText + `${passes} ✅ ,  [${elapsedTime.toFixed(2)}ms]`);
  }
}
