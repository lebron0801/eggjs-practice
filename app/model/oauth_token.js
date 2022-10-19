'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV4 } = app.Sequelize;

  const OauthToken = app.model.define('oauth_token', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    accessToken: { type: STRING, comment: '访问令牌' },
    accessTokenExpiresAt: { type: DATE, comment: '访问令牌失效时间' },
    scope: { type: STRING, comment: '授权范围' },
    clientId: { type: STRING(50), comment: '客户端编号' },
    userId: { type: STRING(36), comment: '用户编号' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
  });

  return OauthToken;
};
