'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const ApplyType = app.model.define('apply_type', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    tenantId: { type: STRING(36), comment: '租户编号' },
    code: { type: STRING(50), allowNull: false, comment: '申请类型编码' },
    name: { type: STRING(50), allowNull: false, comment: '申请类型名称' },
    enName: { type: STRING(50), comment: '申请类型英文名称' },
    applyTypeCategoryId: {
      type: STRING(36),
      allowNull: false,
      comment: '申请类型所属分类编号',
    },
    applyDataTypeCode: {
      type: STRING(36),
      allowNull: false,
      comment: '申请数据类型，字典数据',
    },
    enable: { type: BOOLEAN, comment: '启用状态' },
    sort: { type: SMALLINT, comment: '顺序' },
    isOverage: { type: BOOLEAN, comment: '是否启用余额' },
    overageDeductRule: { type: STRING(50), comment: '余额扣除规则' },
    isSalary: { type: BOOLEAN, comment: '是否带薪' },
    remark: { type: STRING, comment: '描述' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  ApplyType.associate = () => {
    app.model.ApplyType.belongsTo(app.model.ApplyTypeCategory, {
      foreignKey: 'applyTypeCategoryId',
      targetKey: 'id',
      as: 'applyTypeCategoryInfo',
    });
  };

  return ApplyType;
};
