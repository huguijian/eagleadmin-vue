import { request } from '@/utils/request.js'
export default {
    select(params={}) {
        return request({
            url: 'app/eagleai/user/user/select',
            method: 'get',
            params
        })
    },
    addUser(params={}) {
        return request({
            url: 'app/eagleai/user/user/addUser',
            method: 'post',
            data:params
        })
    },
    editUser(params={}) {
        return request({
            url: 'app/eagleai/user/user/editUser',
            method: 'post',
            data:params
        })
    },
    delUser(params={}) {
        return request({
            url: 'app/eagleai/user/user/delUser',
            method: 'delete',
            params 
        })
    }
}