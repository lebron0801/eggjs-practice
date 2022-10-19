'use strict';

module.exports = app => {
  return async (ctx, next) => {
    const { socket, logger } = ctx;
    await next();

    // execute when disconnect.
    logger.debug('disconnection!');
  };
};
