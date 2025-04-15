import {request} from "@/utils/request";
export default {
    select(params={}) {
        return request({
            url: "/app/eagleai/aihelper/agent/select",
            method: "get",
            params
        })
    },
    syncAgent(data={}) {
        return request({
            url: "/app/eagleai/aihelper/agent/syncAgent",
            method: "post",
            data:data
        })
    },
    
}