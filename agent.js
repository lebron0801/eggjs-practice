'use strict';

const Subscriber = require('./lib/subscriber');

class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  configWillLoad() {
    // 配置文件即将加载，这是最后动态修改配置的时机
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
    // 配置文件加载完成
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    // 所有文件都已加载，准备启动插件
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
    // 所有插件都已启动，可以在应用程序准备好之前做一些事情
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.

    // 也可以通过 messenger 对象发送消息给 App Worker
    // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
    this.agent.messenger.on('egg-ready', () => {
      // 通过agent进程发送消息给所有worker进程
      this.agent.messenger.sendToApp('lebron_action', {
        name: '张三',
        age: 23,
      });
    });
  }

  async serverDidReady() {
    this.agent.logger.info('agent服务启动成功!');
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AgentBootHook;
