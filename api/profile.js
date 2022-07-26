import { request } from "../plugins/request"
export const getProfile = ({ username }) => {
    return request({
        method: 'get',
        url: `/profiles/${username}`,
    })
}

export const editFavorite = ({username, method}) => {
    return request({
        method,
        url: `/profiles/${username}/follow`
    })
}