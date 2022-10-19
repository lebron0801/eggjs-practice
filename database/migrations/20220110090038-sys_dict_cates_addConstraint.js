'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 增加约束操作
    await queryInterface.addConstraint('sys_dict_cates', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'groupIdFk',
      references: {
        table: 'sys_dict_groups',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 移除约束操作
    await queryInterface.removeConstraint('sys_dict_cates', 'groupIdFk');
  },
};
