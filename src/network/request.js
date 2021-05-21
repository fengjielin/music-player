import axios from 'axios'

// 最终封装方案
export function request(config) {
    // 1. 创建axios的实例
    const instance = axios.create({
        baseURL: '/api',
        // timeout: 5000,
        method: 'get'
    })

    // 2. 发送真正的网络请求
    return instance(config)
}
