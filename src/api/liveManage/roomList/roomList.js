import request from '@/utils/axios'

export const getRoomList = (params) => {
    return request({
        url: '/api/business/BroadcastRoom/GetliveinfoList',
        method: 'POST',
        data: {
            ...params
        }
    })
}