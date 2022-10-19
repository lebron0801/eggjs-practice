'use strict';

const Controller = require('@app/core/base_controller');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller DictDetailController
 */
class DictDetailController extends Controller {
  /**
   * @summary 获取字典详情
   * @description 获取字典分类下的字典详情列表
   * @router get /api/v1/dict-detail
   * @response 200 ResponseDictDetailListDto successful
   * @oauth2
   */
  async index() {
    const { ctx } = this;

    const data = await ctx.service.dictDetail.index();

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 创建字典明细
   * @description 创建字典明细数据
   * @router post /api/v1/dict-detail
   * @request body RequestDictDetailDto model 字典明细信息
   * @response 200 CommonCreateResponseDto successful
   * @oauth2
   */
  async create() {
    const { ctx } = this;

    const requestData = ctx.request.body.data;
    ctx.validate(ctx.rule.DictDetailDto, requestData);

    const {
      cateId,
      dictName,
      dictEnName,
      dictValue,
      remark,
      enable,
      sort,
      isDefault,
    } = requestData;

    const result = await ctx.service.dictDetail.find({ cateId, dictValue });

    if (result) {
      this.success({
        code: 400,
        msg: ctx.__('DataDuplication'),
      });

      return;
    }

    const data = await ctx.service.dictDetail.create({
      cateId,
      dictName,
      dictEnName,
      dictValue,
      remark,
      enable,
      sort,
      isDefault,
    });

    this.success({
      code: 200,
      msg: ctx.__('CreateSuccess'),
      data: {
        id: data.id,
      },
    });

    ctx.status = 201;
  }

  /**
   * @summary 获取单个字典明细
   * @description 获取单个字典明细
   * @router get /api/v1/dict-detail/{id}
   * @request path string id 字典明细编号
   * @response 200 ResponseDictDetailDetailDto successful
   * @oauth2
   */
  async show() {
    const { ctx } = this;

    const id = ctx.params.id;
    const data = await ctx.service.dictDetail.findByPk(id);

    !data && this.notFound();

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 更新字典明细详情
   * @description 更新字典明细详情
   * @router put /api/v1/dict-detail/{id}
   * @request path string id 字典明细编号
   * @request body RequestDictDetailDto model 字典明细信息
   * @response 204
   * @oauth2
   */
  async update() {
    const { ctx } = this;
    const requestData = ctx.request.body.data;

    ctx.validate(ctx.rule.DictDetailDto, requestData);
    const id = ctx.params.id;

    const {
      cateId,
      dictName,
      dictEnName,
      dictValue,
      remark,
      enable,
      sort,
      isDefault,
    } = requestData;

    const result = await ctx.service.dictDetail.findByPk(id);
    !result && this.notFound();

    // 判断字典明细所在的字典分类是否存在
    const cateRaw = await ctx.service.dictCate.findByPk(cateId);
    !cateRaw && this.notFound();

    const data = await ctx.service.dictDetail.find({ cateId, dictValue });
    if (data && data.id !== id) {
      this.success({
        code: 400,
        msg: ctx.__('DataDuplication'),
      });
    }

    await result.update({
      cateId,
      dictName,
      dictEnName,
      dictValue,
      remark,
      enable,
      sort,
      isDefault,
    });

    ctx.status = 204;
  }

  /**
   * @summary 删除字典明细
   * @description 删除字典明细
   * @router delete /api/v1/dict-detail/{id}
   * @request path string id 字典明细编号
   * @response 200 BaseResponseDto successful
   * @oauth2
   */
  async destroy() {
    const { ctx } = this;

    const id = ctx.params.id;
    const data = await ctx.service.dictDetail.findByPk(id);

    !data && this.notFound();

    await data.destroy();

    this.success({
      code: 200,
      msg: ctx.__('DeleteSuccess'),
    });
  }

  /**
   * @summary 批量删除字典明细
   * @description 批量删除字典明细
   * @router post /api/v1/dict-detail/batch
   * @request body CommonBatchDeleteDto model 字典明细编号列表
   * @response 200 BaseResponseDto successful
   * @oauth2
   */
  async destroies() {
    const { ctx } = this;

    const { ids } = ctx.request.body.data;
    await ctx.service.dictDetail.destroyDictDetail(ids);

    this.success({
      code: 200,
      msg: ctx.__('DeleteSuccess'),
    });
  }

  /**
   * @summary 查询带分页的字典详情列表
   * @description 根据字典分类编号获取指定字典详情分页列表
   * @router get /api/v1/dict/detail/{cateId}
   * @request path string cateId 分类编号
   * @request query integer pageIndex 当前页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 ResponseDictDetailListDto successful
   * @oauth2
   */
  async list() {
    const { ctx } = this;

    const cateId = ctx.params.cateId;

    // 分页参数
    const { pageIndex, pageSize } = Object.assign(
      { pageIndex: 1, pageSize: 10 },
      ctx.query
    );

    const params = {
      where: { cateId },
      order: [['createdAt', 'DESC']],
    };

    if (pageSize !== -1) {
      Object.assign(params, {
        limit: toInt(pageSize),
        offset: toInt(pageSize * (pageIndex - 1)),
      });
    }

    const data = await ctx.service.dictDetail.indexCount(params);

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data: {
        list: data.rows,
        pageData: {
          total: data.count,
        },
      },
    });
  }
}

module.exports = DictDetailController;
