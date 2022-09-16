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

// 客户绑定直播间
export const customerBindLiveRoom = (params) => {
    return request({
        url: '/api/business/BroadcastLooker/CreateLookerBroadcast',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 客户解绑直播间
export const customerUnBindLiveRoom = (params) => {
    return request({
        url: '/api/business/BroadcastLooker/DeleteLookerBroadcast',
        method: 'POST',
        data: {
            ...params
        }
    })
}
