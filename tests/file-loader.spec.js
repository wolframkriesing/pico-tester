const assert = require('assert');
const sinon = require('sinon');
const fileLoader = require('../lib/file-loader');
const { spec, unit } = require('../lib/index');

const loaderMock = sinon.spy();
const mockLoader = fileLoader(loaderMock);

spec('FileLoader', () => {
  unit('should load given files', () => {
    const file = `${process.cwd()}/tests/file-loader.spec.js`;
    
    mockLoader.load(file);

    assert(loaderMock.calledWith(file));
  });
  unit('should load given files, with injected deps', () => {
    const file = '/any/file-loader.spec.js';
    const findFilesInDirectory = () => [file];

    loadPotentialTestFiles(loaderMock, file, {findFilesInDirectory});

    assert(loaderMock.calledWith(file));
  });

  unit('should be able to load all specs inside of the given path', () => {
    const dirName = (fileName) => `${__dirname}/${fileName}`;
    mockLoader.load(__dirname);

    assert(loaderMock.calledWith(dirName('execute.spec.js')));
    assert(loaderMock.calledWith(dirName('reporter.spec.js')));
    assert(loaderMock.calledWith(dirName('runner.spec.js')));
    assert(loaderMock.calledWith(dirName('unit-collector.spec.js')));
    assert(loaderMock.calledWith(dirName('file-loader.spec.js')));
  });
});

const { spec: describe, unit: it } = require('../lib/index');
const { loadPotentialTestFiles } = require('../lib/file-loader');
describe('The `FileLoader`', () => {
  const buildSpy = () => {
    const spy = () => {
      spy.wasCalled = true;
      spy.callCount++;
    };
    spy.wasCalled = false;
    spy.callCount = 0;
    return spy;
  };
  
  it('WHEN given an empty directory, THEN loads no file', () => {
    const emptyDirectory = [];
    const findFilesInDirectory = () => emptyDirectory;
    const loaderFn = buildSpy();

    loadPotentialTestFiles(loaderFn, 'irrelevant/dir-name', {findFilesInDirectory});

    assert.equal(loaderFn.wasCalled, false);
  });
  it('WHEN given a directory with 1 file, THEN loads one file', () => {
    const dirWithOneFile = ['one.spec.js'];
    const findFilesInDirectory = () => dirWithOneFile;
    const loaderFn = buildSpy();

    loadPotentialTestFiles(loaderFn, 'irrelevant/dir-name', {findFilesInDirectory});

    assert.equal(loaderFn.callCount, 1);
  });
  
});
