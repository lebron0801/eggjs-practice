'use strict';

const Controller = require('@app/core/base_controller');

class OauthController extends Controller {
  async index() {
    const { ctx } = this;

    const url = 'http://localhost:7001/connect/token';
    const data = {
      dataType: 'json',
      // 默认格式
      contentType: 'application/x-www-form-urlencoded',
      method: 'POST',
      timeout: 3000,
      data: {
        grant_type: 'authorization_code',
        code: this.ctx.query.code,
        state: this.ctx.query.state,
        client_id: 'gGywGzvMLSjsdFjGEpIs',
        client_secret: 'bxsjweclZss2dd8ohnfFJrZm8ZLCiavkna7UbB1o',
        redirect_uri: 'http://localhost:7001/',
      },
    };

    const result = await ctx.curl(url, data);

    this.ctx.body = result.data;
  }

  // 认证中心登录页面
  async authorize() {
    const query = this.ctx.querystring;
    await this.ctx.render('oauth/login', { title: '认证中心', query });
  }
}

module.exports = OauthController;
