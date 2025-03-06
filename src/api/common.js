import { request } from '@/utils/request.js'

export default {
  /**
   * 获取用户列表
   * @returns
   */
  getUserList(params = {}) {
    return request({
      url: '/auth/user/select',
      method: 'get',
      params
    })
  },

  /**
   * 通过id 列表获取用户基础信息
   * @returns
   */
  getUserInfoByIds(data = {}) {
    return request({
      url: '/auth/user/getUserInfoByIds',
      method: 'post',
      data
    })
  },

  /**
   * 获取公告列表
   * @returns
   */
  getNoticeList(params = {}) {
    return request({
      url: '/core/system/notice',
      method: 'get',
      params
    })
  },

  /**
   * 清除所有缓存
   * @returns
   */
  clearAllCache() {
    return request({
      url: '/config/config/clearAllCache',
      method: 'get'
    })
  },

  /**
   * 上传图片接口
   * @returns
   */
  uploadImage(data = {}) {
    return request({
      url: '/common/upload',
      method: 'post',
      timeout: 30000,
      // headers: { 'Content-Type': 'multipart/form-data' },
      data
    })
  },

  /**
   * 上传文件接口
   * @returns
   */
  uploadFile(data = {}) {
    return request({
      url: '/core/system/uploadFile',
      method: 'post',
      timeout: 30000,
      // headers: { 'Content-Type': 'multipart/form-data' },
      data
    })
  },

  /**
   * 保存网络图片
   * @returns
   */
  saveNetWorkImage(data = {}) {
    return request({
      url: '/core/system/saveNetworkImage',
      method: 'post',
      data
    })
  },

  /**
   * 获取登录日志列表
   */
  getLoginLogList(params = {}) {
    return request({
      url: '/monitor/log/login-log',
      method: 'get',
      params
    })
  },

  /**
   * 获取操作日志列表
   */
  getOperationLogList(params = {}) {
    return request({
      url: '/monitor/log/sys-log',
      method: 'get',
      params
    })
  },

  /**
   * 获取资源列表
   */
  getResourceList(params = {}) {
    return request({
      url: '/core/system/getResourceList',
      method: 'get',
      params
    })
  },

  /**
   * 通用导入Excel
   */
  importExcel(url, data) {
    return request({
      url,
      method: 'post',
      data,
      timeout: 30 * 1000
      // headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * 下载通用方法
   */
  download(url, method = 'post') {
    return request({ url, method, responseType: 'blob' })
  },

  /**
   * GET通用方法
   */
  commonGet(url, params = {}) {
    return request({ url, method: 'get', params })
  },

  /**
   * 快捷查询字典
   */
  getDict(code) {
    return request({
      url: '/data/dict-category/data?code=' + code,
      method: 'get'
    })
  },

  /**
   * 查询所有字典数据
   */
  dictAll() {
    return request({
      url: '/data/dict-category/dict-all',
      method: 'get'
    })
  },

  /**
   * 获取插件信息
   */
  getPluginInfo(params) {
    return request({
      url: '/core/system/getPlugin',
      method: 'get',
      params
    })
  },

  downloadById(params) {
    return request({
      url: '/data/attachment/downloadById',
      responseType: 'blob',
      method: 'get',
      params
    })
  },

  downloadByHash(hash) {
    return request({
      url: '/data/attachment/downloadByHash/' + hash,
      responseType: 'blob',
      method: 'get'
    })
  }
}
