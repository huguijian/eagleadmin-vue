import { request } from '@/utils/request.js'

export default {
  /**
   * 获取岗位分页列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/auth/post/select',
      method: 'get',
      params
    })
  },

  /**
   * 从回收站获取系统公告数据列表
   * @returns
   */
  getRecyclePageList(params = {}) {
    return request({
      url: '/auth/post/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 添加岗位
   * @returns
   */
  save(params = {}) {
    return request({
      url: '/auth/post/insert',
      method: 'post',
      data: params
    })
  },

  /**
   * 移到回收站
   * @returns
   */
  delete(data) {
    return request({
      url: '/auth/post/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 恢复系统公告数据
   * @returns
   */
  recovery(data) {
    return request({
      url: '/auth/post/recovery',
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
      url: '/auth/post/realDestroy',
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
      url: '/auth/post/update',
      method: 'post',
      data
    })
  },

  /**
   * 更改岗位状态
   * @returns
   */
  changeStatus(data = {}) {
    return request({
      url: '/auth/post/changeStatus',
      method: 'post',
      data
    })
  }
}
