'use strict';

const moment = require('moment');
const bcrypt = require('bcryptjs');

/**
 * 框架扩展之Helper对象扩展
 */
module.exports = {
  foo(param) {
    return param;
  },
  relativeTime(time) {
    return moment(new Date(time * 1000)).fromNow();
  },
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  json(data, code, msg, addition) {
    return Object.assign(
      {
        result: code ? 'fail' : 'success',
        code: code || 0,
        message: msg,
        data,
      },
      addition
    );
  },
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
  changeTime(time) {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  },
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign(
      {},
      {
        timestamp: Date.now(),
      },
      metadata
    );

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
};
