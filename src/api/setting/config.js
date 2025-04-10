import { request } from '@/utils/request.js'

export default {
  /**
   * 获取配置列表
   * @returns
   */
  getConfigList(params) {
    return request({
      url: '/core/config/config/select',
      method: 'get',
      params
    })
  },

  /**
   * 清除缓存
   * @returns
   */
  clearCache(data = {}) {
    return request({
      url: '/core/config/config/clearCache',
      method: 'post',
      data
    })
  },

  /**
   * 删除配置
   * @returns
   */
  delete(data) {
    return request({
      url: '/core/config/config/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 保存配置
   * @returns
   */
  save(data = {}) {
    return request({
      url: '/core/config/config/insert',
      method: 'post',
      data
    })
  },

  /**
   * 更新配置
   * @returns
   */
  update(id, data = {}) {
    return request({
      url: '/core/config/config/update?id=' + id,
      method: 'post',
      data
    })
  },

  /**
   * 按 keys 更新配置
   * @returns
   */
  updateByKeys(data) {
    return request({
      url: '/core/config/config/updateByKeys',
      method: 'post',
      data
    })
  },

  /**
   * 批量修改配置值
   * @returns
   */
  batchUpdate(data) {
    return request({
      url: '/core/config/config/batchUpdate',
      method: 'post',
      data
    })
  },

  /**
   * 获取组列表
   * @returns
   */
  getConfigGroupList(params = {}) {
    return request({
      url: '/core/config/config-group/select',
      method: 'get',
      params
    })
  },

  /**
   * 保存配置组
   * @returns
   */
  saveConfigGroup(data = {}) {
    return request({
      url: '/core/config/config-group/insert',
      method: 'post',
      data
    })
  },

  /**
   * 更新配置组
   * @returns
   */
  updateConfigGroup(id, data = {}) {
    return request({
      url: '/core/config/config-group/update?id=' + id,
      method: 'post',
      data
    })
  },

  /**
   * 删除配置组
   * @returns
   */
  deleteConfigGroup(data = {}) {
    return request({
      url: '/core/config/config-group/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 邮箱测试
   * @returns
   */
  testEmail(data = {}) {
    return request({
      url: '/core/config/config-group/email',
      method: 'post',
      data
    })
  }
}
