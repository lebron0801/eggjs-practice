'use strict';

const Controller = require('@app/core/base_controller');

/**
 * @controller DictGroupController
 */
class DictGroupController extends Controller {
  /**
   * @summary 获取字典分组集合
   * @description 此接口获取全量字典表分组列表数据
   * @router get /api/v1/dict-group
   * @response 200 ResponseDictGroupListDto successful
   * @oauth2
   */
  async index() {
    const { ctx } = this;

    const data = await ctx.service.dictGroup.index();

    // 原始查询方式
    /* const results = await ctx.model.query('select * from sys_dict_groups', {
      // 引用模型
      model: ctx.model.SysDictGroup,
      // 是否映射到模型中
      mapToModel: true,
    }); */

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 创建字典分组
   * @description 创建字典分组
   * @router post /api/v1/dict-group
   * @request body RequestDictGroupDto model 字典分组信息
   * @response 200 CommonCreateResponseDto successful
   * @oauth2
   */
  async create() {
    const { ctx } = this;

    ctx.validate(ctx.rule.DictGroupDto, ctx.request.body.data);

    const { groupCode, groupName, groupEnName, remark, enable, sort } =
      ctx.request.body.data;

    const result = await ctx.service.dictGroup.find(groupCode);

    if (result) {
      this.success({
        code: 400,
        msg: ctx.__('CodeDuplication'),
      });

      return;
    }

    const data = await ctx.service.dictGroup.create({
      groupCode,
      groupName,
      groupEnName,
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
   * @summary 获取单个字典分组明细
   * @description 获取单个字典分组明细
   * @router get /api/v1/dict-group/{id}
   * @request path string id 字典分组编号
   * @response 200 ResponseDictGroupDetailDto successful
   * @oauth2
   */
  async show() {
    const { ctx } = this;

    const id = ctx.params.id;
    const data = await ctx.service.dictGroup.findByPk(id);

    !data && this.notFound();

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }

  /**
   * @summary 更新字典分组详情
   * @description 更新字典分组详情
   * @router put /api/v1/dict-group/{id}
   * @request path string id 字典分组编号
   * @request body RequestDictGroupDto model 字典分组信息
   * @response 204
   * @oauth2
   */
  async update() {
    const { ctx } = this;

    ctx.validate(ctx.rule.DictGroupDto, ctx.request.body.data);

    const { groupCode, groupName, groupEnName, remark, enable, sort } =
      ctx.request.body.data;

    const id = ctx.params.id;
    const result = await ctx.service.dictGroup.findByPk(id);

    !result && this.notFound();

    const data = await ctx.service.dictGroup.find(groupCode);
    if (data && data.id !== id) {
      this.success({
        code: 400,
        msg: ctx.__('CodeDuplication'),
      });

      return;
    }

    await result.update({
      groupCode,
      groupName,
      groupEnName,
      remark,
      enable,
      sort,
    });

    ctx.status = 204;
  }

  /**
   * @summary 删除字典分组
   * @description 删除字典分组
   * @router delete /api/v1/dict-group/{id}
   * @request path string id 字典分组编号
   * @response 200 BaseResponseDto successful
   * @oauth2
   */
  async destroy() {
    const { ctx } = this;

    const id = ctx.params.id;
    const data = await ctx.service.dictGroup.findByPk(id);

    !data && this.notFound();

    await data.destroy();

    this.success({
      code: 200,
      msg: ctx.__('DeleteSuccess'),
    });
  }

  /**
   * @summary 批量删除字典分组
   * @description 批量删除字典分组
   * @router post /api/v1/dict-group/batch
   * @request body CommonBatchDeleteDto model 字典分组编号列表
   * @response 200 BaseResponseDto successful
   * @oauth2
   */
  async destroies() {
    const { ctx } = this;

    const { ids } = ctx.request.body.data;
    await ctx.service.dictGroup.destroyDictGroup(ids);

    this.success({
      code: 200,
      msg: ctx.__('DeleteSuccess'),
    });
  }

  /**
   * @summary 获取字典所有数据
   * @description 此接口获取全量字典表所有列表数据
   * @router get /api/v1/dict/all
   * @response 200 ResponseDictTree successful
   * @oauth2
   */
  async list() {
    const { ctx } = this;
    const { col, Op } = ctx.app.Sequelize;

    const params = {
      include: [
        {
          model: ctx.model.SysDictCate,
          as: 'dictCateLists',
          attributes: ['id', 'cateCode', 'cateName'],
          include: [
            {
              model: ctx.model.SysDictDetail,
              as: 'dictDetailLists',
              attributes: ['id', 'dictValue', 'dictName', 'enable'],
            },
          ],
        },
      ],
      attributes: ['id', 'groupCode', 'groupName'],
    };

    const data = await ctx.service.dictGroup.index(params);

    this.success({
      code: 200,
      msg: ctx.__('OptSuccess'),
      data,
    });
  }
}

module.exports = DictGroupController;
