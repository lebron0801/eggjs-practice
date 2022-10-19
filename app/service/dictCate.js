'use strict';

const Service = require('egg').Service;

class DictCateService extends Service {
  constructor(ctx) {
    super(ctx);
    this.tableName = 'SysDictCate';
    this.database = ctx.model[this.tableName];
  }

  /**
   * 查询所有字典分类
   * @param {object} params 查询条件
   * @return {Array} 字典分类列表数据
   */
  async index(params = {}) {
    return await this.database.findAll(params);
  }

  /**
   * 获取指定字典分类信息
   * @param {string} cateCode 分类编码
   * @return {Object} 指定的字典分类信息
   */
  async find(cateCode) {
    return await this.database.findOne({ where: { cateCode } });
  }

  /**
   * 创建字典分类数据
   * @param {object} body 字典分类信息
   * @return {object} 新创建的字典分类对象
   */
  async create(body) {
    return await this.database.create(body);
  }

  /**
   * 根据主键获取字典分类详情
   * @param {string} id 字典分类主键
   * @return {object} 字典分类详情
   */
  async findByPk(id) {
    return await this.database.findByPk(id);
  }

  /**
   * 删除指定字典分类，支持单个和批量
   * @param {string | Array<string>} id 字典分类编号
   */
  async destroyDictCate(id) {
    await this.database.destroy({ where: { id } });
  }
}

module.exports = DictCateService;
