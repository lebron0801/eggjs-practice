'use strict';

module.exports = app => {
  const { router, controller, io } = app;

  // 此方式：在指定的路由中适用指定中间件
  const gzip = app.middleware.gzip({ threshold: 2000 });

  app.passport.mount('yuque');

  // 此 action 为认证中心所需要的回调方法
  router.get('/', controller.oauth.index);

  router.resources('topics', '/topics', controller.topics);

  // 针对此命名空间下的客户端事件进行响应
  io.of('/').route('exchange', io.controller.nsp.exchange);
  io.of('/').route('feedback', io.controller.default.ping);
};
