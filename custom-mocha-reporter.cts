// my-reporter.js
'use strict';

import { Runner } from 'mocha'
// const Mocha = require('mocha')
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Runner.constants;

// this reporter outputs test results, indenting two spaces per suite

class MyReporter {
  _indents;
  constructor(runner: any) {
    this._indents = 0;
    const stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log('EVENT_RUN_BEGIN');
      })
      .on(EVENT_SUITE_BEGIN, () => {
        console.log('EVENT_SUITE_BEGIN');
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        console.log('EVENT_SUITE_END');

        this.decreaseIndent();
      })
      .on(EVENT_TEST_PASS, (test: any) => {
        console.log('EVENT_TEST_PASS');

        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        console.log(`${this.indent()}pass: ${test.fullTitle()}`);
      })
      .on(EVENT_TEST_FAIL, (test: any, err: any) => {
        console.log('EVENT_TEST_FAIL');

        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        );
      })
      .once(EVENT_RUN_END, () => {
        console.log('EVENT_RUN_END');

        console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
      });
  }

  indent() {
    return Array(this._indents).join('  ');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}

module.exports = MyReporter;