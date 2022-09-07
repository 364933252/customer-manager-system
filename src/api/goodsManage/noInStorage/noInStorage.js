import request from '@/utils/axios'

// 获取未入库商品列表
export const getNoInStorageList = (params) => {
    return request({
        url: '/api/business/Goods/GetGoodsInfo',
        method: 'POST',
        data: {
            ...params
        }
    })
}