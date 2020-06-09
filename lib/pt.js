#!/usr/bin/env node

import { join } from 'path';
import { default as parseArgs } from 'minimist';
import { startTimer } from './utils/time-tracker.js';
import { runner } from './runner.js';
import { unitCollector } from './index.js';
import { loadTestFiles } from './test-file-loader.js';
import { createReporter } from './reporter.js';

const DEFAULT_REPORTER_NAME = 'console';

const parsedArgs = parseArgs(process.argv.slice(2), {
  boolean: ['bail'], 
  alias: {R: 'reporter'}, 
  string: ['reporter'],
  default: {'reporter': DEFAULT_REPORTER_NAME},
});

const config = { reporter: createReporter(parsedArgs.reporter) };
const stopTimer = startTimer();
const fileNamesWithCompletePath = parsedArgs._.map(fileName => join(process.cwd(), fileName));
loadTestFiles(require, fileNamesWithCompletePath);
runner(config, { unitCollector, stopTimer });
