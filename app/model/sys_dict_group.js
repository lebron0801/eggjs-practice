'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const SysDictGroup = app.model.define('sys_dict_group', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    tenantId: { type: STRING(36), comment: '租户编号' },
    groupCode: { type: STRING(50), allowNull: false, comment: '分组编码' },
    groupName: { type: STRING(50), allowNull: false, comment: '分组名称' },
    groupEnName: { type: STRING(50), comment: '分组英文名称' },
    sort: { type: SMALLINT, comment: '顺序' },
    remark: { type: STRING, comment: '描述' },
    enable: { type: BOOLEAN, comment: '是否启用' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  // 定义关联关系
  SysDictGroup.associate = () => {
    app.model.SysDictGroup.hasMany(app.model.SysDictCate, {
      // 外键定义在目标模型中
      foreignKey: 'groupId',
      // 源键定义在源模型中，默认值为id
      sourceKey: 'id',
      // 指向目标模型，如果不定义，默认值为模型名称的复数，即define函数中第一个参数
      as: 'dictCateLists',
    });

    app.model.SysDictCate.belongsTo(app.model.SysDictGroup, {
      // 外键定义在源模型中
      foreignKey: 'groupId',
      // 目标键定义在目标模型中，默认值为id
      targetKey: 'id',
      // 指向目标模型，如果不定义，默认值为模型名称，即define函数第一个参数
      as: 'dictGroup',
    });
  };

  return SysDictGroup;
};
