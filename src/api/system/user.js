import { request } from '@/utils/request.js'

export default {
  /**
   * 获取数据列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/auth/user/select',
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
      url: '/auth/user/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 读取数据
   * @returns
   */
  read(id) {
    return request({
      url: '/auth/user/update?id=' + id,
      method: 'get'
    })
  },

  /**
   * 添加数据
   * @returns
   */
  insert(params = {}) {
    return request({
      url: '/auth/user/insert',
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
      url: '/auth/user/delete',
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
      url: '/auth/user/recovery',
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
      url: '/auth/user/realDestroy',
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
      url: '/auth/user/update?id=' + id,
      method: 'post',
      data
    })
  },

  /**
   * 更改数据状态
   * @returns
   */
  changeStatus(data = {}) {
    return request({
      url: '/auth/user/change-status',
      method: 'post',
      data
    })
  },

  /**
   * 清除用户缓存
   * @returns
   */
  clearCache(params = {}) {
    return request({
      url: '/auth/user/clearCache',
      method: 'post',
      data: params
    })
  },

  /**
   * 设置用户首页
   * @returns
   */
  setHomePage(data = {}) {
    return request({
      url: '/auth/user/setHomePage',
      method: 'post',
      data
    })
  },

  /**
   * 初始化用户密码
   * @returns
   */
  initUserPassword(data) {
    return request({
      url: '/auth/user/init-password',
      method: 'post',
      data
    })
  },

  /**
   * 用户更新个人资料
   * @returns
   */
  updateInfo(data = {}) {
    return request({
      url: '/auth/user/update',
      method: 'post',
      data
    })
  },

  /**
   * 用户修改密码
   * @returns
   */
  modifyPassword(data = {}) {
    return request({
      url: '/auth/user/modifypassword',
      method: 'post',
      data
    })
  }
}
