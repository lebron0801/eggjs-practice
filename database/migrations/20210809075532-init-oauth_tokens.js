'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, UUIDV4 } = Sequelize;
    await queryInterface.createTable('oauth_tokens', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      access_token: { type: STRING, comment: '访问令牌' },
      access_token_expires_at: {
        type: DATE,
        comment: '访问令牌失效时间',
      },
      scope: { type: STRING, comment: '授权范围' },
      client_id: { type: STRING(50), comment: '客户端编号' },
      user_id: { type: STRING(36), comment: '用户编号' },
      created_at: { type: DATE, comment: '创建时间' },
      updated_at: { type: DATE, comment: '更新时间' },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_tokens');
  },
};
