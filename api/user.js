import { request } from "../plugins/request"

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

export const getUser = () => {
    return request({
        method: 'get',
        url: '/user',
    })
}

export const updateUser = user => {
    return request({
        method: 'put',
        url: '/user',
        data: {
            user
        },
        headers: {
            Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxld2VubmllODk1QDE2My5jb20iLCJ1c2VybmFtZSI6ImFsdmluIiwiaWF0IjoxNjU4NzE0MzE1LCJleHAiOjE2NjM4OTgzMTV9._LMXphFtS-ZPTy0Mf7LjaObGxhpToWMYIODaxVxGSPI`
        }
    })
}