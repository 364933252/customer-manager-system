import axios from "axios";
import config from "../config/config";
import { Message } from 'element-ui';
import router from '@/router'

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
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token')
    }
    //配置请求参数格式
    config.headers['Content-Type'] = 'application/json'
    // config.headers['appid'] = '1001'
    // config.headers['appkey'] = '123456'
    return config
}, error => {
    return Promise.reject(error)
})

// 配置返回拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response);
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
// axios.interceptors.response.use(response => {
//     console.log('返回拦截器');
//     const status = response.code || response.status || response.statusCode
// 	const msg = response.data.msg || response.data.error_description
//     console.log(response);
// 	// if (status === 401) return router.push({path: '/login'});
// 	if (status !== 200) return Message({message: msg, type: 'error'});
// 	Message({
// 		message: msg,
// 		type: 'success'
// 	})
// 	return response
// }, error => {
//     return Promise.reject(new Error(error))
// })

export default axios