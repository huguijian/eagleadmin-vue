import { request } from '@/utils/request.js'

export default {
	/**
	 * 获取文件分页列表
	 * @returns
	 */
	getPageList(params = {}) {
		return request({
			url: '/data/attachment/select',
			method: 'get',
			params,
		})
	},

	/**
	 * 从回收站获取数据列表
	 * @returns
	 */
	getRecyclePageList(params = {}) {
		return request({
			url: '/data/attachment/recycle',
			method: 'get',
			params,
		})
	},

	/**
	 * 移到回收站
	 * @returns
	 */
	deletes(data) {
		return request({
			url: '/data/attachment/delete',
			method: 'delete',
			data,
		})
	},

	/**
	 * 恢复数据
	 * @returns
	 */
	recoverys(data) {
		return request({
			url: '/data/attachment/recovery',
			method: 'post',
			data,
		})
	},

	/**
	 * 真实删除数据
	 * @returns
	 */
	realDestroy(data) {
		return request({
			url: '/data/attachment/realDestroy',
			method: 'delete',
			data,
		})
	},
}
