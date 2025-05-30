import { request } from '@/utils/request.js'

export default {

  /**
   * 获取操作日志分页列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/core/monitor/log/sysLog',
      method: 'get',
      params
    })
  },

  /**
   * 删除
   * @returns
   */
  deletes(data) {
    return request({
      url: '/core/monitor/log/deleteOperLog',
      method: 'delete',
      data
    })
  }
}