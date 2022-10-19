'use strict';

module.exports = app => {
  const { STRING, DATE, SMALLINT, BOOLEAN, UUIDV4 } = app.Sequelize;

  const SysDictCate = app.model.define('sys_dict_cate', {
    id: {
      type: STRING(36),
      primaryKey: true,
      defaultValue: UUIDV4,
      comment: '主键',
    },
    tenantId: { type: STRING(36), comment: '租户编号' },
    groupId: { type: STRING(36), comment: '分组编号' },
    cateCode: { type: STRING(50), allowNull: false, comment: '编码' },
    cateName: { type: STRING(50), allowNull: false, comment: '分类名称' },
    cateEnName: { type: STRING(50), comment: '分类英文名称' },
    sort: { type: SMALLINT, comment: '顺序' },
    remark: { type: STRING, comment: '描述' },
    enable: { type: BOOLEAN, comment: '是否启用' },
    createdAt: { type: DATE, comment: '创建时间' },
    updatedAt: { type: DATE, comment: '更新时间' },
    isDeleted: {
      type: BOOLEAN,
      comment: '是否逻辑删除',
      defaultValue: false,
    },
  });

  SysDictCate.associate = () => {
    app.model.SysDictCate.hasMany(app.model.SysDictDetail, {
      foreignKey: 'cateId',
      sourceKey: 'id',
      as: 'dictDetailLists',
    });

    app.model.SysDictDetail.belongsTo(app.model.SysDictCate, {
      foreignKey: 'cateId',
      targetKey: 'id',
      as: 'dictCate',
    });
  };

  return SysDictCate;
};
