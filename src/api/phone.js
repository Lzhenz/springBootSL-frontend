import request from "./request";

export function getPhones(params){
    const phoneParams = {
        model: params.model,
        page: params.page,
        size: params.size
    }
    return request({
        url:'/phoneData/getPageSearch',
        method:'get',
        params: phoneParams
    })
}