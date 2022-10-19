'use strict';

/**
 * 框架扩展之Response对象扩展
 */
module.exports = {
  set foo(value) {
    this.set('x-response-foo', value);
  },
};
