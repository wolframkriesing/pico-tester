const beaver = require('../../lib');
const logMock = require('../../utils/log-mock');
const assert = require('assert');

const { spec, unit } = beaver;
logMock.apply();

spec(() => {
  unit(() => assert.equal(0, 1));
  unit(() => assert.equal(2, 2));
});

setTimeout(() => assert.equal(true, logMock.getMessages().indexOf('Some tests failed') > -1), 0);