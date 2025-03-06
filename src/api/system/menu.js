import { request } from '@/utils/request.js'

export default {
  /**
   * 获取数据
   * @returns
   */
  getList(params = {}) {
    return request({
      url: '/auth/menu/index',
      method: 'get',
      params
    })
  },

  /**
   * 从回收站获取数据列表
   * @returns
   */
  getRecyclePageList(params = {}) {
    return request({
      url: '/auth/menu/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 添加数据
   * @returns
   */
  save(params = {}) {
    return request({
      url: '/auth/menu/insert',
      method: 'post',
      data: params
    })
  },

  /**
   * 删除数据
   * @returns
   */
  delete(data) {
    return request({
      url: '/auth/menu/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 恢复数据
   * @returns
   */
  recovery(data) {
    return request({
      url: '/auth/menu/recovery',
      method: 'post',
      data
    })
  },

  /**
   * 真实删除数据
   * @returns
   */
  realDestroy(data) {
    return request({
      url: '/auth/menu/real-destroy',
      method: 'delete',
      data
    })
  },

  /**
   * 更新数据
   * @returns
   */
  update(id, data = {}) {
    return request({
      url: '/auth/menu/update?id=' + id,
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
      url: '/auth/menu/change-status',
      method: 'post',
      data
    })
  }
}
