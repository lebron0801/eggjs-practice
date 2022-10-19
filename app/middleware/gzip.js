'use strict';

const { ReadStream } = require('fs');
const isJSON = require('koa-is-json');
const zlib = require('zlib');

/**
 * 响应体压缩中间件
 * @param {Object} options 中间件的配置项
 * @param {*} app 当前应用 Application 的实例
 * @return {Function} 普通函数
 */
module.exports = (options, app) => {
  return async function gzip(ctx, next) {
    await next();

    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;

    if (!body) return;

    if (options.threshold && ctx.length < options.threshold) return;

    if (isJSON(body)) {
      body = JSON.stringify(body);
    }

    // 为了兼容swagger-ui文件流
    if (body instanceof ReadStream) return;

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};
