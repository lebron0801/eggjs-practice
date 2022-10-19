'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    this.ctx.body = data;
    // 禁止写入浏览器中，方便多语言通过Accept-Language来进行设置
    this.ctx.cookies.set('locale', null);
  }

  notFound(msg) {
    msg = msg || this.ctx.__('NotFound');
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
