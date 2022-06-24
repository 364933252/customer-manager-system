import axios from "axios";
import config from "../config/config";
import { Message } from 'element-ui';
import router from '@/router'

// 配置axios请求跟地址
axios.defaults.baseURL = config.baseUrl
// 配置axios请求超时时间
axios.defaults.timeout = 10000 * 300
// 验证并返回其他状态码
axios.defaults.validateStatus = (status) => {
    return status >= 200 && status <= 500
}
// 配置请求拦截器
axios.interceptors.request.use(config => {
    // 设置让每个请求携带token
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token')
    }
    //配置请求参数格式
    config.headers['Content-Type'] = 'application/json'
    return config
}, error => {
    return Promise.reject(error)
})

// 配置返回拦截器
axios.interceptors.response.use(res => {
    const status = res.data.status || res.status
    const message = res.data.message || res.data.error_description || '未知错误'
    if (status === 401) router.push({ path: '/login' })
    if (status !== 200) {
        Message({ message: message, type: 'error' })
        return Promise.reject(new Error(message))
    }
    return res;
}, error => {
    return Promise.reject(new Error(error))
})

export default axios