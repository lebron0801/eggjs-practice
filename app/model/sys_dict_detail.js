'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const SysDictDetail = app.model.define('sys_dict_detail', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    cateId: { type: STRING(36), comment: '分类id' },
    parentId: { type: STRING(36), comment: '父类id' },
    dictName: { type: STRING(32), comment: '字典名称' },
    dictEnName: { type: STRING(256), comment: '字典英文名称' },
    dictValue: { type: STRING(512), comment: '字典值' },
    extValue: { type: STRING(128), comment: '扩展值' },
    sort: { type: SMALLINT, comment: '顺序' },
    remark: { type: STRING, comment: '描述' },
    isDefault: { type: BOOLEAN, comment: '是否默认' },
    enable: { type: BOOLEAN, comment: '是否启用' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  return SysDictDetail;
};
