'use strict';

/**
 * 上报请求时间中间件
 * @param {*} options 中间件的配置项
 * @param {*} app 当前应用 Application 的实例
 * @return {Function} 普通函数
 */
module.exports = (options, app) => {
  return async function responseTime(ctx, next) {
    const startTime = Date.now();
    await next();

    // 上报时间
    ctx.logger.info(`X-Response-Time: ${Date.now() - startTime}ms`);
  };
};
