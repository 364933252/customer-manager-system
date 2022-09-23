import request from '@/utils/axios'

// 获取订单列表
export const getOrderList = (params) => {
    return request({
        url: '/api/business/Orders/GetList',
        method: 'POST',
        data: {
            ...params
        }
    })
}

//获取订单详情
export const getOrdersInfo = (params) => {
    return request({
        url: '/api/business/Orders/GetOrderInfo',
        method: 'POST',
        data: {
            ...params
        }
    })
}

//修改订单物流地址
export const editOrdersAddress = (params) => {
    return request({
        url: '/api/business/Orders/EditOrderLogistics',
        method: 'POST',
        data: {
            ...params
        }
    })
}