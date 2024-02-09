import langs from 'langs-es';
import { assert } from 'chai';
import sharedTests from '../sharedTests.cjs';

describe('ESM', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  sharedTests(langs, assert);
});
