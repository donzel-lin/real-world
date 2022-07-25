import request from "~/api/request";

export const getTags = () => {
    return request({
        method: 'get',
        url: '/tags',
    
    })
}