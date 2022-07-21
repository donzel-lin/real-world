const cookieparser = process.server ? require('cookieparser') : null

export const  actions =  {
        // 服务端执行的
        // 只能在根模块下执行。。。
        nuxtServerInit ({ commit }, { req }) {
            let auth = null
            if (req.headers.cookie) {
                const parsed = cookieparser.parse(req.headers.cookie)
                try {
                    auth = JSON.parse(parsed.user)
                } catch (err) {
                    // No valid cookie found
                }
            }
            commit('user/setUser', auth)
        }
    }