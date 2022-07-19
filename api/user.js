import request from "~/api/request";

export const login = user => {
    return request({
        method: 'post',
        url: '/users/login',
        data: {
            user
        }
    })
}

export const register = data => {
    return request({
        method: 'post',
        url: '/users',
        data
    })
}
