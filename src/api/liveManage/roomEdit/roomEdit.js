import request from '@/utils/axios.js'

export const getRoomDetail = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/Getliveinfo',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 修改直播间
export const editRomm = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/EditBroadcastRoom',
        method: 'POST',
        data: {
            ...params
        }
    })
}