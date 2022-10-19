'use strict';

module.exports = app => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx;
    ctx.socket.emit('res', 'packet received!');
    logger.debug('packet:', ctx.packet);
    await next();
  };
};
