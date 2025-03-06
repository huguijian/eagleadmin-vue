import { request } from '@/utils/request.js'

export default {
  /**
   * 获取数据列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/auth/role/select',
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
      url: '/auth/role/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 通过角色获取菜单
   * @returns
   */
  getMenuByRole(id) {
    return request({
      url: '/auth/role/get-menu-by-role?id=' + id,
      method: 'get'
    })
  },

  /**
   * 通过角色获取部门
   * @returns
   */
  getDeptByRole(id) {
    return request({
      url: '/auth/role/get-dept-by-role?id=' + id,
      method: 'get'
    })
  },

  /**
   * 添加数据
   * @returns
   */
  insert(data = {}) {
    return request({
      url: '/auth/role/insert',
      method: 'post',
      data
    })
  },

  /**
   * 移到回收站
   * @returns
   */
  delete(data) {
    return request({
      url: '/auth/role/delete',
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
      url: '/role/recovery',
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
      url: '/auth/role/realDestroy',
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
      url: '/auth/role/update?id=' + id,
      method: 'post',
      data
    })
  },

  /**
   * 更新菜单权限
   * @returns
   */
  updateMenuPermission(id, data) {
    return request({
      url: '/auth/role/update-menu-permission?id=' + id,
      method: 'post',
      data
    })
  },

  /**
   * 更新数据权限
   * @returns
   */
  updateDataPermission(id, data) {
    return request({
      url: '/auth/role/update-data-permission?id=' + id,
      method: 'post',
      data
    })
  },

  /**
   * 更改数据状态
   * @returns
   */
  changeStatus(params = {}) {
    return request({
      url: '/auth/role/changeStatus',
      method: 'post',
      data: params
    })
  }
}
