'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV4 } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键数据',
    },
    userId: { type: STRING(36), comment: '用户编号' },
    name: { type: STRING(30), comment: '人员名称' },
    username: { type: STRING, comment: '用户名' },
    password: { type: STRING, comment: '密码' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
  });

  return User;
};
