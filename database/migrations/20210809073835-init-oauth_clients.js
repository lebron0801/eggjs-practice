'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, UUIDV4 } = Sequelize;
    await queryInterface.createTable('oauth_clients', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      client_id: { type: STRING(50), comment: '客户端编号' },
      client_secret: { type: STRING(200), comment: '客户端密钥' },
      redirect_uri: { type: STRING, comment: '重定向地址' },
      grants: { type: STRING, comment: '授权方式' },
      created_at: { type: DATE, comment: '创建时间' },
      updated_at: { type: DATE, comment: '更新时间' },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_clients');
  },
};
