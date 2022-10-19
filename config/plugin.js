'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportYuque: {
    enable: true,
    package: 'egg-passport-yuque',
  },
  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },
  tracer: {
    enable: true,
    package: 'egg-tracer',
  },
  snowflake: {
    enable: true,
    package: 'egg-snowflake',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
};
