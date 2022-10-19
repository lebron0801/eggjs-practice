'use strict';

module.exports = {
  BaseResponseDto: {
    code: {
      type: 'number',
      comment: '业务状态码',
      required: true,
      example: 200,
    },
    msg: {
      type: 'string',
      comment: '消息',
      required: true,
      example: '操作成功!',
    },
  },
};
