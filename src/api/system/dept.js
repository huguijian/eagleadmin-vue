import { request } from '@/utils/request.js'

export default {
  /**
   * 获取部门树
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/auth/dept/select',
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
      url: '/auth/dept/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 获取部门领导列表
   * @returns
   */
  getLeaderList(params = {}) {
    return request({
      url: '/auth/dept/leaders',
      method: 'get',
      params
    })
  },

  /**
   * 新增部门领导
   * @returns
   */
  addLeader(data = {}) {
    return request({
      url: '/auth/dept/addLeader',
      method: 'post',
      data
    })
  },

  /**
   * 删除部门领导
   * @returns
   */
  delLeader(data = {}) {
    return request({
      url: '/auth/dept/delLeader',
      method: 'delete',
      data
    })
  },

  /**
   * 获取部门选择树
   * @returns
   */
  tree() {
    return request({
      url: '/auth/dept/index?tree=true',
      method: 'get'
    })
  },

  /**
   * 添加部门
   * @returns
   */
  save(params = {}) {
    return request({
      url: '/auth/dept/insert',
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
      url: '/auth/dept/delete',
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
      url: '/auth/dept/recovery',
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
      url: '/auth/dept/real-destroy',
      method: 'delete',
      data
    })
  },

  /**
   * 更新数据
   * @returns
   */
  update(params = {}) {
    return request({
      url: '/auth/dept/update',
      method: 'post',
      data: params
    })
  },

  /**
   * 更改状态
   * @returns
   */
  changeStatus(data = {}) {
    return request({
      url: '/auth/dept/changeStatus',
      method: 'post',
      data
    })
  }
}
