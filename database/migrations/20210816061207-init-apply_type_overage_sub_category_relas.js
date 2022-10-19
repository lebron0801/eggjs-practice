'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, SMALLINT, BOOLEAN, UUIDV4 } = Sequelize;
    await queryInterface.createTable('apply_type_overage_sub_category_relas', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      tenant_id: { type: STRING(36), comment: '租户编号' },
      apply_type_id: { type: STRING(36), comment: '申请类型编号' },
      overage_sub_category_id: {
        type: STRING(36),
        comment: '余额子类别编号',
      },
      sort: { type: SMALLINT, comment: '顺序' },
      remark: { type: STRING, comment: '描述' },
      created_at: { type: DATE, comment: '创建时间' },
      updated_at: { type: DATE, comment: '更新时间' },
      is_deleted: {
        type: BOOLEAN,
        comment: '是否逻辑删除',
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('apply_type_overage_sub_category_relas');
  },
};
