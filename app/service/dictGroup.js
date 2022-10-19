'use strict';

const Service = require('egg').Service;

class DictGroupService extends Service {
  constructor(ctx) {
    super(ctx);
    this.tableName = 'SysDictGroup';
    this.database = ctx.model[this.tableName];
  }

  /**
   * 查询所有字典分组
   * @param {object} params 查询参数
   * @return {Array} 字典分组列表数据
   */
  async index(params = {}) {
    return await this.database.findAll(params);
  }

  /**
   * 获取指定的字典分组信息
   * @param {string} groupCode 字典分组编码
   * @return {Object} 指定的字典分组信息
   */
  async find(groupCode) {
    return await this.database.findOne({ where: { groupCode } });
  }

  /**
   * 创建字典分组
   * @param {object} body 字典分组字段信息
   * @return {object} 新创建的字典分组信息
   */
  async create(body) {
    return await this.database.create(body);
  }

  /**
   * 根据主键获取字典分类详情
   * @param {string} id 字典分组主键
   * @return {Object} 字典分类详情
   */
  async findByPk(id) {
    return await this.database.findByPk(id);
  }

  /**
   * 删除指定字典分组，支持单个和批量
   * @param {string | Array<string>} id 字典分组编号
   */
  async destroyDictGroup(id) {
    await this.database.destroy({ where: { id } });
  }
}

module.exports = DictGroupService;
