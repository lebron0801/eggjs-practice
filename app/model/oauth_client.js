'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV4 } = app.Sequelize;

  const OauthClient = app.model.define('oauth_client', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    clientId: { type: STRING(50), comment: '客户端编号' },
    clientSecret: { type: STRING(200), comment: '客户端密钥' },
    redirectUri: { type: STRING, comment: '重定向地址' },
    grants: { type: STRING, comment: '授权方式' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
  });

  return OauthClient;
};
