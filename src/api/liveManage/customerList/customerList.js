import request from '@/utils/axios'

// 获取直播组织客户列表
export const getLiveCustomerList = (params) => {
    return request({
        url: '/api/business/Consumer/GetList',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 新增直播组织客户
export const addLiveCustomer = (params) => {
    return request({
        url: '/api/business/Consumer/CreateConsumer',
        method: 'POST',
        data: {
            ...params
        }
    })
}
