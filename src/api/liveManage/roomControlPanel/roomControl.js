import request from '@/utils/axios.js'

// 开启/关闭直播间全局禁言
export const isBanComment = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Updatecomment',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 开启/关闭回放
export const isCloseReplay = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/UpdateReplay',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 开启/关闭直播客服
export const isCloseKf = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/UpdateKF',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 添加主播副号
export const addSubAnchorForm = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Addsubanchor',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 修改主播副号
export const eidtSubAnchorForm = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Modifysubanchor',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 删除主播副号
export const removeSubAnchor = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Deletesubanchor',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 添加直播小助手
export const submitRoomAssistant = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Addassistant',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 删除直播间小助手
export const removeRoomAssistant = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Removeassistant',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 查询直播间小助手
export const searchRoomAssistant = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Getassistantlist',
        method: 'POST',
        data: {
            ...params
        }
    })
}