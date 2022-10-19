'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const OverageSubCategory = app.model.define('overage_sub_category', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    tenantId: { type: STRING(36), comment: '租户编号' },
    code: { type: STRING(50), allowNull: false, comment: '子类别编码' },
    name: { type: STRING(50), allowNull: false, comment: '子类别名称' },
    enName: { type: STRING(50), comment: '子类别英文名称' },
    sort: { type: SMALLINT, comment: '顺序' },
    remark: { type: STRING, comment: '描述' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  return OverageSubCategory;
};
