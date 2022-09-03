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
// 列表修改直播间是否评论/是否点赞/是否客服
export const editRomm = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/EditBroadcastRoom',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 删除直播间
export const deleteRoom = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Deleteroom',
        method: 'POST',
        data: {
            ...params
        }
    })
}