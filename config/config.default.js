/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626961986111_8434';

  // add your middleware config here
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
    security: {
      csrf: false,
    },
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    },
    static: {
      // 配置静态文件请求前缀
      prefix: '/',
      // 静态文件存放目录，支持数组形式
      dir: path.join(appInfo.baseDir, 'app/public'),
      // 如果当前访问的静态资源没有缓存，则缓存静态文件，和preload配合使用
      dynamic: true,
      // 是否预加载
      preload: false,
      // 设置客户端缓存最大时间，如果在缓存期内，客户端浏览器自动读取 memory cache，生产环境开启，其他环境不开启
      maxAge: appInfo.env === 'prod' ? 31536000 : 0,
      // 服务端是否开启缓存，生产环境开启，其他环境不开启
      buffer: appInfo.env === 'prod',
      // 服务端缓存文件的最大数量，仅在 dynamic 参数为 true 时有效，默认值为 1000
      maxFiles: 1000,
    },
    logger: {
      // 定义日志输出格式
      outputJSON: false,
      // 定义日志级别
      level: 'DEBUG',
    },
    cors: {
      /**
       * 注意：如果要发送Cookie，此处不能设置成*，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源策略，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
       * 如果配置了此参数，security插件中domainWhiteList参数将失效，否则启用
       */
      origin: '*',
      /**
       * 本次预检请求的缓存有效时间，单位 秒，且在webkit内核下，最大值为5分钟
       * 注意：此处如果客户端控制台如果将disable cache启用或者预检请求未通过，此缓存时间将不会生效
       */
      maxAge: 60,
      /**
       * @description 是否允许客户端发送Cookie，如果不需要或者不允许，直接设置成false或者删除它
       * @default false
       */
      credentials: true,
      /**
       * @description 服务端允许的方法
       * @default 'GET,HEAD,PUT,POST,DELETE,PATCH'
       */
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      /**
       * @description 允许客户端设置的自定义的头部字段，如果删除或者配置成空数组，将允许所有自定义头信息
       */
      allowHeaders: ['Authorization', 'Content-Type'],
      // 允许客户端读取的头部字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    },
    view: {
      defaultViewEngine: 'nunjucks',
      defaultExtension: '.njk',
    },
    i18n: {
      defaultLocale: 'zh-CN',
    },
    mysql: {
      client: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'coho',
        database: 'oauth',
      },
      app: true,
      agent: false,
    },
    sequelize: {
      // 模型挂载key
      delegate: 'model',
      // 模型文件文件夹名称
      baseDir: 'model',
      // logging(...args) {
      //   // if benchmark enabled, log used
      //   const used = typeof args[1] === 'number' ? `[${args[1]}ms]` : '';
      //   app.logger.info('[egg-sequelize]%s %s', used, args[0]);
      // },
      // 记录日志时是否带执行时间，即logging数组中第二个值
      benchmark: true,
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'oauth',
      username: 'root',
      password: 'coho',
      timezone: '+08:00',
      dialectOptions: {
        // 取消日期自动转字符串
        dateStrings: true,
        typeCast(field, next) {
          if (field.type === 'DATETIME') {
            return field.string();
          }

          return next();
        },
      },
      define: {
        underscored: true,
        freezeTableName: false,
      },
    },
    passportYuque: {
      key: 'gGywGzvMLSjsdFjGEpIs',
      secret: 'bxsjweclZss2dd8ohnfFJrZm8ZLCiavkna7UbB1o',
    },
    oAuth2Server: {
      debug: config.env === 'local',
      grants: ['password', 'authorization_code', 'refresh_token'],
      allowBearerTokensInQueryString: false,
      accessTokenLifetime: 2 * 60 * 60, // 2h 默认1h
      refreshTokenLifetime: 6 * 60 * 60, // 2h 默认两周
    },
    snowflake: {
      client: {
        machineId: 1,
        machineIdBitLength: 6,
        workerIdBitLength: 4,
        serialIdBitLength: 12,
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: 'coho',
        db: 0,
      },
      agent: true,
    },
    io: {
      init: { wsEngine: 'ws' },
      namespace: {
        '/': {
          connectionMiddleware: ['auth', 'connection'],
          packetMiddleware: ['packet'],
        },
        '/example': {
          connectionMiddleware: [],
          packetMiddleware: [],
        },
      },
      redis: {
        port: 6379,
        host: '127.0.0.1',
        auth_pass: 'coho',
        db: 1,
      },
    },
    swaggerdoc: {
      dirScanner: './app/controller', // 配置自动扫描的控制器路径。
      // 接口文档的标题，描述或其它。
      apiInfo: {
        title: 'NAPI', // 接口文档的标题。
        description: 'swagger-ui for NAPI document.', // 接口文档描述。
        version: 'v1.0.0', // 接口文档版本。
      },
      schemes: ['http', 'https'], // 配置支持的协议。
      consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
      produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
      securityDefinitions: {
        // 配置接口安全授权方式。
        // apikey: {
        //   type: 'apiKey',
        //   name: 'clientkey',
        //   in: 'header',
        // },
        oauth2: {
          type: 'oauth2',
          tokenUrl: 'http://localhost:7001/connect/token',
          flow: 'password',
          scopes: {
            'write:access_token': 'write access_token',
            'read:access_token': 'read access_token',
          },
        },
      },
      enableSecurity: true, // 是否启用授权，默认 false（不启用）。
      enableValidate: true, // 是否启用参数校验，默认 true（启用）。
      routerMap: false, // 是否启用自动生成路由，默认 true (启用)。
      enable: true, // 默认 true (启用)。
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
