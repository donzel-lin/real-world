/**
 * nuxt的配置文件
 *
 * */
module.exports = {
    router: {
        // 自定义扩展路由
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 先清空 nuxt自动生成的路由
            routes.splice(0)
            // 使用自定义路由
            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layouts/'),
                children: [
                    {
                        path: '', // 默认子路由
                        name: 'home',
                        component: resolve(__dirname, 'pages/home/')
                    },
                    {
                        path: '/login', //
                        name: 'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/register', //
                        name: 'register',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: '/profile/:username/:favorite?', // profile 用户信息, 动态路由
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                        path: '/settings', // settings
                        name: 'settings',
                        component: resolve(__dirname, 'pages/settings/')
                    },
                    {
                        path: '/editor', // settings
                        name: 'editor',
                        component: resolve(__dirname, 'pages/editor/')
                    },
                    {
                        path: '/article/:slug', //
                        name: 'article',
                        component: resolve(__dirname, 'pages/articles/')
                    }
                ]
            }])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    plugins: [
        '~/plugins/request.js'
    ]
}
