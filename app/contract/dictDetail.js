'use strict';

const BaseResponseDto = require('./response').BaseResponseDto;
const BaseRequestDto = require('./request').BaseRequestDto;

module.exports = {
  DictDetailDto: {
    cateId: { type: 'string', comment: '分类编号', required: true },
    dictName: { type: 'string', comment: '字典名称', required: true },
    dictEnName: { type: 'string', comment: '字典英文名称', required: false },
    dictValue: { type: 'string', comment: '字典值' },
    sort: { type: 'number', comment: '顺序', required: false },
    remark: { type: 'string', comment: '描述', required: false },
    enable: { type: 'boolean', comment: '是否启用', required: false },
    isDefault: { type: 'boolean', comment: '是否默认', required: false },
  },
  RequestDictDetailDto: {
    ...BaseRequestDto,
    data: {
      type: 'DictDetailDto',
      comment: '业务数据',
      required: true,
    },
  },
  DictDetailRawDto: {
    id: { type: 'string', comment: '主键' },
    cateId: { type: 'string', comment: '分类编号' },
    parentId: { type: 'string', comment: '父类id' },
    dictName: { type: 'string', comment: '字典名称' },
    dictEnName: { type: 'string', comment: '字典英文名称' },
    dictValue: { type: 'string', comment: '字典值' },
    extValue: { type: 'string', comment: '扩展值' },
    sort: { type: 'number', comment: '顺序' },
    remark: { type: 'string', comment: '描述' },
    isDefault: { type: 'boolean', comment: '是否默认' },
    enable: { type: 'boolean', comment: '是否启用' },
    isDeleted: { type: 'boolean', comment: '是否逻辑删除' },
  },
  ResponseDictDetailListDto: {
    ...BaseResponseDto,
    data: {
      type: 'array',
      itemType: 'DictDetailRawDto',
      comment: '业务数据',
      required: true,
    },
  },
  ResponseDictDetailDetailDto: {
    ...BaseResponseDto,
    data: {
      type: 'DictDetailRawDto',
      comment: '业务数据',
      required: true,
    },
  },
};
