import { request } from '@/utils/request.js'

export default {
  /**
   * 获取分页列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/core/tool/crontab/select',
      method: 'get',
      params
    })
  },

  /**
   * 获取任务日志列表
   * @returns
   */
  getLogPageList(params = {}) {
    return request({
      url: '/core/tool/crontab/logPageList',
      method: 'get',
      params
    })
  },

  /**
   * 删除定时任务日志
   * @returns
   */
  deleteLog(data) {
    return request({
      url: '/core/tool/crontab/deleteCrontabLog',
      method: 'delete',
      data
    })
  },

  /**
   * 立刻执行一次定时任务
   * @returns
   */
  run(data = {}) {
    return request({
      url: '/core/tool/crontab/run',
      method: 'post',
      data
    })
  },

  /**
   * 添加
   * @returns
   */
  save(data = {}) {
    return request({
      url: '/core/tool/crontab/save',
      method: 'post',
      data
    })
  },

  /**
   * 删除
   * @returns
   */
  delete(data) {
    return request({
      url: '/core/tool/crontab/destroy',
      method: 'delete',
      data
    })
  },

  /**
   * 更新数据
   * @returns
   */
  update(data) {
    return request({
      url: '/core/tool/crontab/update',
      method: 'post',
      data
    })
  },

  /**
   * 更改状态
   * @returns
   */
  changeStatus(data = {}) {
    return request({
      url: '/core/tool/crontab/changeStatus',
      method: 'post',
      data
    })
  }
}
