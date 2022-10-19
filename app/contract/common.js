'use strict';

const BaseRequestDto = require('./request').BaseRequestDto;
const BaseResponseDto = require('./response').BaseResponseDto;

module.exports = {
  DataPrimaryInfo: {
    id: { type: 'string', required: true, comment: '数据编号' },
  },
  DataPrimaryList: {
    ids: {
      type: 'array',
      itemType: 'string',
      required: true,
      comment: '数据主键编号集合',
    },
  },
  /**
   * 通用批量删除请求体DTO
   */
  CommonBatchDeleteDto: {
    ...BaseRequestDto,
    data: {
      type: 'DataPrimaryList',
      required: true,
      comment: '业务数据',
    },
  },
  /**
   * 通用创建条目响应体DTO
   */
  CommonCreateResponseDto: {
    ...BaseResponseDto,
    data: {
      type: 'DataPrimaryInfo',
      comment: '业务数据',
      required: true,
    },
  },
};
