'use strict';

module.exports = app => {
  const { router, controller } = app;
  const apiV1Router = router.namespace('/api/v1');
  apiV1Router.resources('/dict-group', controller.v1.dictGroup);

  // 删除多个分组
  apiV1Router.post('/dict-group/batch', controller.v1.dictGroup.destroies);
};
