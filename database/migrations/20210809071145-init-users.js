'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建此表
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, UUIDV4 } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键数据',
      },
      user_id: { type: STRING(36), comment: '用户编号' },
      name: { type: STRING(30), comment: '人员名称' },
      username: { type: STRING, comment: '用户名' },
      password: { type: STRING, comment: '密码' },
      created_at: { type: DATE, comment: '创建时间' },
      updated_at: { type: DATE, comment: '更新时间' },
    });
  },
  // 在执行数据库降级时调用的函数，删除此表
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
