'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const Bar = app.model.define('bar', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    name: {
      type: STRING(36),
      allowNull: false,
      comment: '名称',
    },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  // 定义关联关系
  Bar.associate = () => {
    app.model.Foo.belongsToMany(app.model.Bar, { through: 'foo_bar_rela' });
  };

  return Bar;
};
