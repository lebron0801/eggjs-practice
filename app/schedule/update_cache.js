'use strict';

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: '10s',
      type: 'all',
      disable: true,
    };
  }

  async subscribe() {
    this.ctx.logger.info('我是来测试的');
  }
}

module.exports = UpdateCache;
