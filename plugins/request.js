import Axios from 'axios'

export const request = Axios.create({
    baseURL: 'https://api.realworld.io/api'
})
export default (context) => {
   //  console.log(context) //  context 中包括 store query ,params 等很多数据
    const { store } = context
    const errorHandle = (error) => {
        console.log(error, '出错了')
        return Promise.reject(error)
    }

    request.interceptors.request.use(config => {
        // 请求拦截器
        const { user } = store.state.user
        if(user) {
            config.headers['Authorization'] = `Token ${user.token}`
        }
        return config
    }, errorHandle)

    request.interceptors.response.use(response => {
        // 响应拦截器
        return response
    }, errorHandle)
}
