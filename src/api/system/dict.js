import { request } from '@/utils/request.js'

export const dictType = {
  /**
   * 获取字典类型，无分页
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/data/dictCategory/select',
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
      url: '/data/dictCategory/recycle',
      method: 'get',
      params
    })
  },

  /**
   * 添加字典类型
   * @returns
   */
  save(params = {}) {
    return request({
      url: '/data/dictCategory/insert',
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
      url: '/data/dictCategory/destroy',
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
      url: '/data/dictCategory/recovery',
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
      url: '/data/dictCategory/realDestroy',
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
      url: '/data/dictCategory/update',
      method: 'post',
      data
    })
  },

  /**
   * 更改字典类型状态
   * @returns
   */
  changeStatus(data = {}) {
    return request({
      url: '/data/dictCategory/changeStatus',
      method: 'post',
      data
    })
  }
}

export const dict = {
  /**
   * 快捷查询字典
   * @param {*} params
   * @returns
   */
  getDict(code) {
    return request({
      url: '/data/dict/index?code=' + code,
      method: 'get'
    })
  },

  /**
   * 获取字典数据分页列表
   * @returns
   */
  getPageList(params = {}) {
    return request({
      url: '/data/dict/select',
      method: 'get',
      params
    })
  },

  /**
   * 添加字典数据
   * @returns
   */
  saveDictData(data = {}) {
    return request({
      url: '/data/dict/insert',
      method: 'post',
      data
    })
  },

  /**
   * 移到回收站
   * @returns
   */
  deletesDictData(data) {
    return request({
      url: '/data/dict/delete',
      method: 'delete',
      data
    })
  },

  /**
   * 更新数据
   * @returns
   */
  updateDictData(data) {
    return request({
      url: '/data/dict/update',
      method: 'post',
      data
    })
  },

  /**
   * 清空缓存
   * @returns
   */
  clearCache() {
    return request({
      url: '/data/dict/clearCache',
      method: 'post'
    })
  },

  /**
   * 更改字典状态
   * @returns
   */
  changeStatus(data = {}) {
    return request({
      url: '/data/dict/changeStatus',
      method: 'post',
      data
    })
  }
}