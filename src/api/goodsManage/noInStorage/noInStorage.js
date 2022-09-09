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

// 添加商品
export const addGood = (params) => {
    return request({
        url: '/api/business/Goods/AddGoods',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 商品重新提交审核
export const submitAuditGood = (params) => {
    return request({
        url: '/api/business/Goods/AuditGoods',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 撤销审核
export const repealAuditGood = (params) => {
    return request({
        url: '/api/business/Goods/ResetAudit',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 获取商品详情及审核状态
export const getGoodsDetail = (params) => {
    return request({
        url: '/api/business/Goods/GetGoodsAuditInfo',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 修改商品
export const editGood = (params) => {
    return request({
        url: '/api/business/Goods/UpdateGoodsinfo',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 删除商品
export const deleteGood = (params) => {
    return request({
        url: '/api/business/Goods/DeleteGoodsInfo',
        method: 'POST',
        data: {
            ...params
        }
    })
}
