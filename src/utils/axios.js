import axios from "axios";
import config from "../config/config";
import { Message } from 'element-ui';
import router from '@/router'
import { log } from "console";

// 配置axios请求跟地址
// axios.defaults.baseURL = config.baseUrl
// 配置axios请求超时时间
axios.defaults.timeout = 10000 * 300
// 验证并返回其他状态码
axios.defaults.validateStatus = (status) => {
    return status < 500
}
// 配置请求拦截器
axios.interceptors.request.use(config => {
    // 设置让每个请求携带token
    if (sessionStorage.getItem('AccessToken')) {
        // config.headers['Authorization'] = localStorage.getItem('token')
        const comm = {
            "PortId": "101",
            "AccessToken": sessionStorage.getItem('AccessToken')
        }
        config.data['comm'] = comm
    }
    //配置请求参数格式
    config.headers['Content-Type'] = 'application/json'
    config.headers['appid'] = '1001'
    config.headers['appkey'] = '123456'
    return config
}, error => {
    return Promise.reject(error)
})

// 配置返回拦截器
axios.interceptors.response.use(response => {
    console.log(response)
    // const status = response.data.code || response.status || response.statusCode
    // const msg = response.data.msg || response.data.error_description
    const status = response.data.code || response.status
    const msg = response.data.msg
    console.log(status);
    if (status === 401) return router.push({ path: '/login' });
    if (status !== 0 || status !== 200) return Message({ message: msg, type: 'error' });
    Message({
        message: msg,
        type: 'success'
    })
    return response
}, error => {
    return Promise.reject(new Error(error))
})

export default axios