'use strict';

const BaseResponseDto = require('./response').BaseResponseDto;
const BaseRequestDto = require('./request').BaseRequestDto;
const DictCateRawDto = require('./dictCate').DictCateRawDto;

const DictGroupRawDto = {
  id: {
    type: 'string',
    comment: '主键',
  },
  tenantId: {
    type: 'string',
    comment: '租户编号',
  },
  groupCode: {
    type: 'string',
    comment: '分组编码',
  },
  groupName: {
    type: 'string',
    comment: '分组名称',
  },
  groupEnName: {
    type: 'string',
    comment: '分组英文名称',
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
};

module.exports = {
  DictGroupDto: {
    groupCode: { type: 'string', comment: '分组编码', required: true },
    groupName: { type: 'string', comment: '分组名称', required: true },
    groupEnName: { type: 'string', comment: '分组英文名称', required: false },
    sort: { type: 'number', comment: '顺序', required: false },
    remark: { type: 'string', comment: '描述', required: false },
    enable: { type: 'boolean', comment: '是否启用', required: false },
  },
  RequestDictGroupDto: {
    ...BaseRequestDto,
    data: {
      type: 'DictGroupDto',
      comment: '业务数据',
      required: true,
    },
  },
  DictGroupRawDto,
  ResponseDictGroupListDto: {
    ...BaseResponseDto,
    data: {
      type: 'array',
      itemType: 'DictGroupRawDto',
      comment: '业务数据',
      required: true,
    },
  },
  ResponseDictGroupDetailDto: {
    ...BaseResponseDto,
    data: {
      type: 'DictGroupRawDto',
      comment: '业务数据',
      required: true,
    },
  },
  ResponseDictTree: {
    ...BaseRequestDto,
    data: {
      type: 'array',
      itemType: 'ResponseDictTreeCate',
      comment: '业务数据',
      required: true,
    },
  },
  ResponseDictTreeCate: {
    ...DictGroupRawDto,
    dictCateLists: {
      type: 'array',
      itemType: 'ResponseDictTreeDetail',
      comment: '字典分类列表数据',
      required: true,
    },
  },
  ResponseDictTreeDetail: {
    ...DictCateRawDto,
    dictDetailLists: {
      type: 'array',
      itemType: 'DictDetailRawDto',
      comment: '字典明细列表数据',
      required: true,
    },
  },
};
