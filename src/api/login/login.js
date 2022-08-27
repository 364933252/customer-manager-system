import request from '@/utils/axios'

export const loginApi = (data) => {
    return request({
        url: '/api/Authorize/GetOrgnList',
        method: 'POST',
        data
    })
}

export const sendMsg = (param) => {
    return request({
        url: '/api/Authorize/SendPassWord',
        method: 'POST',
        data: {
            ...param
        }
    }) 
}