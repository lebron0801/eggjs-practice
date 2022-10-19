'use strict';

const BaseResponseDto = require('./response').BaseResponseDto;
const BaseRequestDto = require('./request').BaseRequestDto;

module.exports = {
  DictCateDto: {
    groupId: { type: 'string', comment: '分组编号', required: true },
    cateCode: { type: 'string', comment: '分类编码', required: true },
    cateName: { type: 'string', comment: '分类名称', required: true },
    cateEnName: { type: 'string', comment: '分类英文名称', required: false },
    sort: { type: 'number', comment: '顺序', required: false },
    remark: { type: 'string', comment: '描述', required: false },
    enable: { type: 'boolean', comment: '是否启用', required: false },
  },
  RequestDictCateDto: {
    ...BaseRequestDto,
    data: {
      type: 'DictCateDto',
      comment: '业务数据',
      required: true,
    },
  },
  DictCateRawDto: {
    id: {
      type: 'string',
      comment: '主键',
    },
    tenantId: {
      type: 'string',
      comment: '租户编号',
    },
    groupId: {
      type: 'string',
      comment: '分组编号',
    },
    cateCode: {
      type: 'string',
      comment: '分类编码',
    },
    cateName: {
      type: 'string',
      comment: '分类名称',
    },
    cateEnName: {
      type: 'string',
      comment: '分类英文名称',
    },
    sort: {
      type: 'number',
      comment: '顺序',
    },
    remark: {
      type: 'string',
      comment: '描述',
    },
    enable: {
      type: 'boolean',
      comment: '是否启用',
    },
    isDeleted: {
      type: 'boolean',
      comment: '是否逻辑删除',
    },
  },
  ResponseDictCateListDto: {
    ...BaseResponseDto,
    data: {
      type: 'array',
      itemType: 'DictCateRawDto',
      comment: '业务数据',
      required: true,
    },
  },
  ResponseDictCateDetailDto: {
    ...BaseResponseDto,
    data: {
      type: 'DictCateRawDto',
      comment: '业务数据',
      required: true,
    },
  },
  ResponseDictCateDetailListDto: {
    ...BaseResponseDto,
    data: {
      type: 'array',
      itemType: 'SpecialCateDetailDto',
      comment: '业务数据',
      required: true,
    },
  },
  SpecialCateDetailDto: {
    dictName: {
      type: 'string',
      comment: '字典名称',
    },
    dictValue: {
      type: 'string',
      comment: '字典值',
    },
    cateName: {
      type: 'string',
      comment: '分类名称',
    },
    cateCode: {
      type: 'string',
      comment: '分类编码',
    },
  },
};
