'use strict';

const Service = require('egg').Service;

class DictDetailService extends Service {
  constructor(ctx) {
    super(ctx);
    this.tableName = 'SysDictDetail';
    this.database = ctx.model[this.tableName];
  }

  /**
   * 查询所有字典明细列表
   * @param {object} params 查询条件
   * @return {Array} 字典分类下的字典明细列表数据
   */
  async index(params = {}) {
    return await this.database.findAll(params);
  }

  /**
   * 查询带分页数据的字典明细列表
   * @param {object} params 查询条件
   * @returns {Array} 字典分类下的字典明细分页列表数据
   */
  async indexCount(params = {}) {
    return await this.database.findAndCountAll(params);
  }

  /**
   * 查询指定条件下的字典明细数据
   * @param {object} data 字典条件数据
   * @return {object} 指定条件下的字典明细数据
   */
  async find(data) {
    return await this.database.findOne({ where: data });
  }

  /**
   * 创建字典明细数据
   * @param {object} body 字典明细信息
   * @return {object} 新创建的字典明细对象
   */
  async create(body) {
    return await this.database.create(body);
  }

  /**
   * 根据主键获取字典明细详情
   * @param {string} id 字典明细主键
   * @return {object} 字典明细详情
   */
  async findByPk(id) {
    return await this.database.findByPk(id);
  }

  /**
   * 删除指定字典明细，支持单个和批量
   * @param {string | Array<string>} id 字典明细编号
   */
  async destroyDictDetail(id) {
    await this.database.destroy({ where: { id } });
  }
}

module.exports = DictDetailService;
