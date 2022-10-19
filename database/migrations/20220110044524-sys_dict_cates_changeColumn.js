'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;

    await queryInterface.changeColumn('sys_dict_cates', 'group_id', {
      type: STRING(36),
      allowNull: false,
      comment: '分组编号',
    });
  },

  down: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;

    await queryInterface.changeColumn('sys_dict_cates', 'group_id', {
      type: STRING(36),
      comment: '分组编号',
    });
  },
};
