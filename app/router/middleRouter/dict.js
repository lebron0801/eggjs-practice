'use strict';

module.exports = app => {
  const { router, controller } = app;
  const apiV1Router = router.namespace('/api/v1');

  // 获取字典全量数据
  apiV1Router.get('/dict/all', controller.v1.dictGroup.list);

  // 根据分类编号获取字典明细列表
  apiV1Router.get('/dict/detail/:cateId', controller.v1.dictDetail.list);

  // 根据字典分组获取字典分类列表
  apiV1Router.get('/dict/cate/:groupId', controller.v1.dictCate.list);

  // 获取字典分类-明细
  apiV1Router.get(
    '/dict/cate-detail/:cateId',
    controller.v1.dictCate.cateDetailList
  );
};
