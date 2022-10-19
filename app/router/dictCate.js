'use strict';

module.exports = app => {
  const { router, controller } = app;
  const apiV1Router = router.namespace('/api/v1');
  apiV1Router.resources('/dict-cate', controller.v1.dictCate);

  // 删除多个类别
  apiV1Router.post('/dict-cate/batch', controller.v1.dictCate.destroies);
};
