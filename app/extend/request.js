'use strict';

/**
 * 框架扩展之Request对象扩展
 */
module.exports = {
  get foo() {
    return this.get('x-request-foo');
  },
};
