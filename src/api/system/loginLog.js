import { request } from '@/utils/request.js'

export default {

  /**
   * 获取登录日志分页列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/monitor/log/loginLog',
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
      url: '/monitor/log/deleteLoginLog',
      method: 'delete',
      data
    })
  }
}