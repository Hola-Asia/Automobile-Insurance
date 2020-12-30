import axios from 'axios'
const http = axios.create({
    baseURL: '', //如果你配置了，那么所有的url前面都会拼接一个    baseURL
    timeout: 10000, //过期时间  ajax请求超多这个时间自动中断
    headers: {
        "Content-Type": "application/json"
    }
});
export default http;