'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, SMALLINT, BOOLEAN, UUIDV4 } = Sequelize;
    await queryInterface.createTable('apply_types', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      tenant_id: { type: STRING(36), comment: '租户编号' },
      code: {
        type: STRING(50),
        allowNull: false,
        comment: '申请类型编码',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        comment: '申请类型名称',
      },
      en_name: { type: STRING(50), comment: '申请类型英文名称' },
      apply_type_category_id: {
        type: STRING(36),
        allowNull: false,
        comment: '申请类型所属分类编号',
      },
      apply_data_type_code: {
        type: STRING(36),
        allowNull: false,
        comment: '申请数据类型，字典数据',
      },
      enable: { type: BOOLEAN, comment: '启用状态' },
      sort: { type: SMALLINT, comment: '顺序' },
      is_overage: { type: BOOLEAN, comment: '是否启用余额' },
      overage_deduct_rule: { type: STRING(50), comment: '余额扣除规则' },
      is_salary: { type: BOOLEAN, comment: '是否带薪' },
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('apply_types');
  },
};
