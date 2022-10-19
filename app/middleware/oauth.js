'use strict';

module.exports = (options, app) => {
  return async function oauth(ctx, next) {
    // 执行标准认证中间件，获取令牌信息，将用户信息存储到session中
    const fun = ctx.app.oAuth2Server.authenticate();
    // await fun(ctx, next);
    await fun(ctx, async () => {
      // 此处人员信息结果由认证中心返回，此处只处理将结果赋值到session中供其他地方适用
      ctx.session.user = ctx.state.oauth.token.user;
      await next();
    });
  };
};
