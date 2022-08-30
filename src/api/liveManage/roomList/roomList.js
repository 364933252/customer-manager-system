import request from '@/utils/axios'
// 获取直播间列表
export const getRoomList = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/GetliveinfoList',
        method: 'POST',
        data: {
            ...params
        }
    })
}
// 是否评论
export const isComment = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/EditBroadcastRoom',
        method: 'POST',
        data: {
            ...params
        }
    })
}
// 是否点赞
export const isLike = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/EditBroadcastRoom',
        method: 'POST',
        data: {
            ...params
        }
    })
}
// 是否客服
export const isService = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/EditBroadcastRoom',
        method: 'POST',
        data: {
            ...params
        }
    })
}