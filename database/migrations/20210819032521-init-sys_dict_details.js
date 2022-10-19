'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DATE, STRING, SMALLINT, BOOLEAN, UUIDV4 } = Sequelize;
    await queryInterface.createTable('sys_dict_details', {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '主键',
      },
      cate_id: { type: STRING(36), comment: '分类id' },
      parent_id: { type: STRING(36), comment: '父类id' },
      dict_name: { type: STRING(32), comment: '字典名称' },
      dict_en_name: { type: STRING(256), comment: '字典英文名称' },
      dict_value: { type: STRING(512), comment: '字典值' },
      ext_value: { type: STRING(128), comment: '扩展值' },
      sort: { type: SMALLINT, comment: '顺序' },
      remark: { type: STRING, comment: '描述' },
      is_default: { type: BOOLEAN, comment: '是否默认' },
      enable: { type: BOOLEAN, comment: '是否启用' },
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
    await queryInterface.dropTable('sys_dict_details');
  },
};
