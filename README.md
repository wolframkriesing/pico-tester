# Pico Tester

Pico Tester is a small and fast spec runner for Javascript. 
Mocha and Jest all bring too much burden along, either from history or features.
This library is a reset. Using the least needed for a test runner.

See the [ADRs][adrs] and [tenets](#tenets) below for understanding what drives and steers this project.

[adrs]: ./docs/adr

## History - The Real Kavun

The project is a fork of [@SengitU](https://github.com/SengitU)'s project [Kavun](https://github.com/SengitU/kavun).
He started this project during his apprenticeship at HolidayCheck, to build a tiny, lightweight
test runner, to figure out what a test runner really just needs.

## Installation

`npm install pico-tester`

### Usage Examples

* Run the tests just for one file do  
  `pt test-files.spec.js`
* or multiple files   
  `py test1.spec.js 2.spec.js test/3.spec.js`
* or for all `.js` files (use you command line's file grep features, e.g. `*` or `**` etc.)  
  `pt *.js`
* for all files found in root and up to 2 sub-directories, ending in `.js`  
  `pt {,**,**/**}/*.js`
* and mix any of the above  
  `pt test-files.spec.js {,**,**/**}/*.js`

Pico-tester does not contain any file-grep functionality. Use your command line's 
grep and/or file finding features. This was done to remove pico-tester's complexity.

### Parameters

The command line takes:
1) any number of files (no directories!) to run as parameters
1) `--reporter` which might be `console` or `minimal`

### Unit

A sync example for unit

```js
import assert from 'assert';
import { it } from 'pico-tester';

it('Example `it`', () => {
  const expected = 2;
  const actual = 2;
  assert.equal(actual, expected);
});
```

An async example with async/await

```js
import assert from 'assert';
import { it } from 'pico-tester';

it('Example async `it` with async / await', async () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  const result = await actual();
  
  assert.equal(expected, result);
});
```

An async example with Promise, don't forget to return the `promise`

```js
import assert from 'assert';
import { it } from 'pico-tester';

it('Example async `it` with async / await', () => {
  const actual = () => new Promise(resolve => resolve(true));
  const expected = true;
  
  return actual().then(result => assert.equal(expected, result));
});
```

### Timeout

Timeout for each spec is 1500 miliseconds by default. To increase this amount, timeout attribute inside of the options object should be provided to the `unit`, as shown in the example;

```js
it('Example `it` with extended timeout', async () => {
  const actual = () => new Promise(resolve => setTimeout(() => resolve(true), 1700));
  const expected = true;

  const result = await actual();
  assert.equal(expected, result);
}, { timeout: 2000 });
```

### Spec

```js
import assert from 'assert';
import { describe, it } from 'pico-tester';

describe('Example Spec', () => {
  it('unit', () => {
    const expected = 2;
    const actual = 2;
    assert.equal(actual, expected);
  });

  describe('Async', () => {
    it('with async / await', async () => {
      const actual = () => new Promise(resolve => resolve(true));
      const expected = true;

      const result = await actual();

      assert.equal(expected, result)
    });
  });
});

```
## Tenets
1) In doubt solve it without a new dependency.
2) In doubt don't add a new feature, rather remove one.
3) Prefer speed.
4) Be compatible to mocha-style test libs, allowing well written tests overrules.

## Development

The following describes how to (help) develop this code.

## Setup and run

Project requires NodeJS to be installed.

- `cd <here>`
- (if you want a reproducable env using nix) run `nix-shell`
- `npm i` to install
- `npm test` to run all the tests
- develop ...

## Install/setup, via nix

The project can be built and run locally using nix, to reproduce the environment.
1) Make sure to have nix installed (see [nixos.org/nix][nix]) and then
1) `cd <project-dir>`
1) run `nix-shell` and you should have the environment up and running
1) install all node modules using `npm install`
1) prove that it works, `npm test`
1) now you have a shell with a deterministic environment (incl. node version)

[nix]: http://nixos.org/nix/

## Releasing

You want to know if you are ready to release a new version. 
Run `npm run releasable --silent`, this starts a script that checks the [CHANGELOG.md](./CHANGELOG.md), which
is your to-do list! What, to-do list? Yes. See below how and why?

To release a new version run `npm run release` (not `npm version`!), this will include the
checks described and do the release and versioning (read more below).

## Recommended Development Process

This project uses the [to-do-list-checker][1].
The development process is also described there and will be followed in this project too.

[1]: https://github.com/wolframkriesing/to-do-list-checker
[2]: https://github.com/wolframkriesing/to-do-list-checker#recommended-development-process