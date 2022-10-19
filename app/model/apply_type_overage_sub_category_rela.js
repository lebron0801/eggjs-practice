'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const ApplyTypeOverageSubCategoryRela = app.model.define(
    'apply_type_overage_sub_category_rela',
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      tenantId: { type: STRING(36), comment: '租户编号' },
      applyTypeId: { type: STRING(36), comment: '申请类型编号' },
      overageSubCategoryId: {
        type: STRING(36),
        comment: '余额子类别编号',
      },
      sort: { type: SMALLINT, comment: '顺序' },
      remark: { type: STRING, comment: '描述' },
      createdAt: { type: DATE, comment: '创建时间' },
      updatedAt: { type: DATE, comment: '更新时间' },
      isDeleted: {
        type: BOOLEAN,
        comment: '是否逻辑删除',
        defaultValue: false,
      },
    }
  );

  return ApplyTypeOverageSubCategoryRela;
};
