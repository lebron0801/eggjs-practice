'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;

    await queryInterface.changeColumn('sys_dict_details', 'cate_id', {
      type: STRING(36),
      comment: '分类id',
      allowNull: false,
    });

    await queryInterface.changeColumn('sys_dict_details', 'dict_name', {
      type: STRING(32),
      comment: '字典名称',
      allowNull: false,
    });

    await queryInterface.changeColumn('sys_dict_details', 'dict_value', {
      type: STRING(512),
      comment: '字典值',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    const { STRING } = Sequelize;

    await queryInterface.changeColumn('sys_dict_details', 'cate_id', {
      type: STRING(36),
      comment: '分类id',
    });

    await queryInterface.changeColumn('sys_dict_details', 'dict_name', {
      type: STRING(32),
      comment: '字典名称',
    });

    await queryInterface.changeColumn('sys_dict_details', 'dict_value', {
      type: STRING(512),
      comment: '字典值',
    });
  },
};
