'use strict';

const Controller = require('@app/core/base_controller');

/**
 * @controller DictCateController
 */
class DictCateController extends Controller {
  /**
   * @summary 获取字典类别集合
   * @description 获取全量字典类别
   * @router get /api/v1/dict-cate
   * @response 200 ResponseDictCateListDto successful
   * @oauth2
   */
  async index() {
    const { ctx } = this;

    const data = await ctx.service.dictCate.index();

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 创建字典分类
   * @description 创建字典分类
   * @router post /api/v1/dict-cate
   * @request body RequestDictCateDto model 字典分类信息
   * @response 200 CommonCreateResponseDto successful
   * @oauth2
   */
  async create() {
    const { ctx } = this;

    const requestData = ctx.request.body.data;

    ctx.validate(ctx.rule.DictCateDto, requestData);

    const { groupId, cateCode, cateName, cateEnName, remark, enable, sort } =
      requestData;

    const result = await ctx.service.dictCate.find(cateCode);

    if (result) {
      this.success({
        code: 400,
        msg: ctx.__('CodeDuplication'),
      });

      return;
    }

    const data = await ctx.service.dictCate.create({
      groupId,
      cateCode,
      cateName,
      cateEnName,
      remark,
      enable,
      sort,
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
   * @summary 获取单个字典分类明细
   * @description 获取单个字典分组明细
   * @router get /api/v1/dict-cate/{id}
   * @request path string id 字典分类编号
   * @response 200 ResponseDictCateDetailDto successful
   * @oauth2
   */
  async show() {
    const { ctx } = this;

    const id = ctx.params.id;
    const data = await ctx.service.dictCate.findByPk(id);

    !data && this.notFound();

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 更新字典分类详情
   * @description 更新字典分类详情
   * @router put /api/v1/dict-cate/{id}
   * @request path string id 字典分类编号
   * @request body RequestDictCateDto model 字典分类信息
   * @response 204
   * @oauth2
   */
  async update() {
    const { ctx } = this;
    const requestData = ctx.request.body.data;

    ctx.validate(ctx.rule.DictCateDto, requestData);
    const id = ctx.params.id;

    const { groupId, cateCode, cateName, cateEnName, remark, enable, sort } =
      requestData;

    const result = await ctx.service.dictCate.findByPk(id);
    !result && this.notFound();

    // 判断字典分类所在的字典分组是否存在
    const groupRaw = await ctx.service.dictGroup.findByPk(groupId);
    !groupRaw && this.notFound();

    const data = await ctx.service.dictCate.find(cateCode);
    if (data && data.id !== id) {
      this.success({
        code: 400,
        msg: ctx.__('CodeDuplication'),
      });
    }

    await result.update({
      groupId,
      cateCode,
      cateName,
      cateEnName,
      remark,
      enable,
      sort,
    });

    ctx.status = 204;
  }

  /**
   * @summary 删除字典分类
   * @description 删除字典分类
   * @router delete /api/v1/dict-cate/{id}
   * @request path string id 字典分类编号
   * @response 200 BaseResponseDto successful
   * @oauth2
   */
  async destroy() {
    const { ctx } = this;

    const id = ctx.params.id;
    const data = await ctx.service.dictCate.findByPk(id);

    !data && this.notFound();

    await data.destroy();

    this.success({
      code: 200,
      msg: ctx.__('DeleteSuccess'),
    });
  }

  /**
   * @summary 批量删除字典分类
   * @description 批量删除字典分类
   * @router post /api/v1/dict-cate/batch
   * @request body CommonBatchDeleteDto model 字典分类编号列表
   * @response 200 BaseResponseDto successful
   * @oauth2
   */
  async destroies() {
    const { ctx } = this;

    const { ids } = ctx.request.body.data;
    await ctx.service.dictCate.destroyDictCate(ids);

    this.success({
      code: 200,
      msg: ctx.__('DeleteSuccess'),
    });
  }

  /**
   * @summary 获取字典分类列表
   * @description 根据指定的分组编号获取分组列表数据
   * @router get /api/v1/dict/cate/{groupId}
   * @request path string groupId 分组编号
   * @response 200 ResponseDictCateListDto successful
   * @oauth2
   */
  async list() {
    const { ctx } = this;

    const groupId = ctx.params.groupId;
    const data = await ctx.service.dictCate.index({ where: { groupId } });

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 获取字典分组分类两级数据
   * @description 获取字典分组数据以及分类数据，两级树
   * @router get /api/v1/dict/cate-detail/{cateId}
   * @request path string cateId 字典分类编号
   * @response 200 ResponseDictCateDetailListDto successful
   * @oauth2
   */
  async cateDetailList() {
    const { ctx } = this;

    const cateId = ctx.params.cateId;
    const sequelize = ctx.app.Sequelize;

    const params = {
      where: {
        id: cateId,
      },
      include: [
        {
          model: ctx.model.SysDictDetail,
          as: 'dictDetailLists',
          attributes: [],
        },
      ],
      /**
       * 表示是否以行的方式展示数据结构，默认false
       * false 有层次结构
       * true 无层次结构 eg: 'dictDetailLists.dictName'
       */
      raw: true,
      attributes: [
        [sequelize.col('dictDetailLists.dict_name'), 'dictName'],
        [sequelize.col('dictDetailLists.dict_value'), 'dictValue'],
        'cateCode',
        'cateName',
      ],
    };

    const data = await ctx.service.dictCate.index(params);

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }
}

module.exports = DictCateController;
