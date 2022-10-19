'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;

    await queryInterface.addColumn('sys_dict_cates', 'group_id', {
      type: STRING(36),
      comment: '分组编号',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sys_dict_cates', 'group_id');
  },
};
