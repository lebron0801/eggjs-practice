'use strict';

module.exports = app => {
  const { router, controller } = app;
  const apiV1Router = router.namespace('/api/v1');
  apiV1Router.resources('/dict-detail', controller.v1.dictDetail);

  // 删除多个类别
  apiV1Router.post('/dict-detail/batch', controller.v1.dictDetail.destroies);
};
