'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const FooBarRela = app.model.define('foo_bar_rela', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    fooId: {
      type: STRING(36),
      primaryKey: false,
      defaultValue: UUIDV4,
      comment: '外键',
    },
    barId: {
      type: STRING(36),
      primaryKey: false,
      defaultValue: UUIDV4,
      comment: '外键',
    },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  return FooBarRela;
};
