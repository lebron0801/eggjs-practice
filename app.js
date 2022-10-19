'use strict';

const assert = require('assert');
const path = require('path');

class AppBootHook {
  constructor(app) {
    this.app = app;

    // 设置全局数据，一般给模板渲染所使用
    app.locals = { globals: 'lebron' };
  }

  configWillLoad() {
    // 配置文件即将加载，这是最后动态修改配置的时机
    // 注意：此函数只支持同步调用
    // 例如：参数中的密码是加密的，在此处进行解密
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    // 添加框架层的中间件
    this.app.config.coreMiddleware.unshift('report');

    require('module-alias/register');
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
    // 配置文件加载完成
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    // 所有文件都已加载，准备启动插件
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
    // 所有插件都已启动，可以在应用程序准备好之前做一些事情
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.

    const room = await this.app.redis.get('room:demo');
    if (!room) {
      await this.app.redis.set('room:demo', 'demo');
    }

    this.app.logger.info('app服务启动成功!');
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    /* this.app.server.on('timeout', socket => {
      // handle socket timeout
    }); */

    // 监听IPC通信
    this.app.messenger.on('lebron_action', data => {
      this.app.logger.info('来自agent进程消息 %j', data);
    });

    this.app.messenger.on('custom_action', data => {
      this.app.logger.info('消息:', data);
    });

    this.app.passport.verify(async (ctx, user) => {
      // 检查用户
      assert(user.provider, 'user.provider should exists');
      assert(user.id, 'user.id should exists');

      // 从数据库中查找授权用户信息
      //
      // Authorization Table
      // column   | desc
      // ---      | --
      // provider | provider name, like github, twitter, facebook, weibo and so on
      // uid      | provider unique id 第三方用户编号
      // user_id  | current application user id
      const auth = await ctx.model.Authorization.findOne({
        where: {
          uid: user.id,
          provider: user.provider,
        },
      });

      // 查询当前系统中的用户信息
      const existsUser = await ctx.model.User.findOne({
        where: { id: auth.user_id },
      });
      if (existsUser) {
        return existsUser;
      }

      // 调用 service 注册新用户
      const newUser = await ctx.service.user.register(user);
      return newUser;
    });

    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    this.app.passport.serializeUser(async (ctx, user) => {
      const id = user.id;
      if (id) {
        ctx.session.userId = id;
      }
    });

    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    this.app.passport.deserializeUser(async (ctx, user) => {
      // 处理 user
      // ...
      // return user;
    });
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;
