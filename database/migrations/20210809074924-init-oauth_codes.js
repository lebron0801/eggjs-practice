'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, UUIDV4 } = Sequelize;
    await queryInterface.createTable('oauth_codes', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      code: { type: STRING, comment: '授权码' },
      expires_at: { type: DATE, comment: '失效时间' },
      redirect_uri: { type: STRING, comment: '重定向地址' },
      scope: { type: STRING, comment: '授权范围' },
      client_id: { type: STRING(50), comment: '客户端编号' },
      user_id: { type: STRING(36), comment: '用户编号' },
      created_at: { type: DATE, comment: '创建时间' },
      updated_at: { type: DATE, comment: '更新时间' },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_codes');
  },
};
