import request from '@/utils/axios'

// 获取分销商列表
export const getDistributorList = (params) => {
    return request({
        url: '/api/business/Distribution/DistributionList',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 新增分销商
export const addDistributor = (params) => {
    return request({
        url: '/api/business/Distribution/CreateDistribution',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 编辑分销商
export const editDistributor = (params) => {
    return request({
        url: '/api/business/Distribution/EditDistribution',
        method: 'POST',
        data: {
            ...params
        }
    })
}

// 关闭分销商
export const closeDistributor = (params) => {
    return request({
        url: '/api/business/Distribution/CloseDistribution',
        method: 'POST',
        data: {
            ...params
        }
    })
}

