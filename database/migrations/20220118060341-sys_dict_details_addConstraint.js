'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 增加约束操作
    await queryInterface.addConstraint('sys_dict_details', {
      fields: ['cate_id'],
      type: 'foreign key',
      name: 'cateIdFk',
      references: {
        table: 'sys_dict_cates',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 移除约束操作
    await queryInterface.removeConstraint('sys_dict_details', 'cateIdFk');
  },
};
