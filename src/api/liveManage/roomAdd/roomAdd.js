import request from '@/utils/axios'

// 获取直播间图片上传地址
export const getUploadImgUrl = () => {
    console.log('12123');
    return request({
        url: '/api/business/BroadcastRoom/UploadMedia',
        method: 'GET',
        params: {
            Orgn: '202104081626412980144ec09acba41',
            Port: '101'
        }
    })
}

// 上传直播间图片
export const uploadImg = (url, data) => {
    return request({
        url: '/api/wx'+ url,
        data,
        method: 'POST'
    })
}
