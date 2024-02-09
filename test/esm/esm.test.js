import langs from 'langs-es';
import { assert } from 'chai';
import sharedTests from '../sharedTests.cjs';

describe('ESM', function () {
  /* eslint-disable mocha/no-setup-in-describe */
  if (process.versions && process.versions.node && +process.versions.node.slice(0, 2) >= 13) {
    sharedTests(langs, assert);
  }
  /* eslint-enable mocha/no-setup-in-describe */
});
