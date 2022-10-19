'use strict';

module.exports = app => {
  const { router, controller } = app;

  // OAuth 服务的前端登录页面，授权中心
  router.get('/authorize', controller.oauth.authorize);

  // 获取授权码
  // 此用来获取授权码的路由
  // 生命周期: getClient --> getUser --> saveAuthorizationCode
  router.all('/connect/authorize', app.oAuth2Server.authorize());

  // 密码模式生命周期: getClient --> getUser --> generateAccessToken --> saveToken
  // 通过授权码获取 accessToken
  // token 是用来发放访问令牌的路由
  // 生命周期: getClient --> getAuthorizationCode --> revokeAuthorizationCode --> generateAccessToken --> saveToken
  // 注：刷新访问令牌时同样使用这个接口
  // 生命周期: getClient --> getRefreshToken --> revokeToken --> generateAccessToken --> saveToken
  router.all('/connect/token', app.oAuth2Server.token());

  // 此处为认证 上面是授权
  // 通过 accessToken 获取用户信息等
  // 此路由是登录之后才可访问
  // 生命周期: getAccessToken
  router.all('/connect/userinfo', app.oAuth2Server.authenticate(), ctx => {
    ctx.body = ctx.state.oauth.token;
  });
};
