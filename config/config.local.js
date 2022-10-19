/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // 添加应用层的中间件，注意：这里只能添加应用层中间件
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = ['gzip', 'errorHandler', 'oauth'];

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
    // 配置 gzip 中间件的配置
    gzip: {
      // 小于1k的响应体不压缩
      threshold: 1024,
    },
    oauth: {
      match: '/api',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
