import request from "~/api/request";
export const getArticles = params => {
    return request({
        method: 'get',
        url: '/articles',
        params
    })
}

export const faroriteArticle = ({ slug, method }) => {
    return request({
        method,
        url: `/articles/${slug}/favorite`,
        headers: {
            Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxld2VubmllODk1QDE2My5jb20iLCJ1c2VybmFtZSI6ImFsdmluIiwiaWF0IjoxNjU4NzE0MzE1LCJleHAiOjE2NjM4OTgzMTV9._LMXphFtS-ZPTy0Mf7LjaObGxhpToWMYIODaxVxGSPI`
        }
    })
}

export const getMyArticles = params => {
    return request({
        method: 'get',
        url: '/articles/feed',
        params,
        headers: {
            Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxld2VubmllODk1QDE2My5jb20iLCJ1c2VybmFtZSI6ImFsdmluIiwiaWF0IjoxNjU4NzE0MzE1LCJleHAiOjE2NjM4OTgzMTV9._LMXphFtS-ZPTy0Mf7LjaObGxhpToWMYIODaxVxGSPI`
        }
    })
}